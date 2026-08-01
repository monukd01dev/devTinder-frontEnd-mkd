import axios from 'axios'
import { BASE_URL } from './constants'
import appStore from '../store/appStore'
import { removeUser } from '../store/slices/userSlice'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

// 🔥 THE GLOBAL BOUNCER (Response Interceptor)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized: Clearing session...");
      
      // 1. Bas chup-chaap Redux ko khali kar do
      appStore.dispatch(removeUser());
      
      // REACT KI MAGIC: 
      // Redux khali hote hi tera <ProtectedRoute> khud ba khud 
      // user ko /login par bhej dega. No loops, no hard reloads!
    }

    return Promise.reject(error);
  }
);

export default axiosInstance