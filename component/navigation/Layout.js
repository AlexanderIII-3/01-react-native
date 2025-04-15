import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import DetailDoctor from '../screen/Doctor/DetailDoctor';
import 'react-native-gesture-handler';
import DoctorClinic from '../screen/Doctor/DoctorClinic';
import Header from '../container/Header';
import ManageDoctor from '../admin/doctor/ManageDoctor';
import ManageUser from '../admin/user/ManageUser';
import BookingScreen from '../screen/Doctor/booking/BookingScreen';
import Login from '../screen/auth/Login';
const Stack = createNativeStackNavigator()

const HomeLayOut = () => {

    return (
        <Stack.Navigator>

            {/* <Stack.Screen
                component={Login}
                name='login'

            >



            </Stack.Screen> */}
            <Stack.Screen
                component={HomeScreen}
                options={{ header: () => <Header></Header> }} name="home" />

            <Stack.Screen
                options={{ headerShown: false }}
                name="profiledoctor" component={DetailDoctor} />
            <Stack.Screen
                options={{ header: () => <Header></Header> }}
                name="booking" component={BookingScreen} />


        </Stack.Navigator>
    )

}

const Layout = () => {
    const Drawer = createDrawerNavigator()

    const role = "USER";


    return (
        <>

            <Drawer.Navigator



                screenOptions={{
                    drawerStyle: {
                        backgroundColor: 'white',
                        width: 250,
                    },
                    drawerItemStyle: {

                        borderColor: 'black',
                        marginBottom: 20,
                        opacity: 0.6,
                    },
                    drawerLabelStyle: {
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Georgia',
                    },


                }}>

                <Drawer.Screen



                    options={{ headerShown: false }}
                    name='home'

                    component={HomeLayOut}>


                </Drawer.Screen>






            </Drawer.Navigator>
        </>
    )
}
export default Layout;