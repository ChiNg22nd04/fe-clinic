import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import { AppointmentPayload, UserPayload } from "~/shared/interfaces";

// export interface AppointmentPayload {
// 	staffId: number;
// 	appointmentDate: string; // định dạng "YYYY-MM-DD HH:mm:ss"
// 	symptoms?: string;
// 	clinicId: number;
// 	specialtyId: number;
// 	staffShiftsId: number;
// 	patientId: number;
// }

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

export const getProfile = async (payload: Pick<UserPayload, "id">) => {
	try {
		const response = await axiosInstance.put(API_ENDPOINTS.user.profile, payload);
		const dataRess = response.data.data;
		const data = dataRess
			? [
					{
						id: dataRess.id,
						email: dataRess.email,
						fullName: dataRess.full_name,
						phone: dataRess.phone,
						role: dataRess.role,
						username: dataRess.username,
						createdAt: dataRess.created_at,
						isActive: dataRess.is_active,
						isVerified: dataRess.is_verified,
						verificationCode: dataRess.verification_code,
						image: dataRess.image,
						otpSentCount: dataRess.otp_sent_count,
						otpLastSentAt: dataRess.otp_last_sent_at,
					},
			  ]
			: [];
		console.log(data);
		return data;
	} catch (error: any) {
		console.error("Error fetching profile:", error);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const updateUser = async (payload: Partial<UserPayload> & { id: number }) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.user.update, payload);
		const updatedData = response.data.data;
		const updatedUser: UserPayload = {
			id: updatedData.id,
			email: updatedData.email,
			fullName: updatedData.full_name,
			phone: updatedData.phone,
			role: updatedData.role,
			username: updatedData.username,
			createdAt: updatedData.created_at,
			isActive: updatedData.is_active,
			isVerified: updatedData.is_verified,
			verificationCode: updatedData.verification_code,
			image: updatedData.image,
			otpSentCount: updatedData.otp_sent_count,
			otpLastSentAt: updatedData.otp_last_sent_at,
		};

		console.log("User updated successfully:", updatedUser);
		return updatedUser;
	} catch (error: any) {
		console.error("Error updating user:", error);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
