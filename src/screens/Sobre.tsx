import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";

import Topo from "../components/Topo";
import { BACKGROUND_COLOR } from "./styles";

const Sobre = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => navigation.openDrawer()}
          >
            <Entypo name="menu" size={40} color="#003053" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, marginRight: 30 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Image
              source={require("../assets/cmb_logo_home.png")}
              style={{ width: 240, height: 80 }}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <Text
            style={[
              styles.textTitulo,
              { fontSize: 20, textAlign: "center", marginTop: 40 },
            ]}
          >
            Seu Leitor de MRZ de Passaportes, desenvolvido pela Casa da Moeda do
            Brasil!
          </Text>
          <Text style={styles.textContent}>
            O LEITOR DE DOCUMENTOS é uma aplicação prátiva e eficiente desenvolvida pela
            Casa da Moeda do Brasil, projetada para simplificar a leitura do
            código MRZ em passaportes. Nosso aplicativo utiliza tecnologia
            avançada para garantir uma leitura precisa e eficiente do MRZ,
            proporcionando uma experiência segura. Aqui estão as principais
            características do nosso aplicativo:
          </Text>
          <Text style={styles.textTitulo}>
            1 - Leitura Precisa do MRZ do Passaporte:
          </Text>
          <Text style={styles.textContent}>
            Especializado na interpretação e extração precisa de informações dos
            códigos MRZ presentes nos passaportes. Garantimos uma leitura rápida
            e confiável para otimizar o processo de validação.
          </Text>
          <Text style={styles.textTitulo}>
            2 - Validação Automática de Dados:{" "}
          </Text>
          <Text style={styles.textContent}>
            Após a leitura do MRZ, o aplicativo realiza automaticamente a
            validação das informações, assegurando a precisão e autenticidade
            dos dados do passaporte.
          </Text>
          <Text style={styles.textTitulo}>
            3 - Recorte Inteligente de Fotos:
          </Text>
          <Text style={styles.textContent}>
            Explore nosso recurso avançado de recorte de fotos, projetado para
            capturar facilmente a imagem do rosto do titular do passaporte.
            Utilizamos algoritmos inteligentes para garantir que apenas a área
            relevante seja recortada, proporcionando imagens claras e nítidas.
          </Text>
          <Text style={styles.textTitulo}>
            4 - Armazenamento Seguro de Dados:
          </Text>
          <Text style={styles.textContent}>
            Oferecemos a opção de salvar os dados extraídos de forma segura em
            seu dispositivo, proporcionando fácil acesso às informações do
            passaporte quando necessário, sem comprometer a segurança.
          </Text>
          <Text
            style={[
              styles.textTitulo,
              { color: '#003053', fontSize: 15, marginBottom:10, marginTop:10},
            ]}
          >Por que escolher o LEITOR DE DOCUMENTOS da Casa da Moeda do Brasil:</Text>
          <Text style={styles.textTitulo}>
          Eficiência e Rapidez:
          </Text>
          <Text style={styles.textContent}>Nosso aplicativo é projetado para tornar o processo de leitura e validação do MRZ do passaporte rápido e eficiente</Text>
          <Text style={styles.textTitulo}>Segurança em Primeiro Lugar:</Text>
          <Text style={styles.textContent}>Priorizamos a segurança dos seus dados. Todas as informações são processadas localmente em seu dispositivo, garantindo total privacidade.</Text>
          <Text style={styles.textTitulo}>Interface Intuitiva: </Text>
          <Text style={styles.textContent}>Desenvolvemos uma interface amigável, tornando o LEITOR DE DOCUMENTOS acessível a todos, desde usuários iniciantes até os mais experientes.</Text>
          <Text style={styles.textTitulo}>Atualizações Regulares: </Text>
          <Text style={styles.textContent}>Estamos comprometidos em melhorar constantemente nosso aplicativo. Espere atualizações regulares com novos recursos e aprimoramentos para aprimorar ainda mais sua experiência.</Text>
          <View style={{ height: 200 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    color: BACKGROUND_COLOR,
  },
  scrollView: {
    width: "90%",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: BACKGROUND_COLOR,
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textTitulo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  textContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },
});

export default Sobre;
