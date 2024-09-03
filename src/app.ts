import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import { authenticateUser } from 'middlewares/auth';
import router from 'routes/routes';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticateUser);

app.get('/dashboard', router);

export default app;
