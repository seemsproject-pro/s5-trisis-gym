# TEMPLATE PPT & MATERI LENGKAP PRESENTASI UTS PROYEK SEMESTER 5

**Mata Kuliah / Tugas:** Proyek Semester 5 — Ujian Tengah Semester (UTS)  
**Tema:** Artificial Intelligence (AI) · Semester 5  
**Dosen Pengampu:** Pak Hendro  
**Objek Penelitian / Proyek:** Trisis Gym Centre  
**Metodologi Pengembangan:** Agile / Extreme Programming (XP)  
**Tech Stack & Tools:** Node.js, React + Vite, MySQL, Tailwind CSS, Android (Capacitor / Mobile-First PWA)

---

## RANCANGAN SLIDE PRESENTASI (SLIDE-BY-SLIDE)

---

### 🖥️ SLIDE 1: COVER & JUDUL PROYEK
* **Header:** Ujian Tengah Semester (UTS) — Proyek Semester 5
* **Tema:** AI · Semester 5
* **Judul Proyek:**  
  **"Penerapan Algoritma Random Forest untuk Rekomendasi Program Latihan (Workout Split) dan Perhitungan Target Makronutrisi Berdasarkan Profil Kebugaran Berbasis Web dan Aplikasi Android (Studi Kasus: Trisis Gym)"**
* **Objek Proyek:** Trisis Gym Centre
* **Platform:** Multiplatform (Website Responsif & Aplikasi Android)
* **Identitas Tim Pengembang:**
  * [Nama Mahasiswa 1] - [NPM] *(Project Lead / ML & Backend)*
  * [Nama Mahasiswa 2] - [NPM] *(Frontend & Android UI/UX)*
  * [Nama Mahasiswa 3] - [NPM] *(Database & System Integration)*
  * [Nama Mahasiswa 4] - [NPM] *(Data Analyst & QA)*
* **Dosen Pengampu:** Pak Hendro

---

### 🖥️ SLIDE 2: LATAR BELAKANG
* **Poin Kunci:**
  1. **Tingginya Kebingungan Praktisi Pemula:**  
     Praktisi kebugaran pemula di Trisis Gym sering mengalami kebingungan dalam menyelaraskan jadwal latihan fisik dengan kebutuhan nutrisi harian yang sesuai dengan tujuan spesifik mereka (baik menurunkan lemak / *fat loss*, menambah massa otot / *muscle building*, maupun menjaga berat badan ideal / *maintenance*).
  2. **Dampak Pemilihan Program yang Keliru:**  
     Pemilihan jadwal (*workout split*) dan rasio makronutrisi yang tidak tepat dengan kondisi fisik serta *body goals* sering kali memicu:
     * Kelelahan otot berlebih (*overtraining*).
     * Stagnansi hasil latihan (*plateau*).
     * Risiko kehilangan massa otot (*muscle loss*) akibat ketidakseimbangan asupan protein dan energi.
  3. **Kebutuhan Sistem Pendamping Otomatis Multiplatform:**  
     Tidak semua anggota gym mampu menyewa jasa *Personal Trainer* (PT) dan ahli gizi pribadi. Diperlukan sistem pendamping cerdas berbasis *Machine Learning* yang fleksibel, dapat diakses kapan saja dan di mana saja baik melalui **Web Browser** di laptop/PC maupun di-install langsung sebagai **Aplikasi Android** di smartphone.

---

### 🖥️ SLIDE 3: RUMUSAN MASALAH
1. **Bagaimana proses penentuan program latihan (*workout split*) dan perhitungan target makronutrisi berdasarkan profil kebugaran anggota di Trisis Gym saat ini?**
2. **Bagaimana merancang dan membangun aplikasi berbasis Web dan Android menggunakan algoritma Random Forest untuk rekomendasi program latihan (*workout split*) serta perhitungan target makronutrisi berdasarkan profil kebugaran?**
3. **Apakah aplikasi Web dan Android yang dikembangkan dapat memberikan rekomendasi program latihan dan estimasi target makronutrisi serta berfungsi sesuai kebutuhan pengguna?**

