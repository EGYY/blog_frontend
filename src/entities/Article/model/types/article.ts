export interface Category {
    id: string
    name: string
}

export interface Tag {
    id: string
    name: string
    createdById?: any
}

export interface Article {
    id: string
    createdAt: string
    updatedAt: string
    title: string
    subtitle: string
    content: string
    poster: string
    published: boolean
    likesCount: number
    viewsCount: number
    authorId: string
    categoryId: string
    author: any
    comments: any[]
    likes: any[]
    category: Category
    tags: Tag[]
    subscribed?: boolean
    liked?: boolean
}

export interface ArticlesServerResponse {
    data: Article[],
    total: number,
    page: number,
    limit: number,
}

export enum ArticleView {
    GRID = 'grid',
    LIST = 'list'
}

export interface ArticleSchema {
    article: Article | undefined
    loading: boolean
    error?: string
    recommedations: Article[]
    recommedationsLoading: boolean
    recommendationsError?: string
    articles: Article[]
    loadingArticles: boolean
    errorArticles?: string
    totalArticles: number,
    pageArticles: number,
    view: ArticleView,
    _inited_articles: boolean
}
