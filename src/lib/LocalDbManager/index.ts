import {ChatManager} from './Manager';
import CoreManager from './Manager/client';
import {LocalChat} from './types';
import {LocalLastMessage, LocalMessage} from './types';

class LocalDBManager {
  // the instance of the class
  private static instance: LocalDBManager;
  // to track and identify the instance
  readonly instanceId: string;
  // core manager to handle the realm and dynamodb instances
  readonly coreManager: CoreManager;
  // chat manager
  readonly chatManager: ChatManager;

  // Private constructor prevents external instantiation
  private constructor() {
    // generate a random id to identify the instance
    this.instanceId = Math.random().toString(36).substring(7);
    // create core manager
    this.coreManager = CoreManager.getInstance();
    // create chat manager
    this.chatManager = new ChatManager(this.coreManager);
  }

  /**
   * restricts the instantiation of a class and ensures that only
   * one instance of the class exists at any given time
   * @returns the instance of the class
   */
  static getInstance() {
    // check if instance does not exist then create new one
    // otherwise return the existing one
    if (!LocalDBManager.instance) {
      LocalDBManager.instance = new LocalDBManager();
    }
    return LocalDBManager.instance;
  }

  writeMessages(messages: LocalMessage[]) {
    this.chatManager.writeMessages(messages);
  }

  syncMessages(messages: LocalMessage[], userId: string) {
    this.chatManager.syncMessages(messages, userId);
  }

  updateLastMessage(message: LocalLastMessage, chatId: string) {
    this.chatManager.updateLastMessage(message, chatId);
  }

  getChats() {
    return this.chatManager.getChats();
  }

  getChatById(chatId: string) {
    return this.chatManager.getChatById(chatId);
  }

  updateChat(chat: LocalChat) {
    return this.chatManager.updateChat(chat);
  }

  insertChat(chat: LocalChat) {
    return this.chatManager.insertChat(chat);
  }

  //Subscriptions

  subscribeToMessages(
    chatId: string,
    callback: (messages: LocalMessage[], changes?: any) => void,
  ) {
    return this.chatManager.subscribeToMessages(chatId, callback);
  }

  subscribeToChats(callback: (chats: any[], changes?: any) => void) {
    return this.chatManager.subscribeToChats(callback);
  }
}

export default LocalDBManager;
