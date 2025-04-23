import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import CustomerLayout from "~/modules/customer/layout";
import HomePage from "~/public/pages/Home";
import Specialties from "~/public/pages/Specialties";

import ScheduleAppointment from "~/modules/customer/pages/Appointment";
import Profile from "~/modules/customer/pages/Profile";
import MedicalReport from "~/modules/customer/pages/MedicalReport";
import Upload from "../pages/Upload";

const USER_BASE = "/user";

const customerRoutes: RouteObject[] = [
	// {
	// 	path: API_ENDPOINTS.user.scheduleAppointment,
	// 	element: <ScheduleAppointment />,
	// },
	{
		path: USER_BASE,
		element: <CustomerLayout />,
		children: [
			{ path: "schedule-appointment", element: <ScheduleAppointment /> },
			{ path: "profile", element: <Profile /> },
			{ path: "appointment/get-all", element: <MedicalReport /> },
			{ path: "upload-profile", element: <Upload /> },
			{ path: "upload-avatar", element: <Upload /> },
		],
	},
];
export default customerRoutes;
