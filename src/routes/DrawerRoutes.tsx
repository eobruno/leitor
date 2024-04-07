import React, { useCallback } from "react";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DrawerItem } from "@react-navigation/drawer";

import { BACKGROUND_COLOR, PRIMARY_COLOR, styles } from "../screens/styles";
import StackRoutes from "./StackRoutes";
import LerNfc from "../screens/LerNfc";
import Sobre from "../screens/Sobre";
import Teste from "../screens/Teste";

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  const navigation = useNavigation();

  const handleConfiguracao = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fffffff7",
        },
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <StatusBar
              backgroundColor={`${BACKGROUND_COLOR}`}
              barStyle="dark-content"
            />
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 150, height: 100 }}
                resizeMode="contain"
              />
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Configurações"
              onPress={() => handleConfiguracao()}
              labelStyle={{
                color: PRIMARY_COLOR, // Cor do texto
                fontSize: 12, // Tamanho da fonte
              }}
              icon={() => (
                <SimpleLineIcons
                  name="settings"
                  size={30}
                  style={styles.PRIMARY_COLOR}
                />
              )}
            />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerActiveBackgroundColor: "#00305318",
          drawerActiveTintColor: styles.PRIMARY_COLOR.color,
          drawerIcon: () => (
            <SimpleLineIcons
              name="home"
              size={30}
              style={styles.PRIMARY_COLOR}
            />
          ),
        }}
        component={StackRoutes}
      />
      {/*       <Drawer.Screen
        name="contato"
        options={{
          drawerLabel: "Contato",
          title: "Contato",
          drawerActiveBackgroundColor: "#00305318",
          drawerActiveTintColor: styles.PRIMARY_COLOR.color,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="message-alert-outline"
              size={30}
              style={styles.PRIMARY_COLOR}
            />
          ),
        }}
        component={Teste1}
      /> */}
      <Drawer.Screen
        name="Sobre"
        options={{
          drawerLabel: "Sobre",
          title: "Sobre",
          drawerActiveBackgroundColor: "#00305318",
          drawerActiveTintColor: styles.PRIMARY_COLOR.color,
          drawerIcon: () => (
            <SimpleLineIcons
              name="info"
              size={30}
              style={styles.PRIMARY_COLOR}
            />
          ),
        }}
        component={Sobre}
      />
 {/*      <Drawer.Screen
        name="Teste"
        options={{
          drawerLabel: "Teste",
          title: "Sobre",
          drawerActiveBackgroundColor: "#00305318",
          drawerActiveTintColor: styles.PRIMARY_COLOR.color,
          drawerIcon: () => (
            <SimpleLineIcons
              name="info"
              size={30}
              style={styles.PRIMARY_COLOR}
            />
          ),
        }}
        component={Teste}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
