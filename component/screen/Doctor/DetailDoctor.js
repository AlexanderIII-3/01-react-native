import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../container/Header";
import ProfileDoctor from "./ProfileDoctor";
import DoctorShedule from "./DoctorShedule";
import DoctorClinic from "./DoctorClinic";
import { fetchDetailDoctor } from "../../../service/userService";
const DetailDoctor = ({ route }) => {
    const [profileDoctor, setProfileDoctor] = useState()
    const { doctorId } = route.params;
    const fetchProfileDoctor = async () => {
        const resDetail = await fetchDetailDoctor(doctorId)
        setProfileDoctor(resDetail.DT)
    }
    useEffect(() => {

        fetchProfileDoctor()

    }, [])
    return (
        <View style={styles.container}>
            <Header></Header>
            <ScrollView>
                <ProfileDoctor profileDoctor={profileDoctor} ></ProfileDoctor>
                <DoctorShedule></DoctorShedule>
                <DoctorClinic profileDoctor={profileDoctor}></DoctorClinic>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white", marginTop: 15 },

});

export default DetailDoctor;