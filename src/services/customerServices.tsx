import axios from "axios";

const API_URL = "http://localhost:3500";

interface AppointmentPayload {
    doctorId: string;
    appointmentDate: string; // định dạng "YYYY-MM-DD HH:mm:ss"
    symptoms?: string;
}

export const scheduleAppointment = async (payload: AppointmentPayload) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/user/schedule-appointment`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unexpected error occurred" };
    }
};
