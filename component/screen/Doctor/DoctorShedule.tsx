import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
const timeSlots = ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00"];
import SelectDropdown from "react-native-select-dropdown";

const DoctorShedule = () => {



    const emojisWithIcons = [
        { value: 'S1', lable: 'Thứ 2/ 21/3' },
        { value: 'S2', lable: 'Thứ 3/ 22/3' },
        { value: 'S3', lable: 'Thứ 4/ 23/3' },
        { value: 'S4', lable: 'Thứ 5/ 24/3' },

    ];
    const [selected, setSelected] = useState("");

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <SelectDropdown
                    data={emojisWithIcons}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>

                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {selectedItem && selectedItem.lable ? selectedItem.lable : 'Chọn ngày:'}
                                </Text>

                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>


                                <Text style={styles.dropdownItemTxtStyle}>{item.lable}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>
            <View style={{ flex: 9 }}>

                <Text style={styles.title}>🗓️ LỊCH KHÁM</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                    {timeSlots.map((slot, index) => (
                        <TouchableOpacity key={index} style={styles.slot}>
                            <Text style={styles.slotText}>{slot}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: "white", marginTop: 10 },
    title: { marginTop: 20, fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    scrollView: { flexDirection: "row" },
    slot: { backgroundColor: "#f0f0f0", padding: 10, marginRight: 10, borderRadius: 5 },
    slotText: { color: "black" },
    dropdownButtonStyle: {
        width: 120,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 12,

    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',

        color: '#49bce2'
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontWeight: '600',
        fontSize: 15,

        borderBottomWidth: 0.5,

        color: '#49bce2'
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default DoctorShedule;