import { loginUser } from 'controllers/loginController';
import express from 'express';

const router = express.Router();

router.get('dashboard', loginUser);

export default router;
