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
            const data = res.DT;

            if (data.length > 0 && !height) {
                setHeight(data[0].height);
            }

            const bmiList = data.map(item => {
                const h = item.height / 100;
                return parseFloat((item.weight / (h * h)).toFixed(2));
            });

            const dateList = data.map(item => formatDate(+item.date));
            setBmiData(bmiList);
            setDates(dateList);
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        }
    };

    const calculateBMI = async () => {
        const weightKg = parseFloat(weight);

        if (isNaN(weightKg) || weightKg <= 0) {
            Alert.alert("Lỗi", "Vui lòng nhập cân nặng hợp lệ.");
            return;
        }

        if (!height) {
            Alert.alert("Lỗi", "Không có chiều cao để tính BMI.");
            return;
        }

        const heightM = height / 100;
        const bmi = weightKg / (heightM * heightM);

        const now = new Date();
        const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        const newRecord = {
            patientId: 3,
            weight: weightKg,
            height,
            bmi: parseFloat(bmi.toFixed(2)),
            date: dateOnly,
            actor: "USER",
        };

        const res = await handleSaveInforPatient(newRecord);

        if (res && res.EC === 0) {
            setBmiData(prev => [...prev, newRecord.bmi]);
            setDates(prev => [...prev, formatDate(dateOnly)]);
            setWeight('');
        } else {
            Alert.alert("Lỗi", "Không thể lưu dữ liệu.");
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

                <Button title="Tính BMI" onPress={calculateBMI} />

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
