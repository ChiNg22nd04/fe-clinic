// import axios from "axios";
import { API_ENDPOINTS } from "~/config";

import axiosInstance from "~/Axios/axiosInstance";

export const createPayment = async (amount: number, bankCode?: string, language: string = "vn") => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.createPayment, {
			amount,
			bankCode,
			language,
		});
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Không thể tạo thanh toán");
	}
};
