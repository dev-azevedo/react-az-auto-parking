import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext);

  return signed ? <Outlet /> : <Navigate to="/signin" />;
};