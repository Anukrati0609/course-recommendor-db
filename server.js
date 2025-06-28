/*require('dotenv').config();
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require('express');
const cors = require('cors');

const mysql = require('mysql2');
const path = require('path');
const app = express();
app.use(cors());
const PORT = 3000;

// Serve frontend from public folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //ssl: { rejectUnauthorized: true }
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
    return;
  }
  console.log('✅ Connected to the DB');
});

let availableTables = [];

db.query("SHOW TABLES", (err, results) => {
  if (err) {
    console.error("❌ Error fetching table names:", err);
  } else {
    availableTables = results.map(row => Object.values(row)[0]);
    console.log("✅ Available tables:", availableTables);
  }
});



// ✅ API: Get courses from a specific table (e.g., /courses/python)
app.get('/courses/:topic', (req, res) => {
  const topic = req.params.topic.toLowerCase();

  // ✅ Safelist of allowed tables
  const allowedTables = [
    'python',
    'machinelearning',
    'cybersecurity',
    'django',
    'dsa',
    'github',
    'java',
    'rust',
    'webdevelopment'
  ];

 if (!allowedTables.includes(topic)) {
  return res.status(400).json({ error: 'Invalid topic' });
}


  const query = `SELECT * FROM ${topic}`;
  db.query(query, (err, results) => {
  if (err) {
    console.error(`❌ Query error for topic "${topic}":`, err);
    return res.status(500).json({ error: 'Query error' });
  }
  res.json(results);
});

});


// ✅ Optional: List all tables in the database
app.get('/tables', (req, res) => {
  db.query("SHOW TABLES", (err, results) => {
    if (err) return res.status(500).send('Error listing tables');
    const tableNames = results.map(row => Object.values(row)[0]);
    res.json(tableNames);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});*/

// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (customize origin if needed)
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ssl: { rejectUnauthorized: true } // Uncomment if using SSL
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
    return;
  }
  console.log('✅ Connected to the DB');
});

// List of allowed tables (topics)
const allowedTables = [
  'python',
  'machinelearning',
  'cybersecurity',
  'django',
  'dsa',
  'github',
  'java',
  'rust',
  'webdevelopment'
];

// API: Get courses from a specific topic/table
app.get('/courses/:topic', (req, res) => {
  const topic = req.params.topic.toLowerCase();

  if (!allowedTables.includes(topic)) {
    return res.status(400).json({ error: 'Invalid topic' });
  }

  // Use column aliases to match frontend expectations
  const query = `
    SELECT 
      ChannelName AS ChannelName,
      Views,
      URL AS VideoUrl,
      Likes
    FROM ${topic}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(`❌ Query error for topic "${topic}":`, err);
      return res.status(500).json({ error: 'Query error' });
    }
    res.json(results);
  });
});

// API: List all tables in the database (optional)
app.get('/tables', (req, res) => {
  db.query("SHOW TABLES", (err, results) => {
    if (err) return res.status(500).send('Error listing tables');
    const tableNames = results.map(row => Object.values(row)[0]);
    res.json(tableNames);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
