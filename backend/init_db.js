const { Client } = require('pg');
const pool = require('./config/db'); 
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function ensureDatabaseExists() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const dbCheckQuery = `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`;
    const res = await client.query(dbCheckQuery);

    if (res.rowCount === 0) {
      console.log(`Database "${process.env.DB_NAME}" does not exist. Creating it...`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    }
  } catch (error) {
    console.error('Error checking or creating the database:', error);
  } finally {
    await client.end();
  }
}

async function initializeDatabase() {
  try {
    await ensureDatabaseExists();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        isbn VARCHAR(13) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publication_year INT NOT NULL,
        language VARCHAR(100) NOT NULL,
        summary TEXT,
        cover_image_url TEXT
      );
    `;

    await pool.query(createTableQuery);
    console.log('Table "books" created successfully or already exists.');

  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
