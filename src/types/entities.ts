export type User = {
  id: string;
  email: string;
  image?: string;
  status?: string;
};

export type ChatRoom = {
  id: string;
  user: User;
  lastMessage?: LastMessage;
  messages?: Message[];
  updateAt?: string;
};

export type Message = {
  id: string;
  userID: string;
  chatRoomID: string;
  text: string;
  createdAt: string;
};

export type LastMessage = {
  id: string;
  createdAt: string;
  text?: string;
  userId: string;
};
