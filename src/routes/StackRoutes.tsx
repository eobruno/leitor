import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import LerMrz from "../screens/LerMrz";
import ListarMrz from "../screens/ListarMrz";
import LerNfc from "../screens/LerNfc";

const StackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Principal" component={Home} />
      <Stack.Screen name="LerMrz" component={LerMrz} />
      <Stack.Screen name="ListarMrz" component={ListarMrz} />
      <Stack.Screen name="LerNfc" component={LerNfc} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
