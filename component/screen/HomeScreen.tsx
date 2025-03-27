import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../container/Header";
import ServiceScreen from "../review/ServiceScreen";

// Dữ liệu mẫu


const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <ServiceScreen></ServiceScreen>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1
    }
})


export default HomeScreen;