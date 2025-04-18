import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { getScheduleDoctorByDate } from "../../../service/userService";
import { Toast } from "react-native-toast-notifications";
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getListTimeBooking } from '../../../redux/slices/doctorReducer'
const DoctorSchedule = ({ profileDoctor }) => {
    const toast = useToast();
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [date, setDate] = useState(null);
    const [allDay, setAllDay] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [listTime, setListTime] = useState([]);

    useEffect(() => {
        const allDays = buildAllDays();
        setAllDay(allDays);

        if (profileDoctor?.id) {
            setDoctorId(profileDoctor.id);
        }
    }, [profileDoctor]);

    useEffect(() => {
        if (doctorId && date) {
            fetchSchedule(doctorId, date);
        }
    }, [doctorId, date]);

    const buildAllDays = () => {
        let days = [];
        moment.locale("vi");

        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, "days");
            const label = i === 0
                ? `Hôm nay - ${date.format("DD/MM")}`
                : date.format("dddd - DD/MM").replace(/^./, str => str.toUpperCase());

            days.push({ label, value: date.startOf("day").valueOf() });
        }

        return days;
    };

    const fetchSchedule = async (doctorId, selectedDate) => {
        const res = await getScheduleDoctorByDate(doctorId, selectedDate);
        dispatch(getListTimeBooking(res.DT))

        if (res?.EC === 0) {
            const dataTime = res.DT.map(item => ({
                label: item.timeTypeData?.valueVi,
                value: item.timeType,
            }));

            setListTime(dataTime);
        } else {
            setListTime([]);
            toast.error('erro')
        }
    };

    const handleDateChange = (item) => {
        if (item?.value) {
            setDate(item.value);
        }
    };
    const handleBooking = (item) => {
        navigation.navigate('booking', { timeType: { item }, bookingDate: date })


    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <SelectDropdown
                    data={allDay}
                    onSelect={handleDateChange}
                    renderButton={(selectedItem) => (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {selectedItem?.label || "Chọn ngày:"}
                            </Text>
                        </View>
                    )}
                    renderItem={(item, index, isSelected) => (
                        <View style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && { backgroundColor: '#D2D9DF' })
                        }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>

            <View style={{ flex: 9 }}>
                <Text style={styles.title}>🗓️ LỊCH KHÁM</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                    {listTime.length > 0 ? (
                        listTime.map((slot, index) => (
                            <TouchableOpacity key={index} style={styles.slot}>
                                <Text onPress={() => { handleBooking(slot) }} style={styles.slotText}>{slot.label}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>Không có lịch khám nào</Text>
                    )}
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
        fontSize: 11,
        fontWeight: '500',
        color: '#49bce2'
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
        fontSize: 10,
        borderBottomWidth: 0.5,
        color: '#49bce2'
    },
});

export default DoctorSchedule;
