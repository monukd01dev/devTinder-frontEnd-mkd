export const BASE_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:8080/api/v1' 
  : '/api/v1';
export const DELETE_CONFIRM_TEXT = "delete my account";
export const NETWORK_ERR_MESG = "Network Error! DevTinder server is unreachable."