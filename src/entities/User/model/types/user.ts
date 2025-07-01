export interface User {
    id: string
    createdAt: string
    updatedAt: string
    email: string
    name: string
    avatar: string
}

export interface UserServerResponse {
    user: User
    accessToken: string
}

export interface UserSchema {
    userData?: UserServerResponse
}
