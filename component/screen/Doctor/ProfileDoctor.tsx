import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Header from "../../container/Header";
import logo from '';
const ProfileDoctor = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'detail'>>();

    return (

        <View>

            <View style={styles.container}>


                <Image source={{ uri: "../../../assets/serviceScreen/icongoi-phau-thuat.png" }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>Thạc sĩ, Bác sĩ Phạm Thị Quỳnh</Text>
                    <Text style={styles.description}>Nguyên Trưởng khoa Sản, Bệnh viện E</Text>
                    <Text style={styles.location}>📍 Hà Nội</Text>
                </View>
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareText}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
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
});

export default ProfileDoctor;