import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Detail from "./component/review/Detail";
import About from "./component/review/ServiceScreen";
import { OPENSANS_REGULAR } from "./ultis/Const";

import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./component/screen/HomeScreen";
import Header from './component/container/Header';
import ProfileDoctor from './component/screen/Doctor/ProfileDoctor';
import DetailDoctor from './component/screen/Doctor/DetailDoctor'

const App = () => {




    const Stack = createNativeStackNavigator<RootStackParamList>()


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    component={HomeScreen}
                    options={{ headerShown: false }} name="home" />

                <Stack.Screen
                    options={{ headerShown: false }}
                    name="profiledoctor" component={DetailDoctor} />
                {/* <Stack.Screen name="header" component={Header} />
                <Stack.Screen name="header" component={Header} /> */}


            </Stack.Navigator>

        </NavigationContainer>




        // <View>
        //     <Text> Hello Word </Text>
        //     <About></About>
        //     <Detail></Detail>
        // </View>
    )
}
export default App;