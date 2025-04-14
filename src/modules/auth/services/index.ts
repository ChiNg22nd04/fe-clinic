import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";

interface LoginPayload {
	email: string;
	password: string;
}

export const login = async (payload: LoginPayload) => {
	try {
		console.log(payload);
		const response = await axiosInstance.post(API_ENDPOINTS.auth.login, payload);
		console.log(response);
		const { user } = response.data;
		const token = user.accessToken;
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		return response.data;
	} catch (error: any) {
		console.error("Error during login:", error);

		if (error.response) {
			throw error.response.data;
		} else if (error.request) {
			// Request đã gửi nhưng không nhận được phản hồi
			throw {
				message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc thử lại sau.",
			};
		} else {
			// Lỗi khác khi thiết lập request
			throw { message: "Đã xảy ra lỗi không xác định." };
		}
	}
};
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};
