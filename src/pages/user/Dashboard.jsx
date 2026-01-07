import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* ===== Header ===== */}
      <h1 style={styles.title}>Welcome Back !!!</h1>
      <p style={styles.subtitle}>
        Enterprise Document Management System at your fingertips.
      </p>

      {/* ===== Cards ===== */}
      <div style={styles.cardGrid}>
        <div style={styles.glassCard}>
          <div style={{ fontSize: 32 }}>📁</div>
          <p>My Documents</p>
        </div>

        <div style={styles.glassCard}>
          <div style={{ fontSize: 32 }}>🕒</div>
          <p>Document Versions</p>
        </div>

        <div style={styles.glassCard}>
          <div style={{ fontSize: 32 }}>📊</div>
          <p>Storage Analytics</p>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div style={styles.actions}>
        <button
          style={{ ...styles.btn, background: "#3b82f6" }}
          onClick={() => navigate("/user/upload")}
        >
          ⬆ Upload Document
        </button>

        <button
          style={{ ...styles.btn, background: "#22c55e" }}
        >
          ➕ Create New Folder
        </button>

        <button
          style={{ ...styles.btn, background: "#f87e26ff" }}
          onClick={() => navigate("/user/trash")}
        >
          🗑 View Trash Bin
        </button>
      </div>

      {/* ===== System Overview ===== */}
      <div style={styles.overview}>
        <h3>System Overview</h3>
        <p>
          This Document Management System allows you to upload documents,
          maintain version history, restore deleted files, and securely manage
          access — similar to Google Drive but built with Spring Boot & React.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px",
    color: "#fff",
    background:
      "radial-gradient(circle at top, #1e293b, #020617)",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#cbd5f5",
    marginBottom: "36px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },

  glassCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    borderRadius: "16px",
    padding: "28px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },

  btn: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  overview: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    padding: "26px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.15)",
    maxWidth: "900px",
  },
};
