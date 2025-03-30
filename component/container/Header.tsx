import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation: any = useNavigation();
    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>
                {/* Header chứa logo */}

                <View style={styles.header}>
                    <FontAwesome6 onPress={() => { navigation.openDrawer(); }} name="bars-staggered" size={24} color="black" />
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



            </View>
        </TouchableWithoutFeedback>
    );
}

// Dữ liệu danh sách


// Stylesheet thuần
const styles = StyleSheet.create({
    container: {

        backgroundColor: "#F8F9FA",
        paddingTop: 30
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

    search: {
        color: "#888",
        fontSize: 15
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