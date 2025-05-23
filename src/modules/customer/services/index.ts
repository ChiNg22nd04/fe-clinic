import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import { AppointmentPayload, UserPayload, ExaminationPayload } from "~/shared/interfaces";

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
		const response = await axiosInstance.post(API_ENDPOINTS.user.appointments, payload);
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

export const updateUserProfile = async (
	payload: Partial<UserPayload> & { id: number },
	avatarFile?: File
) => {
	try {
		const formData = new FormData();

		if (avatarFile) {
			formData.append("avatar", avatarFile);
		}

		// Append các thông tin khác
		Object.entries(payload).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		const response = await axiosInstance.put(API_ENDPOINTS.user.updateUserAvatar, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

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

		console.log("User profile updated successfully:", updatedUser);
		return updatedUser;
	} catch (error: any) {
		console.error("Error updating user profile:", error);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getExamination = async (payload: Pick<ExaminationPayload, "patientId">) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.user.examination, payload);
		console.log(response.data.data);
		const data = response.data.data?.map(
			(item: any): ExaminationPayload => ({
				id: item.id,
				numerical: item.numerical,
				medicalRecordId: item.medical_record_id,
				idAppointment: item.id_appointment,
				staffId: item.staff_id,
				diagnosis: item.diagnosis,
				note: item.note,
				status: item.status,
				patientId: item.patient_id,
				patientName: item.full_name,
				staffName: item.staff_name,
				specialtyId: item.specialty_id,
				specialtyName: item.specialty_name,
				symptoms: item.symptoms,
				appointmentDate: item.appointment_date,
				examinationDate: item.examination_date,
				clinicId: item.clinic_id,
				clinicName: item.clinic_name,
				address: item.address,
				phoneNumber: item.phone_number,
				emailAddress: item.email_address,
				image: item.image,
			})
		);

		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
