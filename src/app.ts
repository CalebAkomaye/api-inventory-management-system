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

//// dashboard
app.get('/dashboard', router);

//// The books route
app.get('/books', router);

app.get('/books/:id', router);

app.post('/books', router);

app.patch('/books/:id', router);

app.delete('/books/:id', router);

// ================////

/// The customrs routes

app.get('/clients', router);

app.get('/clients/:id', router);

app.post('/clients', router);

app.patch('/clients', router);

/// =====================//

app.get('/sales', router);

app.post('/sales', router);

app.get('/sales/:id', router);

export default app;
