import 'express-async-errors';
import express from 'express';
const app = express();

import mongoose from 'mongoose';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import * as dotenv from 'dotenv';
dotenv.config();
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { v2 as cloudinary } from 'cloudinary';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

const port = process.env.PORT || 5100;
app.use(cookieParser());
app.use(express.json());
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

export default app;
