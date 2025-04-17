import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export interface ExaminationPayload {
	id?: number;
	numerical: number;
	medicalRecordId: number;
	idAppointment: number;
	staffId: number;
	diagnosis: string;
	note: string;
	status?: number;
	patientId: number;
	patientName?: string;
	staffName?: string;
	specialtyId: number;
	specialtyName?: string;
	symptoms?: string;
	appointmentDate: string;
	examinationDate: string;
	clinicId: number;
	clinicName?: string;
}

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
		// Convert dữ liệu từ snake_case -> camelCase
		console.log("response.data", response.data);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const updateExamination = async (params: {
	id: number;
	status: number;
	diagnosis: string;
	note: string;
}) => {
	try {
		const response = await axiosInstance.put(API_ENDPOINTS.doctor.updateExamination, params);
		console.log("Cập nhật phiếu khám thành công:", response.data);
		return response.data;
	} catch (error: any) {
		console.error("Lỗi khi cập nhật phiếu khám:", error.response?.data || error.message);
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
		console.log("response.data", response.data);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
