import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
export interface AppointmentPayload {
	staffId: number;
	appointmentDate: string; // định dạng "YYYY-MM-DD HH:mm:ss"
	symptoms?: string;
	clinicId: number;
	specialtyId: number;
	staffShiftsId: number;
	patientId: number;
}

export const scheduleAppointment = async (payload: AppointmentPayload) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.user.scheduleAppointment, payload);
		console.log(response);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
export const getAllAppointment = async (payload: Pick<AppointmentPayload, "patientId">) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.user.medicalReport, payload);
		console.log(response);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
