// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-A2hBB-wZuWKv0Igj9B99bMfn6rJL9Ac",
  authDomain: "rachadev-032.firebaseapp.com",
  projectId: "rachadev-032",
  storageBucket: "rachadev-032.firebasestorage.app",
  messagingSenderId: "71083152147",
  appId: "1:71083152147:web:bc1926d1d9c954aa9500e6",
  measurementId: "G-91JP26V0K2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth;

// const db = getDatabase();
const db = getFirestore(app);
export { auth, db };

