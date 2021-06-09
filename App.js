import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';


const Stack = createStackNavigator()

const globalScreenOptions={
  headerStyle:{backgroundColor:'#2C6BED'},
  headerTitleStyle:{color:'white'},
  headerTintColor:'#fff'
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen  name='Login' component={Login}/>
      <Stack.Screen  name='Register' component={Register}/>
      <Stack.Screen  name='Home' component={Home}/>
      <Stack.Screen  name='AddChat' component={AddChat}/>
      <Stack.Screen  name='Chat' component={ChatScreen}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
