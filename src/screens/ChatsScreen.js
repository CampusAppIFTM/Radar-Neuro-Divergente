import React from "react";

import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

const chats = [
  {
    id: "1",
    titulo: "Como estou me sentindo hoje?",
    data: "Hoje",
  },
  {
    id: "2",
    titulo: "Conversa sobre ansiedade",
    data: "Ontem",
  },
  {
    id: "3",
    titulo: "Preciso conversar",
    data: "15/09/2026",
  },
];

export default function ChatsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.chat}>
            <View style={styles.chatIcon}>
              <Text style={styles.chatIconText}>💬</Text>
            </View>

            <View style={styles.chatInfo}>
              <Text style={styles.chatTitle}>{item.titulo}</Text>

              <Text style={styles.chatDate}>{item.data}</Text>
            </View>
          </Pressable>
        )}
      />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

  list: {
    padding: 25,
  },

  chat: {
    flexDirection: "row",

    backgroundColor: "#D1B9F6",

    borderRadius: 25,

    padding: 20,

    marginBottom: 20,
  },

  chatIcon: {
    width: 55,
    height: 55,

    borderRadius: 30,

    backgroundColor: "#EFE6FF",

    justifyContent: "center",
    alignItems: "center",
  },

  chatIconText: {
    fontSize: 25,
  },

  chatInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  chatTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#073A70",
  },

  chatDate: {
    marginTop: 5,
    fontSize: 14,
    color: "#526579",
  },
});
