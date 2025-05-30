import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { handleLoginService } from '../../../service/userService';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../../redux/slices/userReducer';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginApi = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const data = { email, password };
            const res = await handleLoginService(data);

            if (res && res.EC === 0) {
                dispatch(handleLogin(res.DT));
                navigation.navigate('home');
            } else {
                Alert.alert('Lỗi', res.EM || 'Đăng nhập không thành công');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Không thể kết nối tới máy chủ');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (errors.email) setErrors({ ...errors, email: '' });
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (errors.password) setErrors({ ...errors, password: '' });
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
                    <Text style={styles.title}>Chào mừng trở lại</Text>
                    <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Nhập email của bạn"
                            placeholderTextColor="#999"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={handleEmailChange}
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
                                value={password}
                                secureTextEntry={secureTextEntry}
                                onChangeText={handlePasswordChange}
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

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleLoginApi}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        )}
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('register')}>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#007BFF',
        fontSize: 13,
    },
    button: {
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#007BFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Login;