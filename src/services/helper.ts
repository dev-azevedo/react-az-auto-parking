import { toast } from "react-toastify"

class Helper {
    ResponseErrorApi(error: any) {
        if (!!error?.response && error?.response?.data) {
            toast.error(error?.response?.data?.message?.ptBr)
            return
        }
        
        toast.error("Algo deu errado, entre em contato com o suporte.")
        return error
    }
    
}

export default new Helper()

