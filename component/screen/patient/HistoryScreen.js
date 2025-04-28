import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { fetchMedicalHistory } from '../../../service/userService';
import moment from 'moment';
var _ = require('lodash');

import { useDispatch, useSelector } from 'react-redux';
import { handleBooking } from '../../../service/userService';
const MedicalHistoryScreen = () => {
    const userinfo = useState(useSelector((state) => state.user.userInfo))
    const [authuser, setAuthuser] = useState('')
    const [history, setHistory] = useState([]);
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        fetchHistory();
        setAuthuser(userinfo)


    }, [])

    const fetchHistory = async () => {
        try {
            const response = await fetchMedicalHistory({ patientId: userinfo[0].id });
            console.log('check user infor', authuser)
            setHistory(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleRebook = (item) => {
        if (authuser) {


            if (item) {



                const time = buildTimeBooking(item)


                setTimeString(time)

                const setdateBooking = new Date



                const data = {
                    email: userinfo[0].email,
                    patientName: authuser[0].firstName + userinfo[0].lastName,
                    addressDetail: authuser[0].address,
                    gender: authuser[0].gender,
                    dateBooking: new Date().setHours(0, 0, 0, 0),

                    doctorId: item.doctorId,
                    timeTypeSel: item.timeType,
                    timeString: timeString,
                    reason: item.reason,
                    action: 'HISTORY'






                }
                Alert.alert(
                    'Đặt lịch lại',
                    `Bạn muốn đặt lịch lại với bác sĩ: ${item?.doctor.lastName}  ${item?.doctor.firstName} 
                     cho triệu chứng :  ${item.reason}?`,
                    [
                        { text: 'Huỷ', style: 'cancel' },
                        { text: 'Đồng ý', onPress: () => { bookingHistory(data) } },
                    ]
                );
            }

        }



    };
    const buildTimeBooking = (history) => {
        if (history && !_.isEmpty(history)) {


            let time = history?.timebooking?.valueVi

            const datatime = new Date().getTime()

            let date = moment.unix(datatime / 1000).format('dddd - DD/MM / YYYY')






            return (
                `${time} -${date}`
            )
        }
        return ''
    };
    const bookingHistory = async (data) => {
        try {
            const res = await handleBooking(data)
            if (res && res.EC === 0) {
                Alert.alert('Thông báo', res?.EM, [{ text: 'OK' }])


            }
        } catch (error) {
            console.log(error)
        }



    }



    const handlePreview = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };
    const convertDate = (date) => {
        const dateObj = moment(+date).format("DD-MM-YYYY ")


        return dateObj

    }
    const renderItem = ({ item }) => (

        < View style={styles.card} >
            {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
            < View style={styles.infoContainer} >
                <Text style={styles.disease}>{item.reason}</Text>
                <Text style={styles.doctor}>👨‍⚕️ {`${item?.doctor?.firstName}`}  {`${item?.doctor?.lastName}`}</Text>
                <Text style={styles.time}>🕒 {convertDate(item.date)}    {item?.timebooking?.valueVi}</Text>
                <Text style={styles.time} > Giá khám: {item?.doctor?.Doctor_Infor?.priceTypeData?.valueVi}  </Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.previewButton} onPress={() => handlePreview(item.files)}>
                        <Text style={styles.previewText}>Xem kết quả</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rebookButton} onPress={() => handleRebook(item)}>
                        <Text style={styles.rebookText}>Đặt lịch lại</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View >
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📝 Lịch Sử Khám Bệnh</Text>
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Modal xem kết quả */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.resultImage} />

                        )}
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Đóng</Text>
                        </Pressable>
                    </View>
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
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: 100,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
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
        justifyContent: 'space-between',
    },
    previewButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    previewText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    rebookButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    rebookText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    resultImage: {
        width: 400,
        height: 400,
        borderRadius: 10,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#e53935',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MedicalHistoryScreen;
