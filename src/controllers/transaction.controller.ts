import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  const { bookId, customerId, quantity, totalPrice } = req.body;
  const id =

  try {
    // Log the transaction (sale)
    const transaction = await prisma.transaction.create({
      data: {
        bookId,
        customerId,
        quantity,
        totalPrice,
      },
    });

    // Update the inventory by reducing the stock
    await prisma.inventory.update({
      where: { bookId },
      data: {
        quantity: {
          decrement: quantity, // Reduce the quantity in stock by the number sold
        },
      },
    });

    res.status(201).json({
      message: 'Transaction recorded successfully',
      transaction,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    // Retrieve all transactions
    const transactions = await prisma.transaction.findMany({
      include: {
        Book: true, // Include the related book details
        Customer: true, // Include the related customer details
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


export const getCustomerTransactions = async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.customerId);

  try {
    // Fetch transactions for a specific customer
    const transactions = await prisma.transaction.findMany({
      where: { customerId },
      include: {
        Book: true, // Include book details
      },
    });

    if (!transactions.length) {
      res.status(404).json({ message: 'No transactions found for this customer' });
      return;
    }

    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


