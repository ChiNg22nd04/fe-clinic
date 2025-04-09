import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config/apiConfig";

import ScheduleAppointment from "~/pages/customer/Appointment/ScheduleAppointment";

const authRoutes: RouteObject[] = [
    {
        path: API_ENDPOINTS.user.scheduleAppointment,
        element: <ScheduleAppointment />,
    },
];
export default authRoutes;
