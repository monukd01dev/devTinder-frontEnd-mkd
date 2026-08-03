import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginAPI } from "../services/auth.service";
import { addUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations/auth.schema";



function useLoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatcher = useDispatch()
    // 1. Hook Form Setup with Zod
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
        // mode: "onTouched" // UX Masterstroke: Focus hatne par validation hogi
        defaultValues: {
            emailId: "rahul@email.com",
            password: 'Password@123'
        }
    });

    // 2. Mock API Call
    const onSubmit = async (data) => {
        console.log('Zod ne pass kar diya. RHF data: ', data);
        try {
            const response = await loginAPI(data)
            console.log("Login Successfull", response)
            //adding the loggedInUser data in the userSlice
            dispatcher(addUser(response.data))
            navigate('/app/feed')

        } catch (error) {

            console.error("Login Failed:", error.message);
            setError('root', {
                type: 'server',
                message: error.message
            })
        }
    }

    return {
        showPassword,
        setShowPassword,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting
    }
}

export default useLoginForm;