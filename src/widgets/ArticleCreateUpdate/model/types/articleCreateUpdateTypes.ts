export interface ArticleCreateUpdateSchema {
    loading: boolean;
    error?: string;
    articleContent: string;
    articleTitle: string;
    articleSubtitle: string;
    articleTags: string[];
    articleCategory: string;
    articlePoster: string;
    articlePosterFile?: File
}
