// Header.tsx
const Header: React.FC = () => {
	return (
		<div className="header">
			<div className="header-left">
				<h1>Admin Dashboard</h1>
			</div>
			<div className="header-right">
				<button>Logout</button>
			</div>
		</div>
	);
};

export default Header;
