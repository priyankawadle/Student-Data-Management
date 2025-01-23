const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const checkDbConnection = async () => {
  try {
    const client = await pool.connect(); // Attempt to acquire a client from the pool
    console.log('Database connection successful');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the application if the DB connection fails
  }
};
checkDbConnection();
module.exports = pool  ; // Export the pool directly
