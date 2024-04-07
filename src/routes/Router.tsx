import { NavigationContainer } from "@react-navigation/native";

import DrawerRoutes from "./DrawerRoutes";

const App = () => {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
};

export default App;
