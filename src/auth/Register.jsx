import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

/* ================= SNOWFALL UI ================= */

const Snowfall = () => {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100 + "%",
        duration: 6 + Math.random() * 6 + "s",
        delay: Math.random() * 5 + "s",
        size: 8 + Math.random() * 12 + "px",
      })),
    []
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .snow-container {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
      }
      .snowflake {
        position: absolute;
        top: -10px;
        color: white;
        opacity: 0.85;
        animation-name: fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      @keyframes fall {
        to { transform: translateY(110vh); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="snow-container">
      {snowflakes.map((s, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
            fontSize: s.size,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
};

/* ================= REGISTER ================= */

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("USER"); // 🔑 NEW
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
        "🔒 Password must be at least 8 characters and include uppercase, lowercase & number"
      );
      return;
    }

    // ⚠️ Admin confirmation
    if (role === "ADMIN") {
      const confirmAdmin = window.confirm(
        "⚠️ You are registering as ADMIN. Continue?"
      );
      if (!confirmAdmin) return;
    }

    try {
      const endpoint =
  role === "ADMIN" ? "/api/auth/register-admin" : "/api/auth/register";


      await api.post(endpoint, { username, password });

      alert(
        role === "ADMIN"
          ? "✅ Admin registered successfully"
          : "✅ User registered successfully"
      );

      navigate("/login");
    } catch {
      setError("❌ Username already exists");
    }
  };

  return (
    <div style={styles.page}>
      <Snowfall />

      {/* LEFT BRAND PANEL */}
      <div style={styles.left}>
        <h1 style={styles.brand}>Secure</h1>
        <p style={styles.tagline}>
          Enterprise Document Management System
        </p>
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

          {/* 🔘 ROLE SELECTION */}
          <div style={styles.roleBox}>
            <label style={styles.roleLabel}>
              <input
                type="radio"
                value="USER"
                checked={role === "USER"}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>

            <label style={styles.roleLabel}>
              <input
                type="radio"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>

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

  roleBox: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "14px",
  },

  roleLabel: {
    fontSize: "14px",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: "6px",
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
