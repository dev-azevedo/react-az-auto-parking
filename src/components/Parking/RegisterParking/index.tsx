import Button from "@/components/models/Button";
import Input from "@/components/models/Input"
import Spinner from "@/components/models/Spinner";
import { api } from "@/services/api";
import helper from "@/services/helper";
import type { TResponseApi } from "@/types/TResponseApi";
import { useState } from "react";
import { toast } from "react-toastify";


type TRegisterParking = {
    setNewParkings: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterParking = ({ setNewParkings }: TRegisterParking) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [parkingNumber, setParkingNumber] = useState<number>(0);

    const handlerRegisterParking = async () => {
        
        if (!parkingNumber || parkingNumber < 1) {
            toast.error("Preencha o número da vaga corretamente.");
            return;
        }

        setLoading(true);
        
        try {
            const { status } = await api.post<TResponseApi>(`/parkings??skip=1&take=5`, {
                parkingNumber: +parkingNumber
            });
            if (status === 201) {
                toast.success("Vaga cadastrada com sucesso");
                setParkingNumber(0);
                setNewParkings(true);
                return;
            }
        } catch (error) {
            helper.ResponseErrorApi(error)
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <Input 
                label="Número da vaga" 
                placeholder="Digite o número da vaga" 
                value={parkingNumber} 
                onChange={(e) => setParkingNumber(+e.target.value)}
                disabled={loading}
                />

            <Button className="bg-main text-white w-full mt-5 flex justify-center items-center gap-2" onClick={handlerRegisterParking} disabled={loading}>
                {loading ? <Spinner /> : <span>Cadastrar</span>}
            </Button>
        </div>
    )
}

export default RegisterParking