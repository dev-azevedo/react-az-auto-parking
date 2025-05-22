import React, { useState } from "react";
import { toast } from "react-toastify";

import BaseAnimate from "@/components/models/BaseAnimate";
import Button from "@/components/models/Button";
import Input from "@/components/models/Input";
import helper from "@/services/helper";
import Spinner from "@/components/models/Spinner";
import useAuthContext from "@/hooks/useAuthContext";
import { ECurrentComp, type TResetPassword } from "@/components/Auth/types.auth";
import { api } from "@/services/api";

const ResetPassword = ({ setCurrentComp }: TResetPassword) => {
    const { user, signOut } = useAuthContext();
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handlerResetPassword = async () => {

        setLoading(true);
        const payload = {
            id: user?.id,
            newPassword,
            confirmedNewPassword
        }

        try {
            console.log(user)
            await api.post("/auth/password/reset", payload);
            toast.success("Senha alterada com sucesso");
            signOut();
            setCurrentComp(ECurrentComp.signIn);
            return;
        } catch (error) {
            helper.ResponseErrorApi(error)
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <BaseAnimate className="w-auto pt-5">
                <form className="w-full flex justify-center items-center flex-col p-1 xl:p-10">
                    <div className="w-full">
                        <h3 className="text-lg text-dark">Informe a nova senha</h3>
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Nova senha"
                            placeholder="Digite sua nova senha"
                            type="password"
                            value={newPassword}
                            disabled={loading}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" && handlerResetPassword()}
                        />
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Corfirme sua nova senha"
                            placeholder="Digite sua nova senha novamente"
                            type="password"
                            value={confirmedNewPassword}
                            disabled={loading}
                            onChange={(e) => setConfirmedNewPassword(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" && handlerResetPassword()}
                        />
                    </div>

                    <Button
                        className="bg-main text-white w-full flex justify-center items-center gap-2 mt-10"
                        onClick={handlerResetPassword}
                        disabled={loading}
                    >
                        <span>
                            Alterar senha
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

export default ResetPassword