import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
connectDB();



app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  next();
});


app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running");
});