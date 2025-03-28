import React from "react";
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { pathImage } from "../../ultis/Const";
import { Ionicons } from "@expo/vector-icons";

let logo = require('../../assets/serviceScreen/iconkham-chuyen-khoa.png')
const services = [
    { id: 1, title: "Khám\nChuyên khoa", icon: require('../../assets/serviceScreen/iconkham-chuyen-khoa.png') },
    { id: 2, title: "Khám\nTừ xa", icon: require("../../assets/serviceScreen/iconkham-tu-xa.png") },
    { id: 3, title: "Khám\nTổng quát", icon: require("../../assets/serviceScreen/iconkham-tong-quan.png") },
    { id: 4, title: "Xét nghiệm\nY học", icon: require("../../assets/serviceScreen/iconxet-nghiem-y-hoc.png") },
    { id: 5, title: "Sức khỏe\nTinh thần", icon: require("../../assets/serviceScreen/iconsuc-khoe-tinh-than.png") },
    { id: 6, title: "Khám\nNha khoa", icon: require("../../assets/serviceScreen/iconkham-nha-khoa.png") },
    { id: 7, title: "Gói\nPhẫu thuật", icon: require("../../assets/serviceScreen/icongoi-phau-thuat.png") },
    { id: 8, title: "Sống khỏe\nTiểu đường", icon: require("../../assets/serviceScreen/thiet-ke-chua-co-ten-3.png") },
    { id: 9, title: "Bài Test\nSức khỏe", icon: require("../../assets/serviceScreen/iconbai-test-suc-khoe2.png") },
    { id: 10, title: "Y tế\nGần bạn", icon: require("../../assets/serviceScreen/near-home-01.png") },
];

export default function ServiceScreen() {
    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true}>

            <View >
                {/* Danh sách thông tin */}

                <View style={styles.contentContainer}>
                    <Text style={styles.titleInfor}> Hỏi nhanh, đáp chuẩn - Đặt khám dễ dàng  </Text>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput placeholder="Tìm kiếm" style={styles.searchInput} />
                    </View>
                    {data.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.item}>
                            <Text style={styles.itemText}>{item}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#888" />
                        </TouchableOpacity>
                    ))}
                </View>



            </View>


            <Text style={styles.title}>Dịch vụ toàn diện</Text>




            <FlatList
                scrollEnabled={false}
                data={services}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Chia thành 2 cột
                renderItem={({ item }) => (
                    <View style={styles.serviceBox}>

                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.serviceText}>{item.title}</Text>

                    </View>
                )}
            />

        </ScrollView>
    );
}
const data = [
    "Những quyền lợi khi tham gia chương trình Quản lý bệnh mãn tính...",
    "Lịch sử hình thành Bệnh viện Quốc tế City",
    "Khoa Gan mật, Bệnh viện Đa khoa Quốc tế Thu Cúc nhận khám...",
    "Lịch khám bác sĩ khoa Nam học, Bệnh viện Hữu nghị Việt Đức",
    "Giới thiệu về Bệnh viện Đa khoa Quốc tế Thu Cúc",
    "Khoa Thần kinh và Bệnh Alzheimer - Bệnh viện Lão khoa Trung Ương...",
];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        // padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    item: {
        backgroundColor: "#92d7ee",
        marginBottom: 2,

        padding: 15,
        marginVertical: 5,
        borderColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    searchIcon: {
        marginRight: 10,
    },
    itemText: {
        fontSize: 16,
        color: 'white',
    },
    searchInput: {
        flex: 1,
    },
    contentContainer: {

        paddingHorizontal: 10,

        backgroundColor: "#92d7ee"
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#EDEDED",
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    titleInfor: {
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',

        alignItems: 'center',
        marginHorizontal: 30,

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