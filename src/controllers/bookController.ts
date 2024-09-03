import { Request, Response } from 'express';
import prisma from '../utils/db';
import { Book } from '../models/bookModel';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books: Book[] = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, publishedDate, price, isbn }: Book = req.body;
  try {
    const newBook: Book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        isbn,
        publishedDate,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10); // Ensure radix is specified
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid book id' }); // Handle invalid id
  }

  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    if (!deletedBook) {
      return res.status(404).json({ message: `Book with id ${id} not found` });
    }

    res
      .status(200)
      .json({ message: `Book with id ${id} successfully deleted` });
  } catch (error) {
     if (error instanceof Error) {
       res
         .status(500)
         .json({
           error: `Error deleting book with id ${id}: ${error.message}`,
         });
     } else {
       res
         .status(500)
         .json({
           error: `An unknown error occurred while deleting book with id ${id}`,
         });
     }
  }
};
