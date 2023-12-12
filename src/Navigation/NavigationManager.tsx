import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '../Screens/ChatList';
import ChatScreen from '../Screens/Chat';
import AntDesingIcon from 'react-native-vector-icons/AntDesign';
import { Image, TouchableOpacity } from 'react-native';
import { signOut } from '../Services/UserService/User';

const Stack = createNativeStackNavigator();

export function NavigationManager() {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerStyle: {backgroundColor: '#A594F9'},
      }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={
        {
          headerLeft: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Image source={require('../../assets/logoutIcon.png')} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
