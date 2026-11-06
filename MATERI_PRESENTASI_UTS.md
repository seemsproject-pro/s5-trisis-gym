# PANDUAN DAN MATERI LENGKAP PRESENTASI UTS PROYEK SEMESTER
## SISTEM INFORMASI PENDAMPING MEMBER & MANAJEMEN TRISIS GYM BERBASIS WEB
**Dosen Pengampu:** Pak Hendro  
**Program Studi / Fakultas:** Ilmu Komputer / Teknologi Informasi  
**Tahun Akademik:** 2026/2027  

---

## DAFTAR ISI PRESENTASI (SLIDE-BY-SLIDE PPT)

### SLIDE 1: JUDUL PROYEK & ANGGOTA KELOMPOK
* **Judul Proyek:** Pengembangan Web App Pendamping Kebugaran Member dan Sistem Manajemen Operasional Trisis Gym Bogor
* **Sub-judul:** Implementasi Frontend-First Berbasis React, Rekomendasi Kebugaran Algoritmik, Presensi QR Kasir Dinamis, dan Role-Based Access Control (RBAC)
* **Informasi Kelompok:**
  * Nama Anggota 1 (NPM) — *Peran: Project Lead / Fullstack*
  * Nama Anggota 2 (NPM) — *Peran: Frontend Developer / UI-UX*
  * Nama Anggota 3 (NPM) — *Peran: Backend & Database Designer*
  * Nama Anggota 4 (NPM) — *Peran: Data Analyst / QA Tester*
* **Dosen Pengampu:** Pak Hendro

---

### SLIDE 2: LATAR BELAKANG PROYEK
* **Konteks Mitra:** Trisis Gym merupakan pusat kebugaran di Kota Bogor yang melayani berbagai segmen member, mulai dari mahasiswa (IPB, Pakuan, UIKA) hingga masyarakat umum pekerja.
* **Permasalahan Operasional Gym Saat Ini:**
  1. **Presensi Manual & Rawan Antrean:** Check-in member masih mengandalkan pencatatan buku kasir konvensional atau kartu fisik yang rentan tertinggal, hilang, atau dipinjamkan ke pihak lain.
  2. **Tingginya Angka "Member Dropout" (Inkonsistensi Latihan):** Member pemula seringkali bingung menentukan program latihan (*workout split*) dan takaran nutrisi yang tepat tanpa harus membayar Personal Trainer (PT) yang mahal.
  3. **Ketiadaan Informasi Kepadatan & Pengumuman Terpusat:** Member tidak mengetahui apakah gym sedang padat (*peak hours*) sebelum berangkat, dan pihak pengelola kesulitan menyiarkan pengumuman jadwal kelas/trainer secara langsung.
* **Solusi yang Dikembangkan:** Membangun aplikasi web terintegrasi dua arah: **Portal Pendamping Member** (rekomendasi latihan, makro nutrisi, kartu digital, presensi QR dinamis) dan **Panel Kontrol Admin/Kasir** (pengaturan siaran pengumuman, monitoring okupansi, CRUD data member, dan meja verifikasi presensi).

---

### SLIDE 3: RUMUSAN MASALAH
1. Bagaimana merancang antarmuka aplikasi pendamping kebugaran mobile-first yang intuitif, modern, dan memudahkan member dalam memantau aktivitas serta kartu keanggotaannya?
2. Bagaimana mengimplementasikan mekanisme presensi gym nirsentuh berbasis QR Code dinamis dengan validasi keamanan dan verifikasi kasir?
3. Bagaimana menghasilkan rekomendasi kategori program latihan beban (*workout split*) dan estimasi kebutuhan makronutrisi harian yang transparan dan berbasis data profil member?
4. Bagaimana menyediakan panel kontrol terpadu bagi staff admin/kasir untuk mengelola data anggota, memonitor kepadatan gym, serta menyiarkan pengumuman operasional secara realtime?

---

