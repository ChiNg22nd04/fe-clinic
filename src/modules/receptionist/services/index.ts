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

export const listAppointment = async (params?: Partial<AppointmentPayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.receptionist.apponitmentList);
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("response.data", response.data);
		const data = response.data.data?.map(
			(item: any): AppointmentPayload => ({
				id: item.id,
				patientId: item.patient_id,
				patientName: item.patient_name,
				staffId: item.staff_id,
				staffName: item.staff_name,
				specialtyId: item.specialty_id,
				specialtyName: item.specialty_name,
				symptoms: item.symptoms,
				appointmentDate: item.appointment_date,
				clinicId: item.clinic_id,
				clinicName: item.clinic_name,
				status: item.status, // nếu status là number, convert sang string (tuỳ thuộc interface của bạn)
			})
		);
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const updateAppointment = async (params: { id: number; status: number }) => {
	try {
		const response = await axiosInstance.put(
			API_ENDPOINTS.receptionist.updateAppointment,
			params
		);
		console.log("Cập nhật status thành công:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Lỗi khi cập nhật status:", error.response?.data || error.message);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
