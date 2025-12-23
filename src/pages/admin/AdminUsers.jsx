import { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  unblockUser,
} from "../../api/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await getAllUsers();
      setUsers(res.data);
    };
    loadUsers();
  }, []);

  const refreshUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const handleBlock = async (id) => {
    await blockUser(id);
    refreshUsers();
  };

  const handleUnblock = async (id) => {
    await unblockUser(id);
    refreshUsers();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Management</h2>

      {users.map((u) => (
        <div
          key={u.id}
          style={{
            ...styles.card,
            background:
              u.status === "ACTIVE" ? "#E8F5E9" : "#FCE4EC",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          {/* Left info */}
          <div style={styles.info}>
            <p style={styles.username}>{u.username}</p>
            <p style={styles.role}>{u.role}</p>
          </div>

          {/* Status */}
          <div
            style={{
              ...styles.status,
              color: u.status === "ACTIVE" ? "green" : "red",
            }}
          >
            {u.status}
          </div>

          {/* Action */}
          <div>
            {u.status === "ACTIVE" ? (
              <button
                style={{ ...styles.btn, ...styles.blockBtn }}
                onClick={() => handleBlock(u.id)}
              >
                Block
              </button>
            ) : (
              <button
                style={{ ...styles.btn, ...styles.unblockBtn }}
                onClick={() => handleUnblock(u.id)}
              >
                Unblock
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;


const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderRadius: "14px",
    marginBottom: "15px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  role: {
    fontSize: "14px",
    color: "#555",
  },
  status: {
    fontWeight: "bold",
    marginRight: "20px",
  },
  btn: {
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  blockBtn: {
    backgroundColor: "#ff5252",
    color: "#fff",
  },
  unblockBtn: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
};
