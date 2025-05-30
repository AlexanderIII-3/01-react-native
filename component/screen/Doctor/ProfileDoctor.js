import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { fetchDetailDoctor } from "../../../service/userService";

import Ionicons from '@expo/vector-icons/Ionicons';
const ProfileDoctor = (props) => {
    const [detailClinic, setDetailClinic] = useState()
    const [profileDoctor, setProfileDoctor] = useState([])
    const { doctorId } = props;

    const fetchProfileDoctor = async (doctorId) => {
        const resDetail = await fetchDetailDoctor(doctorId)
        setProfileDoctor(resDetail.DT)
    }

    useEffect(() => {
        fetchProfileDoctor(doctorId);

    }, [doctorId]);
    return (

        <View>
            {profileDoctor && profileDoctor?.Doctor_Infor &&
                <View style={styles.container}>


                    <Image source={{ uri: profileDoctor?.image }} style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{profileDoctor?.positionData?.valueVi} ,{`${profileDoctor?.firstName} ` + `${profileDoctor?.lastName}`}</Text>

                        <View style={styles.detail}>
                            <Text style={styles.description}>{profileDoctor?.Doctor_Infor.note}</Text>
                            <Text style={styles.location}>  <Ionicons name="location" size={14} color="black" /> {profileDoctor?.Doctor_Infor.provinceTypeData.valueVi
                            }</Text>

                        </View>

                    </View>
                    {/* <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareText}>Chia sẻ</Text>
                    </TouchableOpacity> */}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: "row", padding: 15, backgroundColor: "white", alignItems: "center" },
    image: { width: 70, height: 70, borderRadius: 35 },
    info: { flex: 1, marginLeft: 10 },
    name: { fontSize: 16, fontWeight: "bold" },
    description: { fontSize: 14, color: "gray" },
    location: { fontSize: 14, color: "black", marginTop: 5 },
    shareButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5 },
    shareText: { color: "white", fontWeight: "bold" },
    detail: { marginTop: 3, justifyContent: 'center', marginLeft: 10 }
});

export default ProfileDoctor;