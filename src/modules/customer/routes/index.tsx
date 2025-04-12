import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import ScheduleAppointment from "~/modules/customer/pages/Appointment";

const authRoutes: RouteObject[] = [
	{
		path: API_ENDPOINTS.user.scheduleAppointment,
		element: <ScheduleAppointment />,
	},
];
export default authRoutes;
