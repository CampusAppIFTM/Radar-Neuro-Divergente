import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { sair } from "../services/autenticacao";

import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import EmergenciaScreen from "../screens/EmergenciaScreen";
import PesquisaScreen from "../screens/PesquisaScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function StackNav({ usuario }) {
  const fotoUsuario = usuario?.photoURL;

  const sairDoAplicativo = async () => {
    await sair();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: styles.header,
          headerTintColor: "#073A70",
          headerTitleStyle: styles.tituloHeader,
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable accessibilityLabel="Sair da conta" accessibilityRole="button" onPress={sairDoAplicativo} style={styles.botaoSair}>
              <Image source={fotoUsuario ? { uri: fotoUsuario } : require("../assets/Rn.png")} style={styles.fotoUsuario} />
            </Pressable>
          ),
          animation: "none",
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Suporte em Crise" }} />

        <Stack.Screen name="Chats" component={ChatsScreen} options={{ title: "Seus Chats" }} />

        <Stack.Screen name="Emergencia" component={EmergenciaScreen} options={{ title: "Emergência" }} />

        <Stack.Screen name="Pesquisa" component={PesquisaScreen} options={{ title: "Pesquisa" }} />

        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: "Perfil" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D9EEF2",
  },
  tituloHeader: {
    color: "#0B3E73",
    fontSize: 20,
    fontWeight: "700",
  },
  logoHeader: {
    width: 80,
    height: 80,
    padding: 0,
    margin: 0,
  },
  tituloComLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  botaoSair: {
    marginRight: 16,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  fotoUsuario: {
    width: 36,
    height: 36,
    borderRadius: 19,
  },
});
