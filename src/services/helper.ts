import { toast } from "react-toastify"

class Helper {
    ResponseErrorApi(error: any) {
        if (!!error?.response && error?.response?.data) {
            error?.response?.data?.messages.forEach((erro: any) => {
                toast.error(erro.ptBr)
            });
            return
        }
        
        toast.error("Algo deu errado, entre em contato com o suporte.")
        return error
    }
    
}

export default new Helper()

