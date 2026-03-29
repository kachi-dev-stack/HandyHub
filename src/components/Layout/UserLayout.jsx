import UserNavBar from "../UIS/UserNavBar";
import Footer from "../UIS/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
