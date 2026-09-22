/**
 * src/services/autenticacao.js
 * ---------------------------------------------------------------------------
 * Camada de serviço: concentra TODA a conversa com o Google e com o Firebase.
 * ---------------------------------------------------------------------------
 */
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

/**
 * Valida se o e-mail pertence ao domínio institucional do IFTM.
 */
export function validarEmailIFTM(email) {
  if (!email) return false;
  const emailLower = email.trim().toLowerCase();
  return (
    emailLower.endsWith("@iftm.edu.br") ||
    emailLower.endsWith("@estudante.iftm.edu.br")
  );
}

/**
 * Configura a biblioteca do Google.
 */
export function configurarGoogleSignin() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });
}

/**
 * Registra um observador do estado de autenticação.
 */
export function observarUsuario(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Executa o login com o Google, converte em sessão do Firebase e
 * garante que APENAS e-mails do IFTM loguem no aplicativo.
 */
export async function entrarComGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const resposta = await GoogleSignin.signIn();

  if (resposta.type === "cancelled") {
    return { cancelado: true };
  }

  const idToken = resposta.data?.idToken;

  if (!idToken) {
    throw new Error(
      "O Google não devolveu o idToken. Verifique o webClientId informado em configurarGoogleSignin()."
    );
  }

  const credencial = GoogleAuthProvider.credential(idToken);
  const resultadoFirebase = await signInWithCredential(auth, credencial);
  const usuarioLogado = resultadoFirebase.user;

  // VERIFICAÇÃO DE DOMÍNIO DO IFTM
  if (!validarEmailIFTM(usuarioLogado.email)) {
    // Se não for e-mail do IFTM, derruba a sessão do Google e do Firebase imediatamente
    await sair();
    throw new Error(
      "Acesso Negado: Apenas contas institucionais do IFTM (@iftm.edu.br ou @estudante.iftm.edu.br) são permitidas."
    );
  }

  return { cancelado: false };
}

/**
 * Encerra a sessão no Google e no Firebase.
 */
export async function sair() {
  try {
    await GoogleSignin.signOut();
  } catch (e) {
    // Evita erros caso o usuário não estivesse logado no SDK nativo do Google
  }
  await signOut(auth);
}

/**
 * Traduz os códigos de erro para mensagens amigáveis em português.
 */
export function descreverErro(erro) {
  if (erro?.message && erro.message.includes("Acesso Negado")) {
    return erro.message;
  }

  switch (erro?.code) {
    case statusCodes.IN_PROGRESS:
      return "Já existe um login em andamento. Aguarde.";
    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      return "Este dispositivo não possui o Google Play Services atualizado.";
    case statusCodes.SIGN_IN_CANCELLED:
      return null;
    default:
      return erro?.message || "Não foi possível entrar com o Google. Tente novamente.";
  }
}