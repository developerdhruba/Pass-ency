// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA2eo2NdzNuQTr7FqKtKOuxs_zMjPshzWY",
  authDomain: "pass-vault-61782.firebaseapp.com",
  projectId: "pass-vault-61782",
  storageBucket: "pass-vault-61782.firebasestorage.app",
  messagingSenderId: "895384475260",
  appId: "1:895384475260:web:92de42eb1355bacf1adbf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
