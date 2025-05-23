import { RouteObject } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import HomePage from "~/public/pages/Home";
import Specialties from "~/public/pages/Specialties";
import SpecialtyDetail from "~/public/pages/Specialties/SpecialtiesDetail";
import Articles from "~/public/pages/Articles";
import Achievements from "~/public/pages/Achievements";
import Professional from "~/public/pages/Professional";
import DoctorDetail from "~/public/pages/Professional/DoctorDetail";

const publicRoutes: RouteObject[] = [
	{
		path: API_ENDPOINTS.common.home,
		element: <HomePage />,
	},
	{
		path: API_ENDPOINTS.common.specialties,
		element: <Specialties />,
	},
	{
		path: `${API_ENDPOINTS.common.specialties}/:slug`,
		element: <SpecialtyDetail />,
	},
	{
		path: API_ENDPOINTS.common.articles,
		element: <Articles />,
	},
	{
		path: API_ENDPOINTS.common.achievements,
		element: <Achievements />,
	},
	{
		path: API_ENDPOINTS.common.professional,
		element: <Professional />,
	},
	{
		path: `${API_ENDPOINTS.common.professional}/:slug`,
		element: <DoctorDetail />,
	},
];
export default publicRoutes;
