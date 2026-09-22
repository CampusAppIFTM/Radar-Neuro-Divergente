/**
 * src/screens/LoginScreen.js
 * ---------------------------------------------------------------------------
 * Tela de login com Google direcionada para a comunidade IFTM.
 * ---------------------------------------------------------------------------
 */
import { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { entrarComGoogle, descreverErro } from "../services/autenticacao";

const LoginScreen = () => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const aoPressionar = async () => {
    setErro(null);
    setCarregando(true);

    try {
      await entrarComGoogle();
      // Se der certo, a navegação é alterada automaticamente via observarUsuario() em App.js
    } catch (e) {
      console.log("Falha no login com Google:", e);
      setErro(descreverErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho do App */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/Rn.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>Radar Neurodivergente</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.subtitulo}>Acesso exclusivo para a comunidade IFTM</Text>
        <Text style={styles.instrucao}>
          Utilize o seu e-mail institucional (@iftm.edu.br ou @estudante.iftm.edu.br) para entrar.
        </Text>

        {/* Botão Oficial do Google */}
        <GoogleSigninButton
          style={styles.botaoGoogle}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={aoPressionar}
          disabled={carregando}
        />

        {/* Área de Avisos / Erros */}
        <View style={styles.areaAviso}>
          {carregando && <ActivityIndicator color="#10316B" size="large" />}
          {erro && <Text style={styles.erro}>{erro}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9EDF5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#B0C9D6",
    marginTop: 20,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10316B",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10316B",
    textAlign: "center",
    marginBottom: 8,
  },
  instrucao: {
    fontSize: 14,
    color: "#4A6572",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  botaoGoogle: {
    width: 250,
    height: 52,
  },
  areaAviso: {
    marginTop: 24,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  erro: {
    color: "#C62828",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});