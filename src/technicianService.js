import { db } from "./firebase";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Add Technician
export const addTechnician = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "technicians"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding technician: ", error);
    throw error;
  }
};

// Get Technicians
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

//  Get TechnicianById
export const getTechnicianById = async (id) => {
  const docRef = doc(db, "technicians", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Technician not found");
  }
};

// Update Technician
export const updateTechnician = async (id, data) =>{
  try {
    const ref = doc(db, "technicians", id);
    await updateDoc(ref, data);
  } catch (error) {
    console.error("Error updating technician: ", error)
    throw error
  }
}

// Delete Technician
export const deleteTechnician = async (id)=>{
  try {
    const ref =  doc (db, "technicians", id);
    await deleteDoc(ref)
  } catch (error) {
    console.error("Error deleting technician: ", error)
    throw error
  }
}