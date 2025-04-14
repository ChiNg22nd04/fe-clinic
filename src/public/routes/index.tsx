import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import HomePage from "~/public/pages/Home";
import Specialties from "~/public/pages/Specialties";

const publicRoutes: RouteObject[] = [
	{
		path: API_ENDPOINTS.common.home,
		element: <HomePage />,
	},
	{
		path: API_ENDPOINTS.common.specialties,
		element: <Specialties />,
	},
];
export default publicRoutes;
