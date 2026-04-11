import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
