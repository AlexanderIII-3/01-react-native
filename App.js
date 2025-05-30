import * as Linking from 'expo-linking';

import { Provider } from 'react-redux';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import Layout from './component/navigation/Layout';
const App = () => {


    const linking = {
        prefixes: ['BookingCare://'],
        config: {
            screens: {
                Confirm: {
                    path: 'verifly-booking',
                    parse: {
                        token: (token) => `${token}`,
                        doctorId: (id) => `${id}`
                    }
                }
            }
        }
    };



    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer linking={linking}>


                    <ToastProvider>
                        <Layout></Layout>
                    </ToastProvider>



                </NavigationContainer>
            </PersistGate>
        </Provider>




        // <View>
        //     <Text> Hello Word </Text>
        //     <About></About>
        //     <Detail></Detail>
        // </View>
    )
}
export default App;