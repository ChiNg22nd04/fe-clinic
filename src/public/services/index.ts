import { Console } from "console";
import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import {
	SpecialtyPayload,
	StaffShiftsPayload,
	ClinicPayload,
	ProfileStaffPayload,
} from "~/shared/interfaces";

export const getAllSpecialties = async (params?: Partial<SpecialtyPayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.specialties);
		const result = response.data.data[0];

		if (!Array.isArray(result)) {
			throw new Error("❌ Dữ liệu trả về không phải mảng chuyên khoa.");
		}

		const data = result.map((item: any): SpecialtyPayload => {
			let introduceParsed: any[] = [];
			let servicesParsed: any[] = [];

			// ✅ Check nếu đã là object hoặc array thì không cần parse
			if (Array.isArray(item.introduce)) {
				introduceParsed = item.introduce;
			} else if (typeof item.introduce === "string") {
				try {
					introduceParsed = JSON.parse(item.introduce);
				} catch (e) {
					console.warn("⚠️ Lỗi parse introduce:", item.introduce);
				}
			}

			if (Array.isArray(item.services)) {
				servicesParsed = item.services;
			} else if (typeof item.services === "string") {
				try {
					servicesParsed = JSON.parse(item.services);
				} catch (e) {
					console.warn("⚠️ Lỗi parse services:", item.services);
				}
			}

			return {
				image: item.image,
				specialtyId: item.specialty_id,
				specialtyName: item.specialty_name,
				introduce: introduceParsed,
				services: servicesParsed,
			};
		});

		console.log("✅ Data chuyên khoa đã convert:", data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

// export const getAllClinics = async () => {
// 	try {
// 		const response = await axiosInstance.get(API_ENDPOINTS.common.clinics);
// 		console.log(response.data.data);
// 		return response.data.data;
// 	} catch (error: any) {
// 		throw error.response?.data || { message: "Unexpected error occurred" };
// 	}
// };

export const getAllClinics = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.clinics);
		const dataRes = response.data.data[0];
		console.log("dataRes", dataRes);
		const clinics: ClinicPayload[] = dataRes.map((clinic: any) => {
			return {
				clinicId: clinic.clinic_id,
				clinicName: clinic.clinic_name,
			};
		});

		console.log(clinics);
		return clinics;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getSpecialtiesByIDClinic = async (clinicId: number) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.specialtiesClinicId, {
			clinicId,
		});
		return response.data.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

// export const getAllShiftDoctor = async (staffId: number, specialtyId: number, clinicId: number) => {
// 	try {
// 		const response = await axiosInstance.post(API_ENDPOINTS.common.shiftDoctor, {
// 			staffId,
// 			specialtyId,
// 			clinicId,
// 		});
// 		console.log(response.data.data);
// 		return response.data.data;
// 	} catch (error: any) {
// 		throw error.response?.data || { message: "Unexpected error occurred" };
// 	}
// };

export const getAllShiftDoctor = async (
	staffId: number,
	specialtyId: number,
	clinicId: number
): Promise<StaffShiftsPayload[]> => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.shiftDoctor, {
			staffId,
			specialtyId,
			clinicId,
		});

		const data: StaffShiftsPayload[] = response.data.data;
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllSpecialtiesDoctor = async (
	clinicId: number,
	specialtyId: number
): Promise<ProfileStaffPayload[]> => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.allSpecialtiesDoctor, {
			clinicId,
			specialtyId,
		});

		console.log("response", response);

		const rawData = response.data.data;

		const data: ProfileStaffPayload[] = rawData.map((item: any) => ({
			staffId: item.staff_id,
			fullName: item.full_name,
			clinicId: item.clinic_id,
			specialtyId: item.specialty_id,
		}));
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
