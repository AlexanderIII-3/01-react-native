import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../container/Header";
import ProfileDoctor from "./ProfileDoctor";
import DoctorClinic from "./DoctorClinic";
import { fetchDetailDoctor } from "../../../service/userService";
import DoctorShedule from "./DoctorShedule";
import { WebView } from 'react-native-webview';
import ExtraInforDoctor from "./ExtraInfoDoctor";

const DetailDoctor = ({ route }) => {
    const [profileDoctor, setProfileDoctor] = useState()
    const { doctorId } = route.params;
    const fetchProfileDoctor = async () => {
        const resDetail = await fetchDetailDoctor(doctorId)
        setProfileDoctor(resDetail.DT)
    }
    useEffect(() => {

        if (doctorId !== -1) {
            fetchProfileDoctor()

        }


    }, [doctorId])
    return (
        <View style={styles.container}>
            <Header></Header>
            <ScrollView>

                <ProfileDoctor profileDoctor={profileDoctor} ></ProfileDoctor>
                <DoctorShedule profileDoctor={profileDoctor} />
                <DoctorClinic profileDoctor={profileDoctor}></DoctorClinic>
                <ExtraInforDoctor

                    profileDoctor={profileDoctor}
                />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white", marginTop: 15 },
    mardowncontent: {
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#f9f9f9',


    },
    contentMardown: {
        marginHorizontal: 30,
        padding: 5,

    }

});

export default DetailDoctor;