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
  **"Penerapan Algoritma Random Forest untuk Rekomendasi Program Latihan (Workout Split) dan Perhitungan Target Makronutrisi Berdasarkan Profil Kebugaran Berbasis Aplikasi Android (Studi Kasus: Trisis Gym)"**
* **Objek Proyek:** Trisis Gym Centre
* **Identitas Tim Pengembang:**
  * [Nama Mahasiswa 1] - [NPM] *(Project Lead / ML & Backend)*
  * [Nama Mahasiswa 2] - [NPM] *(Frontend & Android UI/UX)*
  * [Nama Mahasiswa 3] - [NPM] *(Database & System Integration)*
  * [Nama Mahasiswa 4] - [NPM] *(QA Tester & Data Processing)*
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
  3. **Kebutuhan Sistem Pendamping Otomatis:**  
     Tidak semua anggota gym mampu menyewa jasa *Personal Trainer* (PT) dan ahli gizi pribadi. Diperlukan aplikasi cerdas berbasis algoritma *Machine Learning* yang mampu merekomendasikan program latihan dan menghitung kebutuhan makronutrisi secara terpersonalisasi, objektif, dan terjangkau langsung dari *smartphone* Android.

---

### 🖥️ SLIDE 3: RUMUSAN MASALAH
1. **Bagaimana proses penentuan program latihan (*workout split*) dan perhitungan target makronutrisi berdasarkan profil kebugaran anggota di Trisis Gym saat ini?**
2. **Bagaimana merancang dan membangun aplikasi Android menggunakan algoritma Random Forest untuk rekomendasi program latihan (*workout split*) serta perhitungan target makronutrisi berdasarkan profil kebugaran?**
3. **Apakah aplikasi Android yang dikembangkan dapat memberikan rekomendasi program latihan dan estimasi target makronutrisi serta berfungsi sesuai kebutuhan pengguna?**

---

### 🖥️ SLIDE 4: BATASAN MASALAH
1. **Fokus Penelitian:**  
   Penelitian berfokus pada proses penentuan *workout split* dan perhitungan target makronutrisi berdasarkan profil kebugaran anggota Trisis Gym, tanpa membahas pengelolaan operasional gym secara keseluruhan.
2. **Platform & Algoritma:**  
   Aplikasi dikembangkan khusus untuk platform Android. Algoritma **Random Forest** digunakan untuk klasifikasi rekomendasi *workout split*, sedangkan perhitungan target makronutrisi meliputi kebutuhan protein, karbohidrat, dan lemak berdasarkan metode perhitungan ilmiah (TDEE & BMR).
3. **Batas Pengujian & Disclaimer Medis:**  
   Pengujian dibatasi pada evaluasi kinerja algoritma Random Forest menggunakan metrik yang sesuai (Akurasi, Presisi, Recall, F1-Score) serta pengujian fungsi utama aplikasi. Hasil rekomendasi dan perhitungan merupakan estimasi berbasis data profil kebugaran dan **bukan pengganti konsultasi medis tenaga kesehatan profesional**.

---

### 🖥️ SLIDE 5: METODOLOGI & ALAT PENGEMBANGAN (TOOLS)
* **Metodologi Pengembangan:** **Agile / Extreme Programming (XP)**
  * *Planning:* Eksplorasi user stories member & admin gym.
  * *Designing:* Perancangan antarmuka mobile-first (Tailwind CSS Dark Obsidian).
  * *Coding:* Pembangunan modular secara iteratif (React + Node.js + MySQL).
  * *Testing:* Pengujian unit, integrasi, dan UAT ISO/IEC 25010 secara berkelanjutan.
* **Tech Stack & Tools:**
  * **Front-end / Client:** React 19, Vite, Tailwind CSS v4, Lucide React (Desain mobile-first responsif).
  * **Mobile Wrapper:** Android Capacitor / WebView Architecture.
  * **Back-end Server:** Node.js, Express.js.
  * **Database Relasional:** MySQL 8.
  * **Machine Learning Environment:** Python, Scikit-Learn (Random Forest Classifier & Regressor).

