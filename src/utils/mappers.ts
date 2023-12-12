import {User as UserModel, ChatRoom as ChatRoomModel, Message} from '../models';
import {User} from '../types/entities';

export const mapUserModelToDTO = (user: UserModel) => {
  return {
    id: user.id,
    email: user.name,
    image: user.image,
    status: user.status,
  } as User;
};

export const mapChatRoomModelToDTO = (chatRoom: ChatRoomModel) => {
  return {
    id: chatRoom.id,
    // users: chatRoom.users.map(mapUserModelToDTO),
    users: chatRoom.users?.items
      ? [...chatRoom.users?.items]?.map(mapUserModelToDTO)
      : [],
    lastMessage: mapMessageModelToDTO(chatRoom.LastMessage) ?? null,
    messages: chatRoom.Messages?.items
      ? [...chatRoom.Messages?.items]?.map(mapMessageModelToDTO)
      : [],
  };
};

export const mapChatRoomFromUserModelToDTO = (chatRoom: ChatRoomModel) => {
  // console.log('chatRoomMODELDTO', chatRoom);
  return {
    id: chatRoom.id,
    users: chatRoom.users?.items
      ? [...chatRoom.users?.items]?.map(item => mapUserModelToDTO(item.user))
      : [],
    lastMessage: mapMessageModelToDTO(chatRoom.LastMessage) ?? null,
    messages: chatRoom.messages?.items ?? [],
    updatedAt: chatRoom.updatedAt,
  };
};

export const mapMessageModelToDTO = (message: any) => {
  if (!message) {
    return null;
  }
  return {
    id: message.id,
    userID: message.userID,
    chatRoomID: message.chatRoomID,
    text: message.text,
    createdAt: message.createdAt,
  };
};

export const mapMessageModelToLocal = (message: Message) => {
  return {
    id: message.id,
    chatId: message.chatRoomID,
    text: message.text,
    createdAt: message.createdAt,
    userId: message.userID,
  };
};

export const mapChatRoomModelToLocal = (
  chatRoom: ChatRoomModel,
  userId: string,
) => {
  console.log('chatRoomMAP', chatRoom.id);
  return {
    id: chatRoom.id,
    user: {
      id:
        chatRoom.users?.[0].id !== userId
          ? chatRoom.users?.[0].id
          : chatRoom.users?.[1].id,
      email:
        chatRoom.users?.[0].id !== userId
          ? chatRoom.users?.[0].email ?? ''
          : chatRoom.users?.[1].email ?? '',
    },
    lastMessage: chatRoom.lastMessage && {
      id: chatRoom.lastMessage?.id,
      createdAt: chatRoom.lastMessage?.createdAt,
      text: chatRoom.lastMessage?.text ?? '',
      userId: chatRoom.lastMessage?.userID ?? '',
    },
    createdAt: chatRoom.createdAt ?? '',
    updatedAt: chatRoom.updatedAt,
  };
};
