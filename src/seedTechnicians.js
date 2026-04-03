import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { TECHNICIANS } from "./config";

export const seedTechnicians = async () => {
  try {
    for (const tech of TECHNICIANS) {
      const q = query(
        collection(db, "technicians"),
        where("email", "==", tech.email),
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(collection(db, "technicians"), tech);
        console.log("Added:", tech.name);
      } else {
        console.log("Skipped (exists):", tech.email);
      }
    }

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error:", error);
  }
};