---

### 🖥️ SLIDE 4: BATASAN MASALAH
1. **Fokus Penelitian:**  
   Penelitian berfokus pada proses penentuan *workout split* dan perhitungan target makronutrisi berdasarkan profil kebugaran anggota Trisis Gym, tanpa membahas pengelolaan operasional gym secara keseluruhan.
2. **Aksesibilitas Multiplatform & Algoritma:**  
   Aplikasi dikembangkan secara *multiplatform* sehingga dapat diakses secara fleksibel melalui **Website responsif** (desktop, laptop, tablet) serta dapat dijalankan sebagai **Aplikasi Android** (menggunakan arsitektur Capacitor / WebView). Algoritma **Random Forest** digunakan untuk klasifikasi rekomendasi *workout split*, sedangkan perhitungan target makronutrisi meliputi kebutuhan protein, karbohidrat, dan lemak berdasarkan metode perhitungan ilmiah (TDEE & BMR).
3. **Batasan Layanan Sistem & Disclaimer Medis:**  
   Rekomendasi program latihan dan estimasi target makronutrisi yang dihasilkan sistem merupakan panduan kebugaran berbasis data profil pengguna dan **bukan merupakan diagnosis medis, resep diet klinis, maupun terapi pengganti tenaga medis/ahli gizi profesional**. Selain itu, sistem **tidak mencakup integrasi gerbang transaksi pembayaran perbankan (*payment gateway*) dan perangkat keras fisik (*turnstile gate IoT*)**.

---

### 🖥️ SLIDE 5: METODOLOGI & ALAT PENGEMBANGAN (TOOLS)
* **Metodologi Pengembangan:** **Agile / Extreme Programming (XP)**
  * *Planning:* Eksplorasi kebutuhan member pemula dan admin kasir gym.
  * *Designing:* Perancangan antarmuka mobile-first (Tailwind CSS Dark Obsidian).
  * *Coding:* Pembangunan arsitektur modular (React + Vite, Node.js, MySQL).
  * *Testing:* Pengujian fungsi bertahap per modul di lingkungan localhost.
* **Tech Stack & Tools:**
  * **Front-end / Client Web:** React 19, Vite, Tailwind CSS v4, Lucide React (Desain responsif Web Desktop, Tablet, & Smartphone).
  * **Mobile App Engine:** Android Capacitor / WebView Architecture (Menghasilkan APK Android siap install).
  * **Back-end Server:** Node.js, Express.js.
  * **Database Relasional:** MySQL 8.
  * **Machine Learning Environment:** Python, Scikit-Learn (Random Forest Classifier).

---

### 🖥️ SLIDE 6: PROGRESS PENYELESAIAN PROYEK PER MODUL (>50% TERCAPAI)
* **Status Perkembangan Proyek Saat Ini:** **~79.5% (Sisi Antarmuka & Logika Sistem)** / **~65% (Arsitektur Keseluruhan)**.
* **Kesiapan Demo Localhost:** **100% Siap Didemonstrasikan** secara langsung di browser localhost.

