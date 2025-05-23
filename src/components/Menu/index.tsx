import { Settings } from "lucide-react";
import { useContext } from "react";

import Button from "../models/Button";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

export const Menu = () => {
    const { signOut } = useContext(AuthContext);

    return (
        <header className="w-full px-5 xl:px-46 p-10 bg-slate-800 flex flex-col xl:flex-row justify-between items-center text-white">

            <nav>
                <ul className="flex flex-col xl:flex-row gap-5 p-1">
                    <li className="border-r-2  pr-5">
                        <h1>
                            AzAutoParking
                        </h1>
                    </li>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/parking">
                            Vagas
                        </Link>
                    </li>
                    <li>
                        <a href="/signup" className="text-white">
                            Cadastrar
                        </a>
                    </li>
                </ul>
            </nav>

            <Button onClick={signOut}>
                <Settings />
            </Button>
        </header>);
};