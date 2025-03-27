
import { View, Text, StyleSheet, Button } from "react-native"
import { globalStyles } from "../../ultis/Const";
import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const Detail = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'detail'>>();

    return (

        <View style={[styles.container]} >
            <Text style={[styles.content, globalStyles.globalFont]}>
                Heloo Detaik
            </Text>
            <View style={styles.btn}>

                <Button
                    onPress={() => { navigation.navigate('home') }}
                    title="To Home Page"></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,

    },
    content: {
        fontSize: 40

    },
    btn: {
        borderColor: 'pink',
        borderWidth: 1,
        borderRadius: 30
    }




})
export default Detail;
