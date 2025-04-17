import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export interface AppointmentPayload {
	id?: number;
	patientId: number;
	patientName?: string;
	staffId: number;
	staffName?: string;
	specialtyId: number;
	specialtyName?: string;
	symptoms?: string;
	appointmentDate: string;
	clinicId: number;
	clinicName?: string;
	status?: number;
}

export const listExamination = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.doctor.examinationList);
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("response.data", response.data);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const detailExamination = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.doctor.detailExamination);
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("response.data", response.data);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
