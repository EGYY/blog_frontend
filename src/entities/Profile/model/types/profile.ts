import { ArticleType } from '@/entities/Article';
import { User } from '@/entities/User';

export interface Profile extends User {
    _count: {
        articles: number
        comments: number
        likes: number
    },
    articles: ArticleType[]
}
