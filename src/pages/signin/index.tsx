// import Button from './components/models/button'
import { useState } from "react";
import Input from "../../components/models/input";
import Button from '../../components/models/button';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <>
        <div className="bg-slate-800 p-5 w-full h-screen flex justify-center items-center">
            <form className="
        w-full xl:w-1/4 bg-white 
        flex justify-center items-center flex-col
        p-5 xl:p-10 rounded-md">
                <div className="w-32 h-32 p-10 
            bg-gray-700 
            rounded-full 
            flex justify-center items-center
            ">AP</div>

                <h1 className="text-gray-700 text-2xl font-bold mt-10">
                    AzAutoParking
                </h1>
                <span className="text-slate-400 text-center">
                    Sistema de Gerenciamento de Estacionamento
                </span>

                <div className="w-full mx-auto mt-10">
                    <Input
                        className="bg-white"
                        label="Email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full mx-auto mt-5">
                    <Input
                        className="bg-white"
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
               
                <div className="w-full mx-auto mt-5 text-end">
                    <a className="text-blue-500 hover:underline cursor-pointer">
                        Esqueceu sua senha?
                    </a>
                </div>

                <div className="w-full mx-auto mt-5 text-center">
                    <Button className='bg-slate-400 w-full' onClick={() => alert('Clicou!')}>
                        Clique Aqui
                    </Button>
                </div>
            </form>
        </div>
    </>;
}