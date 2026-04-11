import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Sign Up
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    await signOut(auth);

    return user;
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

    await reload(user);

    if (!user.emailVerified) {
      await signOut(auth);
      throw Error("Please verify your email before logging in. ");
    }

    // Save user info to Firestore if it doesn't exist yet
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    let userData;

    try {
      if (!docSnap.exists()) {
        userData = {
          email: user.email,
          role: "user",
          status: "Active",
          dateJoined: serverTimestamp(),
        };
        await setDoc(docRef, userData);
      } else {
        userData = docSnap.data();
      }
    } catch (error) {
      console.error("Firestore error: ", error);

      userData = {
        email: user.email,
        role: "user",
        status: "Active",
      };
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
