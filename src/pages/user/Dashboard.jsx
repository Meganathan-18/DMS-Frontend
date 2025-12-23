import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* 👋 Header */}
      <h2 style={styles.heading}>Welcome to Your Dashboard</h2>
      <p style={styles.subtext}>
        Manage, version, and organize your documents securely.
      </p>

      {/* 📊 Quick Stats */}
      <div style={styles.stats}>
        <div style={styles.card}>
          <div style={styles.value}>📄</div>
          <div style={styles.label}>My Documents</div>
        </div>

        <div style={styles.card}>
          <div style={styles.value}>🧾</div>
          <div style={styles.label}>Document Versions</div>
        </div>

        <div style={styles.card}>
          <div style={styles.value}>🗑</div>
          <div style={styles.label}>Trash</div>
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div style={styles.actions}>
        <button
          style={styles.actionBtn}
          onClick={() => navigate("/user/upload")}
        >
          ⬆ Upload Document
        </button>

        <button
          style={styles.actionBtn}
          onClick={() => navigate("/user/documents")}
        >
          📁 My Documents
        </button>

        <button
          style={styles.actionBtn}
          onClick={() => navigate("/user/trash")}
        >
          🗑 Trash
        </button>
      </div>

      {/* ℹ About */}
      <div style={styles.about}>
        <h3>About This System</h3>
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

/* 🎨 Styles */
const styles = {
  container: {
    padding: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  subtext: {
    color: "#64748b",
    marginBottom: "24px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  value: {
    fontSize: "28px",
    marginBottom: "8px",
  },

  label: {
    fontSize: "14px",
    color: "#475569",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },

  actionBtn: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },

  about: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
  },
};
