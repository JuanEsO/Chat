import React, {useCallback, useEffect} from 'react';
import LocalDBManager from '../lib/LocalDbManager';
import {getAllChatRooms} from './ChatRoomService/chatRoom';
import {Auth} from 'aws-amplify';
import {ChatRoom} from '../models';
import {mapChatRoomModelToLocal} from '../utils/mappers';
import {LocalChat} from '../lib/LocalDbManager/models';

const localdb = LocalDBManager.getInstance();

const ServiceLayer = () => {
  const fetchChatRooms = useCallback(async (id: string): Promise<void> => {
    try {
      const remoteChatRooms: ChatRoom[] = await getAllChatRooms();
      const localChatRooms: LocalChat[] = await localdb.getChats();

      const indexedLocalChatRooms = localChatRooms?.reduce((acc, curr) => {
        if (!acc) {
          return {
            [curr.id]: curr,
          };
        }
        acc[curr.id] = curr;
        return acc;
      });

      const chatRoomsToUpdate = remoteChatRooms?.filter(
        (remoteChatRoom: ChatRoom) => {
          if (indexedLocalChatRooms?.[remoteChatRoom?.id]) {
            const updatedDateLocalRoom = new Date(
              indexedLocalChatRooms?.[remoteChatRoom?.id].updatedAt,
            );
            const updatedDateRemoteRoom = new Date(
              remoteChatRoom?.updatedAt ?? '',
            );
            return updatedDateRemoteRoom > updatedDateLocalRoom;
          }
        },
      );

      const chatRoomsToInsert = remoteChatRooms.filter(
        (remoteChatRoom: ChatRoom) => {
          if (!indexedLocalChatRooms?.[remoteChatRoom.id]) {
            return true;
          }
        },
      );

      chatRoomsToInsert.forEach((chatRoom: ChatRoom) => {
        const newChatRoom = mapChatRoomModelToLocal(chatRoom, id);
        localdb.insertChat(newChatRoom);
      });

      chatRoomsToUpdate.forEach((chatRoom: ChatRoom) => {
        console.log('chatRoomsToUpdate', chatRoom);
        localdb.updateChat(mapChatRoomModelToLocal(chatRoom, id));
      });

    } catch (e) {
      console.log('[ServiceLayer] fetchChatRooms error', e);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser?.attributes?.sub) {
        fetchChatRooms(authUser.attributes.sub);
      }
    })();
  }, [fetchChatRooms]);
  return <></>;
};
export default ServiceLayer;
