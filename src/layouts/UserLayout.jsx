import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
  const { auth, logout } = useAuth();

  return (
    <div style={styles.wrapper}>
      {/* ===== Sidebar ===== */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>
          📁 <span style={{ color: "#60a5fa" }}>DMS</span>
        </h2>

        <nav style={styles.nav}>
          <NavLink to="/user" style={linkStyle}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/user/upload" style={linkStyle}>
            Upload ⬆ 
          </NavLink>

          <NavLink to="/user/documents" style={linkStyle}>
            My Documents 📄 
          </NavLink>

          <NavLink to="/user/search" style={linkStyle}>
            Search 🔍 
          </NavLink>

          <NavLink to="/user/trash" style={linkStyle}>
            Trash 🗑 
          </NavLink>

          
          <NavLink to="/user/starred" style={linkStyle}>
  Starred Files ⭐
</NavLink>


          <NavLink to="/user/documents/shared" style={linkStyle}>
            Shared With Me 🤝 
          </NavLink>

          <NavLink to="/user/categories" style={categoryLinkStyle}>
            Categories 🗂 
          </NavLink>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main style={styles.main}>
        {/* ===== Header ===== */}
        <header style={styles.header}>
          <h3 style={styles.pageTitle}>
            Welcome <span style={{ color: "#2563eb" }}>{auth.username}</span> 👋
          </h3>

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

/* ===== NavLink Styles ===== */
const linkStyle = ({ isActive }) => ({
  color: isActive ? "#60a5fa" : "#e5e7eb",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  background: isActive ? "#1e293b" : "transparent",
  fontWeight: "500",
  transition: "all 0.2s ease",
});

// const sharedLinkStyle = ({ isActive }) => ({
//   color: isActive ? "#d8b4fe" : "#c084fc",
//   textDecoration: "none",
//   padding: "12px 16px",
//   borderRadius: "10px",
//   background: isActive ? "rgba(192,132,252,0.2)" : "transparent",
//   fontWeight: "500",
// });

const categoryLinkStyle = ({ isActive }) => ({
  color: isActive ? "#bfdbfe" : "#93c5fd",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  background: isActive ? "rgba(96,165,250,0.25)" : "rgba(96,165,250,0.12)",
  fontWeight: "600",
});

/* ===== Styles ===== */
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "#f1f5f9",
  },

  /* Sidebar */
  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg, #0f172a, #020617)",
    color: "#fff",
    padding: "26px 18px",
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    marginBottom: "34px",
    fontSize: "24px",
    fontWeight: "700",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  /* Main */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  /* Header */
  header: {
    height: "72px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  },

  /* Profile */
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid #e5e7eb",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  username: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e40af",
  },

  logoutBtn: {
    marginTop: "4px",
    padding: "4px 12px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    cursor: "pointer",
  },

  /* Content */
  content: {
    padding: "28px",
    flex: 1,
    overflowY: "auto",
  },
};

export default UserLayout;
