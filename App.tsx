import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
// import ProfileScreen from '../01-fe-react-native-todo/.expo/component/view/ProfileScreen'
import FontAwesome from '@expo/vector-icons/FontAwesome';
{/* <ProfileScreen></ProfileScreen> */ }
interface ITodo {
  id: number,
  name: string
}
export default function App() {

  const [todo, setTodo] = useState('')
  const [listTodo, setListTodo] = useState<ITodo[]>([])

  const handleAddTodo = () => {
    if (!todo) {

      Alert.alert('Đậu má ', 'Thiếu todo')
    } else {
      setListTodo([...listTodo, { id: Date.now(), name: todo }])
      setTodo('')

    }

  }
  const handlDeelete = (id: any) => {
    const newList = listTodo.filter((item => item.id !== id))
    setListTodo(newList)
  }
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerContent}>Todo List</Text>

        </View>
        <View style={styles.form}>
          <TextInput
            value={todo}
            onChangeText={(value) => setTodo(value)} style={styles.input} />
          <View style={styles.btn}>
            <Button
              onPress={() => { handleAddTodo() }}
              title='Add Todo' />

          </View>
        </View>
        <View style={styles.listTodo}>
          <FlatList
            data={listTodo}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => {

              return (

                <TouchableOpacity onPress={() => { handlDeelete(item.id) }}>


                  <View style={styles.decorTodo}>
                    <Text style={
                      styles.content}>
                      {item.name} </Text>

                    <FontAwesome style={styles.icon} name="trash-o" size={24} color="black" />
                  </View>

                </TouchableOpacity>
              )
            }}
          >



          </FlatList>
        </View>





      </View >
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 10,

  },

  header: {
    borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flex: 1

  },
  headerContent: {
    fontSize: 40,

  },
  form: {

  },
  btn: {
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 50
  },
  input: {
    borderBottomWidth: 1,
    margin: 20,
    fontSize: 25,
    marginBottom: 20
  },
  listTodo: {

    marginTop: 30,
    flex: 8

  },
  content: {
    color: 'pink',

    // marginTop: 10,

    fontSize: 20,


  },
  decorTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    borderStyle: 'dotted',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {

    marginRight: 20
  }

});