#### 📋 Tabel Rincian Perkembangan 10 Modul Sistem:
| Modul | Nama Modul Sistem | Persentase | Status & Capaian Pengerjaan |
| :-: | :--- | :-: | :--- |
| **1** | **Autentikasi & Hak Akses** | **85%** | Login/logout Member & Admin, proteksi sesi, tombol keluar di semua halaman |
| **2** | **Dashboard Member** | **90%** | Streak latihan, status keanggotaan aktif, live crowd okupansi, live announcement |
| **3** | **Profil & Asesmen Kebugaran** | **85%** | Formulir biometrik (usia, TB, BB, target kebugaran, pengalaman, frekuensi) |
| **4** | **Kartu Anggota Digital** | **90%** | Kartu flip 3D gold obsidian, ID anggota format `TRISIS-2026-XXX`, barcode ID |
| **5** | **Check-in, Kehadiran & Riwayat** | **85%** | Presensi QR dinamis countdown 60 detik, simulasi kasir dengan audio bip 880Hz |
| **6** | **Rekomendasi Workout Split** | **75%** | Klasifikasi split (Full Body, Upper/Lower, PPL) aktif; arsitektur model siap |
| **7** | **Perhitungan Target Makronutrisi** | **80%** | Kalkulasi ilmiah TDEE & BMR, gramatur protein, karbohidrat, dan lemak |
| **8** | **Detail Rencana Latihan** | **80%** | Katalog gerakan per kelompok otot, rekomendasi set & reps, modal panduan form |
| **9** | **Manajemen Member & Kasir** | **85%** | Tabel kelola member (CRUD), meja presensi kasir, pengendali dashboard utama |
| **10** | **Pengelolaan Dataset & Sistem** | **40%** | Kontrol operasional buka/tutup gym aktif; pemetaan fitur dataset siap training |
| **RATA-RATA TOTAL** | | **~79.5%** | **MELEBIHI AMBANG BATAS MINIMAL 50% (SIAP DEMO)** |

---

### 🖥️ SLIDE 7: PENJELASAN PERAN DAN FUNGSI 10 MODUL SISTEM

Sistem dirancang secara modular dengan membagi fungsi ke dalam **10 Modul Terstruktur**:

1. **Modul 1: Modul Autentikasi dan Hak Akses**  
   * *Tujuan:* Mengelola proses masuk pengguna dan membatasi akses fitur berdasarkan peran (Member & Admin).  
   * *Fitur:* Registrasi member, login kredensial, proteksi sesi, tombol Logout di seluruh halaman, dan switch peran cepat.
2. **Modul 2: Modul Dashboard Member**  
   * *Tujuan:* Menampilkan ringkasan informasi penting kepada member setelah login.  
   * *Fitur:* Info member, status keanggotaan aktif, streak konsistensi latihan harian, live banner pengumuman gym, dan status kepadatan (*live crowd*).
3. **Modul 3: Modul Profil Member dan Asesmen Kebugaran**  
   * *Tujuan:* Mengumpulkan data profil dan biometrik fisik dasar pengguna.  
   * *Fitur:* Input usia, jenis kelamin, tinggi, berat badan, target BB, target kebugaran (*muscle building / fat loss*), pengalaman gym, dan frekuensi latihan mingguan.
4. **Modul 4: Modul Kartu Anggota Digital**  
   * *Tujuan:* Menyediakan identitas keanggotaan modern pengganti kartu fisik.  
   * *Fitur:* Tampilan kartu premium bernuansa *gold obsidian*, ID anggota unik format `TRISIS-2026-XXX`, masa berlaku membership, dan barcode identifikasi.
5. **Modul 5: Modul Check-in, Kehadiran, dan Riwayat Aktivitas**  
   * *Tujuan:* Mempermudah pencatatan presensi kunjungan serta rekam jejak aktivitas latihan.  
   * *Fitur:* Generator QR Code dinamis dengan masa aktif 60 detik, simulasi scan kasir dengan audio beep 880Hz, proteksi scan ganda, dan log kunjungan kronologis.
6. **Modul 6: Modul Rekomendasi Program Latihan (Workout Split)**  
   * *Tujuan:* Memberikan rekomendasi program latihan berbasis algoritma Machine Learning (Random Forest).  
   * *Fitur:* Klasifikasi profil member ke dalam kategori split terbaik (Full Body 3 hari, Upper/Lower 4 hari, Push/Pull/Legs 5-6 hari), transparansi status *BASELINE/DEMO*, dan penyimpanan riwayat rekomendasi.
