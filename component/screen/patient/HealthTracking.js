import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchHeathTracking, handleSaveInforPatient } from '../../../service/userService';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const getBMICategory = (bmi) => {
    if (bmi < 18.5) return {
        label: "Thiếu cân",
        color: "#1E90FF",
        icon: "alert-circle-outline",
        suggestion: "Bạn đang thiếu cân. Hãy ăn uống đủ chất và tăng cường protein."
    };
    if (bmi < 24.9) return {
        label: "Bình thường",
        color: "#32CD32",
        icon: "checkmark-circle-outline",
        suggestion: "Chỉ số BMI tốt! Hãy tiếp tục duy trì chế độ sinh hoạt lành mạnh."
    };
    if (bmi < 29.9) return {
        label: "Thừa cân",
        color: "#FFA500",
        icon: "warning-outline",
        suggestion: "Bạn đang thừa cân. Cân nhắc tập thể dục đều đặn và giảm khẩu phần ăn."
    };
    return {
        label: "Béo phì",
        color: "#FF4500",
        icon: "close-circle-outline",
        suggestion: "Cảnh báo! Bạn đang béo phì. Hãy đến bác sĩ để được tư vấn chế độ giảm cân phù hợp."
    };
};

const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
};

const HealthTracking = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(null); // chỉ lấy một lần
    const [bmiData, setBmiData] = useState([]);
    const [dates, setDates] = useState([]);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        loadBMIData();
    }, []);
    const loadBMIData = async () => {
        try {
            const res = await fetchHeathTracking(userInfo.id);
            if (res.EC !== 0) throw new Error(res.EM);

            const data = res.DT;
            console.log('Fetched health data:', data);

            // Xử lý dữ liệu - chỉ lấy bản ghi mới nhất nếu có nhiều bản ghi cùng ngày
            const uniqueData = data.reduce((acc, current) => {
                const existing = acc.find(item => item.date === current.date);
                if (!existing) {
                    acc.push(current);
                } else if (new Date(current.createdAt) > new Date(existing.createdAt)) {
                    // Giữ bản ghi mới hơn
                    acc[acc.indexOf(existing)] = current;
                }
                return acc;
            }, []);

            // Sắp xếp theo ngày
            uniqueData.sort((a, b) => new Date(a.date) - new Date(b.date));

            const bmiList = uniqueData.map(item => {
                return item.bmi ?? (item.height && item.weight
                    ? parseFloat((item.weight / Math.pow(item.height / 100, 2)).toFixed(2))
                    : null);
            }).filter(bmi => bmi !== null);

            const dateList = uniqueData.map(item => formatDate(+item.date));

            setBmiData(bmiList);
            setDates(dateList);

            // Cập nhật height nếu chưa có
            if (!height && uniqueData.length > 0) {
                setHeight(uniqueData[0].height);
            }
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
            Alert.alert("Lỗi", "Không thể tải dữ liệu theo dõi sức khỏe");
        }
    };
    const calculateBMI = async () => {
        try {
            const weightKg = parseFloat(weight);

            // Kiểm tra dữ liệu đầu vào
            if (isNaN(weightKg) || weightKg <= 0) {
                Alert.alert("Lỗi", "Vui lòng nhập cân nặng hợp lệ (lớn hơn 0).");
                return;
            }

            if (!height || height <= 0) {
                Alert.alert("Lỗi", "Chiều cao chưa được thiết lập hoặc không hợp lệ.");
                return;
            }

            if (!userInfo?.id) {
                Alert.alert("Lỗi", "Không xác định được thông tin người dùng.");
                return;
            }

            // Tính toán BMI
            const heightM = height / 100;
            const bmiValue = parseFloat((weightKg / (heightM * heightM)).toFixed(2));

            // Tạo record mới
            const now = new Date();
            const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

            const newRecord = {
                patientId: userInfo.id,  // Sử dụng userInfo.id thay vì hardcode
                weight: weightKg,
                height: height,
                bmi: parseFloat(bmiValue),
                date: dateOnly,
                actor: "USER",
            };


            // Gọi API
            const res = await handleSaveInforPatient(newRecord);

            if (res && res.EC === 0) {
                // Cập nhật state và hiển thị thông báo
                setBmiData(prev => [...prev, parseFloat(bmiValue)]);
                setDates(prev => [...prev, formatDate(dateOnly)]);
                setWeight('');
                loadBMIData()
                Alert.alert("Thành công", "Đã lưu chỉ số BMI mới!");
            } else {
                Alert.alert("Lỗi", res?.EM || "Không thể lưu dữ liệu.");
            }
        } catch (error) {
            console.error("Lỗi khi tính BMI:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu dữ liệu BMI.");
        }
    };

    const screenWidth = Dimensions.get("window").width - 40;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.header}>Theo Dõi Chỉ Số BMI</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập cân nặng (kg)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />

                <Button title="Tính BMI" onPress={() => { calculateBMI() }} />

                {bmiData.length > 0 ? (
                    <LineChart
                        data={{
                            labels: dates,
                            datasets: [{ data: bmiData }],
                        }}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <Text style={{ marginTop: 20 }}>Chưa có dữ liệu BMI để hiển thị.</Text>
                )}

                {/* Trung bình và nhận xét */}
                {bmiData.length > 0 && (() => {
                    const avg = bmiData.reduce((a, b) => a + b, 0) / bmiData.length;
                    const latest = bmiData[bmiData.length - 1];
                    const category = getBMICategory(latest);

                    return (
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>
                                BMI trung bình: <Text style={{ fontWeight: 'bold' }}>{avg.toFixed(2)}</Text>
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Ionicons name={category.icon} size={20} color={category.color} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: 16 }}>
                                    Nhận xét gần nhất:{" "}
                                    <Text style={{ fontWeight: 'bold', color: category.color }}>
                                        {category.label}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={{ fontSize: 14, color: '#666', marginTop: 5, textAlign: 'center' }}>
                                {category.suggestion}
                            </Text>
                        </View>
                    );
                })()}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    chart: {
        marginTop: 30,
        borderRadius: 16,
    },
});

export default HealthTracking;
