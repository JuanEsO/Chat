import Realm from 'realm';
import {LocalUser, LocalLastMessage} from './types';

export const UserSchema = {
  name: 'User',
  embedded: true,
  properties: {
    id: 'string',
    email: 'string',
  },
};

export const LastMessageSchema = {
  name: 'LastMessage',
  embedded: true,
  properties: {
    id: 'string',
    createdAt: 'string',
    text: 'string?',
    userId: 'string',
  },
};

export class LocalMessage extends Realm.Object<LocalMessage> {
  id!: string;
  chatId!: string;
  userId!: string;
  text?: string;
  createdAt!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
      id: 'string',
      chatId: 'string',
      userId: 'string',
      text: 'string?',
      createdAt: 'string',
    },
  };
}

export class LocalChat extends Realm.Object<LocalChat> {
  id!: string;
  user!: LocalUser;
  lastMessage?: LocalLastMessage;
  createdAt!: string;
  updatedAt!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Chat',
    primaryKey: 'id',
    properties: {
      id: 'string',
      user: 'User',
      lastMessage: 'LastMessage?',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}
