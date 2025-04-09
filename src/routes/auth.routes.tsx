import { RouteObject } from "react-router-dom";
import LoginPage from "~/pages/auth/Login/Login";

const authRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
];
export default authRoutes;
