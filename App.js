import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import MatchScreen from './src/screens/MatchScreen';
import AdicionarScreen from './src/screens/AdicionarScreen';
import BotaoemergenciaScreen from './src/screens/BotaoemergenciaScreen';
import CriarContaScreen from './src/screens/CriarContaScreen';
import HomeScreen from './src/screens/HomeScreen';
import CarregandoScreen from './src/screens/CarregandoScreen';

const Stack = createStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Monitora o estado de autenticação em tempo real
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  if (carregando) {
    return <CarregandoScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={usuario ? "Profile" : "Login"} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CriarConta" component={CriarContaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Adicionar" component={AdicionarScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Botaoemergencia" component={BotaoemergenciaScreen} />
        <Stack.Screen name="Carregando" component={CarregandoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}