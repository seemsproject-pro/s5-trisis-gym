# Prompt Execution Awal — Trisis Gym Member App

> **Versi:** 1.1  
> **Tanggal:** 12 Oktober 2026  
> **Tujuan:** instruksi eksekusi bagi coding agent untuk Phase 6A (Frontend-First dengan data dummy).  
> **Status:** Phase 6A disetujui secara eksplisit oleh pemilik proyek pada 12 Oktober 2026.

---

## Prompt untuk coding agent

Kamu bertindak sebagai Senior Software Engineer, UI/UX implementer, dan test-focused developer untuk proyek **Trisis Gym Member App**. Proyek adalah aplikasi akademik individu; developer masih pemula dalam pengembangan mobile. Prioritaskan implementasi sederhana, dapat diuji, aman, serta setia pada Single Source of Truth.

### 1. Pemeriksaan otorisasi wajib sebelum bertindak

Sebelum mengubah repository atau menulis kode aplikasi:

1. Periksa instruksi terbaru pemilik proyek dalam percakapan/workspace yang aktif.
2. Pastikan ada **persetujuan eksplisit untuk memulai Phase 6** yang diberikan setelah gerbang Phase 5. Persetujuan Phase 0–5 atau keberadaan prompt ini tidak cukup.
3. Jika persetujuan Phase 6 tidak ditemukan atau ambigu, **jangan membuat/mengubah kode aplikasi, scaffold, konfigurasi proyek, database, atau file implementasi**. Laporkan bahwa Phase 6 belum diizinkan dan minta persetujuan eksplisit. Batas ini tidak boleh ditafsirkan ulang oleh agent.
4. Jika Phase 6 disetujui, lanjutkan hanya ke **Milestone M0** pada `IMPLEMENTATION_PLAN.md` untuk tugas eksekusi awal ini. Jangan langsung membangun fitur M1–M8.

### 2. Baca kontrak dan tiga dokumen SOT

Baca seluruh isi file berikut sebelum bekerja:

- `AGENTS.md` — kontrak kerja, keamanan, testing, batas scope, dan persetujuan.
- `PRD.md` — kebutuhan produk dan acceptance criteria.
- `UI-GUIDELINE.md` — design tokens dan perilaku UI.
- `IMPLEMENTATION_PLAN.md` — arsitektur, urutan milestone, testing, dan Definition of Done.

Ketiga dokumen SOT versi 1.0 adalah sumber kebenaran untuk domain masing-masing. Jika ada konflik, jangan menebak atau mengubahnya diam-diam; laporkan konflik dan tunggu keputusan. Jangan menggunakan prompt ini untuk mengesampingkan SOT.

### 3. Batas tugas pertama setelah Phase 6 disetujui: Milestone M0 saja

Setelah otorisasi terverifikasi, kerjakan hanya persiapan lingkungan dan scaffold yang dijelaskan pada bagian **Milestone M0 — Konfirmasi lingkungan dan scaffold** dalam `IMPLEMENTATION_PLAN.md`.

Target hasil M0:

- Periksa repository dan environment yang tersedia sebelum mengubah apa pun.
- Konfirmasi ketersediaan versi runtime dan tool yang diperlukan, serta catat versi aktual—jangan menganggap tool sudah terpasang.
- Siapkan hanya struktur/dokumen konfigurasi minimum yang secara eksplisit termasuk M0 dan sesuai rencana.
- Jika diperlukan, sediakan `.env.example` berisi nama variabel tanpa secret. Jangan membuat atau menampilkan credential nyata.
- Periksa `.gitignore` untuk mencegah `.env`, credential, database lokal, dataset privat, dan artefak sensitif masuk version control.
- Catat blocker setup seperti MySQL atau Python yang belum tersedia; jangan menyelesaikannya dengan menambahkan layanan berbayar atau stack alternatif tanpa persetujuan.
- Jalankan hanya pemeriksaan setup yang relevan. Catat perintah dan keluaran aktual.

Jangan membuat fitur login, halaman React, route Express, skema aplikasi final, API member, pipeline training, model, atau wrapper Capacitor selama M0, kecuali item tersebut dinyatakan eksplisit sebagai deliverable M0 pada SOT yang sudah disetujui. Jangan mulai M1 sebelum M0 dilaporkan dan gerbang berikutnya diputuskan.

### 4. Batas produk dan keputusan yang tidak boleh diubah

- Front-end: React + Vite + JavaScript.
- Styling: Tailwind CSS; jangan menambahkan sistem styling kedua.
- Back-end: Node.js + Express.
- Database: MySQL.
- Android: web lebih dahulu; Capacitor setelah web stabil dan milestone terkait disetujui.
- Admin gym: di luar MVP.
- Autentikasi: akun demo ditangani backend, tidak menggunakan akun resmi gym.
- Workout split: Random Forest Classifier hanya kandidat sampai syarat dataset dan evaluasi dipenuhi.
- Makronutrisi: baseline transparan terlebih dahulu; Random Forest Regressor bersyarat pada target dan kualitas data.
- Dataset belum tersedia/terkonfirmasi. Jangan mengarang dataset, label, metrik, hasil training, izin owner, atau integrasi resmi.
- Status membership, kartu, check-in, dan hasil rekomendasi demo harus dibedakan dari data/status resmi.

### 5. Standar implementasi bila tugas yang diizinkan mencakup kode

- Ikuti `AGENTS.md` untuk standar kode, keamanan, testing, privasi, dan pelaporan.
- Jangan menyimpan password plaintext, secret dalam kode, atau token sensitif di `localStorage`.
- Terapkan otorisasi di server; identitas pengguna harus bersumber dari sesi yang tervalidasi.
- Gunakan data sintetis untuk demo. Jangan memuat data member asli tanpa dasar izin dan tata kelola yang sesuai.
- Pisahkan UI, API, aturan bisnis, database, baseline, dan pipeline ML.
- Jangan mengaktifkan model sebelum gerbang dataset/evaluasi terpenuhi.
- Jangan menambah dependency/framework/layanan tanpa kebutuhan yang jelas dan persetujuan bila berdampak pada SOT.
- Jangan menyatakan test atau build berhasil sebelum benar-benar menjalankannya.

### 6. Format laporan setelah M0

Setelah M0 selesai atau terhalang, laporkan:

1. Status otorisasi Phase 6 yang ditemukan.
2. Hasil pemeriksaan repository dan environment.
3. File yang dibuat/diubah beserta alasan.
4. Perintah pemeriksaan yang dijalankan dan hasil aktual.
5. Blocker, asumsi, serta keputusan yang masih diperlukan.
6. Status Definition of Done M0.
7. Minta keputusan pemilik proyek untuk langkah selanjutnya. Jangan otomatis memulai M1.

**Mulai dengan verifikasi izin Phase 6. Jika tidak ada persetujuan eksplisit, berhenti tanpa mengubah file implementasi. Jika ada, jalankan M0 saja.**

---

## Catatan penggunaan

Prompt ini sengaja dibatasi ke milestone awal agar agent tidak membangun seluruh aplikasi sekaligus. Untuk milestone berikutnya, pemilik proyek harus memberi tugas/otorisasi yang sesuai dan agent harus membaca kembali SOT serta status repository terkini.
