const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use dynamic port (IMPORTANT for deployment)
const PORT = process.env.PORT || 3000;

// Database connection (Railway-compatible)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect DB
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Database connected');
  }
});

// Root route (test)
app.get('/', (req, res) => {
  res.send('🚀 Contact Manager API is running');
});

// ADD CONTACT
app.post('/add-contact', (req, res) => {
  const { name, phone, email } = req.body;

  // Simple validation
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)';

  db.query(sql, [name, phone, email], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Contact saved successfully' });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});