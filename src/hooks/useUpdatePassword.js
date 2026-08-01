import toast from 'react-hot-toast';
import useLogout from "./useLogout"; // 🚨 Tera banaya hua master hook!
import { updatePassword } from '../services/profile.service';

const useUpdatePassword = () => {
    // Logout ka function nikal liya
    const { handleLogout } = useLogout(); 

    // Ye data RHF se aayega (currentPassword, newPassword)
    const handleUpdate = async (data) => { 
        const toastId = toast.loading("Updating your password...");

        try {
            // 1. Backend ko call lagao (Confirm password bhejne ki zaroorat nahi hoti)
            await updatePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });

            // 2. Success Toast dikhao
            toast.success("Password updated successfully!", { id: toastId });

            // 3. 🚨 The Pro Move: 1.5 second ruk kar logout call kardo
            // Thoda delay isliye diya taaki user ko "Success" wala green message padhne ka time mil jaye
            setTimeout(() => {
                handleLogout(); 
            }, 1500); 

        } catch (error) {
            console.error("Update Password Error : ", error.message);
            // Agar purana password galat dala, toh backend se jo error aayegi wo dikhayenge
            toast.error(error?.message , { id: toastId });
        }
    }

    return {
        handleUpdate
    }
}

export default useUpdatePassword;