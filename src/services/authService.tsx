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
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Nếu có dùng token
        console.log(JSON.stringify(user));
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
