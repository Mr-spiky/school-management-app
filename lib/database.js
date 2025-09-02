// lib/database.js
import mysql from 'mysql2/promise';

// Log environment variables (for debugging, remove in production)
console.log('DB Environment:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordSet: !!process.env.DB_PASSWORD
});

// Create a connection pool
let pool = null;

function createPool() {
  try {
    return mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'school_management',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Remove invalid options for MySQL2
      // Only use valid MySQL2 connection options
    });
  } catch (error) {
    console.error('Failed to create connection pool:', error);
    throw error;
  }
}

export async function query(sql, params) {
  try {
    if (!pool) {
      pool = createPool();
    }
    
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    
    // If connection fails, try to reconnect once
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('Attempting to reconnect to database...');
      pool = null; // Reset pool
      throw error; // Re-throw for handling in API route
    }
    
    throw error;
  }
}