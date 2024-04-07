import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BACKGROUND_COLOR } from "./styles";

const LerMrz = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={40} color="#003053" />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 60, height: 70 }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LER CHIP</Text>
        <Text style={styles.subtitle}>NFC</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.loadingText}>ler MEZ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  backButton: {
    marginTop: 20,
  },
  logo: {
    marginRight: 10,
    marginTop: 30,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#c6c6c6",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
});

export default LerMrz;
