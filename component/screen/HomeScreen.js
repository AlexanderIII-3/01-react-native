import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../container/Header";
import ServiceScreen from "../review/ServiceScreen";
import SpecialtySection from "../section/SpecialtySection";
import ClinicSection from "../section/ClinicSection";
import OutStandingSection from "../section/OutStandingSection";
import HandBook from "../section/HandBook";
import { getAllDoctor, fetchAllClinic, fetchSpecialty } from '../../service/userService'
// Dữ liệu mẫu


const HomeScreen = () => {
    const [listDoctor, setListDocTor] = useState([])
    const [listClinic, setListClinic] = useState([])
    const [listSpecialty, setListSpecialty] = useState([])
    const fethListDoctor = async () => {

        const resDoctor = await getAllDoctor();
        setListDocTor(resDoctor.DT)
        const resClinic = await fetchAllClinic();
        setListClinic(resClinic.DT)
        const resSpecialty = await fetchSpecialty()
        setListSpecialty(resSpecialty.DT)
    }
    useEffect(() => {
        fethListDoctor()
    }, [])
    const setListData = (data, setter) => {


    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>


            </View>
            <ScrollView style={styles.body}>
                <ServiceScreen></ServiceScreen>
                <SpecialtySection
                    listSpecialty={listSpecialty}
                ></SpecialtySection>
                <ClinicSection
                    listClinic={listClinic}
                ></ClinicSection>
                <OutStandingSection
                    listDoctor={listDoctor}
                />
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