import 'express-async-errors';
import express from 'express';
const app = express();

import mongoose from 'mongoose';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import * as dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
dotenv.config();

const port = process.env.PORT || 5100;
app.use(express.json());
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);

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
