/**
 * src/screens/HomeScreen.js
 * ---------------------------------------------------------------------------
 * Tela principal do Radar Neurodivergente exibida após a autenticação.
 * 
 * Apresenta o menu de navegação do aplicativo e o perfil do usuário logado.
 * ---------------------------------------------------------------------------
 */
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { sair } from "../services/autenticacao";

const HomeScreen = ({ usuario }) => {
  const [saindo, setSaindo] = useState(false);
  const navigation = useNavigation();

  const aoSair = async () => {
    setSaindo(true);
    try {
      await sair();
    } catch (e) {
      console.log("Falha ao sair:", e);
      setSaindo(false);
    }
  };

  const nomeExibicao = usuario?.displayName ?? "Usuário";
  const primeiroNome = nomeExibicao.split(" ")[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Radar Neurodivergente</Text>
      </View>

      <View style={styles.linhaSeparadora} />

      {/* Perfil Simplificado */}
      <View style={styles.perfilCard}>
        {usuario?.photoURL ? (
          <Image style={styles.foto} source={{ uri: usuario.photoURL }} />
        ) : (
          <View style={[styles.foto, styles.fotoVazia]}>
            <Text style={styles.inicial}>
              {nomeExibicao.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.infoUsuario}>
          <Text style={styles.saudacao}>Olá, {primeiroNome}!</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
        </View>
      </View>

      <Text style={styles.menuTitulo}>Menu Principal</Text>

      {/* Botões do Menu */}
      <TouchableOpacity
        style={styles.menuBotao}
        onPress={() => navigation.navigate("Match")}
      >
        <Text style={styles.menuBotaoTexto}>Seus Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuBotao, styles.botaoEmergencia]}
        onPress={() => navigation.navigate("Botaoemergencia")}
      >
        <Text style={[styles.menuBotaoTexto, styles.textoEmergencia]}>
          Botão de Emergência
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuBotao}
        onPress={() => navigation.navigate("Explore")}
      >
        <Text style={styles.menuBotaoTexto}>Pesquisar Usuários</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuBotao}
        onPress={() => navigation.navigate("Adicionar")}
      >
        <Text style={styles.menuBotaoTexto}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.botaoSair}
        onPress={aoSair}
        disabled={saindo}
      >
        <Text style={styles.botaoSairTexto}>
          {saindo ? "Saindo..." : "Sair da Conta"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF2F8",
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  tituloHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#123F7A",
  },
  linhaSeparadora: {
    width: "100%",
    height: 1,
    backgroundColor: "#CFCFCF",
    marginBottom: 20,
  },
  perfilCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  fotoVazia: {
    backgroundColor: "#123F7A",
    alignItems: "center",
    justifyContent: "center",
  },
  inicial: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  infoUsuario: {
    marginLeft: 16,
    flex: 1,
  },
  saudacao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#123F7A",
  },
  email: {
    fontSize: 13,
    color: "#555555",
    marginTop: 2,
  },
  menuTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#123F7A",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  menuBotao: {
    width: "100%",
    backgroundColor: "#D8C3FF",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  botaoEmergencia: {
    backgroundColor: "#FFCDD2",
    borderWidth: 1.5,
    borderColor: "#C62828",
  },
  menuBotaoTexto: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#123F7A",
  },
  textoEmergencia: {
    color: "#B71C1C",
  },
  botaoSair: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#C62828",
  },
  botaoSairTexto: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 15,
  },
});