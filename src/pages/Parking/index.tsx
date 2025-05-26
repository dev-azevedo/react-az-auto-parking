import BaseAnimate from "@/components/models/BaseAnimate";
import { useEffect, useState } from "react";
import type { TParking } from "./type.parking";
import helper from "@/services/helper";
import { api } from "@/services/api";
import type { TResponseApi } from "@/types/TResponseApi";
import { CircleParking } from "lucide-react";
import Button from "@/components/models/Button";

const Parking = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [parkings, setParkings] = useState<TParking[]>([]);

    useEffect(() => {
        handlerGetParkings();
    }, [])

    const handlerGetParkings = async () => {
        setLoading(true);
        try {
            const { data } = await api.get<TResponseApi>("/parkings");
            const result = data.data.items;
            console.log(result)
            setParkings(result);
        } catch (error) {
            helper.ResponseErrorApi(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <BaseAnimate>
            <section className="w-full px-5 xl:px-46 py-10">
                <header>
                    <h2 className="text-dark font-bold text-xl xl:text-4xl mb-1">Gerenciamento de Estacionamento</h2>
                    <p className="text-slate-400">Controle e monitore todas as vagas do seu estacionamento</p>
                </header>

                <div>
                    <div className="xl:p-5 py-5 w-full flex flex-col gap-3 justify-between items-center">
                        <div className="bg-slate-100 p-5 rounded-md w-full">Total de vagas: 20</div>
                        <div className="bg-slate-100 p-5 rounded-md w-full">Vagas disponíveis: 10</div>
                        <div className="bg-slate-100 p-5 rounded-md w-full">Vagas ocupadas: 10</div>
                    </div>
                </div>


                <div className="mt-5">
                    <div className="border-b border-slate-200 py-5">
                        <h3 className="text-secondary font-semibold text-xl xl:text-2xl">Vagas</h3>
                    </div>

                    {loading ? (
                        <div>Carregando...</div>
                    ) :
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                            {parkings.map((parking, index) => (
                                <div key={index} className={`bg-slate-100 p-5 rounded-md w-full border-l-5 ${parking.available ? "border-green-400" : "border-red-400"}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-dark">
                                            <span className="text-slate-500">
                                                Vaga:
                                            </span>
                                            <span className="text-dark font-semibold text-xl mx-2">
                                                {parking.parkingNumber}
                                            </span>
                                        </h3>
                                        <p className="text-slate-400">
                                            <span>
                                                Status: 
                                            </span>
                                            <span className="text-dark font-semibold mx-2">
                                                {parking.available ? "Disponível" : "Ocupada"}
                                            </span>
                                            </p>
                                    </div>

                                    {parking.available && (
                                        <div className="w-full flex justify-end mt-3">
                                            <Button className="flex items-center gap-2">
                                            <span>Reservar</span> <CircleParking className="text-green-400 w-5 h-5" />
                                            </Button>
                                        </div> 
                                    )}
                                </div>
                            ))}
                        </div>
                    }

                </div>
            </section>
        </BaseAnimate >
    );
};

export default Parking;