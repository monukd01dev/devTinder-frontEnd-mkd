import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { addUser } from '../store/slices/userSlice';
import { getUserProfile } from "../services/user.service";

const usePersistenLogin = function () {
    //loading is important so protected route will not throw the user to the /login page 
    const [loading, setLoading] = useState(true);
    const dispatcher = useDispatch()

    const fetchUserProfile = async function () {
        try {
            //getting the user
            const userProfile = await getUserProfile();

            // setting the user data into the redux store 
            dispatcher(addUser(userProfile))

        } catch (error) {
            console.error('Fetching User Profile failed : ', error.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUserProfile()
    },[])

    return {loading}
}

export default usePersistenLogin;