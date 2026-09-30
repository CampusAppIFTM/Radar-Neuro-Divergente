import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#D9EEF2" />

      {/* BOTÕES */}

      <View style={styles.menuContainer}>
        <View style={styles.button3dWrapper}>
          <Pressable style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]} onPress={() => navigation.navigate("Chats")}>
            <Text style={styles.buttonText}>Seus Chats</Text>
          </Pressable>
        </View>

        <View style={styles.button3dWrapper}>
          <Pressable style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]} onPress={() => navigation.navigate("Emergencia")}>
            <Text style={styles.buttonText}>Emergência</Text>
          </Pressable>
        </View>

        <View style={styles.button3dWrapper}>
          <Pressable style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]} onPress={() => navigation.navigate("Pesquisa")}>
            <Text style={styles.buttonText}>Pesquisa</Text>
          </Pressable>
        </View>

        <View style={styles.button3dWrapper}>
          <Pressable style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]} onPress={() => navigation.navigate("Perfil")}>
            <Text style={styles.buttonText}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
    position: "relative",
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 27,

    width: 45,
    height: 45,

    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 45,
    fontWeight: "200",
    color: "#082F5B",

    lineHeight: 45,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0B3E73",
  },

  logo: {
    position: "absolute",
    right: 18,
    top: 12,

    width: 90,
    alignItems: "center",
  },

  logoIcon: {
    fontSize: 35,
  },

  logoText: {
    fontSize: 8,
    color: "#4B267D",
    fontWeight: "600",
    textAlign: "center",
  },

  separator: {
    height: 1,
    backgroundColor: "#B7C9CD",
    marginHorizontal: 15,
  },

  menuTitle: {
    fontSize: 34,
    fontWeight: "400",
    color: "#0B3E73",

    textAlign: "center",

    marginTop: 18,
    marginBottom: 55,
  },

  menuContainer: {
    alignItems: "center",
  },

  button3dWrapper: {
    width: "68%",
    height: 80,
    marginBottom: 40,
    borderRadius: 40,
    backgroundColor: "#9879C2",
    shadowColor: "#5F4A82",
    elevation: 10,
  },

  menuButton: {
    width: "100%",
    height: 74,
    backgroundColor: "#D1B9F6",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#E8DDFB",
  },

  buttonPressed: {
    opacity: 0.94,
    transform: [{ translateY: 6 }],
  },

  buttonText: {
    color: "#073A70",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});
