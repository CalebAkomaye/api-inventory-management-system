import { createBook, getBooks } from 'controllers/book.controller';
import { createClient, getClients } from 'controllers/clients.controller';
import express from 'express';

const router = express.Router();

// Route for the dashboard (using a more action-oriented name)
router.get('/dashboard', dashboard);

// Route for fetching all clients
router.get('/clients', getClients);

// Route for adding a new client
router.post('/clients', createClient);

// Route for fetching all books
router.get('/books', getBooks);

// Route for adding a new book
router.post('/books', createBook);

export default router;
