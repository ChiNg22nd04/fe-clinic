// src/config/apiConfig.ts

export const API_BASE_URL = "http://localhost:3500";

export const API_ENDPOINTS = {
    common: {
        home: "/home",
        specialties: "/page/specialties",
        clinics: "/page/clinics",
        specialtiesClinicId: "/page/specialties/clinic-id",
        shiftDoctor: "/page/shifts-all",
        allSpecialtiesDoctor: "/page/specialties/doctor-all"
    },
    auth: {
        login: "/login",
    },
    user: {
        scheduleAppointment: "/user/schedule-appointment",
    },

    // Thêm các endpoint khác nếu cần
};
