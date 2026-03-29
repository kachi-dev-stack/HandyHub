import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import SignUpPage from "./components/Pages/SignUpPage";
import LoginPage from "./components/Pages/LoginPage";
import MainLayout from "./components/Layout/MainLayout";
import UserDashboard from "./components/Pages/UserDashboard";
import TechnicianProfile from "./components/Pages/TechnicianProfile";
import AdminDashboard from "./components/Pages/AdminDashboard";
import ScrollToTop from "./ScrollToTop";
import UserLayout from "./components/Layout/UserLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <ScrollToTop />
            <MainLayout />
          </>
        }
      >
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      <Route
        path="/technicians"
        element={
          <>
            <ScrollToTop />
            <UserLayout />
          </>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="technician/:id" element={<TechnicianProfile />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />} />
    </>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
