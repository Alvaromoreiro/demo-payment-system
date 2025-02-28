const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const BASE_URL = `http://${BACKEND_URL}/app`;

export const ENDPOINT = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    VERIFY_TOKEN: `${BASE_URL}/verifyToken`,
};
