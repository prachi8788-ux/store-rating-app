import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StoreList from "./pages/StoreList";
import AdminDashboard from "./pages/AdminDashboard";
import AddNewUser from "./pages/AddNewUser";
import CreateNewStore from "./pages/CreateNewStore";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/users/create" element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}><AddNewUser /></ProtectedRoute>} />
          <Route path="/admin/stores/create" element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}><CreateNewStore /></ProtectedRoute>} />
          
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["STORE_OWNER", "NORMAL_USER"]}><StoreList /></ProtectedRoute>} />
          <Route path="/user/my-ratings" element={<ProtectedRoute><StoreList /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
