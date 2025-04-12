import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import LoginPage from "~/modules/auth/pages/Login";

const authRoutes: RouteObject[] = [
	{
		path: API_ENDPOINTS.auth.login,
		element: <LoginPage />,
	},
];
export default authRoutes;
