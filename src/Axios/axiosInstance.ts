import axios from "axios";
import { API_BASE_URL } from "~/config";
// Tạo một instance của axios
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000, // Giới hạn thời gian cho mỗi request
	headers: {
		"Content-Type": "application/json",
	},
});
axiosInstance.interceptors.request.use(
	function (config) {
		const userString = localStorage.getItem("user");
		const user = userString ? JSON.parse(userString) : null;
		const token = user.accessToken;
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

// Thêm Interceptor cho Response
axiosInstance.interceptors.response.use(
	function (response) {
		// Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx đều kích hoạt hàm này
		return response;
	},
	function (error) {
		// Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx đều kích hoạt hàm này
		// Bạn có thể xử lý các lỗi chung như token hết hạn ở đây
		if (error.response.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
