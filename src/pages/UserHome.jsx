import { useAuth } from "../context/AuthContext";

export default function UserHome() {
  const { auth, logout } = useAuth();

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#9c2525ff" }}>
        Welcome {auth?.username}
      </h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
