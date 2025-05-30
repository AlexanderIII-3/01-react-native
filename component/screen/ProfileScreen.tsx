import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                <Text style={{ fontSize: 16 }}>12:39</Text>
                <View style={{ flexDirection: "row" }}>
                    <Ionicons name="notifications-outline" size={24} />
                    <MaterialCommunityIcons name="dots-horizontal" size={24} />
                </View>
            </View>

            {/* Profile Info */}
            <View style={{ alignItems: "center", padding: 10 }}>
                <View style={{ position: "relative" }}>
                    <Image source={require("../../../assets/adaptive-icon.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />

                    <TouchableOpacity style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#00f", borderRadius: 50, padding: 5 }}>
                        <Ionicons name="camera" size={16} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Anh The</Text>
                <Text>@the_anh267</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
                    <Text>3.997 Đã follow </Text>
                    <Text>97 Follower </Text>
                    <Text>323 Thích</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: "#eee", padding: 5, borderRadius: 5 }}>
                    <Text>+ Thêm tiểu sử</Text>
                </TouchableOpacity>
            </View>

            {/* Uploaded Videos */}
            <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>Video đã tải lên</Text>
            <ScrollView>
                <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5 }}>
                    <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: "32%", height: 120, margin: 2 }} />
                    <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: "32%", height: 120, margin: 2 }} />
                    <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: "32%", height: 120, margin: 2 }} />
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10, borderTopWidth: 1 }}>
                <Ionicons name="home-outline" size={24} />
                <Ionicons name="cart-outline" size={24} />
                <Ionicons name="add-circle-outline" size={24} />
                <Ionicons name="chatbubble-outline" size={24} />
                <Ionicons name="person" size={24} color="black" />
            </View>
        </View>
    );
};

export default ProfileScreen;
