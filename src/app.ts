import express from 'express';
import compression from 'compression';
import cors from 'cors';
import router from './routes/routes';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/dashboard', router);

app.get('/books', router);

app.post('/books', router);

app.patch('/books', router);

app.get('/clients', router);

app.post('/clients', router);

app.patch('/clients', router);

export default app;
