
// ATENÇÃO: Substitua os valores placeholder abaixo pelas suas credenciais reais do Firebase.
// Em um projeto de produção, estes valores devem ser carregados a partir de variáveis de ambiente.

const getEnv = (key: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    return import.meta.env[key];
  }
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env) {
    // @ts-ignore
    return process.env[key];
  }
  return '';
};

export const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY") || getEnv("REACT_APP_FIREBASE_API_KEY") || "YOUR_API_KEY_HERE",
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN") || getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN") || "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID") || getEnv("REACT_APP_FIREBASE_PROJECT_ID") || "YOUR_PROJECT_ID",
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET") || getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET") || "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID") || getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID") || "YOUR_MESSAGING_SENDER_ID",
  appId: getEnv("VITE_FIREBASE_APP_ID") || getEnv("REACT_APP_FIREBASE_APP_ID") || "YOUR_APP_ID"
};
