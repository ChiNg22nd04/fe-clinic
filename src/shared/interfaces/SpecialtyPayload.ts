export interface SubContentItem {
	type: string;
	content: string | string[];
}

export interface ContentItem {
	type: string;
	content?: string | string[];
	items?: SubContentItem[];
}

export interface SpecialtyPayload {
	image: string;
	specialtyId: number;
	specialtyName: string;
	introduce: ContentItem[];
	services: ContentItem[];
}
