import CoreManager from './client';
import {LocalLastMessage, LocalMessage} from '../types';
import {LocalChat} from '../models';
import {LocalChat as LocalChatType} from '../types';
import {UpdateMode} from 'realm';

class ChatManager {
  private readonly realm;

  constructor(client: CoreManager) {
    this.realm = client.realm;
  }

  writeMessages(messages: LocalMessage[]) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    try {
      this.realm.write(() => {
        messages.forEach(message => {
          this.realm?.create('Message', message, UpdateMode.Modified);
        });
      });
      const chat = this.realm.objectForPrimaryKey<LocalChat>(
        'Chat',
        messages[0].chatId,
      );
      if (chat) {
        this.realm.write(() => {
          chat.updatedAt = new Date().toISOString();
          chat.lastMessage = messages[messages.length - 1];
        });
      }
    } catch (error) {
      console.error('[LocalDBManager] writeMessages error', error);
    }
  }

  syncMessages(messages: LocalMessage[], userId: string) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    try {
      // console.log('syncMessages', messages);
      const localMessages = this.realm.objects<LocalMessage>('Message');
      const localMessagesIds = localMessages.map(message => message.id);
      const newMessages = messages.filter(
        message =>
          !localMessagesIds.includes(message.id) || message.userId !== userId,
      );
      this.writeMessages(newMessages);
    } catch (error) {
      console.error('[LocalDBManager] writeMessages error', error);
    }
  }

  updateLastMessage(message: LocalLastMessage, chatId: string) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    try {
      const chat = this.realm.objectForPrimaryKey<LocalChat>('Chat', chatId);
      if (chat) {
        this.realm.write(() => {
          chat.updatedAt = new Date().toISOString();
          chat.lastMessage = message;
        });
      }
    } catch (error) {
      console.error('[LocalDBManager] updateLastMessage error', error);
    }
  }

  getChats() {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    return this.realm.objects<LocalChat>('Chat');
  }

  getChatById(chatId: string) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    return this.realm.objectForPrimaryKey<LocalChat>('Chat', chatId);
  }

  updateChat(chat: LocalChatType) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    try {
      const localChat = this.realm.objectForPrimaryKey<LocalChat>(
        'Chat',
        chat.id,
      );
      if (!localChat) {
        return;
      }
      this.realm.write(() => {
        chat.updatedAt = chat.updatedAt;
        chat.lastMessage = chat.lastMessage ?? localChat.lastMessage;
        chat.user = chat.user ?? localChat.user;
      });
    } catch (error) {
      console.error('[LocalDBManager] updateChat error', error);
    }
  }

  insertChat(chat: LocalChatType) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    try {
      const existingChat = this.realm.objectForPrimaryKey<LocalChat>(
        'Chat',
        chat.id,
      );
      if (existingChat) {
        return;
      }
      this.realm.write(() => {
        this.realm?.create('Chat', chat, UpdateMode.Modified);
      });
    } catch (error) {
      console.error('[LocalDBManager] insertChat error', error);
    }
  }

  subscribeToMessages(
    chatId: string,
    callback: (messages: LocalMessage[], changes?: any) => void,
  ) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    const messages = this.realm
      .objects<LocalMessage>('Message')
      .filtered(`chatId = "${chatId}"`);
    callback(messages);
    messages.addListener(callback);
    return () => {
      messages.removeAllListeners();
    };
  }

  subscribeToChats(callback: (chats: LocalChat[], changes?: any) => void) {
    if (!this.realm) {
      console.error('Realm is not initialized');
      return;
    }
    const chats = this.realm.objects<LocalChat>('Chat');
    callback(chats);
    chats.addListener(callback);
    return () => {
      chats.removeAllListeners();
    };
  }
}

export default ChatManager;
