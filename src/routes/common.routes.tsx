import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config/apiConfig";

import HomePage from "../pages/common/Home/Home";

const publicRoutes: RouteObject[] = [
    {
        path: API_ENDPOINTS.common.home,
        element: <HomePage />,
    },
];
export default publicRoutes;
