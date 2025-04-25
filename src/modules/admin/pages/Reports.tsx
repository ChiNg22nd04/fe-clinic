// Dashboard.tsx
const Reports: React.FC = () => {
	return (
		<div className="dashboard">
			<h2>Reports Overview</h2>
			<div className="stats-cards">
				<div className="card">
					<h3>Total Users</h3>
					<p>1200</p>
				</div>
				<div className="card">
					<h3>Total Clinics</h3>
					<p>35</p>
				</div>
				<div className="card">
					<h3>Reports Pending</h3>
					<p>5</p>
				</div>
			</div>
		</div>
	);
};

export default Reports;
