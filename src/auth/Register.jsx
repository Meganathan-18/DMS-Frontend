import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isStrongPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /\d/.test(pwd);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("❌ Passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "🔒 Password must be at least 8 characters, include uppercase, lowercase & number"
      );
      return;
    }

    try {
      await api.post("/auth/register", { username, password });
      alert("✅ Registration successful. Please login.");
      navigate("/login");
    } catch {
      setError("❌ Username already exists");
    }
  };

  return (
    <div style={styles.page}>
      {/* LEFT BRAND PANEL */}
      <div style={styles.left}>
        <h1 style={styles.brand}>Secure</h1>
        <p style={styles.tagline}>Enterprise Document Management System</p>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div style={styles.right}>
        <form onSubmit={handleRegister} style={styles.card}>
          <h2 style={styles.heading}>Create Account</h2>
          <p style={styles.subHeading}>Sign up to get started</p>

          {error && <p style={styles.error}>{error}</p>}

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.btn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

/* ================= STYLES ================= */

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  /* LEFT PANEL */
  left: {
    flex: 1,
    background: "linear-gradient(180deg, #0f2a33, #1b3f4a)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "80px",
  },
  brand: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "16px",
    opacity: 0.85,
  },

  /* RIGHT PANEL */
  right: {
    flex: 1,
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#ffffff",
    padding: "36px",
    width: "360px",
    borderRadius: "12px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
  },

  heading: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#0f172a",
  },

  subHeading: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#2b5563",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "6px",
  },

  error: {
    color: "#dc2626",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};
