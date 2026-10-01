import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import {
  connectDB,
} from './config/db.js';

import authRoutes
  from './routes/authRoutes.js';

import inventoryRoutes
  from './routes/inventoryRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,

    credentials: true,
  })
);

app.use(
  express.json()
);

app.use(
  cookieParser()
);

app.get(
  '/api/health',
  (req, res) => {
    res.json({
      status: 'ok',
    });
  }
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/inventory',
  inventoryRoutes
);

const PORT =
  process.env.PORT ||
  5000;

async function startServer() {
  await connectDB();

  app.listen(
    PORT,
    () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    }
  );
}

startServer();