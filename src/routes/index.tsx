import { createBrowserRouter, Navigate } from "react-router-dom";
import authRoutes from "./auth.routes";
import publicRoutes from "./common.routes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />,
    },
    ...authRoutes,
    ...publicRoutes,
]);
