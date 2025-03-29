import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const timeSlots = ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00"];

const DoctorShedule = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🗓️ LỊCH KHÁM</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {timeSlots.map((slot, index) => (
                    <TouchableOpacity key={index} style={styles.slot}>
                        <Text style={styles.slotText}>{slot}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: "white", marginTop: 10 },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    scrollView: { flexDirection: "row" },
    slot: { backgroundColor: "#f0f0f0", padding: 10, marginRight: 10, borderRadius: 5 },
    slotText: { color: "black" },
});

export default DoctorShedule;