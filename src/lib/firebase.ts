import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT4TVb8faIPPDyBTcCqJzYE4gYA77UWtE",
  authDomain: "parmak-klavye.firebaseapp.com",
  projectId: "parmak-klavye",
  storageBucket: "parmak-klavye.firebasestorage.app",
  messagingSenderId: "339951222574",
  appId: "1:339951222574:web:0d97e49abcb13f4d4644bf",
  measurementId: "G-5CWSB7Y8XE"
};

// Initialize Firebase safely
let app;
let db: any;

if (typeof window !== "undefined") {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { app, db };
