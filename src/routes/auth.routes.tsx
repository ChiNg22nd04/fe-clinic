import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config/apiConfig";

import LoginPage from "~/pages/auth/Login/Login";

const authRoutes: RouteObject[] = [
    {
        path: API_ENDPOINTS.auth.login,
        element: <LoginPage />,
    },
];
export default authRoutes;
