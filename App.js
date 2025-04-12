import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Detail from "./component/review/Detail";
import About from "./component/review/ServiceScreen";
import { OPENSANS_REGULAR } from "./ultis/Const";

import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';

import Layout from './component/navigation/Layout';
const App = () => {






    return (
        <NavigationContainer>
            <ToastProvider>
                <Layout></Layout>
            </ToastProvider>

        </NavigationContainer>




        // <View>
        //     <Text> Hello Word </Text>
        //     <About></About>
        //     <Detail></Detail>
        // </View>
    )
}
export default App;