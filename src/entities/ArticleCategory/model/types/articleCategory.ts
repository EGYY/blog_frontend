export interface ArticleCategory {
    id: string,
    name: string,
}

export interface ArticlesCategoriesSchema {
    data: ArticleCategory[],
    loading: boolean,
    error?: string
}
