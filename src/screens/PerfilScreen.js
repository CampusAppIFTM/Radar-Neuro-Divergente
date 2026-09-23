import React from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PerfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <Text style={styles.name}>Meu Perfil</Text>

        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Dados pessoais</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Configurações</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Privacidade</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Notificações</Text>
        </Pressable>
      </View>
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
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 30,
  },

  avatar: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: "#D1B9F6",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 55,
  },

  name: {
    marginTop: 20,

    fontSize: 26,
    fontWeight: "700",

    color: "#073A70",
  },

  option: {
    width: "100%",
    height: 60,

    marginTop: 15,

    borderRadius: 20,

    backgroundColor: "#D1B9F6",

    justifyContent: "center",
    paddingHorizontal: 25,
  },

  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#073A70",
  },
});
