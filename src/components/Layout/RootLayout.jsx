import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { useEffect } from "react";

const RootLayout = () => {
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
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
