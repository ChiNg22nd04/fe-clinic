import { createBrowserRouter, Navigate } from "react-router-dom";
// import publicRoutes from "../public/routes";
import publicRoutes from "~/public/routes";
import authRoutes from "~/modules/auth/router";
import customerRoutes from "~/modules/customer/routes";
import HomePage from "~/public/pages/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	...authRoutes,
	...publicRoutes,
	...customerRoutes,
]);
