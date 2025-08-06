type UserRole = 'USER' | 'ADMIN' | 'AUTHOR';

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    avatar: string;
    bio: string;
    role: UserRole;
    subscribed?: boolean;
}

export interface UserServerResponse {
    user: User;
    accessToken?: string;
}

export interface UserSchema {
    userData?: UserServerResponse;
    loading: boolean;
    inited: boolean;
    error?: string;
}
