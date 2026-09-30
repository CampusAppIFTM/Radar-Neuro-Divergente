import React from "react";

import { View, Text, StyleSheet, Pressable, Alert, Linking } from "react-native";

export default function EmergenciaScreen({ navigation }) {
  const realizarEmergencia = () => {
    Alert.alert("Situação de emergência", "Você está em uma situação de emergência e precisa de ajuda imediata?", [
      {
        text: "Cancelar",
        style: "cancel",
      },

      {
        text: "Sim, preciso de ajuda",
        style: "destructive",
        onPress: () => {
          Linking.openURL("tel:192");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🆘</Text>

        <Text style={styles.heading}>Você precisa de ajuda?</Text>

        <Text style={styles.description}>
          Se você estiver em uma situação de emergência ou sentir que está em risco, procure ajuda imediatamente.
        </Text>

        <Pressable style={({ pressed }) => [styles.emergencyButton, pressed && styles.pressed]} onPress={realizarEmergencia}>
          <Text style={styles.emergencyText}>PRECISO DE AJUDA</Text>
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
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 35,
    paddingTop: 70,
  },

  icon: {
    fontSize: 65,
  },

  heading: {
    marginTop: 30,

    fontSize: 27,
    fontWeight: "700",

    color: "#073A70",

    textAlign: "center",
  },

  description: {
    marginTop: 20,

    fontSize: 18,
    lineHeight: 28,

    color: "#36536D",

    textAlign: "center",
  },

  emergencyButton: {
    marginTop: 50,

    width: "90%",
    height: 75,

    borderRadius: 30,

    backgroundColor: "#D1B9F6",

    justifyContent: "center",
    alignItems: "center",
  },

  emergencyText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#073A70",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
