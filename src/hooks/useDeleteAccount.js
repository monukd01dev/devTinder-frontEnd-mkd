import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "../store/slices/userSlice";
import { deleteProfile } from '../services/profile.service';
import { clearFeed } from '../store/slices/feedSlice';

const useDeleteAccount = () => {
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting your account permanently...");

        try {
            // 1. Backend API call to delete user data
            const data = await deleteProfile(); 
            console.log(data``)
            toast.success("Account deleted permanently.", { id: toastId });
            //clearing the store 
            dispatcher(removeUser());
            dispatcher(clearFeed());
            //navigating the user to home
            navigate('/', { replace: true });
        } catch (error) {
            console.error("Delete Account Error : ", error.message);
            // 🚨 Delete fail hua, toh hum user ko kick nahi karenge. Bas error dikhayenge.
            toast.error("Failed to delete account. Please try again.", { id: toastId });
        }
    }

    return {
        handleDelete
    }
}

export default useDeleteAccount;