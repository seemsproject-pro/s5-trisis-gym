import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export let isDbConnected = false;

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'trisis_gym',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

export async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log(`[Database] Terhubung ke MySQL [${process.env.DB_NAME || 'trisis_gym'}] di port ${process.env.DB_PORT || 3306} berhasil!`);
    conn.release();
    isDbConnected = true;
    return true;
  } catch (error) {
    console.warn(`[Database] Mode Penyimpanan: Menggunakan Local Persistent Store (Active). MySQL on 3306: ${error.code || error.message}`);
    isDbConnected = false;
    return false;
  }
}

export default pool;
