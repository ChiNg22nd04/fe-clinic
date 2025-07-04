import { RouteObject } from "react-router-dom";
import CustomerLayout from "~/modules/customer/layout";

import ScheduleAppointment from "~/modules/customer/pages/Appointment";
import Profile from "~/modules/customer/pages/Profile";
import MedicalReport from "~/modules/customer/pages/MedicalReport";
import Upload from "../pages/Upload";
import Examination from "~/modules/customer/pages/Examination";
const USER_BASE = "/user";

const customerRoutes: RouteObject[] = [
	{
		path: USER_BASE,
		element: <CustomerLayout />,
		children: [
			{
				path: "schedule-appointment",
				element: <ScheduleAppointment />,
				handle: { hideSidebar: true },
			},
			{ path: "profile", element: <Profile /> },
			{ path: "appointments", element: <MedicalReport /> },
			{ path: "upload-profile", element: <Upload /> },
			{ path: "upload-avatar", element: <Upload /> },
			{ path: "medical-history", element: <Examination /> },
		],
	},
];
export default customerRoutes;
