import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BaseAnimate from "@/components/models/BaseAnimate";
import useAuthContext from "@/hooks/useAuthContext";
import Input from "@/components/models/Input";
import Button from "@/components/models/Button";
import Spinner from "@/components/models/Spinner";
import { ECurrentComp, type TFormSingIn } from "@/components/Auth/types.auth";

const FormSingIn = ({ setEmailForConfirmationCode, setCurrentComp }: TFormSingIn) => {
    const { signIn } = useAuthContext()
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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

        if (status === 403){
            setCurrentComp(ECurrentComp.confirmedCode);
            setEmailForConfirmationCode(email);
        }

        setLoading(false);
    }

    return (
        <>
            <BaseAnimate className="w-auto">
                <form
                    className="w-full flex justify-center items-center flex-col p-1 xl:p-10"
                >
                    <div className="w-full">
                        <h2 className="text-lg text-dark">Entre com sua conta</h2>
                    </div>

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
                        <Button disabled={loading} onClick={() => setCurrentComp(ECurrentComp.forgotPassword)} className="text-secondary shadow-none hover:underline">
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
            </BaseAnimate>
        </>
    )
}

export default FormSingIn