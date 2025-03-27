import { Alert, Button, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FlexBox = () => {

    return (


        <View style={styles.container}>
            <Text> Helooo</Text>

            <View  >
                <Text>
                    item1
                </Text>

            </View>
            <View>
                <Text>
                    item2
                </Text>

            </View>
            <View>
                <Text>
                    item3
                </Text>

            </View>
            <View>
                <Text>
                    item4
                </Text>

            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {

        marginTop: 40
    }

})
export default FlexBox