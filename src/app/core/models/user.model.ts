export interface AppUser {
    uid: string,
    name: string,
    email: string,
    photoURL?: string,
    roles: UserRole
}

export interface UserRole {
    member: boolean,
    manager?: boolean,
}