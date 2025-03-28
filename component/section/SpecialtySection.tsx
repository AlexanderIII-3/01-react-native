import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { section, } from "../../ultis/Const";

const specialties = [
    { id: "1", name: "Cơ Xương Khớp", image: require("../../assets/serviceScreen/iconkham-chuyen-khoa.png") },
    { id: "2", name: "Thần kinh", image: require("../../assets/serviceScreen/iconkham-tu-xa.png") },
    { id: "3", name: "Thần kinh", image: require("../../assets/serviceScreen/iconkham-tu-xa.png") },
    { id: "4", name: "Thần kinh", image: require("../../assets/serviceScreen/iconkham-tu-xa.png") },
    // Thêm chuyên khoa khác nếu cần
];

const ClinicSection = () => {
    return (
        <View style={[styles.container, section.container]}>
            {/* Tiêu đề và "Xem thêm" */}
            <View style={[styles.header, section.header]}>
                <Text style={[styles.title, section.title]}>Chuyên khoa</Text>
                <TouchableOpacity>
                    <Text style={[styles.more, section.more]}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách chuyên khoa */}
            <FlatList
                data={specialties}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }} // Thêm padding cho 2 bên
                renderItem={({ item }) => (
                    <View style={[styles.card, section.card]}>
                        <Image source={item.image} style={[styles.image, section.image]} />
                        <Text style={[styles.cardText, section.cardText]}>{[item.name]}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    card: {

    },

    container: {

    },
    header: {

    },
    title: {

    },
    more: {

    },
    image: {

    },
    cardText: {

    },
});

export default ClinicSection;