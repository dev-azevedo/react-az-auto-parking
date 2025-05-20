import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import type { AuthContextType, ResponseApi, SignInProps, User } from "./type.auth";


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadSessionStorage = () => {
      const token = localStorage.getItem("@AzAutoParking:token");

      if (token) {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };

    loadSessionStorage();
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post<ResponseApi>(`/auth/signin`, {
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
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signed: !!user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};