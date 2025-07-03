

// Load environment variables from .env
/*require('dotenv').config();

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
});*/
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

// API: Get courses for a specific skill
app.get('/api/courses', (req, res) => {
  const skill = req.query.skill;
  if (!skill) {
    return res.status(400).json({ error: 'Skill parameter is required' });
  }

  // Use parameterized query to prevent SQL injection
  const query = `
    SELECT 
      Skill,
      Title,
      ChannelName,
      Views,
      Likes,
      URL
    FROM courses
    WHERE Skill = ?
  `;

  db.query(query, [skill], (err, results) => {
    if (err) {
      console.error(`❌ Query error for skill "${skill}":`, err);
      return res.status(500).json({ error: 'Query error' });
    }
    res.json(results);
  });
});

// (Optional) API: List all distinct skills in the courses table
app.get('/api/skills', (req, res) => {
  db.query("SELECT DISTINCT Skill FROM courses", (err, results) => {
    if (err) return res.status(500).send('Error listing skills');
    const skills = results.map(row => row.Skill);
    res.json(skills);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

