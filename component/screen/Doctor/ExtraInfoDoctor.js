import { WebView } from 'react-native-webview';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fetchDetailDoctor } from "../../../service/userService";

const ExtraInforDoctor = (props) => {
    const { doctorId } = props
    const [profileDoctor, setProfileDoctor] = useState({})
    const fetchProfileDoctor = async (doctorId) => {
        const resDetail = await fetchDetailDoctor(doctorId)
        setProfileDoctor(resDetail?.DT)
    }

    useEffect(() => {

        fetchProfileDoctor(doctorId)
    }, [doctorId]);
    return (

        <View style={styles.markdownContent}>
            {profileDoctor?.MarkDown?.contentHtml ? (
                <WebView
                    style={styles.contentMardown}
                    originWhitelist={['*']}
                    source={{
                        html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>body { font-size: 16px; padding: 10px; color: #333; }</style>
                  </head>
                  <body>${profileDoctor.MarkDown.contentHtml}</body>
                </html>
              `,
                    }}
                />
            ) : (
                <Text style={{ padding: 10 }}>Không có nội dung</Text>
            )}
        </View>


    )


}
const styles = StyleSheet.create({
    container: { backgroundColor: "white", marginTop: 15 },
    markdownContent: {
        borderWidth: 1,
        borderColor: '#cccccc',


    },
    contentMardown: {
        padding: 5,
        height: 500, width: '100%',
        backgroundColor: '#f9f9f9',


    }

});
export default ExtraInforDoctor;


