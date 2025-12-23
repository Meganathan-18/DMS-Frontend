import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
  const { auth, logout } = useAuth();

  return (
    <div style={styles.wrapper}>
      {/* ===== Sidebar ===== */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>📁 DMS</h2>

        <nav style={styles.nav}>
          <NavLink to="/user" style={linkStyle}>
            🏠 Dashboard
          </NavLink>
          <NavLink to="/user/upload" style={linkStyle}>
            ⬆ Upload
          </NavLink>
          <NavLink to="/user/documents" style={linkStyle}>
            📄 My Documents
          </NavLink>
          <NavLink to="/user/search" style={linkStyle}>
            🔍 Search
          </NavLink>
          <NavLink to="/user/trash" style={linkStyle}>
            🗑 Trash
          </NavLink>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main style={styles.main}>
        {/* ===== Top Navbar ===== */}
        <header style={styles.header}>
          <h3 style={styles.pageTitle}>Welcome {auth.username} 👋</h3>

          {/* User Profile */}
          <div style={styles.profile}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User"
              style={styles.avatar}
            />

            <div style={styles.userInfo}>
              <span style={styles.username}>{auth.username}</span>
              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* ===== Page Content ===== */}
        <section style={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

/* ===== Active Link Style ===== */
const linkStyle = ({ isActive }) => ({
  color: "#e5e7eb",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "8px",
  background: isActive ? "#334155" : "transparent",
  fontWeight: "500",
  transition: "0.2s",
});

/* ===== Styles ===== */
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "#f1f5f9",
  },

  sidebar: {
    width: "240px",
    background: "#0f172a",
    color: "#fff",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "700",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: "70px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatar: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    border: "1px solid #e5e7eb",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
  },

  username: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#164fd5ff",
    marginLeft: "10px",
    marginBottom: "2px",
  },

  logoutBtn: {
    marginTop: "4px",
    padding: "4px 10px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    cursor: "pointer",
    width: "fit-content",
  },

  content: {
    padding: "28px",
    flex: 1,
    overflowY: "auto",
  },
};

export default UserLayout;
