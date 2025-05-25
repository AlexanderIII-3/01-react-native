import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActionSheetIOS,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { fetchProvinces, fetchSpecialtyById, fetDoctorSpecialty } from '../../../service/userService';
import ProfileDoctor from '../../screen/Doctor/ProfileDoctor';
import DoctorSchedule from '../../screen/Doctor/DoctorShedule';
import DoctorClinic from '../../screen/Doctor/DoctorClinic';

const DoctorApp = ({ route }) => {
    const [location, setLocation] = useState('Toàn quốc');
    const { specialtyId } = route.params;
    const [province, setProvince] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [detailSpecialty, setDetailSpecialty] = useState({});

    const fetchDoctorsBySpecialty = async (specialtyId, location) => {
        try {
            const router = {
                specialtyId: specialtyId,
                location: location,
            };
            const response = await fetDoctorSpecialty(router);
            if (response) {
                setDoctors(response.DT);
            } else {
                setDoctors([]);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchDetailSpecialtyById = async (specialtyId) => {
        let res = await fetchSpecialtyById(specialtyId);
        if (res && res.EC === 0) {
            setDetailSpecialty(res.DT);
        } else {
            setDetailSpecialty({});
        }
    };

    const fetchProvince = async () => {
        try {
            const res = await fetchProvinces();
            setProvince(res.DT);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    useEffect(() => {
        fetchDoctorsBySpecialty(specialtyId, 'ALL');
        fetchProvince();
        fetchDetailSpecialtyById(specialtyId);
    }, []);

    const showActionSheet = () => {
        const options = ['Toàn quốc', ...province.map(item => item.valueVi), 'Bỏ qua'];
        const cancelButtonIndex = options.length - 1;

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    setLocation('Toàn quốc');
                    fetchDoctorsBySpecialty(specialtyId, 'ALL');
                } else if (buttonIndex !== cancelButtonIndex) {
                    const selectedProvince = province[buttonIndex - 1];
                    setLocation(selectedProvince.valueVi);
                    fetchDoctorsBySpecialty(specialtyId, selectedProvince.keyMap);
                }
            }
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{detailSpecialty.name}</Text>

            <View style={styles.markdownContainer}>
                {detailSpecialty.descriptionHtml ? (
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            html: `
                            <html>
                            <head>
                                <style>
                                    body {
                                        margin: 0;
                                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                                        padding: 10px;
                                        color: #333;
                                        background-color: #fafafa;
                                    }
                                    p, li {
                                        line-height: 1.6;
                                        margin-bottom: 8px;
                                    }
                                    h1, h2, h3 {
                                        color: #2c3e50;
                                    }
                                    a {
                                        color: #2980b9;
                                        text-decoration: none;
                                    }
                                    a:hover {
                                        text-decoration: underline;
                                    }
                                </style>
                            </head>
                            <body>${detailSpecialty.descriptionHtml}</body>
                            </html>
                        `,
                        }}
                        style={styles.webview}
                        nestedScrollEnabled
                        showsVerticalScrollIndicator
                    />
                ) : (
                    <Text style={{ padding: 10 }}>Không có nội dung</Text>
                )}
            </View>

            <TouchableOpacity onPress={showActionSheet} style={styles.locationPicker}>
                <Text style={{ fontSize: 15 }}>
                    {location} <Ionicons name="location" size={14} color="#555" />
                </Text>
            </TouchableOpacity>

            {doctors && doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <View style={styles.card} key={doctor.id}>
                        <ProfileDoctor doctorId={doctor.doctorId} />
                        <DoctorSchedule doctorId={doctor.doctorId} />
                        <DoctorClinic doctorId={doctor.doctorId} />
                    </View>
                ))
            ) : (
                <Text style={{ marginTop: 12 }}>Không tìm thấy bác sĩ nào</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    markdownContainer: {
        height: 250,
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    webview: {
        flex: 1,
    },
    locationPicker: {
        marginTop: 16,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        width: 160,
        alignItems: 'center',
    },
    card: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
});

export default DoctorApp;
