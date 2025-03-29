import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const doctors = [
    {
        id: "1",
        name: "Thạc sĩ, Bác sĩ Phạm Thị Quỳnh",
        image: require("../../assets/serviceScreen/iconkham-tu-xa.png"), // Thay bằng ảnh thực tế
    },
    {
        id: "2",
        name: "Bác sĩ Chuyên khoa II Lê Nhật Vinh",
        image: require("../../assets/serviceScreen/iconkham-tu-xa.png"),
    },
    {
        id: "3",
        name: "Bác sĩ Phạm Văn An",
        image: require("../../assets/serviceScreen/iconkham-tu-xa.png"),
    },
];

const OutStandingSection = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'profiledoctor'>>();
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
                data={doctors}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate('profiledoctor') }}>
                        <View

                            style={styles.card}>

                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
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