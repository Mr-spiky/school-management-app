const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    // Load environment variables manually
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_USER = process.env.DB_USER || 'root';
    const DB_PASSWORD = process.env.DB_PASSWORD || '';
    const DB_NAME = process.env.DB_NAME || 'school_db';
    
    console.log('Trying to connect with:');
    console.log('Host:', DB_HOST);
    console.log('User:', DB_USER);
    console.log('Database:', DB_NAME);
    
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    
    console.log('✅ Successfully connected to MySQL database');
    
    // Test if schools table exists
    const [tables] = await connection.execute('SHOW TABLES LIKE "schools"');
    if (tables.length > 0) {
      console.log('✅ Schools table exists');
    } else {
      console.log('❌ Schools table does not exist');
    }
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Please check:');
    console.log('1. Is MySQL server running?');
    console.log('2. Are your credentials in .env.local correct?');
    console.log('3. Does the database exist?');
    return false;
  }
}

testConnection();