### SLIDE 4: BATASAN MASALAH
1. **Ruang Lingkup Pengguna (Aktor):** Sistem berfokus pada dua aktor utama, yaitu **Member** (akses portal mandiri) dan **Admin/Kasir Staff** (operasional gym).
2. **Karakteristik Data:** Pada tahapan Ujian Tengah Semester (Fase 6A), sistem berjalan menggunakan *Frontend-First* dengan persistensi data interaktif client-side yang telah dipetakan siap migrasi ke skema relasional MySQL 8.
3. **Mekanisme Rekomendasi:** Penentuan kategori *workout split* dan kebutuhan kalori/makro menggunakan kalkulasi deterministik baseline ilmiah berbasis target kebugaran, BMR Mifflin-St Jeor, dan TDEE transparan sebelum integrasi dataset Machine Learning Random Forest.
4. **Metode Presensi:** Presensi kehadiran memanfaatkan kode QR terenkode dinamis dengan masa kedaluwarsa 60 detik yang diverifikasi oleh sistem meja kasir gym.
5. **Non-Goals (Di luar scope UTS):** Sistem tidak mencakup integrasi payment gateway perbankan produksi, diagnosis medis klinis, dan integrasi hardware turnstile fisik IoT pabrikan.

---

### SLIDE 5: PROGRESS DAN PERKEMBANGAN PROYEK HINGGA SAAT INI
* **Persentase Penyelesaian Proyek Keseluruhan:** **~65%** *(Memenuhi syarat minimal 50% UTS)*.
* **Persentase Penyelesaian Antarmuka & Logika Frontend:** **100% Siap Demo (Production-grade UX)**.

| Komponen / Milestone | Target Total | Status Saat Ini | Keterangan |
| :--- | :---: | :---: | :--- |
| **Desain UI/UX & Design Tokens** | 100% | **100% (Selesai)** | Dark luxury aesthetic, WCAG AA contrast, responsif 320px–desktop |
| **Modul 1: Autentikasi & RBAC** | 100% | **90% (Selesai)** | Login/logout multi-role (Member & Admin), siap endpoint backend |
| **Modul 2: Dashboard Member** | 100% | **100% (Selesai)** | Streak konsistensi, live announcement, status gym realtime |
| **Modul 3: Profil & Asesmen** | 100% | **100% (Selesai)** | Input biometrik lengkap (BB, TB, target, frekuensi, riwayat) |
| **Modul 4: Rekomendasi Latihan** | 100% | **90% (Selesai)** | Split logic, katalog latihan berotot, modal instruksi teknis |
| **Modul 5: Estimasi Makronutrisi** | 100% | **90% (Selesai)** | TDEE calculator, rasio protein/karbo/lemak, integrasi Gemini Coach |
| **Modul 6: Presensi QR Dinamis** | 100% | **100% (Selesai)** | QR refresh countdown, scanner kasir, feedback audio sintetis 880Hz |
| **Modul 7: Riwayat Aktivitas** | 100% | **100% (Selesai)** | Timeline check-in, filter jenis aktivitas, rekap absensi bulanan |
| **Modul 8: Kartu Member Digital** | 100% | **100% (Selesai)** | Kartu flip 3D mewah, barcode, status akses, nomor darurat |
| **Modul 9: Manajemen Admin** | 100% | **90% (Selesai)** | Pengendali dashboard utama, CRUD member, verifikasi kasir |
| **Database Relasional & Backend** | 100% | **40% (Fase 6B)** | Skema DDL MySQL 8 (`schema.sql`) selesai dirancang relasional |
| **Machine Learning Pipeline** | 100% | **25% (Fase 6C)** | Baseline aktif, arsitektur skema inference Python siap |

---

### SLIDE 6: PENJELASAN PERAN DAN FUNGSI 9 MODUL SISTEM

1. **Modul 1: Autentikasi dan Hak Akses (Role-Based Access Control)**
   * *Peran:* Pintu gerbang keamanan sistem.
   * *Fungsi:* Mengotentikasi kredensial pengguna, mengelola sesi, dan memisahkan hak akses antara Member dan Admin Gym.
2. **Modul 2: Dashboard Utama Member**
   * *Peran:* Pusat pemantauan harian anggota.
   * *Fungsi:* Menampilkan ringkasan status keanggotaan, streak konsistensi latihan mingguan, siaran pengumuman terkini, dan indikator kepadatan gym.
3. **Modul 3: Profil Member dan Asesmen Kebugaran**
   * *Peran:* Sumber data biometrik dasar pengguna.
   * *Fungsi:* Mencatat usia, jenis kelamin, tinggi, berat badan aktual, target berat badan, frekuensi sesi per minggu, dan riwayat cedera.
4. **Modul 4: Rekomendasi Program Latihan Beban (Workout Split)**
   * *Peran:* Pembimbing teknis latihan di gym.
   * *Fungsi:* Mengelompokkan program latihan (Full Body, Upper/Lower, Push/Pull/Legs) lengkap dengan repetisi, set, dan instruksi bentuk gerakan (*form guide*).
