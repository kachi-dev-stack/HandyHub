import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { onAuthStateChanged, reload, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "./components/UIS/Spinner";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Reload the user to get fresh info from firebase
          await reload(currentUser);

          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            await signOut(auth);
            setUser(null);
            setRole(null);
            return;
          }

          const userData = docSnap.data();

          // lock inactive users
          if (userData.status === "Inactive") {
            await signOut(auth);
            alert("Your account has been deactivated. ");
            setUser(null);
            setRole(null);
            return;
          }

          // Force logout if email in firestore != auth email

          if (userData.email && userData.email !== currentUser.email) {
            await signOut(auth);
            alert("Email changed. Please log in again with your new email. ");
            setUser(null);
            setRole(null);
            return;
          }

          setUser(currentUser);
          setRole(docSnap.data()?.role);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
