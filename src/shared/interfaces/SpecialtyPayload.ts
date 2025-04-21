export interface ContentItem {
	type: string;
	content: string | string[];
}

export interface SpecialtyPayload {
	specialtyId: number;
	specialtyName: string;
	introduce: ContentItem[];
	services: ContentItem[];
}
