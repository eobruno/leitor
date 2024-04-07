import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import AnimeLerMrz from "../components/AnimeLerMrz";

const Teste = () => {
  const [showImages, setShowImages] = useState(false);

  const handleToggleImages = () => {
    setShowImages((prevShowImages) => !prevShowImages);
  };

  const handleCloseModal = () => {
    setShowImages(false);
    handleTeste();
  };

  const handleTeste = () => {
    console.log('TESTE TESTE');
  }

  return (
    <View style={styles.container}>
      {showImages && <AnimeLerMrz showImages={showImages} onClose={handleCloseModal} />}
      <Button title={showImages ? "Fechar" : "Abrir"} onPress={handleToggleImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Teste;
