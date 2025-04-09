import { RouteObject } from "react-router-dom";
import ScheduleAppointment from "~/pages/customer/Appointment/ScheduleAppointment";

const authRoutes: RouteObject[] = [
    {
        path: "/user/schedule-appointment",
        element: <ScheduleAppointment />,
    },
];
export default authRoutes;
