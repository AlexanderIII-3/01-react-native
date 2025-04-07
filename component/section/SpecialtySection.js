import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { section, } from "../../ultis/Const";



const SpecialtySection = (props) => {
    const { listSpecialty } = props
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
                data={listSpecialty}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }} // Thêm padding cho 2 bên
                renderItem={({ item }) => (
                    <View style={[styles.card, section.card]}>
                        <Image source={{ uri: item.image }} style={[styles.image, section.image]} />
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

export default SpecialtySection;