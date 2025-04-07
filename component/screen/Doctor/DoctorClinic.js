import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DoctorClinic = (props) => {
    const { profileDoctor } = props
    const [detailClinic, setDetailClinic] = useState()

    const [showPrice, setShowPrice] = useState(false)

    useEffect(() => {
        if (profileDoctor) {
            setDetailClinic(profileDoctor?.Doctor_Infor)

        }

    }, [profileDoctor])
    return (


        < View style={styles.container} >



            <Text style={styles.title}>📍 ĐỊA CHỈ KHÁM</Text>
            <Text style={styles.clinicName}>{detailClinic?.nameClinic}</Text>
            <Text style={styles.address}>
                {detailClinic?.addressClinic}
            </Text>

            {
                showPrice === false ?

                    <View style={styles.contentShow}>
                        <Text style={styles.price}>💰 GIÁ KHÁM: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailClinic?.priceTypeData?.valueVi)
                        }  </Text>
                        <TouchableOpacity>
                            <Text onPress={() => setShowPrice(true)} style={styles.detail}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.contentHide}>
                        <Text style={styles.price}>Giá khám:</Text>
                        <View style={styles.contentTop} >

                            <View style={styles.priceH}>
                                <Text style={styles.priceDetail}>Giá khám</Text>
                                <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailClinic?.priceTypeData?.valueVi)
                                } </Text>

                            </View>
                            <Text style={styles.exeption}>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm.</Text>

                        </View>
                        <View style={styles.contentBot} >

                            <Text style={styles.priceDetail}>Bệnh viện có thanh toán bằng hình thức: {detailClinic?.paymentTypeData?.valueVi} </Text>




                        </View>

                        <Text onPress={() => { setShowPrice(!showPrice) }} style={styles.hidePrice}>Ẩn bảng giá</Text>

                    </View>

            }



        </View >
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: "white", marginTop: 10, flex: 1 },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    clinicName: { fontSize: 14, fontWeight: "bold", color: "#007bff" },
    address: { fontSize: 14, color: "gray", marginTop: 5 },
    price: { fontSize: 14, fontWeight: "bold" },
    priceH: { flexDirection: 'row', justifyContent: 'space-between' },
    detail: { color: '#45c3d2' },
    contentShow: { flexDirection: 'row' },
    contentHide: {},
    priceDetail: { fontSize: 16 },
    contentTop: { padding: 8, borderWidth: 0.2, borderColor: '#dddddd', backgroundColor: '#f8f8f8' },
    contentBot: { padding: 8, borderWidth: 0.2, borderColor: '#dddddd', backgroundColor: '#eee' },
    exeption: { fontSize: 11 },
    hidePrice: { fontSize: 10, marginLeft: 325, marginTop: 5, color: '#45c3d2' }
});

export default DoctorClinic;