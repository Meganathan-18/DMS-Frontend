import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaFileAlt,
  FaTrash,
  FaCodeBranch,
} from "react-icons/fa";
import { getAdminStats } from "../../api/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await getAdminStats();
      setStats(res.data);
    };
    loadStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      bg: "#E3F2FD",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      icon: <FaUserCheck />,
      bg: "#E8F5E9",
    },
    {
      label: "Blocked Users",
      value: stats.blockedUsers,
      icon: <FaUserSlash />,
      bg: "#FFF3E0",
    },
    {
      label: "Total Documents",
      value: stats.totalDocuments,
      icon: <FaFileAlt />,
      bg: "#F3E5F5",
    },
    {
      label: "Deleted Documents",
      value: stats.deletedDocuments,
      icon: <FaTrash />,
      bg: "#FCE4EC",
    },
    {
      label: "Total Versions",
      value: stats.totalVersions,
      icon: <FaCodeBranch />,
      bg: "#E0F2F1",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.grid}>
        {cards.map((item, index) => (
          <div
            key={index}
            style={{ ...styles.card, background: item.bg }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div style={styles.icon}>{item.icon}</div>
            <p style={styles.label}>{item.label}</p>
            <h3 style={styles.value}>{item.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;



const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#333",
  },
  label: {
    fontSize: "15px",
    color: "#555",
  },
  value: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "6px",
  },
};
