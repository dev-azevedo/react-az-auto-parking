// import Button from './components/models/button'
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";
import helper from "../../../services/helper";
import BaseAnimate from "../../models/BaseAnimate";
import Input from "../../models/Input";
import Button from "../../models/Button";

export default function SignIn() {
  const { signIn, signed } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSignIn = async () => {
    const payload = {
      email, password
    }

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    await signIn(payload)
  }

  if (signed) {
    return <Navigate to="/" />
  }

  return (
    <>
      <BaseAnimate className="w-full min-w-96 xl:w-2/6 bg-white rounded-md">
        <form
          className="w-full flex justify-center items-center flex-col
          p-5 xl:p-10"
        >
          <div
            className="w-32 h-32 p-10 
              
                        bg-dark
              text-white
              rounded-full 
              flex justify-center items-center
              "
          >
            AP
          </div>

          <h1 className="text-dark text-2xl font-bold mt-5">
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full mx-auto mt-5 text-end">
            <a className="text-secondary hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <div className="w-full mx-auto mt-5 text-center">
            <Button
              className="bg-main text-white w-full"
              onClick={handlerSignIn}
            >
              Entrar
            </Button>
          </div>

          <div className="mt-5">
            <Link to="/signup" className="text-secondary">
              Cadastre-se aqui
            </Link>
          </div>
        </form>
      </BaseAnimate>
    </>
  );
}
