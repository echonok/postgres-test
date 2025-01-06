import express from 'express';
import 'dotenv/config'

import { userRouter } from './routes/user.route';
import { AppDataSource } from './database';

const app = express();

export const {
  PORT,
} = process.env;

app.use(express.json());

app.use('/users', userRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
