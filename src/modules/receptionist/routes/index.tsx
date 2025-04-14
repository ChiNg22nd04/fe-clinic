import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import Receptionist from "~/modules/receptionist/layout";
import Shifts from "../page/Shifts";
import Dashboard from "../page/Dashboard";

const RECEPTIONIST_BASE = "/receptionist";

const receptionistRoutes: RouteObject[] = [
	{
		path: RECEPTIONIST_BASE,
		element: <Receptionist />,
		children: [
			{ path: "shifts", element: <Shifts /> },
			{ path: "dashboard", element: <Dashboard /> },
		],
	},
];
export default receptionistRoutes;
