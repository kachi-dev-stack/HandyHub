import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const USERS = [
  {
    email: "uche.okeke@gmail.com",
    status: "Active",
    dateJoined: "2024-01-15",
  },
  {
    email: "chinenye.obi@yahoo.com",
    status: "Active",
    dateJoined: "2024-02-20",
  },
  {
    email: "emmanuel.eze@hotmail.com",
    status: "Inactive",
    dateJoined: "2024-03-05",
  },
  {
    email: "blessing.nwosu@gmail.com",
    status: "Active",
    dateJoined: "2024-03-18",
  },
  {
    email: "kelvin.okafor@outlook.com",
    status: "Inactive",
    dateJoined: "2024-04-02",
  },
  {
    email: "adaeze.okeke@gmail.com",
    status: "Active",
    dateJoined: "2024-04-10",
  },
  {
    email: "somto.eze@email.com",
    status: "Active",
    dateJoined: "2024-05-01",
  },
  {
    email: "obinna.maduka@gmail.com",
    status: "Inactive",
    dateJoined: "2024-05-15",
  },
];

export const seedUsers = async () => {
  for (const user of USERS) {
    const q = query(collection(db, "users"), where("email", "==", user.email));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await addDoc(collection(db, "users"), user);
      console.log("Added:", user.email);
    } else {
      console.log("Skipped:", user.email);
    }
  }
};
