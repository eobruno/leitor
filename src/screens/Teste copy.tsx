import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const Teste = ({ navigation }) => {
  const [showImages, setShowImages] = useState(false);
  const [gifKey, setGifKey] = useState(0); // Chave única para forçar a reinicialização do gif

  const translationXImage1 = useSharedValue(300);
  const translationYImage2 = useSharedValue(300);

  const scaleImage1 = useSharedValue(1);
  const scaleImage2 = useSharedValue(1);

  useEffect(() => {
    if (showImages) {
      setTimeout(() => {
        scaleImage1.value = withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) });
      }, 3000);
    }
  }, [showImages]);

  const toggleImages = () => {
    if (showImages) {
      scaleImage1.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
      translationXImage1.value = withTiming(300, { duration: 800, easing: Easing.inOut(Easing.ease) });

      scaleImage2.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) });
      translationYImage2.value = withTiming(300, { duration: 500, easing: Easing.inOut(Easing.ease) });
    } else {
      translationXImage1.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) });
      setTimeout(() => {
        translationYImage2.value = withTiming(0, { duration: 2300, easing: Easing.inOut(Easing.ease) });
        setGifKey((prevKey) => prevKey + 1); // Incrementa a chave para forçar a reinicialização do gif
      }, 500);
    }

    setShowImages(!showImages);
  };

  const animatedStyleImage1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationXImage1.value }, { scale: scaleImage1.value }],
    };
  });

  const animatedStyleImage2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationYImage2.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.animeContent}>
          <Animated.View style={[animatedStyleImage1]}>
            <Image
              key={gifKey} // Adiciona a chave única para forçar a reinicialização do gif
              source={require("../assets/passaporte_abrindo.gif")}
              style={{ width: 200, height: 200, top: 100 }}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View style={[animatedStyleImage2]}>
            <Image
              source={require("../assets/celular.png")}
              style={{ width: 200, height: 200, position: "relative", top: -100 }}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <View style={{ marginTop: 50 }}>
          <Button title={showImages ? "Fechar" : "Abrir"} onPress={toggleImages} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  animeContent: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden", // Garante que as imagens ficarão dentro da view
    padding: 20,
  },
});

export default Teste;
