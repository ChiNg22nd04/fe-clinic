export interface ArticlesFiles {
	id: number; // ID của bảng trung gian (articles_record)
	articlesArticleId: number; // ID của bài viết
	directusFilesId: string; // ID của file trong directus_files

	fileId: string; // alias từ f.id
	filenameDownload?: string;
	fileTitle?: string;
	fileType?: string;
	filesize?: number;
	width?: number;
	height?: number;
}

export interface ArticlesPayload {
	articleId?: number;
	title: string;
	subTitle?: string;
	content?: string;
	author: string;
	publishedDate?: string;
	topicId?: number;
	topicName?: string;
	record?: ArticlesFiles[];
}
