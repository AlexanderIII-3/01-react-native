import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";


const OutStandingSection = (props) => {

    const [doctorInfo, setDoctorInfo] = useState()
    const navigation = useNavigation();


    const { listDoctor } = props

    const viewDetailDoctor = (item) => {
        console.log('check detaild dcotor', item.id)
        navigation.navigate('profiledoctor', { doctorId: item.id })


    }
    return (
        <ImageBackground
            source={require("../../assets/background5.png")}
            resizeMode="cover"
            style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Bác sĩ nổi bật</Text>
                <Text style={styles.seeMore}>Xem thêm</Text>
            </View>

            <FlatList
                data={listDoctor}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {

                        viewDetailDoctor(item)
                    }}>
                        <View

                            style={styles.card}>

                            <Image source={{ uri: item.image }}

                                style={styles.image} />
                            <Text style={styles.name}>{`${item.lastName}` + `${item.firstName}`}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {


        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "500",
    },
    seeMore: {
        color: "#0288D1",
        fontSize: 16,
    },
    card: {
        padding: 10,

        alignItems: "center",
        height: 150,
        marginRight: 15,
    },
    image: {
        width: 100,
        height: 90,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
    },
    name: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default OutStandingSection;