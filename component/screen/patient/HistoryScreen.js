import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { fetchMedicalHistory } from '../../../service/userService';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
const MedicalHistoryScreen = () => {
    const [history, setHistory] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const userInfo = useSelector((state) => state.user.userInfo);


    useEffect(() => {
        fetchHistory();

    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetchMedicalHistory({ patientId: userInfo.id });
            setHistory(response.data);
        } catch (error) {
            console.log("Error fetching history:", error);
            Alert.alert("Lỗi", "Không thể tải lịch sử khám.");
        }
    };

    const handlePreview = (imageUri) => {
        if (imageUri) {
            console.log(imageUri?.slice(0, 100));

            setSelectedImage(imageUri);
            setModalVisible(true);
        } else {
            Alert.alert("Thông báo", "Không có kết quả để xem.");
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.disease}>{item.reason}</Text>
                <Text style={styles.doctor}>
                    👨‍⚕️ {`${item?.doctor?.firstName} ${item?.doctor?.lastName}`}
                </Text>
                <Text style={styles.time}>🕒 {item?.timebooking?.valueVi}</Text>
                <Text style={styles.time}>Giá khám: {item?.doctor?.Doctor_Infor?.priceTypeData?.valueVi}</Text>
                <View style={styles.buttonRow}>
                    <Pressable
                        style={styles.previewButton}
                        onPress={() => handlePreview(item.files)}
                    >
                        <Text style={styles.previewText}>Xem kết quả</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📝 Lịch Sử Khám Bệnh</Text>
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {selectedImage ? (
                        <WebView
                            originWhitelist={['*']}
                            source={{
                                html: `
                                        <html>
                                            <body style="margin:0">
                                            <embed width="100%" height="100%" 
                                            src="data:application/pdf;base64,${selectedImage}" 
                                            type="application/pdf" />
                                            </body>
                                        </html>
                                        `,
                            }}
                            style={{ flex: 1 }}
                            onError={(event) => {
                                console.log('PDF error:', event.nativeEvent);
                                Alert.alert('Lỗi', 'Không thể hiển thị PDF.');
                            }}
                        />
                    ) : (
                        <Text>Không có dữ liệu PDF.</Text>
                    )}
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeText}>Đóng</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        elevation: 3,
    },
    infoContainer: {
        flex: 1,
    },
    disease: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    doctor: {
        fontSize: 16,
        color: '#555',
        marginBottom: 3,
    },
    time: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    previewButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    previewText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    closeButton: {
        backgroundColor: '#e53935',
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 30
    },
    closeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MedicalHistoryScreen;
