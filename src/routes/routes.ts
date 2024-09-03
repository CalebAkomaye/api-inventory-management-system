import { createClients, getClients } from 'controllers/clientsController';
import { loginUser } from 'controllers/loginController';
import express from 'express';

const router = express.Router();

router.get('dashboard', loginUser);

router.get('/clients', getClients);

router.get('/register', createClients);

export default router;
