import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb8ymDxnNiTaumohQVUPFNBM6y_cfWxyc",
  authDomain: "socialmedia-1e68d.firebaseapp.com",
  projectId: "socialmedia-1e68d",
  storageBucket: "socialmedia-1e68d.appspot.com",
  messagingSenderId: "756865225792",
  appId: "1:756865225792:web:baed4183c2f3ed7c097ba5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
