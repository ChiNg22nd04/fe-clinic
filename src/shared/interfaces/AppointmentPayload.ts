export interface AppointmentPayload {
	id?: number;
	patientId: number;
	patientName?: string;
	staffId: number;
	staffName?: string;
	specialtyId: number;
	specialtyName?: string;
	symptoms?: string;
	appointmentDate: string;
	clinicId: number;
	clinicName?: string;
	status?: number;
}
