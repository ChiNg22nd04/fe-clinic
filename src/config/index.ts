// src/config/apiConfig.ts
import customerRoutes from "~/modules/customer/routes";
export const API_BASE_URL = "http://localhost:3500";
const USER_BASE = "/user";

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
	},

};
