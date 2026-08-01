import axiosInstance from "../utils/axios";
import { NETWORK_ERR_MESG } from "../utils/constants";
export const loginAPI = async (credentials) => {
  try {
    // credentials me tera { email, password } object aayega form se
    const response = await axiosInstance.post("/auth/login", credentials);

    // Agar backend ne 200 OK bheja, toh data return kar do
    return response.data;

  } catch (error) {
    // 🚨 Backend se aane wale errors ko yahan handle karenge
    if (error?.response && error.response?.data) {
      // Backend (Node.js) ne jo custom error message bheja hoga, hum wahi throw karenge
      throw new Error(error.response.data.message || "Invalid Credentials",{cause:error});
    }

    // Agar server down hai ya internet nahi chal raha
    throw new Error(NETWORK_ERR_MESG,{cause:error});
  }
};


export const logoutUser = async () => {
  try {
    await axiosInstance.post("/auth/logout")
  } catch (error) {
    if (error?.response?.data) {
      throw new Error(error.response.data.message || 'Something went Wrong!!',{cause:error})
    }
    throw new Error(NETWORK_ERR_MESG,{cause:error})
  }
}

export const signupUser = async(signupData)=>{
  try {
    const response = await axiosInstance.post('/auth/signup',signupData)
    return response?.data?.data
  } catch (error) {
    if (error?.response?.data) {
      throw new Error(error.response.data.message || 'Something went Wrong!!',{cause:error})
    }
    throw new Error(NETWORK_ERR_MESG,{cause:error})
  }
}