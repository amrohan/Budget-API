export type Category = {
  _id: string;
  userId: string;
  title: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};

export type CategoryInput = Omit<Category, "_id">;
