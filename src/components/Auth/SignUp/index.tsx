import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import BaseAnimate from "@/components/models/BaseAnimate";
import Input from "@/components/models/Input";
import Button from "@/components/models/Button";
import Spinner from "@/components/models/Spinner";
import { api } from "@/services/api";
import Helper from "@/services/helper";
import type { TResponseApi } from "@/types/TResponseApi";

const SignUp = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let validateFields = true;

        if (!fullName || fullName.length < 6 || fullName.split(" ").length < 2) {
            toast.error("Preencha o nome completo corretamente");
            validateFields = false;
            return validateFields;
        }

        if (!email) {
            toast.error("Preencha o email corretamente");
            validateFields = false;
            return validateFields;
        }

        if (!password) {
            toast.error("Preencha o campo senha");
            validateFields = false;
            return validateFields;
        }

        if (password.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres");
            validateFields = false;
            return validateFields;
        }

        if (!confirmedPassword) {
            toast.error("Preencha o campo confirmar senha");
            validateFields = false;
            return validateFields;
        }

        if (password !== confirmedPassword) {
            toast.error("As senhas não coincidem");
            validateFields = false;
            return validateFields;
        }

        return validateFields;
    };


    const handlerSignUp = async () => {
        setLoading(true)
        const validFields = validateFields();

        if (!validFields)
            return setLoading(false)

        const payload = {
            fullName, email, password, confirmedPassword
        }

        try {
            const { status } = await api.post<TResponseApi>("/auth/signup", payload);
            if (status === 201) {
                toast.success("Cadastro realizado com sucesso");
                navigate("/signin");
            }
        } catch (error: any) {
            console.error(error)
            Helper.ResponseErrorApi(error)
        }

        return setLoading(false)
    }

    return (
        <>
            <BaseAnimate className="w-full min-w-96 xl:w-2/6 bg-white rounded-md">
                <form
                    className="w-full flex justify-center items-center flex-col
          p-5 xl:p-10"
                >
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

                    <div className="w-full mt-5">
                        <h2 className="text-lg text-dark">Cadastre-se</h2>
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Nome completo *"
                            placeholder="Digite seu nome completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Email *"
                            placeholder="Digite seu email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Senha *"
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="w-full mx-auto mt-5">
                        <Input
                            className="bg-white"
                            label="Confirme sua senha *"
                            placeholder="Digite sua senha novamente"
                            type="password"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <Button
                        className="bg-main text-white w-full mt-5 flex justify-center items-center gap-2"
                        onClick={handlerSignUp}
                        disabled={loading}
                    >
                        <span>
                            Cadastrar
                        </span>
                        {loading && <Spinner />}
                    </Button>

                    <div className="mt-5">

                        <Button disabled={loading} onClick={() => navigate("/signin")} className="text-secondary shadow-none">
                            Já tenho conta
                        </Button>
                    </div>
                </form>
            </BaseAnimate>
        </>
    );
};

export default SignUp;