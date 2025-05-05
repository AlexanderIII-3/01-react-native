import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    FlatList,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { fetchUserBookings } from "../../service/userService";
import { useSelector } from 'react-redux';

const Header = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("home");
    const [modalVisible, setModalVisible] = useState(false);
    const [todayBookings, setTodayBookings] = useState([]);
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleTabPress = (tab, route) => {
        setActiveTab(tab);
        navigation.navigate(route);
    };

    const handleNotificationPress = async () => {
        try {
            const res = await fetchUserBookings(userInfo.id);
            const bookings = res.DT;
            const today = new Date();
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
            console.log("Lịch hẹn:", bookings);
            const filtered = bookings.filter(booking => {
                const bookingDate = new Date(+booking.date).getTime();
                return bookingDate === todayStart;
            });

            setTodayBookings(filtered);
            setModalVisible(true); // mở modal
        } catch (err) {
            console.error("Lỗi khi lấy lịch hẹn:", err);
        }
    };

    const renderBookingItem = ({ item }) => {
        return (
            <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>🩺 {item?.doctorInfo?.lastName + " " + item?.doctorInfo?.firstName
                    || "Bác sĩ không rõ"}</Text>
                <Text style={styles.bookingText}>Số điện thoại: {item?.doctorInfo?.phoneNumber || "..."}</Text>
                <Text style={styles.bookingText}>Thời gian: {item?.timeBookingData?.valueVi}  {formatDate(+item.date)}</Text>
                <Text style={styles.bookingText}>Trạng thái: {item?.status.valueVi || "Đang xử lý"}</Text>
            </View>
        );
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <FontAwesome6
                        onPress={() => navigation.openDrawer()}
                        name="bars-staggered"
                        size={24}
                        color="black"
                    />
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logo}
                    />
                    <TouchableOpacity onPress={handleNotificationPress}>
                        <Ionicons name="notifications-outline" size={26} color="#49bce2" />
                        <Text style={styles.search}>Thông báo</Text>
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === "home" && styles.activeTab]}
                        onPress={() => handleTabPress("home", "home")}
                    >
                        <Text style={[styles.tabText, activeTab === "home" && styles.activeTabText]}>
                            Tất cả
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "history" && styles.activeTab]}
                        onPress={() => handleTabPress("history", "history")}
                    >
                        <Text style={[styles.tabText, activeTab === "history" && styles.activeTabText]}>
                            Lịch sử
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "health" && styles.activeTab]}
                        onPress={() => handleTabPress("health", "health")}
                    >
                        <Text style={[styles.tabText, activeTab === "health" && styles.activeTabText]}>
                            Sức khoẻ
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Modal danh sách thông báo */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>🔔 Lịch hẹn hôm nay</Text>

                            {todayBookings.length > 0 ? (
                                <FlatList
                                    data={todayBookings}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderBookingItem}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            ) : (
                                <Text style={{ textAlign: 'center', marginTop: 20 }}>Hôm nay không có lịch hẹn nào.</Text>
                            )}

                            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F9FA",
        paddingTop: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
    },
    logo: {
        width: 120,
        height: 60,
        resizeMode: "contain",
    },
    search: {
        color: "#888",
        fontSize: 12,
        textAlign: "center",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: "#EDEDED",
    },
    activeTab: {
        backgroundColor: "#FFD700",
    },
    tabText: {
        fontSize: 14,
        color: "#555",
    },
    activeTabText: {
        fontWeight: "bold",
        color: "#000",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '90%',
        maxHeight: '70%',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    bookingItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    bookingTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    bookingText: {
        fontSize: 14,
        color: '#444',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        marginTop: 20,
        padding: 10,
        borderRadius: 6,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Header;
