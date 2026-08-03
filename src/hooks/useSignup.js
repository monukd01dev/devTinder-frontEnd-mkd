import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validations/auth.schema";
import { signupUser } from "../services/auth.service";
import toast from "react-hot-toast";

const useSignup = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const { register, handleSubmit, watch, setValue, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: { skills: [] }
    });

    
    // --- SUBMIT LOGIC ---
    const onSubmit = async (data) => {
        const toastId = toast.loading("Creating your account... Please wait.");
        console.log("[Form Data for API]:", data);

        try {
            const user = await signupUser(data);
            console.log(`returned user :`, user);

            // FIX: 'toasterId' ki jagah 'id' use kiya taaki loading toast hide hoke success ban jaye
            toast.success(`Account Created Successfully!!`, { id: toastId });

            navigate('/login');

            // Thoda delay diya taaki page change hone ke baad aaram se dikhe
            setTimeout(() => {
                toast('LogIn and Enjoy', { icon: '👏',toasterId : toastId });
            }, 700);

        } catch (error) {
            console.error(`[Signup Form Error] : `, error.message);

            // FIX: Error aane par loading toast ko error toast me badal diya
            toast.error(error.message || "Something went wrong!", { id: toastId });

            setError('root', {
                type: 'server',
                message: error.message
            });
        }
    };

    return {
        showPassword,
        setShowPassword,
        register,
        handleSubmit,
        isSubmitting,
        errors,
        onSubmit,
        setValue,
        watch

    }
}

export default useSignup;