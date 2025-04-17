import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import Doctor from "~/modules/doctor/layout";
import ExaminationForm from "../page/ExaminationForm";
import Shifts from "../page/Shifts";

const DOCTOR_BASE = "/doctor";

const receptionistRoutes: RouteObject[] = [
	{
		path: DOCTOR_BASE,
		element: <Doctor />,
		children: [
			{ path: "shifts", element: <Shifts /> },
			{ path: "medical-examination/get-all", element: <ExaminationForm /> },
			{ path: "medical-examination/get-detail", element: <ExaminationForm /> },
		],
	},
];
export default receptionistRoutes;
