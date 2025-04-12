import { createBrowserRouter, Navigate } from "react-router-dom";
import publicRoutes from "./common.routes";
import authRoutes from "./auth.routes";
import customerRoutes from "./customer.routes";
import HomePage from "~/pages/common/Home/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	...authRoutes,
	...customerRoutes,
	...publicRoutes,
]);
