import { RouteObject } from "react-router-dom";
import HomePage from "../pages/common/Home/home";

const publicRoutes: RouteObject[] = [
    {
        path: "/home",
        element: <HomePage />,
    },
];
export default publicRoutes;
