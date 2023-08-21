// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; //authentication
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2IJYiS2mr0RnJIjIMabn9KOtFPOCmkC8",
  authDomain: "emailpassword-20dee.firebaseapp.com",
  projectId: "emailpassword-20dee",
  storageBucket: "emailpassword-20dee.appspot.com",
  messagingSenderId: "873421853551",
  appId: "1:873421853551:web:8acaec2e136f6941f00e9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //uygulamanın kendisini döndürecek
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
