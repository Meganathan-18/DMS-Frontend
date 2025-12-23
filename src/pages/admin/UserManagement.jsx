import { useEffect, useState } from "react";
import { getAllUsers, blockUser, unblockUser } from "../../api/adminService";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      const res = await getAllUsers();
      setAccounts(res.data);
    };
    loadAccounts();
  }, []);

  const refreshAccounts = async () => {
    const res = await getAllUsers();
    setAccounts(res.data);
  };

  const handleBlock = async (id) => {
    await blockUser(id);
    refreshAccounts();
  };

  const handleUnblock = async (id) => {
    await unblockUser(id);
    refreshAccounts();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>User Account Management</h2>
      <p style={styles.pageSubtitle}>Manage platform accounts</p>

      <div style={styles.list}>
        {accounts.map((a) => (
          <div
            key={a.id}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            <span style={styles.name}>{a.username}</span>

            <span
              style={{
                ...styles.status,
                backgroundColor: a.status === "ACTIVE" ? "#d1fae5" : "#fee2e2",
                color: a.status === "ACTIVE" ? "#065f46" : "#b91c1c",
              }}
            >
              {a.status}
            </span>

            {a.status === "ACTIVE" ? (
              <button
                style={{ ...styles.actionBtn, ...styles.blockBtn }}
                onClick={() => handleBlock(a.id)}
              >
                Block
              </button>
            ) : (
              <button
                style={{ ...styles.actionBtn, ...styles.unblockBtn }}
                onClick={() => handleUnblock(a.id)}
              >
                Unblock
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountManagement;

const styles = {
  page: {
    padding: "40px",
    // fontFamily: "'Inter', 'Roboto', sans-serif",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },

  pageTitle: {
    fontSize: "30px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#111827",
  },

  pageSubtitle: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "30px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  name: {
    fontWeight: 600,
    fontSize: "17px",
    color: "#111827",
  },

  status: {
    padding: "6px 14px",
    borderRadius: "12px",
    fontWeight: 600,
    textAlign: "center",
    minWidth: "80px",
  },

  actionBtn: {
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  blockBtn: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #dc2626",
  },

  unblockBtn: {
    backgroundColor: "#ecfdf5",
    color: "#16a34a",
    border: "1px solid #16a34a",
  },
};
