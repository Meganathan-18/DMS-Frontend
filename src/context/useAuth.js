import { useContext } from "react";
import { AuthContext } from "./AuthContext";
// import useAuth from "../context/useAuth";
const useAuth = () => useContext(AuthContext);

export default useAuth;
