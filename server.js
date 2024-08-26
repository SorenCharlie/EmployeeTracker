require('dotenv').config();
const express = require("express");
const { Pool } = require('pg');

const PORT = 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: '',
      // Enter PostgreSQL password
      password: '',
      host: 'localhost',
      database: 'employeetracker_db'
  },
  console.log('Connected to the employeetracker_db database!')
  )
  
  pool.connect();
  

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  