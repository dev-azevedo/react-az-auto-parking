import { toast } from "react-toastify"

class Helper {
    ResponseErrorApi(error: any) {
        if (!!error?.response && error?.response?.data) {
            toast.error(error?.response?.data?.message)
        }

        return error
    }
    
}

export default new Helper()

