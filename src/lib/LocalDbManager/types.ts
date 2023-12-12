export interface LocalUser {
  id: string;
  email: string;
}

export interface LocalLastMessage {
  id: string;
  createdAt: string;
  text?: string;
  userId: string;
}

export interface LocalMessage {
  id: string;
  chatId: string;
  userId: string;
  text?: string;
  createdAt: string;
}

export interface LocalChat {
  id: string;
  user?: LocalUser | null;
  lastMessage?: LocalLastMessage | null;
  createdAt?: string;
  updatedAt?: string;
}
