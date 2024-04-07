import { useEffect, useState } from "react";
import { View, Image, Modal, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";

const ModalPoup = ({ visible, onRequestClose, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    setShowModal(visible);
  };

  const closeModal = () => {
    setShowModal(false);
    // Chama a função fornecida pelo componente pai para informá-lo sobre o fechamento do modal
    onRequestClose && onRequestClose();
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={closeModal}>
              <Image
                source={require('../assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/success.png')}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Congratulations registration was successful
        </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default ModalPoup;