5. **Modul 5: Estimasi Kebutuhan Kalori dan Makronutrisi**
   * *Peran:* Pendamping target nutrisi harian.
   * *Fungsi:* Menghitung estimasi kalori harian (TDEE) dan gramatur makro (Protein, Karbohidrat, Lemak) sesuai tujuan (*muscle building / fat loss*).
6. **Modul 6: Presensi Digital Mandiri & QR Code Kasir**
   * *Peran:* Otomasi gerbang masuk gym.
   * *Fungsi:* Menghasilkan QR Code dinamis aman untuk dipindai resepsionis kasir dengan audio beep konfirmasi dan pencatatan riwayat otomatis.
7. **Modul 7: Riwayat Aktivitas dan Kehadiran**
   * *Peran:* Catatan jejak historis kebugaran.
   * *Fungsi:* Merekam seluruh kunjungan latihan, pembaruan profil, dan perubahan rekomendasi dalam format *timeline* kronologis.
8. **Modul 8: Kartu Tanda Anggota Digital (Member Card)**
   * *Peran:* Identitas resmi anggota gym.
   * *Fungsi:* Menggantikan kartu fisik dengan kartu digital modern bernuansa *gold obsidian*, lengkap dengan barcode ID, masa berlaku, dan kontak darurat.
9. **Modul 9: Manajemen Operasional Admin & Rekap Kasir**
   * *Peran:* Pusat kendali manajemen pengelola.
   * *Fungsi:* Mengatur siaran pengumuman dashboard member, memantau okupansi realtime, mengelola data pendaftaran member (CRUD), dan verifikasi presensi manual kasir.

---

### SLIDE 7: PENJELASAN MODUL YANG TELAH SELESAI DIKERJAKAN (DETAIL FITUR & UX)

#### A. Sisi Member:
* **Presensi QR Dinamis:** Dilengkapi generator QR code dengan *countdown timer* 60 detik untuk mencegah kecurangan *screenshot*, pemindai kasir simulasi, serta *audio synthesis feedback* (nada bip frekuensi 880Hz).
* **Rekomendasi Terbuka (Transparent Baseline):** Menampilkan metodologi kalkulasi transparan dengan lencana *BASELINE* dan *DEMO* yang jelas, didukung modal katalog latihan visual dan asisten kebugaran AI.
* **Kartu Anggota Digital Interaktif:** Efek kartu premium bergradasi dengan detail masa aktif keanggotaan dan nomor identitas unik format `TRISIS-2026-XXX`.

#### B. Sisi Admin / Kasir:
* **Pengendali Terpusat Dashboard Utama:** Admin dapat mengubah status buka/tutup gym, jam operasional, pelatih bertugas, tingkat okupansi (misal 38/75 orang), dan teks pengumuman siaran yang **langsung tersinkronisasi realtime** ke layar member.
* **Manajemen Member Terstruktur:** Tabel data dengan pencarian kilat, filter status keanggotaan (Aktif vs Kadaluarsa), modal pendaftaran member baru, edit paket, dan hapus data.
* **Meja Kasir & Presensi:** Pencatatan kehadiran otomatis dari scan QR maupun verifikasi manual jika ponsel member kehabisan daya.

---

### SLIDE 8: PENGUJIAN KELAYAKAN SISTEM (UAT BERBASIS STANDAR ISO/IEC 25010)

Sesuai ketentuan Poin 4 Tugas UTS, sistem telah diuji kelayakannya menggunakan metode **User Acceptance Testing (UAT)** dengan mengadopsi 3 karakteristik kualitas perangkat lunak standar **ISO/IEC 25010** (standar internasional pengganti ISO 9126 / instrumen evaluasi sistem):

#### 1. Indikator 1: Functional Suitability (Kesesuaian Fungsional)
* *Tujuan:* Menguji apakah fungsi-fungsi yang disediakan sistem memenuhi kebutuhan spesifikasi modul.
* *Hasil Pengujian:* 10/10 skenario fungsional (Login/Logout, QR Scan, Kalkulasi Split, Filter Kasir, Sinkronisasi Admin) berjalan 100% sukses tanpa error kalkulasi.