7. **Modul 7: Modul Perhitungan Target Makronutrisi**  
   * *Tujuan:* Menghitung estimasi energi dan target gramatur gizi harian.  
   * *Fitur:* Kalkulasi TDEE & BMR Mifflin-St Jeor, distribusi gramatur protein, karbohidrat, dan lemak sesuai *body goals*.
8. **Modul 8: Modul Detail Rencana Latihan**  
   * *Tujuan:* Memberikan katalog instruksi teknis dari program latihan yang direkomendasikan.  
   * *Fitur:* Daftar pembagian kelompok otot (Chest, Back, Legs, dll), panduan nama gerakan beban, rekomendasi set & repetisi, serta modal instruksi gerakan.
9. **Modul 9: Modul Manajemen Member dan Laporan Kehadiran (Admin Kasir)**  
   * *Tujuan:* Membantu admin mengelola member dan memantau kehadiran serta operasional dashboard.  
   * *Fitur:* Tabel data member dengan pencarian & filter status (Aktif/Kadaluarsa), form pendaftaran member baru, edit & hapus member, serta meja verifikasi presensi kasir manual.
10. **Modul 10: Modul Pengelolaan Dataset, Evaluasi Model, dan Pengaturan Sistem**  
    * *Tujuan:* Mengontrol pengujian performa algoritma Machine Learning dan konfigurasi siaran sistem.  
    * *Fitur:* Skema preprocessing data, metrik evaluasi model (Accuracy, Precision, Recall, F1-Score), kontrol buka/tutup gym realtime, dan siaran pengumuman dashboard.

---

### 🖥️ SLIDE 8: RINCIAN MODUL YANG TELAH SELESAI DIKERJAKAN
* **Yang Sudah Selesai Dikerjakan & Siap Didemonstrasikan:**
  1. **Alur Member Lengkap:** Login cepat, Dashboard dengan pantauan streak, kartu keanggotaan digital, presensi scan QR dinamis bersuara bip kasir, rekomendasi workout split, dan kalkulasi makronutrisi.
  2. **Alur Admin Terpusat:** Panel kontrol operasional (buka/tutup gym, meteran kepadatan pengunjung, pelatih bertugas), siaran pengumuman langsung yang **tersinkronisasi realtime ke dashboard member**, tabel kelola member (CRUD), dan meja presensi kasir.
  3. **Navigasi Akun & Aksesibilitas:** Tombol Logout yang jelas di header atas, sidebar, dashboard admin, dan halaman profil.
  4. **Fondasi Database Relasional:** Skema tabel MySQL 8 (`users`, `memberships`, `profiles`, `checkins`, `gym_settings`) telah dirancang di file `server/schema.sql`.

---

### 🖥️ SLIDE 9: TANTANGAN TEKNIS & SOLUSI (AGILE ITERATION)
* **Tantangan 1: Kebutuhan Sinkronisasi Dua Arah (Member vs Admin)**
  * *Masalah:* Bagaimana agar perubahan jadwal/pengumuman dari admin langsung dirasakan oleh member tanpa perlu refresh manual yang rumit.
  * *Solusi:* Menerapkan *centralized state service* pada client yang memetakan pengaturan gym langsung ke antarmuka member secara realtime.
* **Tantangan 2: Keamanan Presensi QR Kasir**
  * *Masalah:* Member rentan melakukan manipulasi presensi dengan mengambil *screenshot* QR code untuk dititipkan ke teman.
  * *Solusi:* Membangun QR Code dinamis dengan masa kedaluwarsa 60 detik (*auto-refresh countdown timer*).

---

### 🖥️ SLIDE 10: RENCANA TAHAP LANJUT (ROADMAP PASKA-UTS MENUJU UAS)
* **Fase 6B: Integrasi Database Relasional MySQL 8 & Express.js**  
  Menyambungkan antarmuka Web/Android dengan REST API backend Node.js dan database MySQL 8 berdasarkan skema relasional `schema.sql` yang telah dirancang.
