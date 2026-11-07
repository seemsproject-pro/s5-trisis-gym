import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import gymSettingsRoutes from './routes/gymSettingsRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend API Trisis Gym Berjalan Normal',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/checkins', checkinRoutes);
app.use('/api/gym-settings', gymSettingsRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} tidak ditemukan.`
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.'
  });
});

export default app;
