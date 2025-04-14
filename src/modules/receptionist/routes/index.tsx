import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";
import Receptionist from "~/modules/receptionist/layout";
import Shifts from "../page/Shifts";

const RECEPTIONIST_BASE = "/receptionist";

const receptionistRoutes: RouteObject[] = [
	{
		path: RECEPTIONIST_BASE,
		element: <Receptionist />,
		children: [
			{ path: "shifts", element: <Shifts /> },
		],
	},
];
export default receptionistRoutes;
