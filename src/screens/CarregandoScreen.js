/**
 * src/screens/CarregandoScreen.js
 * ---------------------------------------------------------------------------
 * Tela exibida enquanto o Firebase verifica se existe uma sessão salva.
 * Evita o "flicker" (piscar) da tela de login ao abrir o aplicativo.
 * ---------------------------------------------------------------------------
 */
import { View, ActivityIndicator, StyleSheet, Image, Text } from "react-native";

const CarregandoScreen = () => (
  <View style={styles.container}>
    <Image
      source={require("../../assets/Rn.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.titulo}>Radar Neurodivergente</Text>
    <ActivityIndicator size="large" color="#10316B" style={styles.spinner} />
  </View>
);

export default CarregandoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9EDF5",
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10316B",
    marginBottom: 24,
  },
  spinner: {
    marginTop: 10,
  },
});