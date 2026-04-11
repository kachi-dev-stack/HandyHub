// import { db } from "../firebase";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// const TECHNICIANS = [
//   {
//     name: "Chinedu Okafor",
//     skill: "Electrician",
//     location: "Enugu, Enugu State",
//     status: "Active",
//     email: "chinedu.okafor@gmail.com",
//     phone: "+234 803 112 4455",
//     bio: "Experienced electrician specializing in residential and commercial wiring, installations, and repairs.",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     portfolio: [
//       {
//         title: "House Wiring Project",
//         url: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
//       },
//       {
//         title: "Electrical Panel Setup",
//         url: "https://images.pexels.com/photos/159397/electrical-installation-159397.jpeg",
//       },
//       {
//         title: "Lighting Installation",
//         url: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Amina Bello",
//     skill: "Plumber",
//     location: "Abuja, FCT",
//     status: "Active",
//     email: "amina.bello@gmail.com",
//     phone: "+234 809 223 7788",
//     bio: "Professional plumber handling pipe installations, leak repairs, and bathroom fittings.",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     portfolio: [
//       {
//         title: "Bathroom Installation",
//         url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
//       },
//       {
//         title: "Pipe Repair Work",
//         url: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
//       },
//       {
//         title: "Kitchen Plumbing Setup",
//         url: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
//       },
//       {
//         title: "Water Heater Install",
//         url: "https://images.pexels.com/photos/5691633/pexels-photo-5691633.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Sodiq Lawal",
//     skill: "Carpenter",
//     location: "Ibadan, Oyo State",
//     status: "Busy",
//     email: "sodiq.lawal@gmail.com",
//     phone: "+234 807 556 2211",
//     bio: "Creative carpenter building furniture, cabinets, and wooden structures.",
//     image: "https://randomuser.me/api/portraits/men/41.jpg",
//     portfolio: [
//       {
//         title: "Custom Wardrobe",
//         url: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
//       },
//       {
//         title: "Wooden Cabinet",
//         url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
//       },
//       {
//         title: "Office Desk",
//         url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Blessing Nwoye",
//     skill: "Tailor",
//     location: "Onitsha, Anambra State",
//     status: "Active",
//     email: "blessing.nwoye@gmail.com",
//     phone: "+234 806 445 9900",
//     bio: "Fashion designer specializing in custom outfits and alterations.",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//     portfolio: [
//       {
//         title: "Ankara Dress",
//         url: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
//       },
//       {
//         title: "Custom Suit",
//         url: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
//       },
//       {
//         title: "Wedding Outfit",
//         url: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Emeka Uche",
//     skill: "Painter",
//     location: "Owerri, Imo State",
//     status: "Active",
//     email: "emeka.uche@gmail.com",
//     phone: "+234 802 667 3344",
//     bio: "Professional painter delivering high-quality interior and exterior finishes.",
//     image: "https://randomuser.me/api/portraits/men/29.jpg",
//     portfolio: [
//       {
//         title: "Interior Painting",
//         url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
//       },
//       {
//         title: "Exterior House Paint",
//         url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
//       },
//       {
//         title: "Wall Design",
//         url: "https://images.pexels.com/photos/159397/pexels-photo-159397.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Kemi Adeyemi",
//     skill: "Hair Stylist",
//     location: "Lagos, Lagos State",
//     status: "Busy",
//     email: "kemi.adeyemi@gmail.com",
//     phone: "+234 805 998 7766",
//     bio: "Expert hairstylist specializing in braids, wigs, and modern styles.",
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//     portfolio: [
//       {
//         title: "Braided Style",
//         url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
//       },
//       {
//         title: "Wig Installation",
//         url: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg",
//       },
//       {
//         title: "Hair Coloring",
//         url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Yusuf Abdullahi",
//     skill: "Generator Technician",
//     location: "Kano, Kano State",
//     status: "Active",
//     email: "yusuf.abdullahi@gmail.com",
//     phone: "+234 808 556 1122",
//     bio: "Generator repair expert with years of experience servicing all brands.",
//     image: "https://randomuser.me/api/portraits/men/36.jpg",
//     portfolio: [
//       {
//         title: "Generator Repair",
//         url: "https://images.pexels.com/photos/5691633/pexels-photo-5691633.jpeg",
//       },
//       {
//         title: "Engine Maintenance",
//         url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
//       },
//       {
//         title: "Installation Setup",
//         url: "https://images.pexels.com/photos/159397/pexels-photo-159397.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Ngozi Eke",
//     skill: "Makeup Artist",
//     location: "Port Harcourt, Rivers State",
//     status: "Active",
//     email: "ngozi.eke@gmail.com",
//     phone: "+234 807 112 8899",
//     bio: "Professional makeup artist for weddings, photoshoots, and events.",
//     image: "https://randomuser.me/api/portraits/women/25.jpg",
//     portfolio: [
//       {
//         title: "Bridal Makeup",
//         url: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg",
//       },
//       {
//         title: "Studio Shoot",
//         url: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
//       },
//       {
//         title: "Event Makeup",
//         url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Daniel Ogun",
//     skill: "AC Technician",
//     location: "Abeokuta, Ogun State",
//     status: "Busy",
//     email: "daniel.ogun@gmail.com",
//     phone: "+234 806 221 3344",
//     bio: "AC technician focused on installation, servicing, and repairs.",
//     image: "https://randomuser.me/api/portraits/men/52.jpg",
//     portfolio: [
//       {
//         title: "AC Installation",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg",
//       },
//       {
//         title: "Cooling System Repair",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg",
//       },
//       {
//         title: "Maintenance Work",
//         url: "https://images.pexels.com/photos/3852471/pexels-photo-3852471.jpeg",
//       },
//     ],
//   },

//   {
//     name: "Fatima Sani",
//     skill: "Caterer",
//     location: "Kaduna, Kaduna State",
//     status: "Active",
//     email: "fatima.sani@gmail.com",
//     phone: "+234 809 667 2233",
//     bio: "Catering expert delivering delicious meals for events and gatherings.",
//     image: "https://randomuser.me/api/portraits/women/30.jpg",
//     portfolio: [
//       {
//         title: "Wedding Catering",
//         url: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
//       },
//       {
//         title: "Outdoor Event",
//         url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
//       },
//       {
//         title: "Buffet Setup",
//         url: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
//       },
//     ],
//   },
// ];
// export const seedTechnicians = async () => {
//   try {
//     for (const tech of TECHNICIANS) {
//       const q = query(
//         collection(db, "technicians"),
//         where("email", "==", tech.email),
//       );

//       const snapshot = await getDocs(q);

//       if (snapshot.empty) {
//         await addDoc(collection(db, "technicians"), tech);
//         console.log("Added:", tech.name);
//       } else {
//         console.log("Skipped (exists):", tech.email);
//       }
//     }

//     console.log("Seeding complete");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
