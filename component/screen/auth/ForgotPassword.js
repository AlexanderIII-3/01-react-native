import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { handleVerifyEmailService, resetPasswordService } from '../../../service/userService';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false);

    const validateEmail = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = () => {
        const newErrors = {};
        if (!newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleVerifyEmail = async () => {
        if (!validateEmail()) return;

        setIsLoading(true);
        try {
            const isVerifide = await handleVerifyEmailService(email);
            setIsLoading(false);


            if (isVerifide === true) {
                setEmailVerified(true);
                Alert.alert('Thành công', 'Email đã được xác thực, vui lòng đặt mật khẩu mới');
            } else {
                setEmailVerified(false);
                Alert.alert('Lỗi', 'Email không tồn tại trong hệ thống');
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Lỗi', 'Email không tồn tại trong hệ thống');
        }
    };

    const handleResetPassword = async () => {
        if (!validatePassword()) return;

        setIsLoading(true);
        try {
            const data = {
                email,
                password: newPassword
            };
            const res = await resetPasswordService(data);
            if (res && res.EC === 0) {

                setIsLoading(false);
                Alert.alert('Thành công', 'Đặt lại mật khẩu thành công!', [
                    { text: 'OK', onPress: () => navigation.navigate('login') }
                ]);
            } else {
                Alert.alert('Thất bại', `${re.EM}`,);

            }



        } catch (error) {
            setIsLoading(false);
            Alert.alert('Lỗi', 'Không thể đặt lại mật khẩu. Vui lòng thử lại sau');
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
                    <Text style={styles.title}>Quên mật khẩu</Text>
                    <Text style={styles.subtitle}>
                        {emailVerified
                            ? 'Vui lòng nhập mật khẩu mới'
                            : 'Nhập email để đặt lại mật khẩu'}
                    </Text>

                    {!emailVerified ? (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, errors.email && styles.inputError]}
                                    placeholder="Nhập email của bạn"
                                    placeholderTextColor="#999"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>

                            <TouchableOpacity
                                style={[styles.button, isLoading && styles.buttonDisabled]}
                                onPress={handleVerifyEmail}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Xác thực email</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Mật khẩu mới</Text>
                                <View style={[styles.passwordContainer, errors.newPassword && styles.inputError]}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Nhập mật khẩu mới"
                                        placeholderTextColor="#999"
                                        value={newPassword}
                                        secureTextEntry={secureTextEntry}
                                        onChangeText={setNewPassword}
                                    />
                                    <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
                                        <Icon
                                            name={secureTextEntry ? 'visibility-off' : 'visibility'}
                                            size={22}
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Xác nhận mật khẩu</Text>
                                <TextInput
                                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor="#999"
                                    value={confirmPassword}
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={setConfirmPassword}
                                />
                                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                            </View>

                            <TouchableOpacity
                                style={[styles.button, isLoading && styles.buttonDisabled]}
                                onPress={handleResetPassword}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.backToLogin}
                        onPress={() => navigation.navigate('login')}
                    >
                        <Text style={styles.backToLoginText}>Quay lại đăng nhập</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
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
    button: {
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    buttonDisabled: {
        backgroundColor: '#81c4ff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backToLogin: {
        alignSelf: 'center',
        marginTop: 10,
    },
    backToLoginText: {
        color: '#007BFF',
        fontSize: 14,
    },
});

export default ForgotPassword;