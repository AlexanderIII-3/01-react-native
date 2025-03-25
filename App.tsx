import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from '../01-fe-react-native-todo/.expo/component/view/ProfileScreen'
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Open up App.tsx to start working on your app!</Text>
      <View>
        {/* <ProfileScreen></ProfileScreen> */}

      </View>
      <Text>hololo mother fucker</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  },
  hello: {
    borderColor: 'green',
    color: 'pink'
  }
});
