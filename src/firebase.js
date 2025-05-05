import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT2ENUBd8CWW1_N3cYie87S7TYlJDlO4M",
  authDomain: "dsl-si.firebaseapp.com",
  projectId: "dsl-si",
  storageBucket: "dsl-si.appspot.com",
  messagingSenderId: "906468597461",
  appId: "1:906468597461:web:0801bc0fa0070e29be8c5c",
  measurementId: "G-PZT2CRYZT7"
};

// ✔️ spriječi dupli init
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


export { db };
