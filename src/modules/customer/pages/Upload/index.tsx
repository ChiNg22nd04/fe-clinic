import React, { useState, useEffect } from "react";
import { getProfile, updateUserProfile } from "../../services";
import { useUser } from "~/shared/hooks";
import { UserPayload } from "~/shared/interfaces";
import { compressImage } from "~/shared/utils/compressImage";
import "./Upload.scss";

const Upload: React.FC = () => {
	const patient = useUser();
	const [profile, setProfile] = useState<UserPayload | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		email: "",
		full_name: "",
		username: "",
		role: 3,
		image: "",
	});
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			if (!patient?.id) return;
			try {
				const response = await getProfile({ id: patient.id });
				const data = response[0];
				console.log(data);
				setProfile(data);
				setFormData({
					email: data.email || "",
					full_name: data.fullName || "",
					username: data.username || "",
					role: data.role,
					image: data.image || "",
				});
			} catch (err: any) {
				setError(err.message || "Có lỗi xảy ra khi lấy thông tin cá nhân");
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, [patient?.id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files[0]) {
	// 		const file = e.target.files[0];

	// 		try {
	// 			const compressed = await compressImage(file);
	// 			setAvatarFile(compressed);
	// 		} catch (error) {
	// 			console.error("Không thể nén ảnh:", error);
	// 		}
	// 	}
	// };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const userId = profile?.id ?? 0;

		if (userId === 0) {
			alert("ID người dùng không hợp lệ.");
			return;
		}

		try {
			await updateUserProfile(
				{
					id: userId,
					email: formData.email,
					fullName: formData.full_name,
					username: formData.username,
					role: formData.role,
					image: formData.image,
				},
				avatarFile || undefined
			);

			alert("Cập nhật thành công!");
			window.location.reload(); // ✅ F5 lại trang nếu thành công
		} catch (err: any) {
			alert(err.message || "Cập nhật thất bại!");
		}
	};


	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!profile) return <div>Profile not found.</div>;

	return (
		<div className="content content-customer">
			<div className="profile-container">
				<h2>Cập nhật thông tin cá nhân</h2>
				<form onSubmit={handleSubmit} className="profile-form">
					<div className="profile-item">
						<strong>Email:</strong>
						<input
							className="profile-input"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="profile-item">
						<strong>Họ và Tên:</strong>
						<input
							className="profile-input"
							type="text"
							name="full_name"
							value={formData.full_name}
							onChange={handleChange}
						/>
					</div>
					<div className="profile-item">
						<strong>Tên người dùng:</strong>
						<input
							className="profile-input"
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</div>

					<button type="submit">Lưu thay đổi</button>
				</form>
			</div>
		</div>
	);
};

export default Upload;
