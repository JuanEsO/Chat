import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import ChatListItem from '../../Components/ChatListItem';

interface Chat {
  id: string;
  name: string;
  message: string;
}

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation();
  const chats: Chat[] = [
    {id: '1', name: 'John', message: 'Hello'},
    {id: '2', name: 'Jane', message: 'Hi'},
    {id: '3', name: 'Alice', message: 'Hey'},
  ];

  const renderChatItem = ({item}: {item: Chat}) => <ChatListItem chat={item} />;

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatListScreen;
