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

export interface InvoicePayload {
	id: number;
	totalAmount: number;
	examinationFormId: number;
	createdAt: string;
	updatedAt: string;
	paymentStatus: string;
	paymentMethod: string;
	patientName: string;
	patientId: number;
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

export const listExamination = async (params?: Partial<ExaminationPayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.receptionist.examinationList);
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
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const listInvoices = async (params?: Partial<InvoicePayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.receptionist.invoiceList); // Đường dẫn tương ứng route backend
		console.log(response.data);
		const data = response.data.data?.map(
			(item: any): InvoicePayload => ({
				id: item.id,
				examinationFormId: item.examination_form_id,
				totalAmount: item.total_amount,
				createdAt: item.created_at,
				updatedAt: item.updated_at,
				paymentStatus: item.payment_status,
				paymentMethod: item.payment_method,
				patientName: item.patient_name,
				patientId: item.patient_id,
			})
		);
		return data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn");
	}
};

export const invoiceCreate = async (params: { examinationFormId: number }) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.receptionist.invoiceCreate, params);
		console.log(response.data);
		// const data = response.data.data?.map(
		// 	(item: any): InvoicePayload => ({
		// 		id: item.id,
		// 		examinationFormId: item.examination_form_id,
		// 		totalAmount: item.total_amount,
		// 		createdAt: item.createdAt,
		// 		updatedAt: item.updatedAt,
		// 	})
		// );
		console.log(response.data.data);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn");
	}
};
