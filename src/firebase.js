import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrv5rsBPoMbkJhK4fX7Z3o1QWRoSUtAtY",
  authDomain: "handyhub-16f7e.firebaseapp.com",
  projectId: "handyhub-16f7e",
  storageBucket: "handyhub-16f7e.firebasestorage.app",
  messagingSenderId: "559152605817",
  appId: "1:559152605817:web:7bc38889a242ecb5d342a8",
};

const app = initializeApp(firebaseConfig);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);