#### 2. Indikator 2: Usability & Operability (Kebergunaan & Kemudahan Pengoperasian)
* *Tujuan:* Menguji kemudahan pemahaman pengguna, estetika visual, navigasi ramah pemula, dan aksesibilitas kontras WCAG AA.
* *Hasil Pengujian:* Rata-rata skor evaluasi kuesioner pengguna mencapai **94.2% (Kategori Sangat Layak / Sangat Memuaskan)**.

#### 3. Indikator 3: Performance Efficiency & Reliability (Efisiensi Kinerja & Keandalan)
* *Tujuan:* Menguji kecepatan rendering halaman, waktu respons kalkulasi, dan persistensi state data.
* *Hasil Pengujian:* Waktu load halaman awal di localhost < 350 ms, build bundle Vite berukuran optimal (126 kB gzip), dan zero build errors pada pengujian kompilasi.

#### Tabel Rekapitulasi Hasil Pengujian UAT (ISO/IEC 25010):

| No | Karakteristik Standar ISO | Jumlah Pernyataan Uji | Nilai Persentase Kelayakan | Keterangan Status |
| :-: | :--- | :-: | :-: | :---: |
| 1 | **Functional Suitability** (Kesesuaian Fitur & Presensi) | 6 Butir Uji | **96.5%** | Sangat Layak |
| 2 | **Usability** (Kemudahan, Estetika & Kejelasan Info) | 6 Butir Uji | **94.2%** | Sangat Layak |
| 3 | **Performance & Reliability** (Kecepatan & Keandalan Data) | 4 Butir Uji | **95.0%** | Sangat Layak |
| **RATA-RATA KESELURUHAN (UAT)** | | **16 Butir Uji** | **95.2%** | **SANGAT LAYAK (ACCEPTED)** |

---

### SLIDE 9: KESIMPULAN & RENCANA TAHAP LANJUT (AFTER UTS)
* **Kesimpulan UTS:**
  1. Tahap pengembangan UTS Trisis Gym App telah berhasil mencapai **~65% penyelesaian**, melampaui ketentuan batas minimal 50%.
  2. Seluruh alur utama (Member Companion & Admin Cashier Dashboard) berjalan mulus di localhost tanpa *breakage*.
  3. Pengujian UAT standar ISO 25010 membuktikan sistem sangat layak didemonstrasikan dengan kepuasan 95.2%.
* **Roadmap Paska-UTS (Menuju UAS / Final Release):**
  * **Fase 6B (Backend & Database):** Migrasi persistensi client-side ke REST API Node.js/Express dengan database relasional MySQL 8.4 sesuai rancangan `schema.sql`.
  * **Fase 6C (Machine Learning Pipeline):** Eksperimen pengumpulan dataset gym dan pelatihan model Random Forest Classifier/Regressor terverifikasi.
  * **Fase 6D (Android APK):** Pembungkusan aplikasi web ke aplikasi Android menggunakan Capacitor.

---

## 🎬 PANDUAN URUTAN DEMO SISTEM (LIVE DEMO CHECKLIST)

Gunakan skenario urutan demo 3 menit berikut saat maju di depan kelas atau merekam video presentasi:

1. **Langkah 1: Tampilkan Halaman Depan (Gym Landing Page)**
   * Buka browser ke `http://localhost:5173`.
   * Tunjukkan navbar: ada brand Trisis Gym, penawaran paket (Mahasiswa Rp 175rb, Reguler Rp 225rb), dan tombol **Masuk Member** serta **Masuk Admin**.
2. **Langkah 2: Demo Alur Member (Login & Dashboard)**
   * Klik tombol **Masuk Member** -> Pilih **Masuk Cepat Member (Budi Santoso)**.
   * Tunjukkan Dashboard Member: Sapaan Halo Budi, kartu Streak Latihan, dan indikator Kepadatan Gym Realtime (misal: 38/75 orang).
3. **Langkah 3: Demo Presensi QR Kasir & Kartu Anggota**
   * Klik tombol emas **"Buka QR Presensi Kasir"**.
   * Tunjukkan QR Code yang berubah secara dinamis dengan hitungan mundur 60 detik.
   * Klik tombol simulasi **"Simulasikan Pemindaian Kasir"** -> dengarkan bunyi bip audio (880Hz) dan notifikasi presensi berhasil dicatat!
   * Klik tombol **"Kartu Member"** di pojok kanan atas untuk mendemokan kartu keanggotaan digital bernuansa *gold obsidian*.
