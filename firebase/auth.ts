import app from "./config";
// FIX: Use named import for modular Firebase SDK.
import { getAuth } from 'firebase/auth';

// Initializes Firebase Authentication and gets a reference to the service.
const auth = app ? getAuth(app) : null;

export default auth;