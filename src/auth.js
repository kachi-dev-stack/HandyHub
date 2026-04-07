import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const ADMIN_EMAIL = "wonyekachi67@gmail.com";

// Sign Up
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: user.email === ADMIN_EMAIL ? "admin" : "user",
      status: "Active",
      dateJoined: serverTimestamp(),
    });
    return userCredential;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
// Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    let userData;

    if (!docSnap.exists()) {
      userData = {
        email: user.email,
        role: user.email === ADMIN_EMAIL ? "admin" : "user",
        status: "Active",
        dateJoined: serverTimestamp(),
      };
      await setDoc(docRef, userData);
    } else {
      userData = docSnap.data();
    }

    if (userData.status === "Inactive") {
      await signOut(auth);
      throw new Error("Your account has been deactivated");
    }

    return userCredential;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  await signOut(auth);
};
