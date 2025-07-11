import { User } from '@/entities/User';

export interface Comment {
    id: string
    createdAt: string
    updatedAt: string
    content: string
    authorId: string
    articleId: string
    author: User
}
