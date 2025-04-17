// src/config/apiConfig.ts
import customerRoutes from "~/modules/customer/routes";
export const API_BASE_URL = "http://localhost:3500";
const USER_BASE = "/user";
const RECEPTIONIST_BASE = "/receptionist";
const DOCTOR_BASE = "/doctor";

export const API_ENDPOINTS = {
	common: {
		home: "/",
		specialties: "/specialties",
		clinics: "/clinics",
		specialtiesClinicId: "/specialties/clinic-id",
		shiftDoctor: "/shifts-all",
		allSpecialtiesDoctor: "/specialties/doctor-all",
	},
	auth: {
		login: "/login",
	},
	user: {
		scheduleAppointment: `${USER_BASE}/schedule-appointment`,
		profile: `${USER_BASE}/profile`,
		medicalReport: `${USER_BASE}/appointment/get-all`,
	},
	receptionist: {
		shifts: `${RECEPTIONIST_BASE}/shifts`,
		apponitmentList: `${RECEPTIONIST_BASE}/appointment/get-all`,
		updateAppointment: `${RECEPTIONIST_BASE}/appointment/update-status`,
		examinationList: `${RECEPTIONIST_BASE}/examination/get-all`,
	},
	doctor: {
		shifts: `${DOCTOR_BASE}/shifts`,
		examinationList: `${DOCTOR_BASE}/medical-examination/get-all`,
		detailExamination: `${DOCTOR_BASE}/medical-examination/get-detail`,
		updateExamination: `${DOCTOR_BASE}/medical-examination/update`,
	},
};
