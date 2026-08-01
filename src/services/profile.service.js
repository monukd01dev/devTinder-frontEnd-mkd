import axiosInstance from "../utils/axios"
import { NETWORK_ERR_MESG } from "../utils/constants"
export const updateProfile = async function(data){
    try{
        const response = await axiosInstance.patch(`/user/profile/edit`,data)
        return response?.data?.data
    }catch(error){
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to update profile",{cause : error});
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}

export const deleteProfile = async function () {
    try {
        const response = await axiosInstance.delete('/user/profile');
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to delete profile",{cause : error});
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}

export const updatePassword = async function (data) {
    try {
        const response = await axiosInstance.patch('/user/profile/update-password',data);
        return response?.data?.data
    } catch (error) {
        if(error?.response?.data){
            throw new Error(error.response.data.message || "Failed to update password",{cause : error});
        }
        throw new Error(NETWORK_ERR_MESG,{cause : error})
    }
}