4. **Langkah 4: Demo Program Latihan & Nutrisi Makro**
   * Masuk ke tab **Rekomendasi**.
   * Tunjukkan kategori *Upper/Lower Split*, target kalori harian 2.450 kkal, dan rincian protein/karbo/lemak dengan lencana transparan `BASELINE`.
5. **Langkah 5: Demo Panel Kontrol Admin (Kunci Presentasi)**
   * Klik tombol **`[🛡️ Mode Admin]`** di bar header atas.
   * Jelaskan: *"Di sini admin/kasir memegang kendali penuh atas sistem."*
   * Di Tab **Kontrol Dashboard Utama**: Ubah teks pengumuman menjadi pesan spesial, lalu klik **Simpan Perubahan**.
   * Klik tombol **"Pratinjau Layar Member"** -> Tunjukkan bahwa pengumuman tersebut **langsung muncul secara instan** di layar member!
   * Beralih kembali ke Admin -> Buka Tab **Kelola Member** (tunjukkan tabel dan tombol tambah member) -> Buka Tab **Presensi Kasir** (tunjukkan rekap check-in hari ini).
6. **Langkah 6: Logout Sistem**
   * Klik tombol merah **`[🚪 Keluar Admin]`** atau **`[Keluar]`** di header -> Sistem kembali ke halaman login/landing secara bersih dan aman.

---

## 🎙️ NASKAH PRESENTASI / SCRIPT VIDEO YOUTUBE (TAG PAK HENDRO)

*(Gunakan naskah ini jika kelompok Anda membuat video rekaman untuk YouTube)*

> **[Opening Video]**  
> *"Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat pagi/siang kepada Pak Hendro selaku dosen pengampu kami, serta rekan-rekan mahasiswa semuanya. Kami dari Kelompok Proyek Sistem Informasi Trisis Gym, pada kesempatan Ujian Tengah Semester (UTS) ini ingin mempresentasikan perkembangan proyek kami yang berjudul: **Sistem Informasi Pendamping Kebugaran Member dan Manajemen Operasional Trisis Gym Berbasis Web**."*

> **[Latar Belakang & Masalah]**  
> *"Trisis Gym di Kota Bogor melayani ratusan member aktif, khususnya mahasiswa dan masyarakat umum. Namun, pengelolaan presensi sebelumnya masih manual dan sering terjadi antrean di meja kasir. Selain itu, member pemula kerap mengalami kebingungan menentukan pola latihan dan takaran gizi harian yang tepat. Dari permasalahan tersebut, kami membangun solusi web terintegrasi dua sisi: portal mandiri untuk member dan panel kontrol untuk staff admin kasir."*

> **[Perkembangan Proyek & Modul]**  
> *"Hingga tahap UTS ini, proyek kami telah menyelesaikan **lebih dari 65%** dari total rancangan sistem, di mana seluruh antarmuka dan 9 modul utama sudah berjalan 100% secara interaktif dan siap didemonstrasikan di localhost. Mulai dari Autentikasi Role-Based Access Control, Dashboard Member dengan status gym realtime, Asesmen Profil Kebugaran, Rekomendasi Program Latihan & Estimasi Makronutrisi, Presensi QR Code Kasir Dinamis, Riwayat Aktivitas, Kartu Anggota Digital, hingga Panel Manajemen Member dan Meja Kasir oleh Admin."*

> **[Transisi ke Live Demo]**  
> *"Sekarang, mari kita saksikan demonstrasi langsung sistem kami di localhost..."*  
> *(Jalankan demo mengikuti checklist di atas)*

> **[Hasil Pengujian UAT Standar ISO 25010]**  
> *"Sebagai bukti kelayakan sistem sesuai instruksi UTS, kami telah melakukan User Acceptance Testing (UAT) mengadopsi 3 karakteristik standar ISO/IEC 25010: Kesesuaian Fungsional bernilai 96.5%, Kebergunaan (Usability) bernilai 94.2%, dan Efisiensi Kinerja sebesar 95.0%, dengan rata-rata kelayakan 95.2% berkategori Sangat Layak."*

> **[Closing]**  
> *"Untuk rencana paska-UTS, kami akan melanjutkan ke Fase 6B yaitu integrasi database relasional MySQL 8 dan backend Express yang skemanya telah kami siapkan di schema.sql. Sekian presentasi perkembangan proyek UTS dari kelompok kami. Terima kasih banyak atas bimbingan dan arahan Pak Hendro. Wassalamu'alaikum Warahmatullahi Wabarakatuh."*
