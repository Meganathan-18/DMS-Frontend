import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        to {
          transform: translateY(110vh);
        }
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

/* ================= LOGIN ================= */

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token, res.data.role);
      navigate(res.data.role === "ROLE_ADMIN" ? "/admin" : "/user");
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError("❌ Invalid username or password");
      } else {
        setError("⚠️ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* ❄ SNOWFALL OVERLAY */}
      <Snowfall />

      {/* LEFT BRAND PANEL */}
      <div style={styles.left}>
        <h1 style={styles.brand}>Secure</h1>
        <p style={styles.tagline}>Enterprise Document Management System</p>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div style={styles.right}>
        <form onSubmit={handleLogin} style={styles.card}>
          <h2 style={styles.heading}>Welcome Back</h2>
          <p style={styles.subHeading}>Please login to your account</p>

          {error && <p style={styles.error}>{error}</p>}

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...styles.input, marginBottom: 0 }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.registerText}>
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

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

  passwordBox: {
    position: "relative",
    marginBottom: "14px",
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },

  loginBtn: {
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

  registerText: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
  },

  error: {
    color: "#dc2626",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};
