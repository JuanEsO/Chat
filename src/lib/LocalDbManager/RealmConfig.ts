import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {UserSchema, LastMessageSchema, LocalMessage, LocalChat} from './models';

export const realmConfig: Realm.Configuration = {
  path: 'chat.realm',
  schema: [UserSchema, LastMessageSchema, LocalMessage, LocalChat],
  schemaVersion: 2,
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
