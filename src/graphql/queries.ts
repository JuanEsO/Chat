/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getChatRoom = /* GraphQL */ `query GetChatRoom($id: ID!) {
  getChatRoom(id: $id) {
    id
    Messages {
      items {
        id
        text
        chatRoomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    users {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    LastMessage {
      id
      text
      chatRoomID
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    chatRoomLastMessageId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatRoomQueryVariables,
  APITypes.GetChatRoomQuery
>;
export const listChatRooms = /* GraphQL */ `query ListChatRooms(
  $filter: ModelChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        text
        chatRoomID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatRoomsQueryVariables,
  APITypes.ListChatRoomsQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    text
    chatRoomID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      chatRoomID
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const messagesByChatRoomID = /* GraphQL */ `query MessagesByChatRoomID(
  $chatRoomID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByChatRoomID(
    chatRoomID: $chatRoomID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      chatRoomID
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByChatRoomIDQueryVariables,
  APITypes.MessagesByChatRoomIDQuery
>;
export const messagesByUserID = /* GraphQL */ `query MessagesByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      chatRoomID
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByUserIDQueryVariables,
  APITypes.MessagesByUserIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    status
    image
    Messages {
      items {
        id
        text
        chatRoomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    ChatRooms {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      status
      image
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getUserChatRoom = /* GraphQL */ `query GetUserChatRoom($id: ID!) {
  getUserChatRoom(id: $id) {
    id
    chatRoomId
    userId
    chatRoom {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        text
        chatRoomID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      __typename
    }
    user {
      id
      name
      status
      image
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserChatRoomQueryVariables,
  APITypes.GetUserChatRoomQuery
>;
export const listUserChatRooms = /* GraphQL */ `query ListUserChatRooms(
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        status
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserChatRoomsQueryVariables,
  APITypes.ListUserChatRoomsQuery
>;
export const userChatRoomsByChatRoomId = /* GraphQL */ `query UserChatRoomsByChatRoomId(
  $chatRoomId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByChatRoomId(
    chatRoomId: $chatRoomId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        status
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatRoomsByChatRoomIdQueryVariables,
  APITypes.UserChatRoomsByChatRoomIdQuery
>;
export const userChatRoomsByUserId = /* GraphQL */ `query UserChatRoomsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        status
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatRoomsByUserIdQueryVariables,
  APITypes.UserChatRoomsByUserIdQuery
>;
