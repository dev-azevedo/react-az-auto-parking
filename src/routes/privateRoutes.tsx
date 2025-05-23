import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>; // ou um spinner
  }

  return signed ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;