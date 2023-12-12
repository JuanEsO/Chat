import {API, graphqlOperation} from 'aws-amplify';
import {
  createMessage as createMessageMutation,
  updateChatRoom,
} from '../../graphql/mutations';
import LocalDBManager from '../../lib/LocalDbManager';
import { getChatRoomByUserId } from '../ChatRoomService/chatRoom';

const localdb = LocalDBManager.getInstance();

export const createMessage = async (chatRoomId: string, text: string) => {
  try {
    const authUser = await API.Auth.currentAuthenticatedUser();

    const newMessageData = {
      userID: authUser.attributes.sub,
      text: text,
      chatRoomID: chatRoomId,
    };
    const newMessage = await API.graphql(
      graphqlOperation(createMessageMutation, {
        input: newMessageData,
      }),
    );

    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          id: chatRoomId,
          chatRoomLastMessageId: newMessage.data?.createMessage.id,
        },
      }),
    );

    const newLocalMessage = {
      id: newMessage.data?.createMessage.id,
      chatId: chatRoomId,
      text: text,
      createdAt: new Date().toISOString(),
      userId: authUser.attributes.sub,
    };

    localdb.writeMessages([newLocalMessage]);
  } catch (error) {
    console.error(error);
    return null;
  }
};
