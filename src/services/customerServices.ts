import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config/apiConfig";
export interface AppointmentPayload {
	staffId: number;
	appointmentDate: string; // định dạng "YYYY-MM-DD HH:mm:ss"
	symptoms?: string;
	clinicId: number;
	specialtyId: number;
	shiftId: number;
	patientId: number;
}

export const scheduleAppointment = async (payload: AppointmentPayload) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.user.scheduleAppointment, payload);

		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
