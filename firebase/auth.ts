import app from "./config";
// FIX: Importing from '@firebase/auth' to avoid name collision with this file ('firebase/auth.ts')
import { getAuth } from '@firebase/auth';

// Initializes Firebase Authentication and gets a reference to the service.
const auth = app ? getAuth(app) : null;

export default auth;