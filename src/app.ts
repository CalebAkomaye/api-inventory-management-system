import express from 'express';
import compression from 'compression';
import cors from 'cors';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('hello server');

export default app;
