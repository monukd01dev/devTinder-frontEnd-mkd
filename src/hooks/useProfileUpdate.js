import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { profileUpdateSchema } from "../validations/auth.schema";
import { addUser } from "../store/slices/userSlice"; 
import { updateProfile } from "../services/profile.service";

const useProfileUpdate = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((store) => store.user); // Redux se current user

    const { 
        register, 
        handleSubmit, 
        watch, 
        setValue, 
        reset, // 👈 Redux data ko form me set karne ke liye
        formState: { errors, isSubmitting, dirtyFields } 
    } = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: { skills: [] }
    });

    // 1. Jab Redux me user data aaye, toh form ko us data ke sath initialize/reset kar do
    useEffect(() => {
        if (loggedInUser) {
            reset(loggedInUser);
        }
    }, [loggedInUser, reset]);

    // 2. --- SUBMIT LOGIC (The Diff Generator) ---
    const onSubmit = async (data) => {
        // Sirf wahi keys nikal jo user ne actually change ki hain
        const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
        }, {});

        // Agar kuch change hi nahi kiya aur save daba diya
        if (Object.keys(changedData).length === 0) {
            toast('No changes detected to update.', { icon: '🤷‍♂️' });
            return;
        }

        const toastId = toast.loading("Updating your profile...");
        console.log("[PATCH Payload sending to API]:", changedData);

        try {
            // Yahan teri PATCH API call hogi
            const updatedUser = await updateProfile(changedData);
            toast.success(`Profile updated successfully!`, { id: toastId });
            
            
            // OPTIONAL: API response aane ke baad Redux store update kar de taaki poori app me naya data dikhe
            dispatch(addUser(updatedUser));
            
            // Form ko naye data ke sath wapas reset kar de taaki dirtyFields wapas clear ho jayein
            reset(updatedUser); 

        } catch (error) {
            console.error(`[Profile Update Error] : `, error.message);
            toast.error(error.message || "Failed to update profile!", { id: toastId });
        }
    };

    return {
        register,
        handleSubmit,
        isSubmitting,
        errors,
        onSubmit,
        setValue,
        watch
    };
};

export default useProfileUpdate;