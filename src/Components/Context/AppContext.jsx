import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, onAuthStateChanged } from "../Firebase/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const collectionUserRef = collection(db, "users");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const user = data.user;
      const q = query(collectionUserRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      console.log("docs", docs);
      if (docs.docs.length === 0) {
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: user?.providerId,
        });
      }
    } catch (error) {
      alert(error.messages);
      console.log(error.messages);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.messages);
      console.log(error.messages);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const user = data.user;
      await addDoc(collectionUserRef, {
        uid: user.uid,
        name,
        email: user.email,
        authProvider: "email/password",
      });
    } catch (error) {
      alert(error.messages);
    }
  };

  const sendPasswordToUser = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("New Password send to your email");
    } catch (error) {
      alert(error.messages);
      console.log(error.messages);
    }
  };
  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
          console.log("DOC", doc);
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    userStateChanged();
    if (user || userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
    return () => userStateChanged();
  }, []);
  console.log("user", user);
  console.log("userData", userData);

  const initialState = {
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPasswordToUser: sendPasswordToUser,
    signOutUser: signOutUser,
    userStateChanged: userStateChanged,
    user,
    userData,
  };

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext, AppContext };
