// import { db } from "../firebase";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// const TECHNICIANS = [
//   {
//     name: "Chinedu Okafor",
//     skill: "Plumber",
//     location: "Aba, Abia State",
//     status: "Active",
//     email: "chinedu.okafor@gmail.com",
//     phone: "+234 803 123 4567",
//     bio: "Experienced plumber with over 10 years in residential and commercial plumbing across Aba and Umuahia. Specializes in pipe fitting and leak repairs.",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     portfolio: [
//       {
//         title: "Modern HVAC Installation",
//         url: "https://images.pexels.com/photos/3862619/pexels-photo-3862619.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Central Air System Upgrade",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Amarachi Nwankwo",
//     skill: "Electrician",
//     location: "Umuahia, Abia State",
//     status: "Busy",
//     email: "amarachi.nwankwo@gmail.com",
//     phone: "+234 812 234 5678",
//     bio: "Licensed electrician specializing in wiring, inverter setups, and solar installations. 8 years of experience in Abia State.",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     portfolio: [
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Ifeanyi Eze",
//     skill: "HVAC Technician",
//     location: "Umudike, Abia State",
//     status: "Active",
//     email: "ifeanyi.eze@gmail.com",
//     phone: "+234 809 345 6789",
//     bio: "Certified HVAC technician working around Michael Okpara University of Agriculture, Umudike. Skilled in installation and maintenance of cooling systems.",
//     image: "https://randomuser.me/api/portraits/men/55.jpg",
//     portfolio: [
//       {
//         title: "Central Air System Upgrade",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Maintenance Service",
//         url: "https://images.pexels.com/photos/3852471/pexels-photo-3852471.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Ngozi Onwuka",
//     skill: "Carpenter",
//     location: "Aba, Abia State",
//     status: "Busy",
//     email: "ngozi.onwuka@gmail.com",
//     phone: "+234 817 456 7890",
//     bio: "Skilled carpenter specializing in furniture making, wardrobes, and home fittings across Aba and its environs.",
//     image: "https://randomuser.me/api/portraits/women/28.jpg",
//     portfolio: [
//       {
//         title: "Central Air System Upgrade",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Maintenance Service",
//         url: "https://images.pexels.com/photos/3852471/pexels-photo-3852471.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Emeka Obi",
//     skill: "Painter",
//     location: "Umuahia, Abia State",
//     status: "Active",
//     email: "emeka.obi@gmail.com",
//     phone: "+234 805 567 8901",
//     bio: "Professional painter offering interior and exterior painting services with modern finishing styles in Umuahia.",
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     portfolio: [
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Emeka Obi",
//     skill: "Painter",
//     location: "Umuahia, Abia State",
//     status: "Active",
//     email: "emeka.obi@gmail.com",
//     phone: "+234 805 567 8901",
//     bio: "Professional painter offering interior and exterior painting services with modern finishing styles in Umuahia.",
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     portfolio: [
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Emeka Obi",
//     skill: "Painter",
//     location: "Umuahia, Abia State",
//     status: "Active",
//     email: "emeka.obi@gmail.com",
//     phone: "+234 805 567 8901",
//     bio: "Professional painter offering interior and exterior painting services with modern finishing styles in Umuahia.",
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     portfolio: [
//       {
//         title: "Central Air System Upgrade",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//     ],
//   },
//   {
//     name: "Samuel Onyekachi",
//     skill: "Dev Ops",
//     location: "Umuahia, Abia State",
//     status: "Active",
//     email: "conyekachi007@gmail.com",
//     phone: "+234 805 567 8901",
//     bio: "Professional Developer offering interior and exterior Developing services with modern finishing styles in Umuahia.",
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     portfolio: [
//       {
//         title: "Central Air System Upgrade",
//         url: "https://images.pexels.com/photos/6147183/pexels-photo-6147183.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Ductwork Renovation",
//         url: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Commercial HVAC System",
//         url: "https://images.pexels.com/photos/8474496/pexels-photo-8474496.jpeg?auto=compress&cs=tinysrgb&w=500",
//       },
//       {
//         title: "Energy Efficient Install",
//         url: "https://images.pexels.com/photos/7974/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=500",
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
