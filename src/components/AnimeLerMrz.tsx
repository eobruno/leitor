import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  FadeIn,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Constantes from "../util/Constantes";

const AnimeLerMrz = ({ showImages, onClose }) => {
  const [gifKey, setGifKey] = useState(0);
  const [showStartButton, setShowStartButton] = useState(false);

  const translationXImage1 = useSharedValue(300);
  const translationYImage2 = useSharedValue(400);

  const scaleImage1 = useSharedValue(1);
  const scaleImage2 = useSharedValue(1);

  useEffect(() => {
    if (showImages) {
      setTimeout(() => {
        scaleImage1.value = withTiming(0.7, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        });
      }, 3000);
    }
  }, [showImages]);

  const animatedStyleImage1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationXImage1.value },
        { scale: scaleImage1.value },
      ],
    };
  });

  const animatedStyleImage2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationYImage2.value }],
    };
  });

  useEffect(() => {
    if (showImages) {
      translationXImage1.value = withTiming(0, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      setTimeout(() => {
        translationYImage2.value = withTiming(0, {
          duration: 2300,
          easing: Easing.inOut(Easing.ease),
        });
        setGifKey((prevKey) => prevKey + 1);
        // Após a finalização da animação, mostrar o botão "Iniciar"
      }, 500);
      setTimeout(() => {
        setShowStartButton(true);
      }, 3000);
    }
  }, [showImages]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showImages}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.animeContent}>
          <View
            style={{
              top: 45,
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "center",
              left:10
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={30} style={{ marginRight: 5 }} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              top: 40,
              alignItems: "center",
              overflow: "hidden",
              alignContent: "center",
              padding:5
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Posicione o passaporte de modo a evitar colocar os dedos na frente
              da foto do rosto. Aponte a camera para leitura dos dados.
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
          <View>
            <Animated.View style={[animatedStyleImage1]}>
              <Image
                key={gifKey}
                source={require("../assets/passaporte_abrindo.gif")}
                style={{ width: 200, height: 200, top: 70 }}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View style={[animatedStyleImage2]}>
              <Image
                source={require("../assets/celular.png")}
                style={{
                  width: 200,
                  height: 200,
                  position: "relative",
                  top: -140,
                }}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          </TouchableOpacity>
          {showStartButton && (
            
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Animated.View entering={FadeIn.duration(800)}>
              <View
                style={[
                  styles.modalBotao,
                  { backgroundColor: Constantes.PRIMARIA },
                ]}
              >
                <AntDesign
                  name="scan1"
                  size={25}
                  style={{ color: "#FFF", marginRight: 10 }}
                />
                <Text style={{ color: "#FFF" }}>Iniciar</Text>
              </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // overlay background color
  },
  animeContent: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 450,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    padding: 10,
    bottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007BFF", // or any color you prefer
  },
  modalBotao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
    color: "#fff",
  },
});

export default AnimeLerMrz;
