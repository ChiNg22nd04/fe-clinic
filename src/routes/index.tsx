import { createBrowserRouter, Navigate } from "react-router-dom";
import publicRoutes from "./common.routes";
import authRoutes from "./auth.routes";
import customerRoutes from "./customer.routes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />,
    },
    ...authRoutes,
    ...customerRoutes,
    ...publicRoutes,
]);
