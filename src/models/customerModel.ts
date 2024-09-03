import { Transaction } from '@prisma/client';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: Date;

  // Optional relation
  Transaction?: Transaction[];
}
