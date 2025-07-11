import { Comment } from '@/entities/Comment';
import { User } from '@/entities/User';

export interface CommentsServerResponse {
    data: Comment[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface AddCommentFormServerResponse {
    id: string
    createdAt: string
    updatedAt: string
    content: string
    authorId: string
    author: User
    articleId: string
}

export interface ArticleCommentsBlockSchema {
    comments: Comment[]
    page: number
    totalPages: number
    total: number
    loading: boolean
    addCommentForm: {
        loading: boolean,
        error?: string,
    },
    error?: string
}
