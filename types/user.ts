export type User = {
    firstName: string;
    lastName: string;
    profileImage?: string;
    email: string;
    password: string;
    userId: string;
}

export type UserInput = Omit<User, 'userId'>