* **Fase 6C: Pengumpulan Dataset & Pelatihan Model Random Forest**  
  Mengumpulkan data asesmen kebugaran gym, melatih model Random Forest Classifier dengan Scikit-Learn, serta mengukur metrik Akurasi, Presisi, Recall, dan F1-Score.
* **Fase 6D: Build APK Android & Pengujian Akhir**  
  Mengkompilasi aplikasi ke format file APK Android menggunakan Capacitor untuk pengujian instalasi langsung pada perangkat smartphone.

---

## 🎬 SKENARIO STEP-BY-STEP LIVE DEMO LOCALHOST (3 MENIT)

Saat presentasi di kelas / video:
1. **Langkah 1:** Buka `http://localhost:5173`. Tunjukkan Landing Page Gym (paket mahasiswa Rp 175rb, reguler Rp 225rb, tombol Masuk Member & Admin).
2. **Langkah 2:** Klik **Masuk Member** -> klik **Masuk Cepat Member (Budi Santoso)**.
3. **Langkah 3:** Di Dashboard Member, tunjukkan Streak Latihan, Indikator Kepadatan Gym, dan Banner Pengumuman.
4. **Langkah 4:** Klik **Buka QR Presensi Kasir**, tunjukkan countdown 60 detik, klik tombol simulasi scanner kasir (dengarkan nada bip 880Hz).
5. **Langkah 5:** Buka tab **Rekomendasi**, perlihatkan hasil kalkulasi Upper/Lower Split dan target energi harian 2.450 kkal berserta makronya.
6. **Langkah 6:** Klik tombol **`[🛡️ Mode Admin]`** di kanan atas. Masuk ke Panel Admin, ubah teks siaran pengumuman, klik **Simpan Perubahan**, lalu klik **Pratinjau Layar Member** untuk membuktikan bahwa pengumuman langsung ter-update realtime!
7. **Langkah 7:** Klik tombol merah **`[🚪 Keluar Admin]`** di header/banner untuk mendemokan alur logout yang bersih.

---

## 🎙️ NASKAH PRESENTASI VIDEO YOUTUBE (TAG PAK HENDRO)

> *"Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat pagi/siang kepada Bapak Hendro selaku dosen pengampu kami, dan rekan-rekan semuanya.*  
>  
> *Kami dari kelompok Proyek Semester 5, pada kesempatan Ujian Tengah Semester ini mempresentasikan perkembangan proyek kami yang berjudul: **'Penerapan Algoritma Random Forest untuk Rekomendasi Program Latihan (Workout Split) dan Perhitungan Target Makronutrisi Berdasarkan Profil Kebugaran Berbasis Web dan Aplikasi Android (Studi Kasus: Trisis Gym)'**.*  
>  
> *Latar belakang proyek ini berangkat dari permasalahan praktisi kebugaran pemula di Trisis Gym yang sering mengalami kebingungan dalam menyelaraskan jadwal latihan fisik dengan kebutuhan nutrisi harian mereka, yang jika salah dapat memicu overtraining dan kehilangan massa otot.*  
>  
> *Hingga tahapan UTS ini, proyek kami telah menyelesaikan **lebih dari 65% total sistem**, di mana seluruh antarmuka multiplatform (Web & Android) dan alur dari 10 modul utama telah siap didemonstrasikan secara langsung di localhost menggunakan stack React, Node.js, MySQL, dan Tailwind CSS.*  
>  
> *(Lanjutkan dengan rekaman layar Live Demo sesuai skenario di atas)*  
>  
> *Setelah tahapan UTS ini, kami akan melanjutkan pengerjaan ke fase integrasi database relasional MySQL 8 dan pelatihan model Random Forest. Sekian presentasi perkembangan proyek UTS dari kelompok kami. Terima kasih banyak kepada Pak Hendro atas bimbingannya. Wassalamu'alaikum Warahmatullahi Wabarakatuh."*
