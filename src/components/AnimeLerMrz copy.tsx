import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimeLerMrz = ({ showImages, onClose }) => {
  const [gifKey, setGifKey] = useState(0);

  const translationXImage1 = useSharedValue(300);
  const translationYImage2 = useSharedValue(300);

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
      }, 500);
    }
  }, [showImages]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.animeContent}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            top: 80,
            alignItems: "center",
            overflow: "hidden",
            alignContent: "center"
            
          }}
        >
          <Text style={{fontSize: 16}}>
            Posicione o passaporte conforme a ilustração e aponte sua camera
            para leitura e extração dos dados.
          </Text>
        </View>
        <View>
          <Animated.View style={[animatedStyleImage1]}>
            <Image
              key={gifKey}
              source={require("../assets/passaporte_abrindo.gif")}
              style={{ width: 200, height: 200, top: 110 }}
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
                top: -90,
              }}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animeContent: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
  },
});

export default AnimeLerMrz;
