import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import { ExaminationPayload } from "~/shared/interfaces";

export const listExamination = async (params?: Partial<ExaminationPayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.doctor.examinationList);
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("response.data", response.data);
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
				patientName: item.patient_name,
				staffName: item.staff_name,
				specialtyId: item.specialty_id,
				specialtyName: item.specialty_name,
				symptoms: item.symptoms,
				appointmentDate: item.appointment_date,
				examinationDate: item.examination_date,
				clinicId: item.clinic_id,
				clinicName: item.clinic_name,
				image: item.image,
				address: item.address,
				phoneNumber: item.phone_number,
				emailAddress: item.email_address,
			})
		);
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const detailExamination = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.doctor.detailExamination);
		console.log("response.data", response.data);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const updateExamination = async (
	payload: Partial<ExaminationPayload> & { id: number },
	recordFiles?: FormData
) => {
	try {
		const formData = new FormData();
		if (recordFiles) {
			recordFiles.forEach((value, key) => {
				formData.append(key, value);
			});
		}

		Object.entries(payload).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		const response = await axiosInstance.put(API_ENDPOINTS.doctor.updateExamination, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		const updatedData = response.data.data;
		const updatedExamination: ExaminationPayload = {
			id: updatedData.id,
			numerical: updatedData.numerical,
			medicalRecordId: updatedData.medicalRecordId,
			idAppointment: updatedData.idAppointment,
			staffId: updatedData.staffId,
			diagnosis: updatedData.diagnosis,
			note: updatedData.note,
			status: updatedData.status,
			patientId: updatedData.patientId,
			patientName: updatedData.patientName,
			staffName: updatedData.staffName,
			specialtyId: updatedData.specialtyId,
			specialtyName: updatedData.specialtyName,
			symptoms: updatedData.symptoms,
			appointmentDate: updatedData.appointmentDate,
			examinationDate: updatedData.examinationDate,
			clinicId: updatedData.clinicId,
			clinicName: updatedData.clinicName,

			image: updatedData.image,
		};

		console.log("Examination updated successfully:", updatedExamination);
		return updatedExamination;
	} catch (error: any) {
		console.error("Error updating examination:", error);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const updatePrescription = async (params: {
	id: number;
	medicineId: number;
	quantity: number;
	usage: string;
}) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.doctor.updatePrescription, params);
		console.log("Thêm đơn thuốc thành công:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Lỗi khi thêm đơn thuốc:", error.response?.data || error.message);
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const detailPrescription = async (params: { examinationFormId: number }) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.doctor.detailPrescription, params);
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("responsive prescription", response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getMedicine = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.doctor.medicineList);
		console.log("responsive medicine", response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
