export interface ExaminationPayload {
	id?: number;
	numerical: number;
	medicalRecordId: number;
	idAppointment: number;
	staffId: number;
	diagnosis: string;
	note: string;
	status?: number;
	patientId: number;
	patientName?: string;
	staffName?: string;
	specialtyId: number;
	specialtyName?: string;
	symptoms?: string;
	appointmentDate: string;
	examinationDate: string;
	clinicId: number;
	clinicName?: string;
	image?: string | null;
}
