import { Link } from "react-router-dom";
import BaseAnimate from "../../models/BaseAnimate";

export const SignUp = () => {
    return (
        <>
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

                 

                    <div className="mt-5">
                        <Link to="/signin" className="text-blue-700">
                            Já tenho conta
                        </Link>
                    </div>
                </form>
            </BaseAnimate>
        </>
    );
};