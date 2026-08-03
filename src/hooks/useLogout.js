import { logoutUser } from "../services/auth.service"
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { removeUser } from "../store/slices/userSlice"
import { useNavigate } from "react-router"
import { clearFeed } from "../store/slices/feedSlice"

const useLogout = () => {
    const dispatcher = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        // 1. Loading toast start karo
        const toastId = toast.loading("Logging you out please wait!");

        try {
            // 2. Sirf API call yahan rakho
            await logoutUser();
            toast.success("Logout successfully!", { id: toastId });
            
        } catch (error) {
            console.error("Logout Error : ", error.message);
            toast.error("Something went wrong on server, but logging you out locally", { id: toastId });
            
        } finally {
            // 🚨 THE MASTERSTROKE: Yeh block har haal me chalega!
            
            // 3. Agar tu LocalStorage ya Cookies me token rakhta hai, toh usko uda de
            // localStorage.removeItem("token"); 

            // 4. Redux state clear karo (Chahe API fail ho, frontend se user nikal do)
            dispatcher(removeUser());
            dispatcher(clearFeed())
            
            // 5. User ko login pe fek do
            navigate('/login', { replace: true });
        }
    }

    return {
        handleLogout
    }
}

export default useLogout;