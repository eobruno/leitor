import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas do seu aplicativo
import Home from "./src/screens/Home";
import TirarFoto from "./src/screens/TirarFoto";
import ListarMrz from "./src/screens/ListarMrz";
import LerMrz from "./src/screens/LerMrz";

import Router from "./src/routes/Router";

const App = () => {
  return <Router />;
};

export default App;