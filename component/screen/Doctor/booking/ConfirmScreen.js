import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ConfirmScreen({ route }) {
    const { token, doctorId } = route.params || {};
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const confirmBooking = async () => {
            if (token && doctorId) {
                try {
                    const res = await axios.post('https://your-api.com/api/verify-booking', {
                        token,
                        doctorId,
                    });

                    if (res.data && res.data.EC === 0) {
                        setStatusMessage('✅ Xác nhận lịch hẹn thành công!');
                    } else {
                        setStatusMessage('❌ Lịch hẹn không hợp lệ hoặc đã được xác nhận.');
                    }
                } catch (error) {
                    console.log(error);
                    setStatusMessage('⚠️ Lỗi kết nối đến server!');
                } finally {
                    setLoading(false);
                }
            }
        };

        confirmBooking();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Text style={styles.message}>{statusMessage}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24
    },
    message: {
        fontSize: 18, textAlign: 'center'
    }
});
