"use client";

import { useEffect } from "react";
import { auth } from "@/utils/firebase";
import { setPersistence, browserLocalPersistence, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";


const FirebaseAuthClient = () => {
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: "/explore",
        signInOptions: [
          {
            provider: GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
              prompt: "select_account",
            },
          },
          EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: async (authResult) => {
            const user = authResult.user;
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);
      
            // If user doc doesn't exist, create one
            if (!snap.exists()) {
              await setDoc(userRef, {
                name: user.displayName || "",
                email: user.email || "",
                bio: "",
                avatar: user.photoURL || "", // Optional: prefill Google avatar
              });
            }
      
            return true; // redirect to signInSuccessUrl
          },
          uiShown: () => {
            const loader = document.getElementById("loader");
            if (loader) loader.style.display = "none";
          },
        },
      };
      

    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div>
      <div id="firebaseui-auth-container" />
      <div id="loader">Loading...</div>
    </div>
  );
};

export default FirebaseAuthClient;