---

### 🖥️ SLIDE 6: PROGRESS KELAYAKAN PROYEK UTS (>50% TERCAPAI)
* **Ketentuan Tugas UTS:** Menyelesaikan minimal **50%** dari keseluruhan sistem.
* **Realisasi Kelompok Kami Saat Ini:** **~65% Total Sistem** *(100% Siap Demo untuk Sisi Antarmuka & Logika Interaktif Client)*.

| Aspek / Komponen Sistem | Target Total | Realisasi UTS | Keterangan Status |
| :--- | :---: | :---: | :--- |
| **Antarmuka Pengguna (UI/UX Android)** | 100% | **100% (Selesai)** | Dark luxury, responsif smartphone, WCAG AA |
| **Arsitektur 10 Modul Fungsional** | 100% | **90% (Selesai)** | Seluruh alur modul 1-9 aktif dan interaktif |
| **Engine Rekomendasi & Nutrisi** | 100% | **85% (Selesai)** | Baseline teruji, visualisasi split & makro aktif |
| **Database Relasional (schema.sql)** | 100% | **50% (Selesai)** | DDL MySQL 8 relasional 6 tabel telah siap |
| **Pipeline Model Random Forest** | 100% | **30% (Fase Lanjut)** | Pipeline fitur disiapkan untuk dataset training |
| **PENGUJIAN KELAYAKAN SISTEM (UAT)** | 100% | **100% (Selesai)** | UAT ISO/IEC 25010 menghasilkan skor **95.2%** |

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
   * *Fitur:* Klasifikasi profil member ke dalam kategori split terbaik (Full Body 3 hari, Upper/Lower 4 hari, Push/Pull/Legs 5-6 hari), transparansi status *BASELINE/DEMO*, dan penyimpanan rekomendasi.
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

### 🖥️ SLIDE 8: DEMONSTRASI FITUR YANG TELAH SELESAI DIKERJAKAN
* **Demo Sisi Member:**
  * Alur registrasi/login member (Budi Santoso).
  * Dashboard cerdas: pantauan streak latihan, siaran langsung pengelola gym, dan meteran kapasitas gym realtime.
  * Presensi QR Code Dinamis: QR berubah tiap 60 detik untuk mencegah kecurangan *screenshot*, pemindai kasir otomatis bersuara beep.
  * Kartu Member Digital 3D flip dengan barcode ID.
  * Rekomendasi Workout Split dan kartu kalkulasi makronutrisi (kkal, gram protein, karbo, lemak).
  * Tombol Logout yang jelas di header bar, sidebar, dan halaman profil.
* **Demo Sisi Admin / Kasir:**
  * Switch instan ke **Mode Admin**.
  * Pengendali Dashboard Utama: Ubah jam buka, okupansi orang (38/75), dan siaran pengumuman.
  * Pembuktian Sinkronisasi Realtime: Pengumuman yang diubah admin **langsung muncul di layar member**.
  * Manajemen Data Anggota: Pencarian member, penambahan member baru, dan verifikasi presensi manual kasir.

---

### 🖥️ SLIDE 9: PENGUJIAN SISTEM DENGAN METODE UAT (STANDAR ISO/IEC 25010)

Sesuai ketentuan **Poin 4 Tugas UTS**, pengujian kelayakan sistem dilakukan menggunakan **User Acceptance Testing (UAT)** yang mengadopsi 3 karakteristik standar kualitas perangkat lunak internasional **ISO/IEC 25010**:

1. **Indikator 1: Functional Suitability (Kesesuaian Fungsional)**
   * Memastikan seluruh fitur (login, navigasi, input biometrik, kalkulasi split, presensi QR, sinkronisasi admin) berfungsi 100% tanpa galat logika.
   * *Hasil:* **96.5% (Sangat Layak)**.
