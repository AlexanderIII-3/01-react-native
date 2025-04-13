import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { handleLoginService } from '../../../service/userService'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../../redux/slices/userReducer'
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginApi = async () => {

        if (!email || !password) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            const data = {
                email, password
            }
            const res = await handleLoginService(data)
            dispatch(handleLogin(res.DT));

            if (res && res.EC === 0) {

                Alert.alert('Thành công', 'Đăng nhập thành công!');

                navigation.navigate('home');
            } else {
                Alert.alert('Lỗi', res.EM);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Không thể kết nối tới máy chủ');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />

            <Button title="Đăng nhập" onPress={handleLoginApi} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});

export default Login;
