export interface UserPayload {
	id?: number;
	email?: string;
	fullName?: string;
	phone?: string;
	role?: number;
	username?: string | null;
	createdAt?: string;
	isActive?: boolean;
	isVerified?: boolean;
	verificationCode?: number | null;
	image?: string | null;
	otpSentCount?: number;
	otpLastSentAt?: string | null; // định dạng "YYYY-MM-DD HH:mm:ss" hoặc null
}
