export interface UserPayload {
	id: number;
	email: string;
	fullName: string;
	phone: string;
	role: number; // 0: Admin, 1: Doctor, 2: Receptionist, 3: Patient
	username: string | null;
	createdAt: string; // định dạng "YYYY-MM-DD HH:mm:ss"
	isActive: boolean;
	isVerified: boolean;
	verificationCode: number | null;
	image: string | null;
	otpSentCount: number;
	otpLastSentAt: string | null; // định dạng "YYYY-MM-DD HH:mm:ss" hoặc null
}
