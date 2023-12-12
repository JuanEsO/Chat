import React, {useEffect} from 'react';
import {getUsersList} from '../../Services/UserService/User';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {User} from '../../types/entities';
import {createChatRoom} from '../../Services/ChatRoomService/chatRoom';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const height = Dimensions.get('window').height;

const UserItem: React.FC<{user: User; onPress: (user: User) => void}> = ({
  user,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(user)}>
      {/* <Image
        source={
          user.image
            ? {uri: user.image}
            : require('../../../assets/avatarDefault.png')
        }
        style={styles.itemAvatar}
      /> */}
      <Image
        source={require('../../../assets/avatarDefault.png')}
        style={styles.itemAvatar}
      />
      <Text>{user.email}</Text>
    </TouchableOpacity>
  );
};

interface Props {
  onPressItem: (user: User) => void;
}

const UsersList: React.FC<Props> = ({onPressItem}) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userslist = await getUsersList();
      setUsers(userslist.filter(user => user.id !== authUser.attributes.sub));
    };
    fetchUsers();
  }, []);

  const onNewChatRoom = async (user: User) => {
    const newChatRoom = await createChatRoom(user.id, user.email);
    navigation.navigate('Chat', {id: newChatRoom?.id, name: user.email});
  };

  const handleOnPressItem = (user: User) => {
    onPressItem(user);
    onNewChatRoom(user);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <UserItem user={item} onPress={handleOnPressItem} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.8,
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default UsersList;
