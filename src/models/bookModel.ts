import { Inventory, Transaction } from '@prisma/client';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  isbn: string;
  createdAt: Date;
  publishedDate: Date;
  // Optional relations
  Inventory?: Inventory[];
  Transaction?: Transaction[];
}
