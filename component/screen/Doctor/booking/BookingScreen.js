import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';

const BookingScreen = () => {
    const navigation = useNavigation();
    const userInfo = useSelector((state) => state.user.userInfo);
    console.log('check state redux', userInfo)

    useEffect(() => {
        const name = `${userInfo.firstName} ${userInfo.lastName}`
        setPatientName(name)
        setPhone(userInfo.phoneNumber)
        setAddressDetail(userInfo.address)
        setEmail(userInfo.email)

    }, [userInfo])

    const [bookingFor, setBookingFor] = useState('other');
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [reason, setReason] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('later');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>BookingCare</Text>
                <Text style={styles.sectionTitle}>ĐẶT LỊCH KHÁM</Text>

                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>Tiến sĩ, Bác sĩ Nguyễn Thị Thanh Thủy</Text>
                    <Text style={styles.timeSlot}>08:00 - 08:30 - Thứ 2 - 14/04/2025</Text>
                    <Text style={styles.clinicInfo}>Phòng khám Bệnh viện Đại học Y Dược 1</Text>
                    <Text style={styles.address}>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</Text>
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
                        value=''
                        style={styles.input}
                        placeholder="Họ tên người đặt lịch"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        value="0865858562"
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
                        {/* <CheckBox
                            value={gender === 'male'}
                            onValueChange={() => setGender('male')}
                        /> */}
                        <Text style={styles.radioLabel}>Nam</Text>
                    </View>
                    <View style={styles.radioOption}>
                        {/* <CheckBox
                            value={gender === 'female'}
                            onValueChange={() => setGender('female')}
                        /> */}
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
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày/tháng/năm sinh (bắt buộc)"
                        value={dob}
                        onChangeText={setDob}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Ngày/tháng/năm sinh (bắt buộc)</Text>






                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tổ/khu/thôn/xóm (bắt buộc)"
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

            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
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
});

export default BookingScreen;