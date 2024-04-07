import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, {
  BounceInRight,
  CurvedTransition,
  FadeIn,
  FadingTransition,
  FlipInEasyX,
  FlipInEasyY,
  ZoomOutRight,
} from "react-native-reanimated";

import Topo from "../components/Topo";

import Constantes from "../util/Constantes";
import { BACKGROUND_COLOR } from "./styles";
import { useState } from "react";
import AnimeLerMrz from "../components/AnimeLerMrz";

const Home = ({ navigation }) => {

  const [showImages, setShowImages] = useState(false);

  const handleToggleImages = () => {
    setShowImages(true);
  };

  const handleCloseModal = () => {
    setShowImages(false);
    navigation.navigate("LerMrz")
  };

  return (
    <SafeAreaView style={styles.container}>
      <Topo navigation={navigation} />
      <View style={styles.contentContainer}>
      {showImages && <AnimeLerMrz showImages={showImages} onClose={handleCloseModal} />}
        <View style={styles.content}>
        <Animated.View style={styles.content} entering={FadeIn.duration(800)}>
          <Animated.View entering={FlipInEasyY.duration(500)}>
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: Constantes.PRIMARIA_ESCURA },
              ]}
              onPress={handleToggleImages}
            >
              <AntDesign name="scan1" style={styles.icone} />
              <View style={{ flex: 1, paddingRight: 5 }}>
                <Text style={[styles.textoCard]}>LER MRZ</Text>
                <Text style={[styles.textoCard, { fontSize: 14 }]}>
                  Obter dados do documento a partir de um código MRZ impresso.
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FlipInEasyY.duration(600)}>
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: Constantes.PRIMARIA_CLARA },
              ]}
              onPress={() => navigation.navigate("ListarMrz")}
            >
              <MaterialCommunityIcons
                name="format-list-group"
                style={styles.icone}
              />

              <View style={{ flex: 1, paddingRight: 5 }}>
                <Text style={[styles.textoCard]}>LISTAR MRZ LIDO</Text>
                <Text style={[styles.textoCard, { fontSize: 14 }]}>
                  Exibir listagem de documentos com o MRZ verificado.
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FlipInEasyY.duration(700)}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: "#787b7f" }]}
              onPress={() => navigation.navigate("LerNfc")}
            >
              <MaterialCommunityIcons
                name="cellphone-nfc"
                style={styles.icone}
              />
              <View style={{ flex: 1, paddingRight: 5 }}>
                <Text style={[styles.textoCard]}>LER CHIP - NFC</Text>
                <Text style={[styles.textoCard, { fontSize: 14 }]}>
                  Leitura dos dados do chip do passaporte utilizando o NFC.
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: BACKGROUND_COLOR,
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "95%",
    height: 120,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 60,
    padding: 20,
  },
  textoCard: {
    fontSize: 20,
    color: "#FFF",
  },
  icone: {
    marginRight: 30,
    color: "#FFF",
    fontSize: 60,
  },
});

export default Home;
