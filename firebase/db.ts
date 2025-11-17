
import { getFirestore } from "firebase/firestore";
import app from "./config";

// Inicializa o Cloud Firestore e obtém a referência para o serviço.
const db = app ? getFirestore(app) : null;

export default db;
