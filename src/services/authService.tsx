import axiosInstance from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

interface LoginPayload {
    email: string;
    password: string;
    verificationCode?: string;
}

export const login = async (payload: LoginPayload) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.auth.login, payload);
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
};
