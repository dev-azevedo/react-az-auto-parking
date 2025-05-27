import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { api } from "@/services/api";
import type { TAuthContext, TSignIn, TUser, TJwtPayload } from "@/types/TAuthContext";
import type { TResponseApi } from "@/types/TResponseApi";
import helper from "@/services/helper";


export const AuthContext = createContext<TAuthContext>({} as TAuthContext);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSessionStorage = () => {
      const token = localStorage.getItem("@AzAutoParking:token");

      if (token) {
        const decoded = jwtDecode(token) as TJwtPayload;

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          signOut();
          return;
        }

        const payloadUser = {
          id: +decoded.id,
          fullName: decoded.fullname,
          email: decoded.email,
          isAdmin: decoded.isAdmin == "False" ? false : true,
          token: token,
        };

        const resetPassword = decoded.resetPassword == "True" ? true : false;
        resetPassword ? setSigned(false) : setSigned(true);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(payloadUser);
      }

      setLoading(false);
    };

    loadSessionStorage();
  }, [navigate]);

  const updateUser = (user: TUser): void => {
    setUser(user);
    localStorage.setItem("@AzAutoParking:token", user.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  };

  const signIn = async ({ email, password }: TSignIn): Promise<number> => {
    try {
      const response = await api.post<TResponseApi>(`/auth/signin`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.isSuccess) {
        const result = response.data;
        const userData = result.data;
        updateUser(userData);
        setSigned(true);
        navigate("/");

      }

      return response.status as number;
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      helper.ResponseErrorApi(error)
      const status = error?.response?.status ?? 500;
      return status;
    }
  };

  const signOut = (): void  => {
    localStorage.removeItem("@AzAutoParking:token");
    api.defaults.headers.common["Authorization"] = "";
    setSigned(false);
    setUser(null);
    navigate("/signin");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signed,
        signIn,
        signOut,
        updateUser,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};