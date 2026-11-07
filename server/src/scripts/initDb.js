import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  console.log('=== Inisialisasi Database Trisis Gym (MySQL) ===');
  
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'trisis_gym';

  let connection;
  try {
    // 1. Hubungkan ke server MySQL tanpa database spesifik
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true
    });
    console.log(`[1/4] Terhubung ke MySQL server (${host}:${port})...`);

    // 2. Buat database jika belum ada
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`[2/4] Database \`${dbName}\` siap.`);
    await connection.changeUser({ database: dbName });

    // 3. Baca dan eksekusi schema.sql
    const schemaPath = path.resolve(__dirname, '../../schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`File schema.sql tidak ditemukan di: ${schemaPath}`);
    }
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Filter statement CREATE & INSERT
    await connection.query(schemaSql);
    console.log('[3/4] Eksekusi tabel schema (users, memberships, profiles, checkins, gym_settings, exercises) berhasil.');

    // 4. Update password_hash dengan bcrypt asli
    const memberHash = await bcrypt.hash('password123', 10);
    const adminHash = await bcrypt.hash('admin1234', 10);

    await connection.query(`
      UPDATE users SET password_hash = ? WHERE email = 'budi.santoso@trisisgym.com' OR email = 'budi.member@trisisgym.demo';
    `, [memberHash]);

    await connection.query(`
      UPDATE users SET password_hash = ? WHERE email = 'admin@trisisgym.com' OR email = 'admin@trisisgym.demo';
    `, [adminHash]);

    // Pastikan user Budi Santoso & Admin memiliki email resmi
    await connection.query(`
      UPDATE users SET email = 'budi.santoso@trisisgym.com', member_id = 'TRISIS-2026-089' WHERE id = 'usr_demo_089' OR email LIKE '%budi%';
      UPDATE users SET email = 'admin@trisisgym.com' WHERE id = 'usr_admin_001' OR email LIKE '%admin%';
    `);

    console.log('[4/4] Seed akun terenkripsi bcrypt siap:');
    console.log('   - Member: budi.santoso@trisisgym.com (password: password123)');
    console.log('   - Admin:  admin@trisisgym.com (password: admin1234)');

    console.log('\n=== Inisialisasi Database Sukses! ===\n');
  } catch (error) {
    console.error('[Error Init Database]:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

initDatabase();
