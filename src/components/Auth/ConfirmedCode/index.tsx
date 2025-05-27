import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "@/services/api";
import helper from "@/services/helper";
import Input from "@/components/models/Input";
import Button from "@/components/models/Button";
import Spinner from "@/components/models/Spinner";
import BaseAnimate from "@/components/models/BaseAnimate";
import useAuthContext from "@/hooks/useAuthContext";
import { ECurrentComp, type TConfirmedCode } from "@/types/TAuth";
import type { TResponseApi } from "@/types/TResponseApi";


const ConfirmedCode = ({ email, setCurrentComp, forgotPassword }:TConfirmedCode) => {
    const { updateUser } = useAuthContext();
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handlerConfirmationCode = async () => {
        if (!code) {
            toast.error("Preencha o código de verificação");
            return;
        }

        setLoading(true);
        const payload = {
            email,
            code
        }

        try {
            const url = forgotPassword ? "/auth/verify/code" : "/auth/verify/account";
            const response = await api.post<TResponseApi>(url, payload);
            const result = response.data;
            const userData = result.data;
            updateUser(userData);

            if (!forgotPassword) {
                toast.success("Conta verificada com sucesso");
               return navigate("/"); 
            }

            setCurrentComp(ECurrentComp.resetPassword);
        } catch (error) {
            helper.ResponseErrorApi(error)
        }

        setLoading(false);
    }
    return (
        <>
            <BaseAnimate className="w-auto pt-5">
                <form className="w-full flex justify-center items-center flex-col
          p-1 xl:p-10">
                    <h3 className="text-lg text-dark">Verifique seu email, foi enviado um código para {forgotPassword ? "alterar sua senha." : "verificar conta."}</h3>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Código de verificação"
                            placeholder="Digite seu código de verificação"
                            value={code}
                            disabled={loading}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <Button
                        className="bg-main text-white w-full flex justify-center items-center gap-2 mt-10"
                        onClick={handlerConfirmationCode}
                        disabled={loading}
                    >
                        <span>
                            Confirmar código
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
        </>
    );
}

export default ConfirmedCode