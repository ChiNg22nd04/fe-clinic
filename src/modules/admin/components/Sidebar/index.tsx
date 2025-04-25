import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserLarge, faCircleH, faFileImport } from "@fortawesome/free-solid-svg-icons"; // Bạn có thể cài react-icons cho biểu tượng

import "./Sidebar.scss";

const Sidebar: React.FC = () => {
	const location = useLocation(); // Để lấy path hiện tại và thêm class cho mục active

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h2>Admin Panel</h2>
			</div>
			<ul className="sidebar-menu">
				<li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
					<Link to="/admin/dashboard">
						<FontAwesomeIcon icon={faHouse} />
						<span>Dashboard</span>
					</Link>
				</li>
				<li className={location.pathname === "/admin/users" ? "active" : ""}>
					<Link to="/admin/users">
						<FontAwesomeIcon icon={faUserLarge} />
						<span>Users</span>
					</Link>
				</li>
				<li className={location.pathname === "/admin/clinics" ? "active" : ""}>
					<Link to="/admin/clinics">
						<FontAwesomeIcon icon={faCircleH} />
						<span>Clinics</span>
					</Link>
				</li>
				<li className={location.pathname === "/admin/reports" ? "active" : ""}>
					<Link to="/admin/reports">
						<FontAwesomeIcon icon={faFileImport} />
						<span>Reports</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
