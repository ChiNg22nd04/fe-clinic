import React, { useState, useEffect } from "react";
import { getProfile } from "../../services";
import { useUser } from "~/shared/hooks";
import { UserPayload } from "~/shared/interfaces";
import "./Profile.scss";

const Profile: React.FC = () => {
	const patient = useUser();
	const [profile, setProfile] = useState<UserPayload | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			if (!patient?.id) return;
			try {
				const response = await getProfile({ id: patient.id });
				setProfile(response[0] || null);
			} catch (err: any) {
				setError(err.message || "Có lỗi xảy ra khi lấy thông tin cá nhân");
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, [patient?.id]);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="error-container">
				<i className="fas fa-exclamation-circle me-2"></i>
				{error}
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="error-container">
				<i className="fas fa-user-slash me-2"></i>
				Không tìm thấy thông tin cá nhân
			</div>
		);
	}

	return (
		<div className="content">
			<div className="profile-card">
				<h2>Thông tin cá nhân</h2>
				<div className="profile-container">
					<div className="profile-avatar">
						<img src={profile.image || "/default-avatar.png"} alt="Profile" />
					</div>
					<div className="profile-info">
						<div className="profile-item">
							<strong>Họ và Tên:</strong>
							<span>{profile.fullName}</span>
						</div>
						<div className="profile-item">
							<strong>Email:</strong>
							<span>{profile.email}</span>
						</div>
						<div className="profile-item">
							<strong>Username:</strong>
							<span>{profile.username}</span>
						</div>
						<div className="profile-item">
							<strong>Số điện thoại:</strong>
							<span>{profile.phone || "Chưa có"}</span>
						</div>
						<div className="profile-item">
							<strong>Trạng thái:</strong>
							<span
								className={`status-badge ${
									profile.isActive ? "active" : "inactive"
								}`}
							>
								{profile.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
