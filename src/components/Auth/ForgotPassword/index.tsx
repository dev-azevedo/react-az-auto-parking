import React, { useEffect, useState } from "react"
import { toast } from "react-toastify";

import BaseAnimate from "@/components/models/BaseAnimate"
import Button from "@/components/models/Button";
import Input from "@/components/models/Input";
import helper from "@/services/helper";
import { api } from "@/services/api";
import Spinner from "@/components/models/Spinner";
import { ECurrentComp, type TForgotPassword } from "@/components/Auth/types.auth";
import useAuthContext from "@/hooks/useAuthContext";

const ForgotPassword = ({setCurrentComp, setEmailForConfirmationCode, setForgotPassword}: TForgotPassword) => {
    const { signOut } = useAuthContext();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        signOut();
    }, []);	

    const handlerForgotPassword = async () => {
        if (!email) {
            toast.error("Preencha o email para recuperar sua senha.");
            return;
        }
        
        setLoading(true);
        try {
            await api.post("/auth/password/forgot",  { email });
            toast.success("Verifique seu email, foi enviado o código para recuperar sua senha.");
            setEmailForConfirmationCode(email);
            setForgotPassword(true);
            setCurrentComp(ECurrentComp.confirmedCode);
        } catch (error: any) {
            if(error.response?.status == 403) {
                setForgotPassword(false);
                setCurrentComp(ECurrentComp.confirmedCode);
            }

            helper.ResponseErrorApi(error)
        } finally {
            setLoading(false);
        }
    }

   
    return (
         <BaseAnimate className="w-auto pt-5">
                        <form className="w-full flex justify-center items-center flex-col p-1 xl:p-10">
                            <h3 className="text-lg text-dark">Informe seu email para recuperar sua senha</h3>
        
                            <div className="w-full mx-auto mt-5">
                                <Input
                                    className="bg-white"
                                    label="Email"
                                    placeholder="Digite seu email"
                                    value={email}
                                    disabled={loading}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
        
                            <Button
                                className="bg-main text-white w-full flex justify-center items-center gap-2 mt-10"
                                onClick={handlerForgotPassword}
                                disabled={loading}
                            >
                                <span>
                                    Recuperar senha
                                </span>
                                {loading && <Spinner />}
                            </Button>
        
                            <div className="mt-5">
                                <Button disabled={loading} onClick={() => setCurrentComp(ECurrentComp.signIn)} className="text-secondary shadow-none">
                                    Entrar com outra conta
                                </Button>
                            </div>
                        </form>
                    </BaseAnimate>
    )
}

export default ForgotPassword