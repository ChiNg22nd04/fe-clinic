import { RouteObject } from "react-router-dom";
import AdminLayout from "~/modules/admin/layout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Clinics from "../pages/Clinics";
import Reports from "../pages/Reports";
const ADMIN_BASE = "/admin";

// Sửa lại để sử dụng AdminLayout làm wrapper
const adminRoutes: RouteObject[] = [
	{
		path: ADMIN_BASE,
		element: (
			<AdminLayout>
				<Dashboard />
			</AdminLayout>
		),
		children: [
			{ path: "users", element: <Users /> },
			{ path: "clinics", element: <Clinics /> },
			{ path: "reports", element: <Reports /> },
		],
	},
];

export default adminRoutes;
