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
import UserLayout from "./components/Layout/UserLayout";
import RootLayout from "./components/Layout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       <Route
  //         path="/"
  //         element={
  //           <>
  //             <MainLayout />
  //           </>
  //         }
  //       >
  //         <Route index element={<LandingPage />} />
  //         <Route path="login" element={<LoginPage />} />
  //         <Route path="signup" element={<SignUpPage />} />
  //       </Route>

  //       {/* User */}
  //       <Route
  //         path="/technicians"
  //         element={
  //           <>
  //             <ProtectedRoute role="user">
  //               <UserLayout />
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //         <Route index element={<TechniciansPage />} />
  //         <Route path="technician/:id" element={<TechnicianProfilePage />} />
  //       </Route>
  //       {/* Admin */}
  //       <Route
  //         path="/admin"
  //         element={
  //           <ProtectedRoute role="admin">
  //             <AdminDashboardPage />
  //           </ProtectedRoute>
  //         }
  //       />
  //     </>,
  //   ),
  // );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        {/* PUBLIC */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        {/* USER */}
        <Route
          path="/technicians"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TechniciansPage />} />
          <Route path="technician/:id" element={<TechnicianProfilePage />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
