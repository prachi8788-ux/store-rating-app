import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoreList from "./pages/StoreList";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GiveRating from "./pages/GiveRating";
import RatingsOverview from "./pages/RatingsOverview";
import UserManagement from "./pages/UserManagement";
import AddNewUser from "./pages/AddNewUser";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN FULL ACCESS */}
        <Route
          path="/admin"
          element={
            role === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/admin/users"
          element={
            role === "ADMIN"
              ? <UserManagement />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/admin/users/create"
          element={
            role === "ADMIN"
              ? <AddNewUser />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/ratings"
          element={
            role === "ADMIN"
              ? <RatingsOverview />
              : <Navigate to="/" />
          }
        />

        {/* DASHBOARD (USER + OWNER + ADMIN) */}
        <Route
          path="/dashboard"
          element={
            role ? <Dashboard /> : <Navigate to="/" />
          }
        />

        {/* STORES (ALL LOGGED USERS) */}
        <Route
          path="/stores"
          element={
            role ? <StoreList /> : <Navigate to="/" />
          }
        />

        {/* ⭐ GIVE RATING (ALL USERS) */}
        <Route
          path="/give-rating"
          element={
            role ? <GiveRating /> : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;