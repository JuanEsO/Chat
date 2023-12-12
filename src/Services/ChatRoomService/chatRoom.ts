import {API, graphqlOperation} from 'aws-amplify';
import {
  createChatRoom as createChatRoomMutation,
  createUserChatRoom as createUserChatRoomMutation,
  updateChatRoom,
} from '../../graphql/mutations';
import {getChatRoom as getChatRoomByIdQuery} from '../../graphql/queries';
import {myChatRooms as ListMyChatRoomsQuery} from './customQueries';
import {User} from '../../types/entities';
import {
  mapChatRoomFromUserModelToDTO,
  mapChatRoomModelToDTO,
} from '../../utils/mappers';
import LocalDBManager from '../../lib/LocalDbManager';
import {LocalUser} from '../../lib/LocalDbManager/types';
import { LocalChat } from '../../lib/LocalDbManager/models';

const localDb = LocalDBManager.getInstance();

export const createChatRoom = async (userId: string, userEmail: string) => {
  try {
    const existingChatRoom = await getChatRoomByUserId(userId);

    if (existingChatRoom) {
      return existingChatRoom;
    }

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoomMutation, {
        input: {},
      }),
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.error('Failed to create chat room');
      return;
    }

    const authUser = await API.Auth.currentAuthenticatedUser();

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    await API.graphql(
      graphqlOperation(createUserChatRoomMutation, {
        input: {
          userId: authUser.attributes.sub,
          chatRoomId: newChatRoom.id,
        },
      }),
    );

    await API.graphql(
      graphqlOperation(createUserChatRoomMutation, {
        input: {
          userId: userId,
          chatRoomId: newChatRoom.id,
        },
      }),
    );

    const localChatData = {
      id: newChatRoom.id,
      user: {
        id: userId,
        email: userEmail,
      } as LocalUser,
      createdAt: newChatRoom.createdAt,
      updatedAt: newChatRoom.updatedAt,
    } as LocalChat;

    localDb.insertChat(localChatData);

    return mapChatRoomModelToDTO(newChatRoom);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllChatRooms = async () => {
  try {
    const authUser = await API.Auth.currentAuthenticatedUser();
    const chatRoomsData = await API.graphql(
      graphqlOperation(ListMyChatRoomsQuery, {
        id: authUser.attributes.sub,
      }),
    );

    if (!chatRoomsData.data?.getUser) {
      console.error('Failed to fetch chat rooms');
      return [];
    }

    const chatRooms = chatRoomsData.data?.getUser.ChatRooms.items.map(
      item => item.chatRoom,
    );
    if (!chatRooms) {
      return [];
    }

    return chatRooms.map(mapChatRoomFromUserModelToDTO);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getChatRoomById = async (chatRoomId: string) => {
  try {
    const chatRoomData = await API.graphql(
      graphqlOperation(getChatRoomByIdQuery, {
        id: chatRoomId,
      }),
    );

    if (!chatRoomData.data?.getChatRoom) {
      throw new Error('Failed to fetch chat room');
    }

    return mapChatRoomModelToDTO(chatRoomData.data?.getChatRoom);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getChatRoomByUserId = async (userId: string) => {
  try {
    const authUser = await API.Auth.currentAuthenticatedUser();
    const chatRoomsData = await API.graphql(
      graphqlOperation(ListMyChatRoomsQuery, {
        id: authUser.attributes.sub,
      }),
    );

    if (!chatRoomsData.data?.getUser) {
      console.error('Failed to fetch chat rooms');
      return null;
    }

    const chatRooms = chatRoomsData.data?.getUser.ChatRooms.items.map(
      item => item.chatRoom,
    );

    if (!chatRooms) {
      return null;
    }

    const chatRoom = chatRooms.find(room => {
      return room.users.items.find(item => item.user.id === userId);
    });

    if (!chatRoom) {
      return null;
    }

    return mapChatRoomFromUserModelToDTO(chatRoom);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUserToChatRoom = async (data: any) => {};
