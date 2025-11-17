





import app from "./config";
// FIX: Using a named import for `getAuth` to resolve the module name collision with this file.
// The previous namespace import was incorrectly attempting to self-reference `firebase/auth.ts`.
import { getAuth } from "firebase/auth";

// Inicializa o Firebase Authentication e obtém a referência para o serviço.
const auth = app ? getAuth(app) : null;

export default auth;