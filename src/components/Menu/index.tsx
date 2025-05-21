import { Settings } from "lucide-react";
import { useContext } from "react";

import Button from "../models/Button";
import { AuthContext } from "../../context/auth.context";

export const Menu = () => {
    const { signOut } = useContext(AuthContext);
    
    return (
        <header className="w-full p-10 bg-slate-800 flex justify-between items-center text-white">
            AzAutoParking

            <Button onClick={signOut}>
                <Settings />
            </Button>
        </header>);
};