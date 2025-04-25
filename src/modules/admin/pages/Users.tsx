// Users.tsx
import { useState, useEffect } from "react";
// import { getAllUsers } from "../services/adminService"; // Giả sử đã viết service gọi API

const Users: React.FC = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			// const response = await getAllUsers();
			// setUsers(response.data);
		};

		fetchUsers();
	}, []);

	return (
		<div className="users">
			<h2>Users Management</h2>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: any) => (
						<tr key={user.id}>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<button>Edit</button>
								<button>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
