import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../container/Header";
import ProfileDoctor from "./ProfileDoctor";
import DoctorClinic from "./DoctorClinic";
import DoctorShedule from "./DoctorShedule";
import { WebView } from 'react-native-webview';
import ExtraInforDoctor from "./ExtraInfoDoctor";
import { useDispatch } from "react-redux";
import { getDoctorInfo } from '../../../redux/slices/doctorReducer'
const DetailDoctor = ({ route }) => {




    const { doctorId } = route.params;



    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={{ flex: 1 }} // ✅ Cho ScrollView cuộn toàn bộ màn hình
                contentContainerStyle={{ flexGrow: 1 }} // ✅ Đảm bảo nội dung "nở" ra hết
            >
                <ProfileDoctor doctorId={doctorId} />
                <DoctorShedule doctorId={doctorId} />
                <DoctorClinic doctorId={doctorId} />
                <ExtraInforDoctor doctorId={doctorId} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: 15,
        flex: 1, // ✅ Cho View cha ăn hết màn hình
    },
    markdownContent: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
    },
    contentMardown: {
        width: '100%',
        height: 500,
        backgroundColor: '#f9f9f9',
    },
});



export default DetailDoctor;