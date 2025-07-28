import { ArticleType } from '@/entities/Article';
import { User } from '@/entities/User';

export interface Notification {
    id: string
    createdAt: string
    message: string
    viewed: boolean
    article: Pick<ArticleType, 'id' | 'title' | 'poster' | 'createdAt' | 'subtitle'>
    user: Pick<User, 'avatar' | 'name' | 'id' | 'email'>
}
