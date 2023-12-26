export type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  isVerified: boolean;
};

export type UserInput = Omit<User, "_id">;
export type UserCredentialsInput = Pick<
  User,
  "username" | "email" | "password"
>;
