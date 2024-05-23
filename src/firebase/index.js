import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import Firebase Auth

const firebaseConfig = {
  apiKey: "AIzaSyBL7GIJzHYoYIUREBCZNDnt5HI_z8bsBnM",
  authDomain: "pfe-3s.firebaseapp.com",
  projectId: "pfe-3s",
  storageBucket: "pfe-3s.appspot.com",
  messagingSenderId: "248788357144",
  appId: "1:248788357144:web:3c30e05a271d164eafb36d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Auth

export { db, auth };

