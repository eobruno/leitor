import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { BACKGROUND_COLOR } from "./styles";


const ListarMrz = ({ navigation }) => {
  return (
    
      <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View>
          <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={40} color="#003053" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10, marginRight: 10 }}>
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 60, height: 70 }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.titulo}>
        <Text style={styles.textoTitulo}>LER CHIP</Text>
        <Text style={styles.textoSubTitulo}>NFC</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Text style={styles.textoTitulo}>desenvolvendo...</Text>
      </View>
      </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  titulo: {
    flexGrow: 1,
    width: "100%",
    height: 107,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  textoTitulo: {
    fontSize: 20,
  },
  textoSubTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#c6c6c6",
  },
});

export default ListarMrz;
