/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {createMessage} from '../../Services/MessageService/message';
import {getChatRoomById} from '../../Services/ChatRoomService/chatRoom';
import {ChatRoom} from '../../types/entities';
import {Auth} from 'aws-amplify';
import LocalDBManager from '../../lib/LocalDbManager';
import {LocalMessage} from '../../lib/LocalDbManager/types';
// import { Auth } from 'aws-amplify';

interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

const localdb = LocalDBManager.getInstance();

const ChatScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id, name} = route.params as {id: string; name: string};
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState<string | null>(null);

  const handleSend = (newMessages: IMessage[]) => {
    (async () => {
      createMessage(id, newMessages[0].text);
    })();
  };

  useEffect(() => {
    navigation.setOptions({title: name});
  }, [name, navigation]);

  useEffect(() => {
    (async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setMyId(authUser.attributes.sub);
      const chatRoomData: ChatRoom | null = await getChatRoomById(id);
      if (chatRoomData) {
        setMessages(
          chatRoomData?.messages
            ?.map(m => ({
              _id: m.id,
              text: m.text,
              createdAt: new Date(m.createdAt),
              user: {
                _id: m.userID,
                name: '',
              },
            }))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ??
            [],
        );
      }
    })();
  }, [id, name]);

  useEffect(() => {
    const unsubscribe = localdb.subscribeToMessages(
      id,
      (updateMessages: LocalMessage[], changes) => {
        if (changes) {
          changes.insertions.forEach((index: number) => {
            if (messages.find(m => m?._id === updateMessages[index].id)) {
              return;
            }
            handleAddMessage(updateMessages[index]);
          });
        }
      },
    );
    return () => {
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddMessage = (message: LocalMessage) => {
    const newMessage = {
      _id: message.id,
      text: message.text ?? '',
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.userId,
        name: '',
      },
    };
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{
          _id: myId ?? '',
        }}
        showAvatarForEveryMessage={false}
        // showUserAvatar={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
