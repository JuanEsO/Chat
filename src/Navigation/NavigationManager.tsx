import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '../Screens/ChatList';
import ChatScreen from '../Screens/Chat';
import AntDesingIcon from 'react-native-vector-icons/AntDesign';

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
          headerRight: () => (
            <AntDesingIcon
              name="pluscircleo"
              size={30}
              color="white"
              style={{marginRight: 10}}
            />
          ),
        }
      } />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
