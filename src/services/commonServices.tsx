import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config/apiConfig";

export const getAllSpecialties = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.common.specialties);
        console.log(response.data.data);
        return response.data.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};

export const getAllClinics = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.common.clinics);
        console.log(response.data.data);
        return response.data.data;
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

export const getAllShiftDoctor = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.common.shiftDoctor);
        console.log(response.data.data);
        return response.data.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};

export const getAllSpecialtiesDoctor = async (clinicId: number, specialtyId: number) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.common.allSpecialtiesDoctor, {
            clinicId,
            specialtyId,
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};
