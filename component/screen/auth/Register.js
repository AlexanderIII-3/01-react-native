import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Alert, StyleSheet, KeyboardAvoidingView,
    ScrollView, ActivityIndicator,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { handleRegisterService } from '../../../service/userService';

const Register = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
    });

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/;

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Tên là bắt buộc';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Họ là bắt buộc';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user types
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleRegisterApi = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const res = await handleRegisterService(formData);
            console.log('Registration Success:', res);
            if (res && res.EC === 0) {


                Alert.alert('Thành công', `${res.EM}`, [
                    { text: 'OK', onPress: () => navigation.navigate('login') }
                ]);
            } else {
                Alert.alert('Lỗi', res.EM || 'Đăng ký không thành công');
                setIsLoading(false);
            }


        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Alert.alert('Lỗi', 'Không thể kết nối tới máy chủ');
        }
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Tạo tài khoản mới</Text>
                    <Text style={styles.subtitle}>Điền thông tin để đăng ký tài khoản</Text>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Nhập email của bạn"
                            placeholderTextColor="#999"
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#999"
                                value={formData.password}
                                secureTextEntry={secureTextEntry}
                                onChangeText={(value) => handleInputChange('password', value)}
                            />
                            <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
                                <Icon
                                    name={secureTextEntry ? 'visibility-off' : 'visibility'}
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    {/* First Name and Last Name in Row */}
                    <View style={styles.nameRow}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>Họ</Text>
                            <TextInput
                                style={[styles.input, errors.lastName && styles.inputError]}
                                placeholder="Nhập họ của bạn"
                                placeholderTextColor="#999"
                                value={formData.lastName}
                                onChangeText={(value) => handleInputChange('lastName', value)}
                            />
                            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                        </View>
                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Tên</Text>
                            <TextInput
                                style={[styles.input, errors.firstName && styles.inputError]}
                                placeholder="Nhập tên của bạn"
                                placeholderTextColor="#999"
                                value={formData.firstName}
                                onChangeText={(value) => handleInputChange('firstName', value)}
                            />
                            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                        </View>
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={[styles.input, errors.phone && styles.inputError]}
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor="#999"
                            value={formData.phone}
                            keyboardType="phone-pad"
                            onChangeText={(value) => handleInputChange('phone', value)}
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    </View>

                    {/* Address Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            style={[styles.input, errors.address && styles.inputError]}
                            placeholder="Nhập địa chỉ của bạn"
                            placeholderTextColor="#999"
                            value={formData.address}
                            onChangeText={(value) => handleInputChange('address', value)}
                        />
                        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleRegisterApi}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        )}
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Đã có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.loginLink}>Đăng nhập ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    innerContainer: {
        marginHorizontal: 25,
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: '#ff4444',
        backgroundColor: '#fff9f9',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontSize: 15,
    },
    eyeIcon: {
        padding: 10,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#a5d6a7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Register;