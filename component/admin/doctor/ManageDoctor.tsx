import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import Markdown from 'react-native-markdown-display';

import { WebView } from 'react-native-webview';

const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
];

const DoctorInfoScreen = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [clinicName, setClinicName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [markdownText, setMarkdownText] = useState('');


    const setOnchangeText = (text: any) => {
        setMarkdownText(text)
        console.log('check tex', markdownText)

    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>TẠO THÊM THÔNG TIN BÁC SĨ</Text>

            <Text>Chọn Bác Sĩ:</Text>
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choose a doctor"

                style={styles.dropdown}
                value={selectedDoctor}
                onChange={item => setSelectedDoctor(item.value)}
            />

            <Text>Chọn Giá:</Text>
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choose Price"
                style={styles.dropdown}
                value={selectedPrice}
                onChange={item => setSelectedPrice(item.value)}
            />

            <Text>Chọn Phương Thức Thanh Toán:</Text>
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choose method payment"
                style={styles.dropdown}
                value={selectedPayment}
                onChange={item => setSelectedPayment(item.value)}
            />

            <Text>Chọn Tỉnh:</Text>
            <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choose province"
                style={styles.dropdown}
                value={selectedProvince}
                onChange={item => setSelectedProvince(item.value)}
            />

            <Text>Chọn Phòng Khám:</Text>
            <TextInput placeholder="Nhập tên phòng khám" style={styles.input} />

            <Text>Chọn Địa Chỉ Phòng Khám:</Text>
            <TextInput placeholder="Nhập địa chỉ phòng khám" style={styles.input} />

            <Text>Ghi Chú:</Text>
            <TextInput placeholder="Nhập ghi chú" style={styles.input} />
            <Button mode="contained" style={styles.button}>Lưu Thông Tin</Button>
            <ScrollView>
                <TextInput
                    style={styles.markdownInput}
                    multiline
                    placeholder="Nhập thông tin giới thiệu bằng Markdown..."
                    value={markdownText}
                    onChangeText={setMarkdownText}
                />

                <Text style={styles.previewTitle}>Xem trước HTML:</Text>
                <WebView
                    style={styles.webview}
                    originWhitelist={['*']}
                    source={{ html: markdownText }}
                />


            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    dropdown: {
        marginBottom: 10,
        borderWidth: 0.7,
        opacity: 0.7,
        padding: 15,
        borderRadius: 10,
        marginTop: 5

    },
    input: {
        borderWidth: 1,

        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        marginTop: 5
    },
    button: {
        marginTop: 20,
    },
    markdownPreview: {
        borderWidth: 1,
        padding: 8,
        minHeight: 100,
        flex: 3
    },
    markdownInput: {
        borderWidth: 0.7,
        padding: 8,
        marginBottom: 10,
        minHeight: 100,
        textAlignVertical: 'top',

    },
    previewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    webview: {
        height: 200,
        borderWidth: 1,
    },
});

export default DoctorInfoScreen;
