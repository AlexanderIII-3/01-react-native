import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
const Header = () => {
    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>
                {/* Header chứa logo */}
                <View style={styles.header}>
                    <Image source={require("../../assets/logo.png")} style={styles.logo} />
                    <View>
                        <Feather name="search" size={24} color="#49bce2" />

                        <Text style={styles.search}>Search</Text>
                    </View>

                </View>





                {/* Tabs điều hướng */}

                <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={[styles.tabText, styles.activeTabText]}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Tại nhà</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Tại viện</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
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



            </View>
        </TouchableWithoutFeedback>
    );
}

// Dữ liệu danh sách
const data = [
    "Những quyền lợi khi tham gia chương trình Quản lý bệnh mãn tính...",
    "Lịch sử hình thành Bệnh viện Quốc tế City",
    "Khoa Gan mật, Bệnh viện Đa khoa Quốc tế Thu Cúc nhận khám...",
    "Lịch khám bác sĩ khoa Nam học, Bệnh viện Hữu nghị Việt Đức",
    "Giới thiệu về Bệnh viện Đa khoa Quốc tế Thu Cúc",
    "Khoa Thần kinh và Bệnh Alzheimer - Bệnh viện Lão khoa Trung Ương...",
];

// Stylesheet thuần
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: 'space-between'
    },
    logo: {
        width: 120,
        height: 60,
        resizeMode: "contain",
    },
    body: {


    },
    titleInfor: {
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',

        alignItems: 'center',
        marginHorizontal: 30,

    },
    search: {
        color: "#888",
        fontSize: 15
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#EDEDED",
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: "#EDEDED",
    },
    activeTab: {
        backgroundColor: "#FFD700",
    },
    tabText: {
        fontSize: 14,
        color: "#555",
    },
    activeTabText: {
        fontWeight: "bold",
        color: "#000",
    },
    contentContainer: {

        paddingHorizontal: 10,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: "#92d7ee"
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
    itemText: {
        fontSize: 16,
        color: 'white',
    },
    assistantButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    assistantText: {
        color: "white",
        marginLeft: 5,
        fontWeight: "bold",
    },
});
export default Header