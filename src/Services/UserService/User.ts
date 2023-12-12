import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser, listUsers} from '../../graphql/queries';
import {User as UserModel} from '../../models';
import {createUser as createUserMutation} from '../../graphql/mutations';
import {User} from '../../types/entities';
import {mapUserModelToDTO} from '../../utils/mappers';

export const syncUser = async () => {
  const authUser = await Auth.currentAuthenticatedUser({
    bypassCache: true,
  });

  const userData = await API.graphql<UserModel>(
    graphqlOperation(getUser, {id: authUser.attributes.sub}),
  );

  if (userData?.data?.getUser) {
    return;
  }
  const newUser = {
    id: authUser.attributes.sub,
    name: authUser.attributes.email,
    status: 'Hey, I am using this Chat',
  };

  await createUser(newUser);
};

export const createUser = async (userData: User) => {
  try {
    const newUserResponse = await API.graphql(
      graphqlOperation(createUserMutation, {input: userData}),
    );
    return newUserResponse;
  } catch (error) {
    console.warn('error creating user:', error);
    return null;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

export const getUsersList = async () => {
  try {
    const remoteUsers = await API.graphql(graphqlOperation(listUsers)).then(
      res => {
        return res.data.listUsers.items;
      },
    );

    return remoteUsers.map(mapUserModelToDTO);
  } catch (error) {
    console.warn('error fetching users', error);
    return null;
  }
};
