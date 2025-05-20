// import Button from './components/models/button'
import { useContext, useState } from "react";
import { toast } from 'react-toastify';

import Input from "../../components/models/Input";
import Button from "../../components/models/Button";
import BaseAnimate from "../../components/models/BaseAnimate";
import Helper from "../../services/helper";
import { AuthContext } from "../../context/auth";
import { Navigate } from "react-router-dom";

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

    try {
      await signIn(payload)
      toast.success("Usuário logado com sucesso")
    } catch (error: any) {
      console.error(error)
      Helper.ResponseErrorApi(error)
    }
  }
  if(signed) {
    return <Navigate to="/" />
  }
  
  return (
    <>
      <div
        className="bg-slate-800 
        py-5 px-56 
        w-full h-screen 
        flex justify-between items-center
        flex-col xl:flex-row
      "
      >
        <div></div>
        <BaseAnimate className="w-full min-w-96 xl:w-2/6 bg-white rounded-md">
          <form
            className="w-full flex justify-center items-center flex-col
          p-5 xl:p-10"
          >
            <div
              className="w-32 h-32 p-10 
              bg-gray-700 
              rounded-full 
              flex justify-center items-center
              "
            >
              AP
            </div>

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
              <Button
                className="bg-slate-400 w-full"
                onClick={handlerSignIn}
              >
                Clique Aqui
              </Button>
            </div>
          </form>
        </BaseAnimate>
      </div>
    </>
  );
}
