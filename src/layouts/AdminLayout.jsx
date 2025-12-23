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
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({
              color: "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            style={({ isActive }) => ({
              color: "white",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Users
          </NavLink>

          <button
            onClick={logout}
            style={{ marginTop: "20px", padding: "6px" }}
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

export default AdminLayout;
