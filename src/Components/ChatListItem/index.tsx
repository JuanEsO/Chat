import React, {useEffect, useMemo} from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../utils/Dates';
import {ChatRoom, User} from '../../types/entities';
import {Auth} from 'aws-amplify';

// const user = {
//   id: 'u1',
//   name: 'Vadim',
//   image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
// };

const chatRoom = {
  name: 'Vadim',
  LastMessage: {
    id: 'm1',
    content: 'Well done this sprint, guys!',
    createdAt: '2023-11-29T14:48:00.000Z',
  },
};

function ChatListItem({chatData}: {chatData: ChatRoom}) {
  const navigation = useNavigation();
  const user = chatData?.user;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {id: chatData.id, name: user?.email ?? ''})
      }
      style={styles.container}>
      <Image
        source={require('../../../assets/avatarDefault.png')}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.email}
          </Text>

          {chatData?.lastMessage && (
            <Text style={styles.subTitle}>
              {formatDate(new Date(chatData.lastMessage?.createdAt))}
            </Text>
          )}
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chatData.lastMessage?.text ?? 'No messages yet'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
  },
});

export default ChatListItem;
