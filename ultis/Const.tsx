import { StyleSheet } from "react-native"

export const OPENSANS_REGULAR = 'OpenSans-Regular'

export const globalStyles = StyleSheet.create({
    globalFont: {
        fontFamily: OPENSANS_REGULAR,
        color: 'pink'
    }

})
export const section = StyleSheet.create({
    container: {
        marginTop: 50,
        // borderBlockColor: 'red',
        // borderWidth: 1,
        padding: 20
    },
    card: {
        width: 170,
        height: 140,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: '#f1f1f1',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15, // Khoảng cách giữa các thẻ
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        paddingHorizontal: 8, // Thêm padding nếu cần
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        // padding: 20
    },
    more: {
        fontSize: 14,
        color: "#4A90E2",
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: "500",
    },


})
export const pathImage = '../../assets/serviceScreen/'