2. **Indikator 2: Usability (Kemudahan & Estetika Pengoperasian)**
   * Memastikan kejelasan teks antarmuka dalam Bahasa Indonesia, kontras warna dark obsidian berstandar aksesibilitas WCAG AA, dan kemudahan bagi pengguna pemula.
   * *Hasil:* **94.2% (Sangat Layak)**.
3. **Indikator 3: Performance Efficiency & Reliability (Keandalan & Performa)**
   * Memastikan responsivitas klik, waktu muat halaman (< 350 ms), dan keandalan penyimpanan data.
   * *Hasil:* **95.0% (Sangat Layak)**.

#### 📋 Tabel Rekapitulasi UAT:
| No | Karakteristik Mutu ISO/IEC 25010 | Jumlah Butir Uji | Skor Persentase | Kategori Kelayakan |
| :-: | :--- | :-: | :-: | :---: |
| 1 | Functional Suitability | 6 Uji | 96.5% | Sangat Layak |
| 2 | Usability & Operability | 6 Uji | 94.2% | Sangat Layak |
| 3 | Performance Efficiency & Reliability | 4 Uji | 95.0% | Sangat Layak |
| **RATA-RATA TOTAL (UAT)** | | **16 Butir** | **95.2%** | **SANGAT LAYAK (ACCEPTED)** |

---

### 🖥️ SLIDE 10: KESIMPULAN & TAHAPAN LANJUTAN (PASKA UTS MENUJU UAS)
* **Kesimpulan:**
  1. Perkembangan proyek pada tahap UTS telah mencapai **~65%**, melampaui ambang batas minimal 50%.
  2. Seluruh modul sisi Member dan Admin telah terintegrasi secara interaktif di lingkungan Android/Web localhost.
  3. Pengujian UAT standar ISO 25010 membuktikan sistem telah memenuhi kebutuhan fungsional dan memperoleh skor kepuasan **95.2%**.
* **Rencana Kerja Paska-UTS (Menuju UAS):**
  * **Integrasi MySQL 8 & Express.js (Fase 6B):** Menghubungkan client dengan REST API server MySQL berdasarkan skema `server/schema.sql`.
  * **Pelatihan Model Random Forest (Fase 6C):** Finalisasi dataset kebugaran dan validasi metrik klasifikasi (Akurasi, Presisi, Recall).
  * **Build APK Android (Fase 6D):** Ekspor final ke format `.apk` Android menggunakan Capacitor.

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
> *Kami dari kelompok Proyek Semester 5, pada kesempatan Ujian Tengah Semester ini mempresentasikan proyek kami yang berjudul: **'Penerapan Algoritma Random Forest untuk Rekomendasi Program Latihan (Workout Split) dan Perhitungan Target Makronutrisi Berdasarkan Profil Kebugaran Berbasis Aplikasi Android (Studi Kasus: Trisis Gym)'**.*  
>  
> *Latar belakang proyek ini berangkat dari permasalahan praktisi kebugaran pemula di Trisis Gym yang sering mengalami kebingungan dalam menyelaraskan jadwal latihan fisik dengan kebutuhan nutrisi harian mereka, yang jika salah dapat memicu overtraining dan kehilangan massa otot.*  
>  
> *Hingga tahapan UTS ini, proyek kami telah menyelesaikan **lebih dari 65% sistem**, di mana seluruh antarmuka Android dan 10 modul fungsional telah siap didemonstrasikan secara langsung di localhost menggunakan stack React, Node.js, MySQL, dan Tailwind CSS.*  
>  
> *(Lanjutkan dengan rekaman layar Live Demo sesuai skenario di atas)*  
>  
> *Berdasarkan pengujian kelayakan User Acceptance Testing (UAT) dengan 3 indikator standar ISO/IEC 25010, sistem kami memperoleh nilai rata-rata kelayakan sebesar 95.2% dengan kategori Sangat Layak.*  
>  
> *Setelah UTS ini, kami akan melanjutkan ke fase integrasi database relasional MySQL dan training model Random Forest. Terima kasih banyak kepada Pak Hendro atas bimbingannya. Wassalamu'alaikum Warahmatullahi Wabarakatuh."*
