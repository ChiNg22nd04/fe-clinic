import axios from "axios";
import { API_BASE_URL } from "~/config";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		const userString = localStorage.getItem("user");
		console.log(userString);
		let token = null;
		if (userString) {
			try {
				const user = JSON.parse(userString);
				token = user?.accessToken;
			} catch (err) {
				console.warn("❌ Lỗi parse user:", err);
			}
		}

		if (token && token !== "undefined" && token !== "null") {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			console.warn("⚠️ Không tìm thấy hoặc token không hợp lệ:", token);
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response?.status === 401) {
			console.warn("🔐 Token hết hạn hoặc không hợp lệ. Đăng xuất...");
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
