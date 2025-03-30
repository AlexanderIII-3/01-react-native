import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../container/Header";
import ProfileDoctor from "./ProfileDoctor";
import DoctorShedule from "./DoctorShedule";
import DoctorClinic from "./DoctorClinic";

const DetailDoctor = () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <ScrollView>
                <ProfileDoctor></ProfileDoctor>
                <DoctorShedule></DoctorShedule>
                <DoctorClinic></DoctorClinic>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white", marginTop: 15 },

});

export default DetailDoctor;