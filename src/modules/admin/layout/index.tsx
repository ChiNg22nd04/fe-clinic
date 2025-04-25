import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "./AdminLayout.scss";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="admin-layout">
			<Sidebar />
			<div className="main-content">
				<Header />
				<div className="content-area">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
