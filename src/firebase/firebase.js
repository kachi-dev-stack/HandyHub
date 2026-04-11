import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrv5rsBPoMbkJhK4fX7Z3o1QWRoSUtAtY",
  authDomain: "handyhub-16f7e.firebaseapp.com",
  projectId: "handyhub-16f7e",
  storageBucket: "handyhub-16f7e.appspot.com",
  messagingSenderId: "559152605817",
  appId: "1:559152605817:web:7bc38889a242ecb5d342a8",
};

const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
