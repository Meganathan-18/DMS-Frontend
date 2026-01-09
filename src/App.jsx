import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import RoleGuard from "./auth/RoleGuard";

import StarredDocuments from "./pages/user/StarredDocuments";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/user/Dashboard";
import Upload from "./pages/user/Upload";
import Documents from "./pages/user/Documents";
import SharedWithMe from "./pages/user/SharedWithMe";
import Versions from "./pages/user/Versions";
import Trash from "./pages/user/Trash";
import Search from "./pages/user/Search";
import FolderDocuments from "./pages/user/FolderDocuments";
import CategoryDocuments from "./pages/user/CategoryDocuments";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import Categories from "./pages/admin/Categories";
import CategoryPermissions from "./pages/admin/CategoryPermissions";
import CategoryReports from "./pages/admin/CategoryReports";

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route
        path="/user"
        element={
          <RoleGuard role="USER">
            <UserLayout />
          </RoleGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="documents" element={<Documents />} />
        <Route path="documents/shared" element={<SharedWithMe />} />
        <Route path="documents/:documentId/versions" element={<Versions />} />
        <Route path="folders/:folderId" element={<FolderDocuments />} />
        <Route path="categories" element={<CategoryDocuments />} />
        <Route path="search" element={<Search />} />
        <Route path="trash" element={<Trash />} />
        <Route path="starred" element={<StarredDocuments />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <RoleGuard role="ADMIN">
            <AdminLayout />
          </RoleGuard>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="category-permissions" element={<CategoryPermissions />} />
        <Route path="reports/categories" element={<CategoryReports />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

export default App;
