const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRoutes = require('./apiRoutes');
const db = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Social Network API');
});

// 404 Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
