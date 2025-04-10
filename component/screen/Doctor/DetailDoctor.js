import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../container/Header";
import ProfileDoctor from "./ProfileDoctor";
import DoctorClinic from "./DoctorClinic";
import { fetchDetailDoctor } from "../../../service/userService";
import DoctorShedule from "./DoctorShedule";
import { WebView } from 'react-native-webview';

const DetailDoctor = ({ route }) => {
    const [profileDoctor, setProfileDoctor] = useState()
    const { doctorId } = route.params;
    const fetchProfileDoctor = async () => {
        const resDetail = await fetchDetailDoctor(doctorId)
        setProfileDoctor(resDetail.DT)
    }
    useEffect(() => {
        console.log('check htl content', profileDoctor?.MarkDown?.contentHtml)
        fetchProfileDoctor()

    }, [])
    return (
        <View style={styles.container}>
            <Header></Header>
            <ScrollView>

                <ProfileDoctor profileDoctor={profileDoctor} ></ProfileDoctor>
                <DoctorShedule></DoctorShedule>
                <DoctorClinic profileDoctor={profileDoctor}></DoctorClinic>
                <View style={styles.markdownContent}>
                    {profileDoctor?.MarkDown?.contentHtml ? (
                        <WebView
                            originWhitelist={['*']}
                            source={{
                                html: `
                                            <html>
                                                <head>
                                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                <style>
                                                    body { font-size: 16px; padding: 10px; color: #333; }
                                                </style>
                                                </head>
                                                <body>${profileDoctor.MarkDown.contentHtml}</body>
                                            </html>
                                            `,
                            }}
                            style={{ height: 500, width: '100%' }}
                        />
                    ) : (
                        <Text style={{ padding: 10 }}>Không có nội dung</Text>
                    )}
                </View>

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