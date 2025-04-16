import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
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
	status?: string;
}

export const listAppointment = async (payload: AppointmentPayload) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.receptionist.apponitmentList);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
