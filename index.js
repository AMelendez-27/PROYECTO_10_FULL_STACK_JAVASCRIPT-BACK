require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { connectDB } = require('./src/config/db');
const errorHandler = require('./src/api/utils/errorHandler');

const app = express();

// Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    'https://proyecto-10-full-stack-javascript-front-406gzqll9.vercel.app',
    'http://proyecto-10-full-stack-javascript-f-zeta.vercel.app',
    'https://proyecto-10-full-stack-javascript-f-zeta.vercel.app'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./src/api/routes/auth'));
app.use('/api/users', require('./src/api/routes/user'));
app.use('/api/events', require('./src/api/routes/event'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });