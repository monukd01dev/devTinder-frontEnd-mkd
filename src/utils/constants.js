export const BASE_URL = import.meta.env.VITE_MODE === 'development' 
  ? 'http://localhost:8080/api/v1' 
  : import.meta.env.VITE_BASE_BACKEND_URL;
export const DELETE_CONFIRM_TEXT = "delete my account";
export const NETWORK_ERR_MESG = "Network Error! DevTinder server is unreachable."