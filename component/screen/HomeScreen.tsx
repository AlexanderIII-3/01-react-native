import React, { useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../container/Header";
import ServiceScreen from "../review/ServiceScreen";
import SpecialtySection from "../section/SpecialtySection";
import ClinicSection from "../section/ClinicSection";
import OutStandingSection from "../section/OutStandingSection";
import HandBook from "../section/HandBook";
import { getAllDoctor } from '../../service/userService'
// Dữ liệu mẫu


const HomeScreen = () => {
    useEffect(() => {
        fethListDoctor()
    })

    const fethListDoctor = async () => {

        const res = await getAllDoctor();
        console.log('check data dcotor', res)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>


            </View>
            <ScrollView style={styles.body}>
                <ServiceScreen></ServiceScreen>
                <SpecialtySection></SpecialtySection>
                <ClinicSection></ClinicSection>
                <OutStandingSection></OutStandingSection>
                <HandBook></HandBook>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: 15,
    },
    body: {
        // marginHorizontal: 10,
        flex: 8
    }

})


export default HomeScreen;