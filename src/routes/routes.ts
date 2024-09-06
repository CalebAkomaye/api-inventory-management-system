import {
  createTransaction,
  getAllTransactions,
  getCustomerTransactions,
} from '../controllers/transaction.controller';
import {
  createBook,
  getBooks,
  updateBook,
} from '../controllers/book.controller';
import {
  createClient,
  getClients,
  updateClient,
} from '../controllers/clients.controller';

import express from 'express';

const router = express.Router();

router.get('/dashboard', getBooks);

// Route for fetching all clients
router.get('/clients', getClients);

// Route to update customer and customer's details
router.patch('/clients/:id', updateClient);

// Route for adding a new client
router.post('/clients', createClient);

// Route for fetching all books
router.get('/books', getBooks);

// Route for adding a new book
router.post('/books', createBook);

// Route to update book and book details
router.patch('/books/:id', updateBook);

router.get('/sales', getAllTransactions);

router.get('/sales/:id', getCustomerTransactions);

router.post('/sales', createTransaction);

export default router;
