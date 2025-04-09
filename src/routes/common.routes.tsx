import { RouteObject } from "react-router-dom";
import HomePage from "../pages/common/Home/Home";

const publicRoutes: RouteObject[] = [
    {
        path: "/home",
        element: <HomePage />,
    },
];
export default publicRoutes;
