import React from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import LocalDBManager from '../lib/LocalDbManager';
import {Observable, ISubscription} from '../types/eventTypes';
import {useEffect} from 'react';
import {onCreateUserChatRoom, onUpdateChatRoom} from '../graphql/subscriptions';
import {
  OnUpdateChatRoomSubscription,
  OnCreateUserChatRoomSubscription,
  GetChatRoomQuery,
} from '../API';
import {mapMessageModelToLocal} from '../utils/mappers';
import {LocalChat, LocalLastMessage} from '../lib/LocalDbManager/types';
import {getNewChatRoom} from '../Services/ChatRoomService/customQueries';

const localdb = LocalDBManager.getInstance();

const SubscriptionManager = ({userId}: {userId: string}) => {
  const doSubscription = (
    query: string,
    onNext: CallableFunction,
    options = {},
  ) =>
    (API.graphql(graphqlOperation(query, options)) as Observable).subscribe({
      next: ({value}: {value: {data: unknown}}) => {
        onNext(value);
      },
      error: error => {
        if (error?.error?.errors[0].message === 'Connection closed') {
          setTimeout(() => {}, 5000);
        }
      },
    });

  useEffect(() => {
    let subsOnUpdateChat: ISubscription | null = null;
    let subsOnCreateChat: ISubscription | null = null;
    try {
      subsOnUpdateChat = doSubscription(
        onUpdateChatRoom,
        async ({data}: {data: OnUpdateChatRoomSubscription}) => {
          const payload = data.onUpdateChatRoom;
          if (!payload?.users?.items?.find(item => item?.userId === userId)) {
            return;
          }
          // Add new messages to local db
          const newMessages = payload?.Messages?.items?.map(
            mapMessageModelToLocal,
          );
          localdb.syncMessages(newMessages ?? [], userId);

          // Update chat room last message
          const lastMessage: LocalLastMessage = {
            id: payload?.LastMessage?.id ?? '',
            createdAt: payload?.LastMessage?.createdAt ?? '',
            text: payload?.LastMessage?.text ?? '',
            userId: payload?.LastMessage?.userID ?? '',
          };
          localdb.updateLastMessage(
            lastMessage,
            payload?.LastMessage?.chatRoomID ?? '',
          );
        },
        {},
      );

      subsOnCreateChat = doSubscription(
        onCreateUserChatRoom,
        async ({data}: {data: OnCreateUserChatRoomSubscription}) => {
          const payload = data.onCreateUserChatRoom;
          const chatRoomId = payload?.chatRoomId;

          // check if chat room already exists
          const localChatRoom = localdb.getChatById(chatRoomId ?? '');

          console.log('localChatRoomExist', localChatRoom);

          if (localChatRoom) {
            return;
          }

          try {
            // get Data to create localChatRoom
            const chatRoom = (await API.graphql(
              graphqlOperation(getNewChatRoom, {
                id: chatRoomId,
                userId: userId,
              }),
            )) as {data: GetChatRoomQuery};

            const users = chatRoom?.data?.getChatRoom?.users?.items.map(el => el?.user ?? null)

            console.log('users', users);

            const newChatRoom = {
              id: chatRoomId,
              lastMessage: null,
              user: {
                id: users ? users[0]?.id ?? '' : '',
                email: users ? users[0]?.name ?? '' : '',
              },
              createdAt: chatRoom?.data?.getChatRoom?.createdAt ?? '',
              updatedAt: chatRoom?.data?.getChatRoom?.updatedAt ?? '',
            } as LocalChat;
            localdb.insertChat(newChatRoom);
            console.log('chatRoom', chatRoom?.data?.getChatRoom?.users);
          } catch (error) {
            console.log('error', error);
          }
        },
        {
          filter: {
            userId: {
              eq: userId,
            },
          },
        },
      );
    } catch (error) {}
    return () => {
      subsOnUpdateChat?.unsubscribe?.();
      subsOnCreateChat?.unsubscribe?.();
    };
  }, [userId]);
  return <></>;
};

export default SubscriptionManager;
