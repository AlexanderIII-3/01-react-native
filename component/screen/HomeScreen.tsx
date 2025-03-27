import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Dữ liệu mẫu
const categories = [
    { id: "1", name: "Khám chuyên khoa", icon: "medical-outline" },
    { id: "2", name: "Bác sĩ", icon: "person-outline" },
    { id: "3", name: "Cơ sở y tế", icon: "business-outline" },
    { id: "4", name: "Gói khám", icon: "medkit-outline" },
];

const doctors = [
    {
        id: "1",
        name: "BS. Nguyễn Văn A",
        specialty: "Tim mạch",
        image: "https://via.placeholder.com/100",
    },
    {
        id: "2",
        name: "BS. Trần Thị B",
        specialty: "Nhi khoa",
        image: "https://via.placeholder.com/100",
    },
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput placeholder="Tìm kiếm bác sĩ, bệnh viện..." style={styles.searchInput} />
            </View>

            {/* Danh mục dịch vụ */}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryItem}>
                        {/* <Ionicons name={item.icon} size={30} color="#007BFF" /> */}
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Danh sách bác sĩ */}
            <Text style={styles.sectionTitle}>Bác sĩ nổi bật</Text>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.doctorCard}>
                        <Image source={{ uri: item.image }} style={styles.doctorImage} />
                        <View>
                            <Text style={styles.doctorName}>{item.name}</Text>
                            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookText}>Đặt lịch</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    searchContainer: { flexDirection: "row", backgroundColor: "#f1f1f1", borderRadius: 8, padding: 10, alignItems: "center" },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1 },
    categoryItem: { alignItems: "center", marginRight: 16 },
    categoryText: { marginTop: 5, fontSize: 12, color: "#333" },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    doctorCard: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#f9f9f9", borderRadius: 8, marginBottom: 10 },
    doctorImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
    doctorName: { fontSize: 16, fontWeight: "bold" },
    doctorSpecialty: { color: "#666" },
    bookButton: { marginLeft: "auto", backgroundColor: "#007BFF", padding: 8, borderRadius: 5 },
    bookText: { color: "#fff", fontSize: 12 },
});

export default HomeScreen;