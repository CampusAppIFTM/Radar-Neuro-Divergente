import React, { useState } from "react";

import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";

export default function PesquisaScreen({ navigation }) {
  const [resposta, setResposta] = useState("");

  const enviarPesquisa = () => {
    console.log("Resposta enviada:", resposta);

    alert("Obrigado por responder à pesquisa!");

    setResposta("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Como você está se sentindo?</Text>

        <Text style={styles.description}>Sua resposta pode nos ajudar a melhorar o suporte oferecido pelo aplicativo.</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua resposta..."
          placeholderTextColor="#71879A"
          value={resposta}
          onChangeText={setResposta}
          multiline
          textAlignVertical="top"
        />

        <Pressable style={styles.button} onPress={enviarPesquisa}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9EEF2",
  },

  header: {
    height: 95,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 20,

    width: 45,
    height: 45,

    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 45,
    color: "#073A70",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0B3E73",
  },

  separator: {
    height: 1,
    backgroundColor: "#B7C9CD",
    marginHorizontal: 15,
  },

  content: {
    padding: 30,
  },

  heading: {
    fontSize: 25,
    fontWeight: "700",
    color: "#073A70",
    textAlign: "center",
    marginBottom: 20,
  },

  description: {
    fontSize: 17,
    color: "#36536D",
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    height: 180,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    fontSize: 17,

    color: "#073A70",

    borderWidth: 1,
    borderColor: "#B7C9CD",
  },

  button: {
    height: 65,

    marginTop: 25,

    borderRadius: 30,

    backgroundColor: "#D1B9F6",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#073A70",
  },
});
