export interface InvoicePayload {
	id: number;
	totalAmount: number;
	examinationFormId: number;
	createdAt: string;
	updatedAt: string;
	paymentStatus: number;
	paymentMethod: number;
	patientName: string;
	patientId: number;
}
