import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface InfoModalProps {
  visible: boolean;
  message: string;
  coordinates?: { x: number; y: number };
  onClose: () => void;
}

const InfoModal = ({ visible, message, coordinates, onClose }: InfoModalProps) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          {coordinates && (
            <Text style={styles.modalText}>
              Coordenadas: X: {coordinates.x.toFixed(2)} cm, Y: {coordinates.y.toFixed(2)} cm
            </Text>
          )}
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
});

export default InfoModal;
