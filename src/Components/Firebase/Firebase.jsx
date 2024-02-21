import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNmRHAiMxhzz--lS1CakBCmNFy-k10bjE",
  authDomain: "socialvibe-49082.firebaseapp.com",
  projectId: "socialvibe-49082",
  storageBucket: "socialvibe-49082.appspot.com",
  messagingSenderId: "190702308199",
  appId: "1:190702308199:web:2017b82eccf2fbb2697dc2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
