// import Button from './components/models/button'
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";
import BaseAnimate from "../../models/BaseAnimate";
import Input from "../../models/Input";
import Button from "../../models/Button";
import { Spinner } from "../../models/Spinner";
import { ConfirmedCode } from "../ConfirmedCode";

export default function SignIn() {
  const { signIn, signed } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [confirmationCode]);

  const handlerSignIn = async () => {
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    const payload = {
      email, password
    }

    const status = await signIn(payload)

    if (status === 403)
      setConfirmationCode(false);

    setLoading(false); 
  }

  if (signed) {
    return <Navigate to="/" />
  }

  return (
    <>
      <BaseAnimate className="w-auto p-2 xl:w-2/6 bg-white rounded-md">
        <div className="w-full flex justify-center items-center flex-col
          p-1 xl:px-10 xl:pt-10">
          <div
            className="w-28 h-28 p-10 
              
                        bg-dark
              text-white
              rounded-full 
              flex justify-center items-end
              text-6xl
              "
          >
            🚘
          </div>

          <h1 className="text-dark text-2xl font-bold mt-5">
            AzAutoParking
          </h1>
          <span className="text-slate-400 text-center">
            Sistema de Gerenciamento de Estacionamento
          </span>
        </div>

        {confirmationCode ? 
        <form
          className="w-full flex justify-center items-center flex-col
          p-1 xl:p-10"
        >

          <div className="w-full mx-auto mt-10">
            <Input
              className="bg-white"
              label="Email"
              placeholder="Digite seu email"
              value={email}
              disabled={loading}
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
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full mx-auto mt-5 text-end">
            <Button disabled={loading} onClick={() => navigate("/signup")} className="text-secondary shadow-none hover:underline">
              Esqueceu sua senha?
            </Button>
          </div>

          <div className="w-full mx-auto mt-5 text-center">
            <Button
              className="bg-main text-white w-full flex justify-center items-center gap-2"
              onClick={handlerSignIn}
              disabled={loading}
            >
              <span>
                Entrar
              </span>
              {loading && <Spinner />}
            </Button>
          </div>

          <div className="mt-5">
            <Button disabled={loading} onClick={() => navigate("/signup")} className="text-secondary shadow-none">
              Cadastre-se aqui
            </Button>
          </div>
        </form>
        :
        <ConfirmedCode email={email} setConfirmationCode={setConfirmationCode} />
      }
      </BaseAnimate>
    </>
  );
}
