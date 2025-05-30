import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    FlatList,
    Pressable,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fetchUserBookings, cancelBooking } from "../../service/userService";

const Header = () => {
    // State management
    const navigation = useNavigation();
    const route = useRoute();
    const [activeTab, setActiveTab] = useState(route.name);
    const [modalVisible, setModalVisible] = useState(false);
    const [todayBookings, setTodayBookings] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cancellingId, setCancellingId] = useState(null);
    const userInfo = useSelector((state) => state.user.userInfo);

    // Load booking data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchUserBookings(userInfo.id);
                const bookings = res.DT || [];

                const today = new Date();
                const todayStart = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                ).getTime();

                const filtered = bookings.filter(booking => {
                    const bookingDate = new Date(+booking.date).getTime();
                    return bookingDate === todayStart;
                });

                setTodayBookings(filtered);
                setUnreadCount(filtered.length);
            } catch (err) {
                console.error("Lỗi khi lấy lịch hẹn:", err);
                Alert.alert("Lỗi", "Không thể tải danh sách lịch hẹn");
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, [navigation, userInfo.id]);

    // Cancel booking function
    const handleCancelBooking = async (bookingId, currentStatus) => {
        console.log('Booking ID:', bookingId); // Debug booking ID
        if (currentStatus !== 'S2') {
            Alert.alert("Thông báo", "Chỉ có thể hủy lịch ở trạng thái Đã xác nhận");
            return;
        }

        Alert.alert(
            "Xác nhận hủy lịch",
            "Bạn chắc chắn muốn hủy lịch hẹn này?",
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: async () => {
                        try {
                            setCancellingId(bookingId);
                            const res = await cancelBooking(bookingId);

                            if (res.EC === 0) {
                                setTodayBookings(prev =>
                                    prev.filter(booking => booking.id !== bookingId)
                                );
                            } else {

                                Alert.alert(
                                    "Không thể hủy",
                                    res.EM || `Lỗi mã ${res.EC}: Không thể hủy lịch hẹn`,
                                    [{ text: "Đã hiểu" }]
                                );
                            }
                        } catch (error) {
                            // Xử lý lỗi network hoặc lỗi hệ thống
                            Alert.alert(
                                "Lỗi hệ thống",
                                error.response?.data?.message ||
                                "Không thể kết nối đến server. Vui lòng thử lại sau",
                                [{ text: "OK", onPress: () => reloadData() }] // Thêm tùy chọn thử lại
                            );
                        } finally {
                            setCancellingId(null);
                        }
                    }
                }
            ]
        );
    };

    // Render each booking item
    const renderBookingItem = ({ item }) => {

        const isCancellable = item.statusId === 'S2' || item.status.valueVi === 'Đã xác nhận';
        const isCancelling = cancellingId === item.id;

        return (
            <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>
                    🩺 {item?.doctorInfo?.lastName} {item?.doctorInfo?.firstName || 'Bác sĩ'}
                </Text>
                <Text style={styles.bookingText}>
                    Thời gian: {item.timeBookingData?.valueVi} - {new Date(+item.date).toLocaleDateString('vi-VN')}
                </Text>
                <Text style={[
                    styles.bookingText,
                    item.statusId === 'S2' && styles.confirmedStatus,
                ]}>
                    Trạng thái: {item.status.valueVi}
                </Text>

                <TouchableOpacity
                    style={[
                        styles.cancelButton,
                        (isCancelling || !isCancellable) && styles.disabledButton
                    ]}
                    onPress={() => handleCancelBooking(item.id, item.statusId)}
                    disabled={isCancelling || !isCancellable}
                >

                    <Text style={styles.cancelButtonText}>
                        {isCancellable ? 'Hủy lịch' : 'Không thể hủy'}
                    </Text>

                </TouchableOpacity>
            </View>
        );
    };

    // Handle tab press
    const handleTabPress = (routeName) => {
        if (activeTab !== routeName) {
            setActiveTab(routeName);
            navigation.navigate(routeName);
        }
    };

    // Handle notification press
    const handleNotificationPress = () => {
        setModalVisible(true);
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
                        style={styles.menuIcon}
                    />

                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logo}
                    />

                    <TouchableOpacity
                        onPress={handleNotificationPress}
                        style={styles.notificationButton}
                    >
                        <View style={styles.notificationIconContainer}>
                            <Ionicons
                                name="notifications-outline"
                                size={26}
                                color="#49bce2"
                            />
                            {unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.search}>Thông báo</Text>
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === "home" && styles.activeTab]}
                        onPress={() => handleTabPress("home")}
                    >
                        <Text style={[styles.tabText, activeTab === "home" && styles.activeTabText]}>
                            Tất cả
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "history" && styles.activeTab]}
                        onPress={() => handleTabPress("history")}
                    >
                        <Text style={[styles.tabText, activeTab === "history" && styles.activeTabText]}>
                            Lịch sử
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "health" && styles.activeTab]}
                        onPress={() => handleTabPress("health")}
                    >
                        <Text style={[styles.tabText, activeTab === "health" && styles.activeTabText]}>
                            Sức khoẻ
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Booking List Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>🔔 Lịch hẹn hôm nay</Text>

                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#49bce2" />
                                </View>
                            ) : todayBookings.length > 0 ? (
                                <FlatList
                                    data={todayBookings}
                                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                                    renderItem={renderBookingItem}
                                    contentContainerStyle={styles.bookingList}
                                />
                            ) : (
                                <View style={styles.emptyContainer}>
                                    <Ionicons name="calendar-outline" size={50} color="#ccc" />
                                    <Text style={styles.emptyText}>Hôm nay không có lịch hẹn nào</Text>
                                </View>
                            )}

                            <Pressable
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
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
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    menuIcon: {
        padding: 8,
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
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: '#fff',
        paddingVertical: 8,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 20,
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
        fontWeight: '500',
    },
    activeTabText: {
        fontWeight: "bold",
        color: "#000",
    },
    notificationButton: {
        alignItems: 'center',
    },
    notificationIconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '90%',
        maxHeight: '80%',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    bookingList: {
        paddingBottom: 20,
    },
    bookingItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    bookingTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
    },
    bookingText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    statusText: {
        marginTop: 6,
        fontWeight: '500',
    },
    confirmedStatus: {
        color: '#34C759',
    },
    canceledStatus: {
        color: '#FF3B30',
    },
    cancelButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 6,
        alignSelf: 'flex-start',
        minWidth: 80,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#FF968E',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    loadingContainer: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 15,
        color: '#888',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#49bce2',
        marginTop: 20,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Header;