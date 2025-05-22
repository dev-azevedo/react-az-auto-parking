import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        const messageError = {
            en: "useAuthContext must be used within an AuthProvider",
            ptBr: "useAuthContext deve ser usado dentro de um AuthProvider"
        }
        throw new Error(JSON.stringify(messageError));
    }

    return context;
}

export default useAuthContext;