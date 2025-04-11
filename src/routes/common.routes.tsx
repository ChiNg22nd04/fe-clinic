import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config/apiConfig";

import HomePage from "~/pages/common/Home/Home";
import Specialties from "~/pages/common/Specialties/Specialties";

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
