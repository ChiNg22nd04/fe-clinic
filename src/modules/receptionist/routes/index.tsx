import { RouteObject } from "react-router-dom";
import Receptionist from "~/modules/receptionist/layout";
import Shifts from "../page/Shifts";
import Appointment from "../page/Appointment";
import ExaminationForm from "../page/ExaminationForm";
import Invoice from "../page/Invoice";
import ExaminationDetailModal from "~/modules/receptionist/page/ExaminationForm";

const RECEPTIONIST_BASE = "/receptionist";

const receptionistRoutes: RouteObject[] = [
	{
		path: RECEPTIONIST_BASE,
		element: <Receptionist />,
		children: [
			{ path: "appointment/get-all", element: <Appointment /> },
			{ path: "appointment/update-status", element: <Appointment /> },
			{ path: "examination/get-all", element: <ExaminationForm /> },
			{ path: "medical-examination/get-detail", element: <ExaminationDetailModal /> },
			{ path: "invoice/get-all", element: <Invoice /> },
			{ path: "invoice/create", element: <Invoice /> },
			{ path: "shifts/get-detail", element: <Shifts /> },
			{ path: "prescription/form", element: <ExaminationDetailModal /> },
		],
	},
];
export default receptionistRoutes;
