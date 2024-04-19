import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ScrollView,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  CameraPosition,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import Orientation from "react-native-orientation-locker";
import { runOnJS } from "react-native-reanimated";

import { BACKGROUND_COLOR } from "./styles";
import { MRZList, MrzObject } from "../types/types";
import Constantes from "../util/Constantes";
import { Formatar } from "../util/formatar";

const initialMRZList: MRZList = {
  documentType: [{ value: "", matchCount: 0 }],
  countryCode: [{ value: "", matchCount: 0 }],
  lastName: [{ value: "", matchCount: 0 }],
  firstName: [{ value: "", matchCount: 0 }],
  documentNumber: [{ value: "", matchCount: 0 }],
  nationality: [{ value: "", matchCount: 0 }],
  passportNumber: [{ value: "", matchCount: 0 }],
  birthDate: [{ value: "", matchCount: 0 }],
  sex: [{ value: "", matchCount: 0 }],
  expiryDate: [{ value: "", matchCount: 0 }],
  personalNumber: [{ value: "", matchCount: 0 }],
  checksum: [{ value: "", matchCount: 0 }],
  optionalData: [{ value: "", matchCount: 0 }],
};

const LerMrz = ({ navigation }) => {
  const [texto, setTexto] = useState("teste");
  const [isActive, setIsActive] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [deuMatch, setDeuMatch] = useState(false);
  const [mrzEcontradoList, setMrzEncontradoList] =
    useState<MRZList>(initialMRZList);
  const [mrzEncontrado, setMrzEncontrado] = useState<MrzObject>(undefined);
  const [animation] = useState(new Animated.Value(0));
  const [fotoOriginal, setFotoOriginal] = useState(undefined);
  const [fotoRecortada, setFotoRecortada] = useState(null);
  const [exibirDados, setExibirDados] = useState(false);
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const [salvar, setSalvar] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 300, // Ajuste para um valor menor para acelerar
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 300, // Ajuste para um valor menor para acelerar
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [animation]);

  const interpolatedScale1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.99, 1], // ajuste de 99% tirando efeito de zoom
  });

  const interpolatedScale2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1], // ajuste de 96% dando efeito de zoom
  });

  /* Setup inicial da screen */
  useEffect(() => {
    setMrzEncontrado(undefined);
    //resetMrzEncontradoList();
    // Bloquear a orientação para retrato
    Orientation.lockToPortrait();

    // Lembre-se de desbloquear a orientação ao desmontar o componente
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  /* Liga o flash da camera */
  const handleToggleFlash = () => {
    setIsFlashOn((prevState) => !prevState);
  };

  /* Pede permissão para utilizar CAMERA */
  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      if (permission === "denied") await Linking.openSettings();
    }
    getPermission();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);

  return (
    <View style={styles.container}>
      {device && isActive ? (
        <View style={styles.container}>
          <Camera
            ref={camera}
            photo={true}
            style={styles.camera}
            device={device}
            isActive={cameraStatus}
            torch={isFlashOn ? "on" : "off"}
            frameProcessor={frameProcessor}
          />
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              {!processando ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.InfoText}>Buscando um documento...</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    Lendo dados... Mantenha nessa posição!
                  </Text>
                  <Image
                    source={require("../assets/loadingMrz.gif")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          </View>

          <Animated.View
            style={[
              styles.docArea,
              {
                borderColor: processando ? "#167116" : "#FFF",
                transform: processando
                  ? [{ scale: interpolatedScale1 }]
                  : [{ scale: interpolatedScale2 }],
              },
            ]}
          ></Animated.View>

          <View style={styles.content}>
            <TouchableOpacity onPress={() => handleToggleFlash()}>
              <MaterialCommunityIcons
                name={isFlashOn ? "flash" : "flash-off"}
                size={35}
                style={styles.icone}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="close" size={35} style={styles.icone} />
            </TouchableOpacity>
          </View>
        </View>
      ) : undefined}

      {exibirDados ? (
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
            <Text style={styles.textoTitulo}>Dados do Documento</Text>
            <Text style={styles.textoSubTitulo}>MRZ</Text>
          </View>
          <View style={{ height: 10 }} />

          <ScrollView>
            <View style={styles.centerContent}>
              <View>
                {fotoRecortada !== null && (
                  <View
                    style={{
                      backgroundColor: "#d4d4d4",
                      borderRadius: 7,
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      marginBottom: 4,
                    }}
                  >
                    <Image
                      style={{
                        width: 120,
                        height: 170,
                        borderColor: Constantes.PRIMARY_COLOR,
                      }}
                      resizeMode="contain"
                      source={{ uri: `file://${fotoRecortada}` }}
                    />
                  </View>
                )}
              </View>
              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Tipo do Documento</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {Formatar.documentType(mrzEncontrado?.documentType)}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Código do país:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {mrzEncontrado?.countryCode}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Sobrenome:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {mrzEncontrado?.lastName}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Nome:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {mrzEncontrado?.firstName}
                  </Text>
                </View>
              </View>

              {mrzEncontrado?.documentNumber && (
                <View style={styles.linha}>
                  <View style={styles.coluna}>
                    <Text style={styles.texto}>Número do Documento:</Text>
                  </View>
                  <View style={styles.coluna}>
                    <Text style={styles.textoDados}>
                      {mrzEncontrado?.documentNumber}
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Nacionalidade:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {mrzEncontrado?.nationality}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Número do passaporte:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {mrzEncontrado?.passportNumber}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Data de Nascimento:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {Formatar.data(mrzEncontrado?.birthDate)}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Sexo:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {Formatar.sex(mrzEncontrado?.sex)}
                  </Text>
                </View>
              </View>

              <View style={styles.linha}>
                <View style={styles.coluna}>
                  <Text style={styles.texto}>Data de expiração:</Text>
                </View>
                <View style={styles.coluna}>
                  <Text style={styles.textoDados}>
                    {Formatar.expiryDate(mrzEncontrado?.expiryDate)}
                  </Text>
                </View>
              </View>

              {mrzEncontrado?.personalNumber && (
                <View style={styles.linha}>
                  <View style={styles.coluna}>
                    <Text style={styles.texto}>Número pessoal:</Text>
                  </View>
                  <View style={styles.coluna}>
                    <Text style={styles.textoDados}>
                      {mrzEncontrado?.personalNumber}
                    </Text>
                  </View>
                </View>
              )}

              {mrzEncontrado.optionalData && (
                <View style={styles.linha}>
                  <View style={styles.coluna}>
                    <Text style={styles.texto}>Dado Opcional:</Text>
                  </View>
                  <View style={styles.coluna}>
                    <Text style={styles.textoDados}>
                      {mrzEncontrado?.optionalData}
                    </Text>
                  </View>
                </View>
              )}
              {salvo && (
                <View style={styles.salvo}>
                  <Text style={{ fontSize: 18, color: "green" }}>
                    Salvo com Sucesso!
                  </Text>
                </View>
              )}
            </View>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              {salvar && (
                <TouchableOpacity
                  style={{
                    width: "90%",
                    backgroundColor: "#007bff",
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => console.log("Imprementar Depois")}
                >
                  <FontAwesome
                    name="save"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ color: "#fff", fontSize: 18 }}>Salvar</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  options: {
    position: "absolute",
    zIndex: 1,
    top: 100,
    right: 40,
  },
  content: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 56,
    bottom: 42,
    justifyContent: "space-around",
    alignContent: "space-around",
  },
  infoContainer: {
    flex: 1,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: {
    width: "100%",
    height: 80,
    backgroundColor: "#2a2a2a6c",
    justifyContent: "center",
    alignItems: "center",
  },
  InfoText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "700",
  },
  text: {
    color: "#fff",
    fontSize: 10,
  },
  icone: {
    color: "#ffffff",
  },
  botao: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 70,
    height: 70,
    color: "#f6f6f6",
  },
  docArea: {
    flex: 1,
    position: "absolute",
    zIndex: 1,
    width: "99%",
    height: 285,
    top: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderRadius: 15,
  },
  //Style da exibição dos Dados
  contentContainer: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
  contentDados: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
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
  linha: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "97%",
    padding: 10,
    backgroundColor: "#d4d4d4",
    marginBottom: 3,
    borderRadius: 7,
    paddingRight: 5,
  },
  salvo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "97%",
    padding: 10,
    marginTop: 10,
  },
  coluna: {
    flex: 1,
    fontSize: 1,
  },
  textoDados: {
    fontSize: 14,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 14,
  },
  foto: {
    flex: 1,
    width: 150,
  },
  fotoContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LerMrz;
