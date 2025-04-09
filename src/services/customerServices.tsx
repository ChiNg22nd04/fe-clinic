import axiosInstance from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

interface AppointmentPayload {
    doctorId: string;
    appointmentDate: string; // định dạng "YYYY-MM-DD HH:mm:ss"
    symptoms?: string;
}

export const scheduleAppointment = async (payload: AppointmentPayload) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.user.scheduleAppointment, payload);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};
