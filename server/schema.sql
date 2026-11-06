-- =============================================================================
-- TRISIS GYM MEMBER & ADMIN APP — DATABASE SCHEMA (MySQL 8.x)
-- Sesuai PRD.md & IMPLEMENTATION_PLAN.md Semester 5
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `trisis_gym` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `trisis_gym`;

-- 1. TABEL PENGGUNA & HAK AKSES (MEMBER & ADMIN)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(25) DEFAULT NULL,
  `role` ENUM('member', 'admin') NOT NULL DEFAULT 'member',
  `member_id` VARCHAR(50) NOT NULL UNIQUE,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_member_id` (`member_id`)
) ENGINE=InnoDB;

-- 2. TABEL STATUS MEMBERSHIP & PAKET ANGGOTA
CREATE TABLE IF NOT EXISTS `memberships` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `plan_id` ENUM('per_visit', 'mahasiswa', 'reguler', 'annual') NOT NULL DEFAULT 'reguler',
  `plan_name` VARCHAR(100) NOT NULL,
  `status` ENUM('active', 'expired', 'frozen') NOT NULL DEFAULT 'active',
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `price_paid` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `notes` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_memberships_status` (`status`)
) ENGINE=InnoDB;

-- 3. TABEL PROFIL KEBUGARAN & ASESMEN (INPUT MODEL & NUTRISI)
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL UNIQUE,
  `age` SMALLINT UNSIGNED NOT NULL DEFAULT 23,
  `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male',
  `height_cm` DECIMAL(5, 2) NOT NULL DEFAULT 172.00,
  `weight_kg` DECIMAL(5, 2) NOT NULL DEFAULT 68.00,
  `target_weight_kg` DECIMAL(5, 2) DEFAULT 72.00,
  `fitness_goal` ENUM('fat_loss', 'muscle_building', 'general_fitness') NOT NULL DEFAULT 'muscle_building',
  `experience_level` ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'intermediate',
  `days_per_week` TINYINT UNSIGNED NOT NULL DEFAULT 4,
  `medical_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. TABEL PRESENSI CHECK-IN KASIR & TURNSTILE
CREATE TABLE IF NOT EXISTS `checkins` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `member_id` VARCHAR(50) NOT NULL,
  `checkin_date` DATE NOT NULL,
  `checkin_time` TIME NOT NULL,
  `location` VARCHAR(100) NOT NULL DEFAULT 'Trisis Gym — Kasir & Turnstile Utama',
  `method` ENUM('QR_SCAN_KASIR', 'MANUAL_KASIR') NOT NULL DEFAULT 'QR_SCAN_KASIR',
  `notes` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uq_user_date` (`user_id`, `checkin_date`), -- Mencegah check-in ganda di hari yang sama
  INDEX `idx_checkins_date` (`checkin_date`)
) ENGINE=InnoDB;

-- 5. TABEL PENGATURAN OPERASIONAL & KONTROL DASHBOARD (DIATUR ADMIN)
CREATE TABLE IF NOT EXISTS `gym_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_open` BOOLEAN NOT NULL DEFAULT TRUE,
  `opening_hours` VARCHAR(100) NOT NULL DEFAULT '06:00 – 22:00 WIB',
  `current_crowd_status` ENUM('pagi', 'siang', 'sore', 'malam') NOT NULL DEFAULT 'sore',
  `current_occupancy` INT NOT NULL DEFAULT 35,
  `max_capacity` INT NOT NULL DEFAULT 75,
  `announcement_text` TEXT DEFAULT NULL,
  `announcement_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `trainer_on_duty` VARCHAR(150) DEFAULT 'Coach Randy & Coach Maya',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 6. TABEL MASTER KATALOG LATIHAN (EXERCISES)
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `target_muscle` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `equipment` VARCHAR(100) NOT NULL,
  `recommended_sets` VARCHAR(20) NOT NULL DEFAULT '3 - 4 Set',
  `recommended_reps` VARCHAR(30) NOT NULL DEFAULT '8 - 12 Reps',
  `rest_seconds` VARCHAR(30) NOT NULL DEFAULT '60 - 90 Detik',
  `video_url` VARCHAR(255) DEFAULT NULL,
  `primary_muscles` JSON DEFAULT NULL,
  `secondary_muscles` JSON DEFAULT NULL,
  `steps` JSON DEFAULT NULL,
  `tips` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 7. TABEL LOG REKOMENDASI WORKOUT & MAKRO PENGGUNA
CREATE TABLE IF NOT EXISTS `recommendation_logs` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `method_used` ENUM('BASELINE', 'RANDOM_FOREST', 'GEMINI_AI') NOT NULL DEFAULT 'BASELINE',
  `split_name` VARCHAR(100) NOT NULL,
  `target_calories` INT NOT NULL,
  `protein_grams` DECIMAL(6, 1) NOT NULL,
  `carbs_grams` DECIMAL(6, 1) NOT NULL,
  `fat_grams` DECIMAL(6, 1) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================================================
-- SEED DATA AWAL (DEMO DATA AKADEMIK)
-- =============================================================================

-- Seed Admin
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone`, `role`, `member_id`) 
VALUES ('usr_admin_001', 'admin@trisisgym.demo', '$2a$10$wTz6yE5eE...dummyhash', 'Admin Trisis Gym', '0811-2233-4455', 'admin', 'TRISIS-STAFF-001')
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Seed Member Budi Santoso
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone`, `role`, `member_id`) 
VALUES ('usr_demo_089', 'budi.member@trisisgym.demo', '$2a$10$wTz6yE5eE...dummyhash', 'Budi Santoso', '0812-3456-7890', 'member', 'TRISIS-DEMO-2026-089')
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Seed Membership Budi
INSERT INTO `memberships` (`id`, `user_id`, `plan_id`, `plan_name`, `status`, `start_date`, `end_date`, `price_paid`) 
VALUES ('mem_001', 'usr_demo_089', 'annual', 'Annual Regular Pass', 'active', '2026-01-10', '2027-01-10', 1950000.00)
ON DUPLICATE KEY UPDATE `status`=`status`;

-- Seed Profil Budi
INSERT INTO `profiles` (`id`, `user_id`, `age`, `gender`, `height_cm`, `weight_kg`, `target_weight_kg`, `fitness_goal`, `experience_level`, `days_per_week`) 
VALUES ('prof_001', 'usr_demo_089', 23, 'male', 172.00, 68.00, 72.00, 'muscle_building', 'intermediate', 4)
ON DUPLICATE KEY UPDATE `age`=`age`;

-- Seed Pengaturan Gym
INSERT INTO `gym_settings` (`id`, `is_open`, `opening_hours`, `current_crowd_status`, `current_occupancy`, `max_capacity`, `announcement_text`) 
VALUES (1, TRUE, '06:00 – 22:00 WIB', 'sore', 38, 75, 'Selamat datang di Trisis Gym! Sesi kelas Functional & HIIT Jumat sore pukul 16.30 WIB.')
ON DUPLICATE KEY UPDATE `is_open`=VALUES(`is_open`);
