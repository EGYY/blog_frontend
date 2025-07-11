import { User } from '@/entities/User';

export interface Category {
    id: string
    name: string
}

export interface Tag {
    id: string
    name: string
    createdById: any
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
    author: User
    comments: any[]
    likes: any[]
    category: Category
    tags: Tag[]
}

export interface ArticleSchema {
    article: Article | undefined
    loading: boolean
    error?: string
}
