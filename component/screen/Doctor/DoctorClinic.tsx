import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DoctorClinic = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📍 ĐỊA CHỈ KHÁM</Text>
            <Text style={styles.clinicName}>Phòng khám Đa khoa Mediplus</Text>
            <Text style={styles.address}>
                Tầng 2, Trung tâm thương mại Mandarin Garden 2, 99 phố Tân Mai, Hà Nội
            </Text>
            <Text style={styles.price}>💰 GIÁ KHÁM: 350.000đ</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: "white", marginTop: 10 },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    clinicName: { fontSize: 14, fontWeight: "bold", color: "#007bff" },
    address: { fontSize: 14, color: "gray", marginTop: 5 },
    price: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
});

export default DoctorClinic;