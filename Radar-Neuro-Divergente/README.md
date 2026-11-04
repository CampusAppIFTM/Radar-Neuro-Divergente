# Radar Neurodivergente — Issue #102 e atividades Firestore

Projeto completo baseado em https://github.com/CampusAppIFTM/Radar-Neuro-Divergente no commit `b13aa14e39eb1bbc4f743d8078a9e7ee3447c9b0`.

Esta entrega implementa a issue [RND-04 #102](https://github.com/CampusAppIFTM/Radar-Neuro-Divergente/issues/102) e adapta os três exercícios dos PDFs ao contexto do aplicativo. Mantém o visual azul/lilás, logo, login institucional e as rotas do repositório. Não é um aplicativo separado do projeto original.

## O que foi implementado

- `AuthProvider` e `useAutenticacao()`: objeto `user`/`usuario` global, verificação da sessão, login, logout e erros.
- Rotas condicionais: verificando → carregamento; sem usuário → Login; autenticado → árvore privada. O logout desmonta a navegação privada.
- Home com nome, foto Google, e-mail e fallback para conta sem foto. Perfil também usa o Context.
- Persistência do Firebase Auth usando `initializeAuth` e `getReactNativePersistence(AsyncStorage)`.
- Minhas atividades: criar, concluir, etiquetas com `arrayUnion`/`arrayRemove`, filtro `array-contains` no servidor e atualizações em tempo real.
- Arquivamento por `runTransaction`, preservando ID e campos, usando `serverTimestamp`, com erro claro quando a origem não existe.
- Lista de arquivadas e suas datas. Os documentos arquivados não podem ser editados ou apagados pelas regras.
- Botão para executar as oito consultas e compartilhar o registro real, inclusive mensagens completas de erros.
- Regras Firestore com isolamento por UID e e-mail institucional verificado; índices compostos e testes executáveis.

As telas originais **Chats, Pesquisa e Emergência foram preservadas**. Chats continua com a lista demonstrativa do repositório e Pesquisa continua com seu formulário demonstrativo, sem envio ao servidor. Elas não foram transformadas em chat com atendimento ou pesquisa de produção: essas funcionalidades não são requisitos da issue #102 nem dos três exercícios. Os botões originais de configurações do Perfil também são protótipos.

## Rodar no Android

Requisitos: Node 22.13 ou superior (validado com Node 24), Java 21, Android Studio com SDK e emulador com Google Play, ou celular Android com depuração USB.

```bash
npm ci
npm run check:expo
npx expo prebuild --platform android
npm run android
```

**Use build nativo, não Expo Go.** O projeto conserva Expo SDK 55 do repositório; o patch foi ajustado para `55.0.32`. Não foi migrado ao SDK 57 da apostila.

O pacote conserva os arquivos de configuração cliente Firebase/Google existentes no repositório. Se usar outro projeto, copie `.env.example` para `.env`, preencha os valores do app Web Firebase, substitua `google-services.json` e configure o Firebase Console:

1. Ative Authentication → Google.
2. Cadastre o app Android com o pacote `radarneurodivergente.com`, igual ao `app.json`.
3. Cadastre o SHA-1 da chave de depuração da sua máquina. Mesmo com os arquivos existentes, esta etapa pode ser necessária para o login no seu computador.
4. Use o OAuth client de tipo **Web** (`client_type: 3`) em `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`.
5. Crie o banco Cloud Firestore em modo de produção e publique as regras e os índices desta entrega.

Para consultar o SHA-1 após o prebuild:

```bash
cd android
./gradlew signingReport
```

No Windows, use `gradlew.bat signingReport`. Volte à raiz antes dos próximos comandos.

Depois de gerar o aplicativo pela primeira vez, `npm start` inicia o Metro para o build instalado. Alterações em configuração nativa exigem novo prebuild/build.

## Publicar regras e índices no seu Firebase

```bash
npx firebase login
npx firebase deploy --project SEU_PROJECT_ID --only firestore:rules,firestore:indexes
```

Substitua `SEU_PROJECT_ID` pelo valor do `.env`. Este comando deve ser executado por quem administra o projeto. Nenhuma regra, índice ou dado foi publicado no projeto real durante esta entrega. Aguarde os índices ficarem prontos no console para testar os filtros.

## Estrutura dos dados

- `usuarios/{uid}/atividades/{atividadeId}`
- `usuarios/{uid}/atividades_arquivadas/{atividadeId}`

Atividade: `titulo` (3–80 caracteres), `prioridade` (inteiro de 1–5), `concluido` (booleano), `etiquetas` (array), `criadoEm` (timestamp). O arquivo acrescenta `arquivadoEm` (timestamp).

O isolamento é feito pelo caminho, validado nas regras: o usuário A não lê nem altera dados de B. As consultas não precisam baixar a coleção dos outros usuários. Os dados de teste têm apenas exemplos de organização acadêmica.

## Testes e evidências

```bash
npm test
npm run test:firestore
npm run export:android
```

- `npm test`: sete testes de Context e rotas com React real e serviços nativos/rede substituídos por mocks.
- `npm run test:firestore`: doze testes no emulador real, incluindo consultas, etiquetas, listener, arquivamento, recusa de regras e isolamento entre contas.
- O teste das oito consultas usa `tests/fixtures.mjs`, grava `docs/evidencias/consultas-emulador.json` e comprova as contagens 8, 5, 4, 5, 5, 3, 3 e 8.
- Logs reais desta entrega e caderno de consultas estão em `docs/`.

O comando de testes usa somente `demo-radar-neurodivergente` e limpa o banco de teste entre casos. Ele não usa a configuração de produção do aplicativo. Java e acesso à internet são necessários para o download inicial do emulador.

A validação em celular — escolha de conta Google, foto real, fechar/reabrir o processo e botão Voltar após logout — permanece necessária. Aqui foram executados testes automatizados, exportação Android e prebuild; não foi produzido APK nem realizado login Google em aparelho.

## Testar o aplicativo com Firestore local

O Auth continua usando o Google/Firebase real; somente as atividades usam o emulador Firestore.

1. Configure `.env` com os valores do projeto de autenticação e `EXPO_PUBLIC_USE_FIRESTORE_EMULATOR=true`.
2. Configure `EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST=10.0.2.2` para o emulador Android ou o IP local do computador para celular físico.
3. Execute `npm run emulador`. Ele usa o mesmo project ID do `.env`, para manter compatibilidade com o Auth.
4. Execute `npm run android` em outro terminal, entre com a conta institucional e crie atividades.
5. Para voltar ao banco remoto, use `EXPO_PUBLIC_USE_FIRESTORE_EMULATOR=false` e reinicie o Metro.

Não execute a suíte que limpa o banco enquanto usa esse emulador para demonstração. O teste automatizado usa um ID `demo-` separado.

## Checklist de aceite da issue #102

- [x] Login/Home condicionais e bloqueio durante restauração.
- [x] Home exibe nome e foto do usuário Google/Firebase.
- [x] Usuário global via Context, disponível a todas as telas.
- [x] Persistência nativa configurada com AsyncStorage.
- [x] Logout dos serviços Google e Firebase e retorno ao Login.
- [ ] Validação final no celular: fechar/reabrir, login Google real e impossibilidade de voltar às telas privadas após sair.

## Arquivos principais

`App.js`, `firebaseConfig.js`, `src/contexts/AuthContext.js`, `src/services/autenticacao.js`, `src/services/atividadesCore.js`, `src/services/atividadesService.js`, `src/screens/AtividadesScreen.js`, `firestore.rules`, `firestore.indexes.json`, `tests/`, `docs/`.
