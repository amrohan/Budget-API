export type Account = {
  _id: string;
  title: string;
  imageUrl: string;
  userId: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};

export type AccountInput = Omit<Account, "_id">;
