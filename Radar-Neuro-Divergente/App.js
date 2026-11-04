import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAutenticacao } from "./src/contexts/AuthContext";
import CarregandoScreen from "./src/screens/CarregandoScreen";
import LoginScreen from "./src/screens/LoginScreen";
import StackNav from "./src/navigators/StackNav";
export function RotasProtegidas() {
  const { usuario, verificando } = useAutenticacao();
  if (verificando) return <CarregandoScreen />;
  // Desmontar toda a árvore privada impede voltar às telas depois do logout.
  return usuario ? <StackNav key={usuario.uid} /> : <LoginScreen />;
}
export default function App() {
  return <SafeAreaProvider><AuthProvider><StatusBar style="dark" /><RotasProtegidas /></AuthProvider></SafeAreaProvider>;
}
