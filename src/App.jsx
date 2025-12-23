import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleGuard from "./auth/RoleGuard";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/user/Dashboard";
import Upload from "./pages/user/Upload";
import Documents from "./pages/user/Documents";
import Trash from "./pages/user/Trash";
import Search from "./pages/user/Search";
import Versions from "./pages/user/Versions";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";

const App = () => (
  <BrowserRouter>
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <RoleGuard role="ROLE_USER">
              <UserLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="documents" element={<Documents />} />
        <Route path="documents/:documentId/versions" element={<Versions />} />
        <Route path="search" element={<Search />} />
        <Route path="trash" element={<Trash />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard role="ROLE_ADMIN">
              <AdminLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

export default App;
