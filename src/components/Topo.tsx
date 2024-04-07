import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";

const Topo = ({ navigation }) => {
  return (
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

      <View style={{ marginTop: 10, marginRight: 10 }}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 70, height:70  }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Topo;
