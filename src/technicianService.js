import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addTechnician = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "technicians"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding technician: ", error);
    throw error;
  }
};

export const getTechnicians = async () => {
  try {
    const snapshot = await getDocs(collection(db, "technicians"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error Feching technicians: ", error);
    throw error;
  }
};
