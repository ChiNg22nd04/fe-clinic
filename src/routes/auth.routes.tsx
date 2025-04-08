import { RouteObject } from "react-router-dom";
import LoginPage from "~/pages/auth/login";

const authRoutes: RouteObject[] = [
    {
        path: "/auth/login",
        element: <LoginPage />,
    },
];
export default authRoutes;
