import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAutenticacao } from "../contexts/AuthContext";
import AtividadesScreen from "../screens/AtividadesScreen";

import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import EmergenciaScreen from "../screens/EmergenciaScreen";
import PesquisaScreen from "../screens/PesquisaScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  const { sair, ocupado } = useAutenticacao();

  const sairDoAplicativo = async () => {
    try { await sair(); } catch { Alert.alert("Não foi possível sair", "Tente novamente."); }
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
            <Pressable accessibilityLabel="Sair da conta" accessibilityRole="button" onPress={sairDoAplicativo} disabled={ocupado} style={styles.botaoSair}>
              <Text style={{ color: "#073A70", fontWeight: "700" }}>{ocupado ? "Saindo…" : "Sair"}</Text>
            </Pressable>
          ),
          animation: "none",
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Radar Neurodivergente" }} />

        <Stack.Screen name="Atividades" component={AtividadesScreen} options={{ title: "Minhas atividades" }} />

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
