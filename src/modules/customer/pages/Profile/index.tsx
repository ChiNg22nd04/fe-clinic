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
				console.log(response);
				setProfile(response[0] || null);
			} catch (err: any) {
				setError(err.message || "Có lỗi xảy ra khi lấy thông tin cá nhân");
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, [patient?.id]);

	console.log("profile", profile);

	const roleText = (role: number) => {
		switch (role) {
			case 1:
				return "Admin";
			case 2:
				return "Doctor";
			case 3:
				return "Patient";
			default:
				return "Unknown";
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!profile) {
		return <div>Profile not found.</div>;
	}

	return (
		<div className="content">
			<div className="profile-container">
				<div className="profile-sidebar">
					<div className="avatar-container">
						<img
							src={profile.image || "/default-avatar.png"} // Avatar fallback
							alt="Profile"
							className="avatar"
						/>
					</div>
					<h3>{profile.fullName}</h3>
				</div>
				<div className="profile-details">
					<h2>Thông tin cá nhân</h2>
					<div className="profile-item">
						<strong>ID:</strong> {profile.id}
					</div>
					<div className="profile-item">
						<strong>Email:</strong> {profile.email}
					</div>
					<div className="profile-item">
						<strong>Username:</strong> {profile.username}
					</div>
					<div className="profile-item">
						<strong>Họ và Tên:</strong> {profile.fullName}
					</div>
					<div className="profile-item">
						<strong>Số điện thoại:</strong> {profile.phone || "Chưa có"}
					</div>
					{/* <div className="profile-item">
						<strong>Chức vụ:</strong> {roleText(profile.role)}
					</div> */}
					<div className="profile-item">
						<strong>Trạng thái:</strong>{" "}
						{profile.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
					</div>
					<div className="profile-item">
						<strong>Đã xác minh:</strong>{" "}
						{profile.isVerified ? "Đã xác minh" : "Chưa xác minh"}
					</div>
					{/* <div className="profile-item">
						<strong>Ngày tạo:</strong>{" "}
						{new Date(profile.createdAt).toLocaleDateString()}
					</div> */}
					<div className="profile-item">
						<strong>Số lần OTP đã gửi:</strong> {profile.otpSentCount}
					</div>
					<div className="profile-item">
						<strong>Mã xác minh:</strong> {profile.verificationCode || "Chưa có"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
