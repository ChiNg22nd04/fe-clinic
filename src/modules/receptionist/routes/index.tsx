import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import Receptionist from "~/modules/receptionist/layout";
import Shifts from "../page/Shifts";
import Appointment from "../page/Appointment";
import ExaminationForm from "../page/ExaminationForm";
import AppointmentDetailModal from "../page/Appointment/AppointmentDetailModal";

const RECEPTIONIST_BASE = "/receptionist";

const receptionistRoutes: RouteObject[] = [
	{
		path: RECEPTIONIST_BASE,
		element: <Receptionist />,
		children: [
			{ path: "shifts", element: <Shifts /> },
			{ path: "appointment/get-all", element: <Appointment /> },
			{ path: "appointment/update-status", element: <Appointment /> },
			{ path: "examination/get-all", element: <ExaminationForm /> },
		],
	},
];
export default receptionistRoutes;
