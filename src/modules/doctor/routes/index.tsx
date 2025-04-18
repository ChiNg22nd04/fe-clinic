import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import Doctor from "~/modules/doctor/layout";
import ExaminationForm from "../page/ExaminationForm";
import ExaminationDetailModal from "~/modules/doctor/page/ExaminationForm";
import Shifts from "../page/Shifts";
import Invoice from "../../receptionist/page/Invoice";

const DOCTOR_BASE = "/doctor";

const receptionistRoutes: RouteObject[] = [
	{
		path: DOCTOR_BASE,
		element: <Doctor />,
		children: [
			{ path: "shifts", element: <Shifts /> },
			{ path: "medical-examination/get-all", element: <ExaminationForm /> },
			{ path: "medical-examination/get-detail", element: <ExaminationForm /> },
			{ path: "prescription/update-form", element: <ExaminationDetailModal /> },
			{ path: "prescription/form", element: <ExaminationDetailModal /> },
			{ path: "medicine/get-all", element: <ExaminationDetailModal /> },
			{ path: "invoice/get-all", element: <Invoice /> },
		],
	},
];
export default receptionistRoutes;
