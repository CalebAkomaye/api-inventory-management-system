import { Inventory, Transaction } from '@prisma/client';

export interface Book {
  id?: number;
  title: string;
  price: number;
  createdAt?: Date;
  publishedDate?: Date;

  Inventory?: Inventory[];
  Transaction?: Transaction[];
}
