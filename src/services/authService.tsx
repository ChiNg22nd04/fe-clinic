import axios from "axios";

const API_URL = "http://localhost:3500";

interface LoginPayload {
    email: string;
    password: string;
    verificationCode?: string;
}

export const login = async (payload: LoginPayload) => {
    try {
        const response = await axios.post(`${API_URL}/login`, payload);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};
