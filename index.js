require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./src/config/db');
const errorHandler = require('./src/api/utils/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./src/api/routes/auth'));
app.use('/api/users', require('./src/api/routes/user'));
app.use('/api/events', require('./src/api/routes/event'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });