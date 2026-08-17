export const BASE_URL = import.meta.env.VITE_MODE === 'development' 
  ? 'http://localhost:8080/api/v1' 
  : import.meta.env.VITE_BASE_BACKEND_URL;
export const DELETE_CONFIRM_TEXT = "delete my account";
export const NETWORK_ERR_MESG = "Network Error! DevTinder server is unreachable."
export const FALLBACK_PROFILE_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"