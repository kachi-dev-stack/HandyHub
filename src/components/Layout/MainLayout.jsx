import { useEffect } from "react";
import Footer from "../UIS/Footer";
import Navbar from "../UIS/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useEffect(() => {
    window.dev = {
      name: "Samuel Onyekachi",
      gitHubUsername: "kachi-dev-stack",
      role: "Full-Stack Developer",
    };

    Object.freeze(window.dev);
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
