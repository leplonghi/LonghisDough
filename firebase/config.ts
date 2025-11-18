
import { initializeApp, getApp, getApps } from "firebase/app";

// ATENÇÃO: Substitua os valores placeholder abaixo pelas suas credenciais reais do Firebase.
// Em um projeto de produção, estes valores devem ser carregados a partir de variáveis de ambiente
// para garantir a segurança de suas chaves.
//
// ATTENTION: Replace the placeholder values below with your actual Firebase credentials.
// In a production project, these values should be loaded from environment variables
// to ensure your keys are secure.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if the config values are placeholders
const isConfigValid = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && firebaseConfig.projectId !== "YOUR_PROJECT_ID";

// Initialize Firebase only if the config is valid.
const app = isConfigValid
  ? getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  : null;

if (!isConfigValid) {
  console.warn(
    "A configuração do Firebase está ausente ou usa valores de placeholder. " +
    "Recursos dependentes do Firebase (como autenticação e banco de dados Firestore) serão desativados."
  );
}

export default app;