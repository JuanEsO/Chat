export const myChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                  image
                  name
                }
              }
            }
            LastMessage {
              id
              createdAt
              text
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

export const getNewChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!, $userId: ID!) {
    getChatRoom(id: $id) {
      id
      users(filter: {userId: {ne: $userId}}) {
        items {
          user {
            id
            name
          }
        }
      }
      LastMessage {
        id
        createdAt
        text
      }
      createdAt
      updatedAt
    }
  }
`;
