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
import TechniciansPage from "./components/Pages/TechniciansPage";
import TechnicianProfilePage from "./components/Pages/TechnicianProfilePage";
import AdminDashboardPage from "./components/Pages/AdminDashboardPage";
import ScrollToTop from "./ScrollToTop";
import UserLayout from "./components/Layout/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./AuthContext";
import Spinner from "./components/UIS/Spinner";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

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

        {/* User */}
        <Route
          path="/technicians"
          element={
            <>
              <ProtectedRoute role="user">
                <ScrollToTop />
                <UserLayout />
              </ProtectedRoute>
            </>
          }
        >
          <Route index element={<TechniciansPage />} />
          <Route path="technician/:id" element={<TechnicianProfilePage />} />
        </Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
