import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "#0f172a",
          color: "white",
          padding: "16px",
        }}
      >
        <h3>Admin</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <NavLink to="/admin/dashboard" style={linkStyle}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/admin/users" style={linkStyle}>
            👥 Users
          </NavLink>

          <NavLink to="/admin/categories" style={linkStyle}>
            📂 Categories
          </NavLink>

          <NavLink to="/admin/category-permissions" style={linkStyle}>
            🔐 Category Permissions
          </NavLink>

          <NavLink to="/admin/reports/categories" style={linkStyle}>
            📊 Category Reports
          </NavLink>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

const linkStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  fontWeight: isActive ? "bold" : "normal",
  background: isActive ? "#1e293b" : "transparent",
});

export default AdminLayout;
