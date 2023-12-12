import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BottomModal: React.FC<BottomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    minHeight: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default BottomModal;
