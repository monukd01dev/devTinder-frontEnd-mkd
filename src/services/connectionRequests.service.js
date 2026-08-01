import axiosInstance from "../utils/axios";
import { NETWORK_ERR_MESG } from "../utils/constants";

export const sendConnectionRequest= async (toUserId,action) =>{
    try {
        const response = await axiosInstance.post(`/user/request/send/${action}/${toUserId}`)
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data?.message || `Failed to ${action === 'ignored' ? "reject user": "send connection request."}`,{cause:error})
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}
export const reviewConnectionRequest= async (requestId,status) =>{
    try {
        const response = await axiosInstance.patch(`/user/request/review/${status}/${requestId}`)
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data?.message || `Failed to ${status} connection request.`,{cause:error})
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}