import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiRzLDM68DkcW9OQ7CjRn8xVm8cO5Gquk",
  authDomain: "social-media-6795e.firebaseapp.com",
  projectId: "social-media-6795e",
  storageBucket: "social-media-6795e.appspot.com",
  messagingSenderId: "749516680986",
  appId: "1:749516680986:web:16275e47fd214ec8b286a3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
