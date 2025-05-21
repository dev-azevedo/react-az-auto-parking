import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../../context/auth.context";
import { api } from "../../../services/api";
import type { TResponseApi } from "../../../context/type.auth";
import helper from "../../../services/helper";
import Input from "../../models/Input";
import Button from "../../models/Button";
import { Spinner } from "../../models/Spinner";
import BaseAnimate from "../../models/BaseAnimate";

type TConfirmedCode = {
    email: string;
    setConfirmationCode: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ConfirmedCode = ({ email, setConfirmationCode }:TConfirmedCode) => {
    const { updateUser } = useContext(AuthContext);
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
            const response = await api.post<TResponseApi>("/auth/verify/account", payload);
            const result = response.data;
            const userData = result.data;
            updateUser(userData);
            toast.success("Conta verificada com sucesso");
            navigate("/");
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
                    <h3 className="text-lg text-dark">Verifique seu email, foi enviado um código para validação</h3>

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
                        <Button disabled={loading} onClick={() => setConfirmationCode(true)} className="text-secondary shadow-none">
                            Entrar com outra conta
                        </Button>
                    </div>
                </form>
            </BaseAnimate>
        </>
    );
}