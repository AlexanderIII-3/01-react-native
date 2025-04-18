import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Pressable, Platform, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker'
import { handleBooking } from '../../../../service/userService'
var _ = require('lodash');
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
const BookingScreen = ({ route }) => {
    const { timeType, bookingDate } = route.params;
    const dataTime = route.params;
    const navigation = useNavigation();
    const userInfo = useSelector((state) => state.user.userInfo);
    const doctorInfo = useSelector((state) => state.doctor.doctorInfor);
    const listTime = useSelector((state) => state.doctor.listTime)
    console.log('check data tim', timeType?.item?.value)
    const [timeTypeSel, setTimeTypeSel] = useState()
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doctorId, setDoctorId] = useState()
    const [addressDetail, setAddressDetail] = useState('');
    const [reason, setReason] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('later');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [timeStamp, setTimeStamp] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [dateBooking, setDateBooking] = useState('');
    const [timeString, setTimeString] = useState('')
    useEffect(() => {
        // let data = buldDateBooking()
        // console.log('check data sending', data)
        const name = `${userInfo.firstName} ${userInfo.lastName}`
        setPatientName(name)
        setPhone(userInfo.phoneNumber)
        setAddressDetail(userInfo.address)
        setEmail(userInfo.email)
        setDoctorId(doctorInfo?.id)
        setTimeTypeSel(timeType?.item?.value)
        setDateBooking(bookingDate)
        const time = buildTimeBooking(dataTime)
        setTimeString(time)


    }, [userInfo])


    const buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeType.item.label

            let date = moment.unix(+dataTime.bookingDate / 1000).format('dddd - DD/MM/YYYY')






            return (
                `${time} -${date}`
            )
        }
        return ''
    };


    const handleConfirmBooking = async () => {



        const data = {

            patientName,
            email,
            phone,
            addressDetail,
            timeStamp,
            reason,
            dateBooking,
            doctorId,
            timeTypeSel,
            gender,
            timeString


        }
        let res = await handleBooking(data)


        if (res && res.EC === 0) {

            Alert.alert('Thông báo!', 'Bạn đã đặt lịch thành công!')
            setPatientName('')
            setPhone('')
            setAddressDetail('')
            setEmail('')
            setDoctorId(doctorInfo?.id)
            setTimeTypeSel('')
            setDateBooking('')
            setReason('')
            setGender('')

        } else {
            Alert.alert('Thông báo!', `${res.EM}`)
        }
    }








    const toggleDatepicker = () => {
        setOpen(!open)

    };
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            const dateStamp = selectedDate.getTime();
            setTimeStamp(dateStamp)




            setDate(currentDate)
        } else {
            toggleDatepicker()
        }


    }
    const comfirmDate = () => {
        const formattedDate = date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setDateOfBirth(formattedDate)



        toggleDatepicker()

    }
    // const buldDateBooking = () => {
    //     const result = ''
    //     {
    //         listTime && listTime.map((item, index) => {

    //             if (timeType === item.timeType) {
    //                 result = item.timeTypeData.valueVi

    //                 return result
    //             }
    //         })

    //     }

    // }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>ĐẶT LỊCH KHÁM</Text>

                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>Tiến sĩ, Bác sĩ Nguyễn Thị Thanh Thủy</Text>
                    <Text style={styles.timeSlot}>08:00 - 08:30 - Thứ 2 - 14/04/2025</Text>
                    <Text style={styles.clinicInfo}>{doctorInfo?.Doctor_Infor?.nameClinic}</Text>
                    <Text style={styles.address}>{doctorInfo?.Doctor_Infor?.addressClinic}</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>Giá khám 150.000đ</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                        {/* <CheckBox
                            value={bookingFor === 'self'}
                            onValueChange={() => setBookingFor('self')}
                        /> */}

                    </View>
                    <View style={styles.radioOption}>
                        {/* <CheckBox
                            value={bookingFor === 'other'}
                            onValueChange={() => setBookingFor('other')}
                        /> */}

                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Thông tin người đặt lịch</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        value={phone}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Thông tin bệnh nhân</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nguyễn Thế Anh"
                        value={patientName}
                        onChangeText={setPatientName}
                    />
                </View>
                <Text style={styles.note}>Vui lòng điền ĐẦY ĐỦ HỌ VÀ TÊN CÓ DẤU. Lịch khám sẽ bị TỪ CHỐI nếu để sai thông tin.</Text>

                <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value={gender}
                            status={gender === 'M' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('M')}
                        />
                        <Text style={styles.radioLabel}>Nam</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value={gender}
                            status={gender === 'F' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('F')}
                        />
                        <Text style={styles.radioLabel}>Nữ</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại bệnh nhân"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    {open &&
                        <DateTimePicker

                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                            maximumDate={new Date('2025-4-14')}
                            minimumDate={new Date('1890-1-1')}
                            locale='vi-VN'
                        />

                    }
                    {open && Platform.OS === 'ios' && (


                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}

                        >
                            <TouchableOpacity style={[

                                styles.button,
                                styles.pickerButton,
                                { backgroundColor: '#11182711' }
                            ]}

                                onPress={toggleDatepicker}
                            >

                                <Text
                                    style={[
                                        styles.buttonText,
                                        { color: '#075985' }
                                    ]}
                                > Cancel</Text>
                            </TouchableOpacity>



                            <TouchableOpacity style={[

                                styles.button,
                                styles.pickerButton,
                                { backgroundColor: '#012712' }
                            ]}

                                onPress={comfirmDate}
                            >

                                <Text
                                    style={[
                                        styles.buttonText,
                                    ]}
                                > Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    )}

                    {!open &&

                        <Pressable onPress={toggleDatepicker}>


                            <TextInput
                                style={styles.input}
                                placeholder="Ngày/tháng/năm sinh (bắt buộc)"
                                value={dateOfBirth}
                                editable={false}
                                onPressIn={toggleDatepicker}
                            />
                        </Pressable>
                    }

                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Địa chỉ (bắt buộc)</Text>






                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="địa chỉ"
                        value={addressDetail}
                        onChangeText={setAddressDetail}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Lý do khám"
                        value={reason}
                        onChangeText={setReason}
                        multiline
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Hình thức thanh toán</Text>

                <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                        {/* <CheckBox
                            value={paymentMethod === 'later'}
                            onValueChange={() => setPaymentMethod('later')}
                        /> */}
                        <Text style={styles.radioLabel}>Thanh toán sau tại cơ sở y tế</Text>
                    </View>
                </View>

                <View style={styles.priceSummary}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Giá khám</Text>
                        <Text style={styles.priceValue}>150.000đ</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Phí đặt lịch</Text>
                        <Text style={styles.priceValue}>Miễn phí</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={[styles.priceLabel, styles.totalLabel]}>Tổng cộng</Text>
                        <Text style={[styles.priceValue, styles.totalValue]}>150.000đ</Text>
                    </View>
                </View>

                <Text style={styles.note}>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.warningTitle}>LƯU Ý</Text>
                <Text style={styles.warningText}>
                    Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:
                </Text>
                <Text style={styles.warningItem}>- Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</Text>
                <Text style={styles.warningItem}>- Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</Text>
            </View>

            <TouchableOpacity

                onPress={() => { handleConfirmBooking() }}

                style={styles.confirmButton}>
                <Text


                    style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 600,
        color: '#fff'

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    doctorInfo: {
        marginBottom: 15,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    timeSlot: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    clinicInfo: {
        fontSize: 14,
        color: '#555',
    },
    address: {
        fontSize: 14,
        color: '#555',
    },
    pickerButton: {
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 20
    },
    priceContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        marginVertical: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioLabel: {
        marginLeft: 8,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        fontSize: 14,
    },
    note: {
        fontSize: 12,
        color: '#ff0000',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
    },
    dropdownLabel: {
        fontSize: 14,
    },
    priceSummary: {
        marginVertical: 15,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#555',
    },
    priceValue: {
        fontSize: 14,
        color: '#555',
    },
    totalLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontWeight: 'bold',
        color: '#333',
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 10,
        textAlign: 'center',
    },
    warningText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    warningItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        marginLeft: 10,
    },
    confirmButton: {
        backgroundColor: '#1a73e8',
        borderRadius: 4,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    datePicker: {
        height: 120,
        marginTop: -10
    }
});

export default BookingScreen;