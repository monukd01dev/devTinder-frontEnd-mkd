import axiosInstance from "../utils/axios"
import { NETWORK_ERR_MESG } from "../utils/constants"
export const getUserProfile = async function () {
    try {
        const response = await axiosInstance.get('/user/profile')

        //sending the userdata 
        //axios wrap the output inside the 
        // response{
        //     data : {
        //         status : "jo main bheja hai",
        //         message : "mere backend ka",
        //         data : "user ka",
        //         error : "if i have sended"
        //     }
        // }
        return response?.data?.data

    } catch (error) {
        //how i print my backend message 
        //this case will only work in the case when backend send some reponse
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Invalid Credentials!",{cause : error})
        }

        // Agar server down hai ya internet nahi chal raha
        throw new Error(NETWORK_ERR_MESG,{cause : error});
    }
}

export const getUserFeed = async function(page=1,limit=10){
    try{
        const response = await axiosInstance.get(`/user/feed?page=${page}&limit=${limit}`)
        return response?.data?.data
    }catch(error){
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to fetch feed!",{cause : error})
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}

export const getUserConnections = async function () {
    try {
        const response = await axiosInstance.get('/user/connections')
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to fetch Connections!",{cause : error})
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}
export const getUserConnectionRequests = async function () {
    try {
        const response = await axiosInstance.get('/user/requests/received')
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to fetch Connections Requests!",{cause : error})
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}

