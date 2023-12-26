export type transaction = {
  _id: string;
  title: string;
  amount: number;
  date: Date;
  type: string;
  imageUrl?: string;
  categoryId: string;
  accountId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  isActive?: boolean;
};

export type transactionInput = Omit<transaction, "_id">;
