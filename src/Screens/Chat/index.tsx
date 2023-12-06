/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

const testData: Message[] = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://picsum.photos/200',
    },
  },
  {
    _id: 2,
    text: 'Hello RN',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
      avatar: 'https://picsum.photos/200',
    },
  },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(testData);
  const [inputText, setInputText] = useState('');

  const handleSend = (messages) => {
    if (inputText.trim() !== '') {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderItem = ({item}: {item: Message}) => (
    <TouchableOpacity style={{padding: 10}}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%'}}>

      <GiftedChat
        messages={messages}
        onSend={messages => handleSend(messages)}
        user={{
          _id: 1,
        }}
        showAvatarForEveryMessage={false}
        // showUserAvatar={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
