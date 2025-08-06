import { ArticleType } from '@/entities/Article';

export interface UpdateProfileSchema {
    loading: boolean;
    error?: string;
    articles?: ArticleType[];
    loadingArtilces?: boolean;
    pageArticles?: number;
    currentFilters?: any | undefined;
    totalArticles?: number;
}
