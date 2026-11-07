import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

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
    return true;
  } catch (error) {
    console.warn(`[Database] Peringatan: Belum dapat terhubung ke MySQL: ${error.message}`);
    console.warn('[Database] Pastikan MySQL (Laragon/XAMPP) telah berjalan di port 3306.');
    return false;
  }
}

export default pool;
