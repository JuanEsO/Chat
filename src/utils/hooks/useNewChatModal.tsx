import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity} from 'react-native';
import AntDesingIcon from 'react-native-vector-icons/AntDesign';

function useModal() {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => showModal()}>
          <Image
            source={require('../../../assets/plusIcon.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function showModal() {
    setIsVisible(true);
  }

  function hideModal() {
    setIsVisible(false);
  }

  return {
    isVisible,
    showModal,
    hideModal,
  };
}

export default useModal;
