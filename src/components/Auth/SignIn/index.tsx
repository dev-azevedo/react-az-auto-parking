import React, { useContext, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "@/context/auth.context";
import BaseAnimate from "@/components/models/BaseAnimate";
import ConfirmedCode from "@/components/Auth/ConfirmedCode";
import FormSingIn from "@/components/Auth/SignIn/FormSingIn";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import { ECurrentComp, type TCurrentComp } from "@/types/TAuth";
import ResetPassword from "@/components/Auth/ResetPassword";


const SignIn = () => {
  const { signed } = useContext(AuthContext);

  const [emailForConfirmationCode, setEmailForConfirmationCode] = useState("");
  const [currentComp, setCurrentComp] = useState<TCurrentComp>("signIn");
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);


  const HandlerComp = (): JSX.Element => {
    if (currentComp === ECurrentComp.signIn)
      return <FormSingIn setEmailForConfirmationCode={setEmailForConfirmationCode} setCurrentComp={setCurrentComp} />
    else if (currentComp === ECurrentComp.forgotPassword)
      return <ForgotPassword setCurrentComp={setCurrentComp} setEmailForConfirmationCode={setEmailForConfirmationCode} setForgotPassword={setForgotPassword}/>
    else if (currentComp === ECurrentComp.confirmedCode)
      return <ConfirmedCode email={emailForConfirmationCode} setCurrentComp={setCurrentComp} forgotPassword={forgotPassword} />
    
    return <ResetPassword setCurrentComp={setCurrentComp}/>
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


        <HandlerComp />
      </BaseAnimate>
    </>
  );
}


export default React.memo(SignIn)