import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { pathImage } from "../../ultis/Const";
let logo = require('../../assets/serviceScreen/iconkham-chuyen-khoa.png')
const services = [
    { id: 1, title: "Khám\nChuyên khoa", icon: require('../../assets/serviceScreen/iconkham-chuyen-khoa.png') },
    // { id: 2, title: "Khám\nTừ xa", icon: require("./assets/remote.png") },
    // { id: 3, title: "Khám\nTổng quát", icon: require("./assets/general.png") },
    // { id: 4, title: "Xét nghiệm\nY học", icon: require("./assets/lab.png") },
    // { id: 5, title: "Sức khỏe\nTinh thần", icon: require("./assets/mental.png") },
    // { id: 6, title: "Khám\nNha khoa", icon: require("./assets/dental.png") },
    // { id: 7, title: "Gói\nPhẫu thuật", icon: require("./assets/surgery.png") },
    // { id: 8, title: "Sống khỏe\nTiểu đường", icon: require("./assets/diabetes.png") },
    // { id: 9, title: "Bài Test\nSức khỏe", icon: require("./assets/test.png") },
    // { id: 10, title: "Y tế\nGần bạn", icon: require("./assets/healthcare.png") },
];

export default function ServiceScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dịch vụ toàn diện</Text>

            <FlatList
                data={services}
                numColumns={2}
                keyExtractor={(item) => item.id + ''}
                renderItem={({ item }) => (
                    <View style={styles.serviceBox}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.serviceText}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    serviceBox: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F9FC",
        margin: 8,
        padding: 15,
        borderRadius: 15,
        elevation: 2, // Hiệu ứng đổ bóng
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 5,
        resizeMode: "contain",
    },
    serviceText: {
        textAlign: "center",
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
});