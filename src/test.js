// // import { db } from "./firebase"; // adjust path if needed
// import { collection, addDoc, getDocs } from "firebase/firestore";

// //  Add test data
// export const testAdd = async () => {
//   try {
//     const docRef = await addDoc(collection(db, "technicians"), {
//       name: "Test Tech",
//       skill: "Electrician",
//       location: "Port Harcourt",
//       status: "Active",
//     });

//     console.log("Added successfully, ID:", docRef.id);
//   } catch (err) {
//     console.error("Error adding document:", err.message);
//   }
// };

// //  Fetch test data
// export const testFetch = async () => {
//   try {
//     const snapshot = await getDocs(collection(db, "technicians"));

//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     console.log("Fetched data:", data);
//   } catch (err) {
//     console.error("Error fetching data:", err.message);
//   }
// };
