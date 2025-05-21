import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";
import type { TAuthContext, TResponseApi, TSignIn, TUser, TJwtPayload } from "./type.auth";
import helper from "../services/helper";


export const AuthContext = createContext<TAuthContext>({} as TAuthContext);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSessionStorage = () => {
      const token = localStorage.getItem("@AzAutoParking:token");

      if (token) {
        const decoded = jwtDecode(token) as TJwtPayload;
        console.log("Token decodificado:", decoded);
        const payloadUser = {
          id: +decoded.id,
          fullName: decoded.fullname,
          email: decoded.email,
          isAdmin: decoded.isAdmin == "False" ? false : true,
          token: token,
        };

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(payloadUser);
        
      }
    };

    loadSessionStorage();
  }, []);

  const signIn = async ({ email, password }: TSignIn): Promise<void> => {
    try {
      const response = await api.post<TResponseApi>(`/auth/signin`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.isSuccess) {
        const result = response.data;
        const userData = result.data;
        const token = userData.token;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("@AzAutoParking:token", token);
        setUser(userData);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      helper.ResponseErrorApi(error)
    }
  };

  const signOut = (): void  => {
    localStorage.removeItem("@AzAutoParking:token");
    api.defaults.headers.common["Authorization"] = "";
    setUser(null);
    navigate("/signin");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signed: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};