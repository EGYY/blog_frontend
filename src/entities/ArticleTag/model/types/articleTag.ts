export interface ArticleTag {
    id: string,
    name: string,
}

export interface ArticlesTagsSchema {
    data: ArticleTag[],
    loading: boolean,
    error?: string
}
