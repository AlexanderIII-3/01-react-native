import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Pressable, Platform, Alert, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { handleBooking } from '../../../../service/userService';
var _ = require('lodash');
import { RadioButton } from 'react-native-paper';
import ModalConfirm from './modal/ModalConfirm';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookingScreen = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleBookingSuccess = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const { timeType, bookingDate } = route.params;
    const dataTime = route.params;
    const navigation = useNavigation();
    const userInfo = useSelector((state) => state.user.userInfo);
    const doctorInfo = useSelector((state) => state.doctor.doctorInfor);
    const listTime = useSelector((state) => state.doctor.listTime);
    const [timeTypeSel, setTimeTypeSel] = useState();
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doctorId, setDoctorId] = useState();
    const [addressDetail, setAddressDetail] = useState('');
    const [reason, setReason] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('later');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [timeStamp, setTimeStamp] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [dateBooking, setDateBooking] = useState('');
    const [timeString, setTimeString] = useState('');
    const [nameClinic, setNameClinic] = useState(doctorInfo.Doctor_Infor.nameClinic || '');
    useEffect(() => {

        const name = `${userInfo.firstName} ${userInfo.lastName}`;
        setPatientName(name);
        setPhone(userInfo.phoneNumber);
        setAddressDetail(userInfo.address);
        setEmail(userInfo.email);
        setDoctorId(doctorInfo?.id);
        setTimeTypeSel(timeType?.item?.value);
        setDateBooking(bookingDate);
        const time = buildTimeBooking(dataTime);
        setTimeString(time);
    }, [userInfo]);

    const validateForm = () => {
        const newErrors = {};

        if (!patientName.trim()) newErrors.patientName = 'Vui lòng nhập họ tên bệnh nhân';
        if (!gender) newErrors.gender = 'Vui lòng chọn giới tính';
        if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
        else if (!/^\d{9,10}$/.test(phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
        if (!email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email không hợp lệ';
        if (!dateOfBirth) newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh';
        if (!addressDetail.trim()) newErrors.addressDetail = 'Vui lòng nhập địa chỉ';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeType.item.label;
            let date = moment.unix(+dataTime.bookingDate / 1000).format('dddd - DD/MM/YYYY');
            return `${time} - ${date}`;
        }
        return '';
    };

    const handleConfirmBooking = async () => {


        if (!validateForm()) return;

        setIsLoading(true);

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
            timeString,

        };
        try {
            let res = await handleBooking(data);

            if (res && res.EC === 0) {
                setModalVisible(true);
                resetForm();
                navigation.navigate('home');
            } else {
                Alert.alert('Thông báo!', `${res.EM}`);
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi đặt lịch');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setPatientName('');
        setPhone('');
        setAddressDetail('');
        setEmail('');
        setTimeTypeSel('');
        setDateBooking('');
        setReason('');
        setGender('');
        setDateOfBirth('');
        setErrors({});
        setTouched({});
    };

    const toggleDatepicker = () => {
        setOpen(!open);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            const dateStamp = selectedDate.getTime();
            setTimeStamp(dateStamp);
            setDate(currentDate);
        } else {
            toggleDatepicker();
        }
    };

    const comfirmDate = () => {
        const formattedDate = date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setDateOfBirth(formattedDate);
        toggleDatepicker();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ModalConfirm visible={modalVisible} onClose={handleCloseModal} />

            <View style={styles.header}>
                <Text style={styles.sectionTitle}>ĐẶT LỊCH KHÁM</Text>

                <View style={styles.card}>
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>Tiến sĩ, Bác sĩ {doctorInfo?.firstName} {doctorInfo?.lastName}</Text>
                        <View style={styles.timeSlotContainer}>
                            <Icon name="clock-o" size={16} color="#4a90e2" />
                            <Text style={styles.timeSlot}> {timeString}</Text>
                        </View>
                        <View style={styles.clinicInfoContainer}>
                            <Icon name="hospital-o" size={16} color="#4a90e2" />
                            <Text style={styles.clinicInfo}> {doctorInfo?.Doctor_Infor?.clinicData?.name || ""}</Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <Icon name="map-marker" size={16} color="#4a90e2" />
                            <Text style={styles.address}> {doctorInfo?.Doctor_Infor?.addressClinic}</Text>
                        </View>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>Giá khám: {doctorInfo?.Doctor_Infor?.priceTypeData?.valueVi}</Text>
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
                        editable={false}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Thông tin bệnh nhân</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.patientName && touched.patientName && styles.inputError]}
                        placeholder="Họ và tên bệnh nhân"
                        value={patientName}
                        onChangeText={setPatientName}
                        onBlur={() => handleBlur('patientName')}
                    />
                    {errors.patientName && touched.patientName && (
                        <Text style={styles.errorText}>{errors.patientName}</Text>
                    )}
                </View>
                <Text style={styles.note}>Vui lòng điền ĐẦY ĐỦ HỌ VÀ TÊN CÓ DẤU. Lịch khám sẽ bị TỪ CHỐI nếu để sai thông tin.</Text>

                <View style={styles.radioGroup}>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="M"
                            status={gender === 'M' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('M')}
                            color="#4a90e2"
                        />
                        <Text style={styles.radioLabel}>Nam</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="F"
                            status={gender === 'F' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('F')}
                            color="#4a90e2"
                        />
                        <Text style={styles.radioLabel}>Nữ</Text>
                    </View>
                </View>
                {errors.gender && touched.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.phone && touched.phone && styles.inputError]}
                        placeholder="Số điện thoại bệnh nhân"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        onBlur={() => handleBlur('phone')}
                    />
                    {errors.phone && touched.phone && (
                        <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.email && touched.email && styles.inputError]}
                        placeholder="Địa chỉ email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        onBlur={() => handleBlur('email')}
                    />
                    {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    {open && (
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                            maximumDate={new Date()}
                            minimumDate={new Date('1900-01-01')}
                            locale='vi-VN'
                        />
                    )}

                    {open && Platform.OS === 'ios' && (
                        <View style={styles.datePickerActions}>
                            <TouchableOpacity
                                style={[styles.button, styles.pickerButton, { backgroundColor: '#f0f0f0' }]}
                                onPress={toggleDatepicker}
                            >
                                <Text style={[styles.buttonText, { color: '#333' }]}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.pickerButton, { backgroundColor: '#4a90e2' }]}
                                onPress={comfirmDate}
                            >
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!open && (
                        <Pressable onPress={toggleDatepicker}>
                            <TextInput
                                style={[styles.input, errors.dateOfBirth && touched.dateOfBirth && styles.inputError]}
                                placeholder="Ngày/tháng/năm sinh (bắt buộc)"
                                value={dateOfBirth}
                                editable={false}
                                onPressIn={toggleDatepicker}
                                onBlur={() => handleBlur('dateOfBirth')}
                            />
                        </Pressable>
                    )}
                    {errors.dateOfBirth && touched.dateOfBirth && (
                        <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Địa chỉ (bắt buộc)</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, errors.addressDetail && touched.addressDetail && styles.inputError]}
                        placeholder="Địa chỉ chi tiết"
                        value={addressDetail}
                        onChangeText={setAddressDetail}
                        onBlur={() => handleBlur('addressDetail')}
                    />
                    {errors.addressDetail && touched.addressDetail && (
                        <Text style={styles.errorText}>{errors.addressDetail}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Lý do khám (nếu có)"
                        value={reason}
                        onChangeText={setReason}
                        multiline
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionSubtitle}>Hình thức thanh toán</Text>
                <View style={styles.paymentOption}>
                    <RadioButton
                        value="later"
                        status={paymentMethod === 'later' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentMethod('later')}
                        color="#4a90e2"
                    />
                    <Text style={styles.radioLabel}>Thanh toán sau tại cơ sở y tế</Text>
                </View>

                <View style={styles.priceSummary}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Giá khám</Text>
                        <Text style={styles.priceValue}>{doctorInfo?.Doctor_Infor?.priceTypeData?.valueVi}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Phí đặt lịch</Text>
                        <Text style={styles.priceValue}>Miễn phí</Text>
                    </View>
                    <View style={[styles.priceRow, styles.totalRow]}>
                        <Text style={[styles.priceLabel, styles.totalLabel]}>Tổng cộng</Text>
                        <Text style={[styles.priceValue, styles.totalValue]}>{doctorInfo?.Doctor_Infor?.priceTypeData?.valueVi}</Text>
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
                style={styles.confirmButton}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.confirmButtonText}>XÁC NHẬN ĐẶT LỊCH</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    doctorInfo: {
        marginBottom: 15,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    clinicInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    timeSlot: {
        fontSize: 14,
        color: '#555',
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
        paddingTop: 12,
        marginTop: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
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
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 14,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 4,
    },
    note: {
        fontSize: 12,
        color: '#ff0000',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    datePickerActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    pickerButton: {
        minWidth: 100,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    priceSummary: {
        marginVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 8,
        marginTop: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#555',
    },
    priceValue: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    totalLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
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
        backgroundColor: '#4a90e2',
        borderRadius: 6,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        shadowColor: '#4a90e2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingScreen;