import { Profile } from '@/entities/Profile';

export interface ProfileDetailSchema {
    loading: boolean
    profile?: Profile
    error?: string
}
