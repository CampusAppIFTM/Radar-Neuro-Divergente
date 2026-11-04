/**
 * firebaseConfig.js
 * ---------------------------------------------------------------------------
 * Inicializa o Firebase e o serviço de autenticação.
 *
 * PONTO DE ATENÇÃO (o mais esquecido em React Native):
 * getAuth() guarda a sessão APENAS EM MEMÓRIA. Ao fechar e reabrir o app, o
 * usuário aparece deslogado. Para persistir a sessão no dispositivo é preciso
 * usar initializeAuth() informando explicitamente o AsyncStorage.
 *
 * Dependências:
 *   npx expo install firebase @react-native-async-storage/async-storage
 * ---------------------------------------------------------------------------
 */
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Estes valores vêm do console do Firebase (Configurações do projeto > Seus apps).
// Não são segredos, mas mantê-los em variáveis de ambiente evita commitá-los
// por engano e facilita trocar de projeto (desenvolvimento / produção).
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
function autenticar() {
  try {
    return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch (erro) {
    if (erro.code !== "auth/already-initialized") throw erro;
    return getAuth(app);
  }
}
export const auth = autenticar();
export const db = getFirestore(app);
if (process.env.EXPO_PUBLIC_USE_FIRESTORE_EMULATOR === "true" && !globalThis.__rndFirestoreEmulator) {
  connectFirestoreEmulator(db, process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST || "10.0.2.2", 8080);
  globalThis.__rndFirestoreEmulator = true;
}
