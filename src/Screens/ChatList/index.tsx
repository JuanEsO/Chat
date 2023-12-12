/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import ChatListItem from '../../Components/ChatListItem';
import BottomModal from '../../Components/Modals/BottomModal';
import UsersList from '../../Components/UsersList';
import useNewChatModal from '../../utils/hooks/useNewChatModal';
import {getAllChatRooms} from '../../Services/ChatRoomService/chatRoom';
import LocalDBManager from '../../lib/LocalDbManager';
import {LocalChat} from '../../lib/LocalDbManager/models';
import {ChatRoom as IChatRoom} from '../../types/entities';

const localdb = LocalDBManager.getInstance();

const ChatListScreen: React.FC = () => {
  const {hideModal, isVisible} = useNewChatModal();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chats, setChats] = React.useState<IChatRoom[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (loading) {
        return;
      }
      const rooms = localdb.getChats();
      setChats(rooms);
    };
    fetchRooms();
  }, [loading]);

  useEffect(() => {
    const unsubscribe = localdb.subscribeToChats(
      (updateChats: LocalChat[], changes) => {
        if (changes) {
          changes.insertions.forEach((index: number) => {
            setLoading(true);
            if (chats.find(item => item.id === updateChats[index].id)) {
              return;
            }
            const newChat: IChatRoom = {
              id: updateChats[index].id,
              user: {
                id: updateChats[index].user.id,
                email: updateChats[index].user.email,
              },
              lastMessage: updateChats[index].lastMessage,
            };
            setChats(prev => [...prev, newChat]);
            setLoading(false);
          });

          changes?.newModifications?.forEach((index: number) => {
            const newChat: IChatRoom = {
              id: updateChats[index].id,
              user: {
                id: updateChats[index].user.id,
                email: updateChats[index].user.email,
              },
              lastMessage: updateChats[index].lastMessage,
            };
            setChats(prev =>
              prev.map(item => (item.id === newChat.id ? newChat : item)),
            );
          });
        }
      },
    );
    return () => {
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderChatItem = ({item}: {item: IChatRoom}) => (
    <ChatListItem chatData={item} />
  );

  const renderEmptyList = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No chats found</Text>
    </View>
  );

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
      />
      <BottomModal visible={isVisible} onClose={hideModal}>
        <UsersList onPressItem={() => hideModal()} />
      </BottomModal>
    </View>
  );
};

export default ChatListScreen;
