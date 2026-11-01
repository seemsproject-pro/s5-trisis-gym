# IMPLEMENTATION PLAN — Trisis Gym Member App

> **Status:** Disetujui — Phase 3; audit konsistensi Phase 4 selesai; revisi Phase 6A disetujui  
> **Versi:** 1.1  
> **Tanggal:** 12 Oktober 2026  
> **Pemilik dokumen:** Proyek akademik individu, mahasiswa Informatika semester 4  
> **Jenis dokumen:** Rencana implementasi dan pengujian

## 1. Tujuan Dokumen dan Aturan SOT

Dokumen ini menjelaskan **bagaimana dan dalam urutan apa** Trisis Gym Member App direncanakan untuk dibangun, diuji, dan didemonstrasikan. Dokumen ini tidak menggantikan kebutuhan produk atau pedoman visual.

- `PRD.md` adalah sumber kebenaran untuk tujuan produk, scope, requirement, batas keamanan/privasi, dan acceptance criteria.
- `UI-GUIDELINE.md` adalah sumber kebenaran untuk design tokens, layout, navigasi, komponen, aksesibilitas, dan state UI.
- `IMPLEMENTATION_PLAN.md` adalah sumber kebenaran untuk urutan pengerjaan, usulan struktur proyek, strategi testing, pipeline ML, mitigasi risiko, dan Definition of Done.
- Ketiga dokumen utama berada di root repository agar mudah ditemukan oleh developer dan agent.
- Keputusan Phase 0 yang sudah disetujui tidak boleh diganti tanpa persetujuan eksplisit pemilik proyek.
- Rencana ini bukan izin untuk mulai coding. Implementasi aplikasi hanya dimulai setelah ketiga dokumen SOT disetujui, audit Phase 4 selesai, kontrak agent Phase 5 disetujui, dan pemilik proyek memberi persetujuan eksplisit untuk Phase 6.
- Fitur yang belum disetujui tidak boleh ditambahkan hanya karena mudah dibuat. Jika requirement, stack, atau scope perlu berubah, hentikan perubahan terkait dan ajukan revisi SOT untuk persetujuan.

## 2. Keputusan Proyek yang Menjadi Batas Tetap

| Area | Keputusan yang telah dikonfirmasi | Implikasi implementasi (Revisi Phase 6A) |
|---|---|---|
| Front-end | React + Vite + JavaScript | **Fokus Aktif Phase 6A:** Implementasikan seluruh UI, alur demo, dan interaktivitas. |
| Styling | Tailwind CSS | Petakan token UI ke konfigurasi/theme atau CSS variables terpusat; mobile-first. |
| Back-end | Node.js + Express | Ditunda ke Phase 6B; pada Phase 6A digantikan oleh layer mock data service di client. |
| Database | MySQL | Ditunda ke Phase 6B; pada Phase 6A persistensi demo dikelola via state/localStorage. |
| Target Android | Web lebih dahulu, kemudian wrapper Capacitor | Stabilkan alur web mobile-first sebelum integrasi Capacitor. |
| Admin gym | Di luar MVP | Tetap di luar MVP. |
| Autentikasi MVP | Akun demo | Pada Phase 6A disimulasikan melalui client mock auth state. |
| Workout split | Random Forest Classifier kandidat | Ditunda ke Phase 6C; pada Phase 6A menggunakan deterministic baseline & penanda DEMO. |
| Makronutrisi | Baseline transparan terlebih dahulu | Diimplementasikan langsung sebagai formula deterministik di front-end. |
| Dataset | Belum tersedia/terkonfirmasi | Menggunakan dummy/seed data sintetis yang realistis. |
| Bahasa UI | Bahasa Indonesia, sebagai asumsi awal di PRD | Teks, validasi, dan pesan kesalahan mengikuti bahasa ini. |

### 2.1 Batas MVP

Implementasikan alur member demo end-to-end: login/logout, dashboard, profil kebugaran, kartu member demo, check-in simulasi, riwayat, rekomendasi workout split dengan penanda metode, serta estimasi makro melalui baseline yang telah ditinjau. Tambahkan model ML nyata hanya jika gerbang dataset dan evaluasi terpenuhi.

Integrasi membership resmi, pembayaran, absensi QR produksi, panel admin, notifikasi kompleks, integrasi wearable, dan fitur lain yang tercatat sebagai non-goal pada `PRD.md` tetap di luar scope.

## 3. Prasyarat Sebelum Implementasi

Sebelum Phase 6 disetujui, pastikan hal-hal berikut telah siap atau diberi status terbuka secara eksplisit:

1. **SOT disetujui:** `PRD.md`, `UI-GUIDELINE.md`, dan dokumen ini memiliki status serta keputusan yang konsisten setelah audit Phase 4.
2. **Izin dan representasi brand:** penggunaan logo/aset Trisis Gym dan klaim afiliasi resmi belum diasumsikan. Gunakan aset pengganti yang tidak menyesatkan jika izin belum tersedia.
3. **Lingkungan lokal:** Node.js/npm, Python dan virtual environment untuk pipeline ML, MySQL Community, Git, serta browser modern tersedia pada mesin developer.
4. **Konfigurasi rahasia:** sediakan `.env.example` tanpa nilai rahasia; file `.env` nyata tidak boleh di-commit.
5. **Batas data:** gunakan seed data sintetis untuk demo. Data member nyata atau data penelitian tidak boleh diimpor sebelum sumber, izin, minimisasi, anonimisasi/pseudonimisasi, hak akses, dan masa simpan ditinjau.
6. **Metode makro:** tentukan dan catat metode baseline beserta rujukan yang dapat dipertanggungjawabkan, satuan, input yang benar-benar diperlukan, asumsi, pembulatan, dan disclaimer sebelum menghitung angka di aplikasi.
7. **Aturan check-in demo:** tetapkan aturan pencegahan duplikasi untuk demo sebelum menulis test dan migration; nyatakan dengan jelas bahwa aturan tersebut bukan kebijakan absensi resmi gym.
8. **Dataset/label ML:** belum wajib tersedia untuk membangun prototipe, tetapi wajib tersedia dan lolos tinjauan sebelum menyebut atau mengaktifkan model terlatih sebagai sumber rekomendasi.

Belum ada versi package, target deployment, penyedia hosting, atau target kinerja numerik yang dikunci. Pilih versi stabil yang kompatibel pada saat implementasi dan catat hasil uji setup; jangan menambahkan layanan berbayar sebagai asumsi.

## 4. Arsitektur Teknis yang Diusulkan

### 4.1 Gambaran komponen

```text
Browser Android / Browser desktop
              |
              v
React + Vite + Tailwind CSS
              |
        HTTP API (/api)
              |
              v
       Node.js + Express
         |           |
         v           v
       MySQL      Baseline dan aturan domain
                     |
                     | (hanya setelah model memenuhi syarat)
                     v
              Layanan inferensi Python
              scikit-learn / Random Forest

Pipeline penelitian Python dijalankan terpisah untuk persiapan data,
training, validasi, evaluasi, dan versioning model.
```

Layanan inferensi Python **bersyarat**, bukan prasyarat MVP demo. Selama model belum memenuhi gerbang kelayakan, Express menjalankan alur demo/baseline yang terdokumentasi dan aplikasi memberi label sesuai metode aktual. Pipeline pelatihan tidak dijalankan dari request pengguna.

### 4.2 Batas tanggung jawab

- **React:** tampilan dan interaksi, state form/UI, validasi ringan untuk pengalaman pengguna, panggilan API, serta rendering state loading/error/empty.
- **Express:** autentikasi, otorisasi, validasi server, aturan domain, penyimpanan data, check-in demo, riwayat, baseline, pemilihan jalur rekomendasi, dan pemeriksaan ketersediaan model.
- **MySQL:** sumber kebenaran data akun demo, profil, check-in demo, dan riwayat yang memang perlu disimpan.
- **Python/scikit-learn:** pipeline offline untuk data dictionary, preprocessing, pelatihan kandidat, evaluasi, dan serialisasi pipeline terpilih. Jika dan hanya jika model lulus gerbang, proses Python juga dapat menjadi layanan inferensi internal.
- **Capacitor:** wrapper Android yang menggunakan UI web yang sama. Kode native khusus tidak dibuat kecuali ada kebutuhan nyata yang terverifikasi.

### 4.3 Strategi autentikasi

Rekomendasi awal adalah sesi sisi server melalui cookie `HttpOnly`, `SameSite` yang sesuai, dan `Secure` pada HTTPS; sesi produksi tidak boleh mengandalkan in-memory store. Secret berasal dari environment. Endpoint perubahan data harus memiliki perlindungan yang sesuai dengan strategi cookie/sesi, termasuk pertimbangan CSRF dan CORS.

Sebelum integrasi Capacitor, buat spike kecil untuk memverifikasi origin aplikasi, pengiriman cookie, sesi, CORS, dan HTTPS pada perangkat/emulator. Jangan menyimpan password atau token autentikasi yang sensitif di `localStorage`. Jika mekanisme sesi tidak kompatibel atau memerlukan perubahan model autentikasi, dokumentasikan pilihan yang aman dan minta persetujuan sebelum mengubah rancangan.

### 4.4 Strategi deployment

Mulai dari lingkungan lokal. Dalam demo terintegrasi, pertimbangkan melayani hasil build front-end dan API dari origin yang sama melalui Express untuk mengurangi kompleksitas CORS dan sesi. Jangan memilih vendor hosting atau database terkelola sebelum kebutuhan, biaya, privasi, dan akses ditentukan.

## 5. Struktur Direktori yang Diusulkan

Struktur awal sengaja sederhana dan tidak memakai monorepo manager atau framework tambahan. Nama final boleh disesuaikan selama pemisahan tanggung jawab, SOT, dan aturan scope tetap dipertahankan.

```text
trisis-gym-member-app/
├── PRD.md
├── UI-GUIDELINE.md
├── IMPLEMENTATION_PLAN.md
├── AGENTS.md                    # baru dibuat pada Phase 5 setelah SOT disetujui
├── .gitignore
├── .env.example                 # nama variabel saja, tanpa secret
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── app/                 # entry, routing, provider
│       ├── components/          # komponen UI reusable yang diperlukan
│       ├── features/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── profile/
│       │   ├── member-card/
│       │   ├── check-in/
│       │   ├── recommendations/
│       │   └── activity/
│       ├── services/            # API client dan pemetaan error
│       ├── styles/              # token/theme global jika diperlukan
│       └── test/                # setup dan helper test UI
├── server/
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── middleware/          # auth, validasi, error handling
│   │   ├── routes/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── profile/
│   │   │   ├── dashboard/
│   │   │   ├── check-ins/
│   │   │   ├── recommendations/
│   │   │   └── activity/
│   │   ├── db/                  # koneksi, queries/repositories
│   │   └── services/            # baseline dan integrasi ML bersyarat
│   ├── db/
│   │   ├── migrations/
│   │   └── seeds/               # data sintetis khusus demo/test
│   └── test/
├── ml/
│   ├── requirements.txt
│   ├── src/
│   │   ├── validate_data.py
│   │   ├── preprocess.py
│   │   ├── train_workout_split.py
│   │   ├── evaluate_workout_split.py
│   │   ├── train_macro_regressor.py  # dijalankan hanya jika gerbang regresi terpenuhi
│   │   └── evaluate_macro_regressor.py
│   ├── tests/
│   ├── data/
│   │   ├── raw/                 # lokal; tidak di-commit
│   │   └── processed/           # lokal; tidak di-commit
│   └── artifacts/               # model/metrik lokal; atur kebijakan versioning
└── android/                      # proyek hasil integrasi Capacitor, setelah tahap web
```

Ketentuan struktur:

- Folder dan nama modul merupakan usulan awal, bukan alasan untuk membuat semua abstraksi sejak hari pertama. Mulai dari kebutuhan Must pada PRD.
- `data/raw`, `data/processed`, secret, database dump, log sensitif, dan file model yang mengandung atau bergantung pada data terbatas harus dikecualikan dari Git.
- Data sintetis untuk test tidak boleh diberi nama atau dokumentasi yang menyiratkan berasal dari member Trisis Gym nyata.
- Hindari membuat service, package, atau komponen bersama sebelum ada kebutuhan konkret.
- Jangan membuat file `AGENTS.md` sebelum Phase 5 yang memang ditetapkan untuk itu.

## 6. Tahapan Implementasi

Berdasarkan instruksi pemilik proyek pada 12 Oktober 2026, **Phase 6 resmi disetujui** dengan urutan pengerjaan bertahap:
- **Phase 6A (Fokus Aktif):** Frontend-First Prototype dengan Data Dummy (Milestone M0-F hingga M3-F). Membangun aplikasi web lengkap, interaktif, dan mobile-first dengan service mock data.
- **Phase 6B (Tahap Lanjutan):** Backend Server & Database Integration (Express + MySQL).
- **Phase 6C (Tahap Lanjutan):** Machine Learning Pipeline (Python scikit-learn) & Android Wrapper (Capacitor).

### Milestone M0-F — Scaffold Lingkungan Frontend
**Tujuan:** Inisialisasi proyek React + Vite + Tailwind CSS dan layer arsitektur client yang bersih.

Pekerjaan:
- Buat repository dan struktur minimum client/server/ml sesuai kebutuhan nyata.
- Catat versi runtime dan cara menjalankan setiap bagian.
- Siapkan `.gitignore` serta `.env.example`; verifikasi `.env` tidak terlacak Git.
- Buat koneksi MySQL lokal dan jalankan pemeriksaan koneksi sederhana.
- Pastikan client, server, dan pipeline Python dapat menjalankan perintah dasar tanpa membangun fitur produk.

**Exit criteria:** setup lokal dapat diulang dari instruksi yang tercatat; tidak ada secret dalam Git; koneksi MySQL berhasil.

### Milestone M1 — Fondasi UI dan navigasi

**Tujuan:** membentuk kerangka UI mobile-first sebelum menghubungkan semua data.

Pekerjaan:
- Pasang React, Vite, dan Tailwind CSS dengan konfigurasi yang kompatibel.
- Petakan token pada `UI-GUIDELINE.md` secara terpusat.
- Implementasikan shell halaman, header, bottom navigation empat tujuan, tombol, form field, status badge, empty/loading/error state yang dibutuhkan.
- Buat halaman kerangka login, dashboard, aktivitas, rekomendasi, dan profil menggunakan placeholder yang ditandai DEMO.
- Periksa viewport 320, 360, 390 px serta desktop; pastikan tidak ada horizontal overflow yang tidak perlu.

**Exit criteria:** semua rute/halaman MVP dapat dinavigasi di browser, token konsisten, dan tidak ada elemen placeholder yang menyerupai data resmi.

### Milestone M2 — Express, MySQL, autentikasi, dan otorisasi

**Tujuan:** menegakkan fondasi data serta keamanan sebelum fitur member tersambung.

Pekerjaan:
- Siapkan aplikasi Express, konfigurasi environment, routing, error handler, dan API health check.
- Buat migration tabel serta seed akun uji dengan hash kata sandi; seed hanya di lingkungan lokal/demo.
- Implementasikan login/logout, pembacaan sesi pengguna, route protection, dan mekanisme sesi yang ditinjau pada bagian 4.3.
- Buat validasi server dan pola error API konsisten.
- Pastikan setiap akses profil/riwayat mengambil `user_id` dari sesi terautentikasi; jangan menerima ID pemilik dari UI sebagai sumber otorisasi.
- Tambahkan pembatasan request dasar dan konfigurasi origin sesuai environment; jangan memaparkan stack trace atau rahasia ke klien.

**Exit criteria:** login/logout bekerja; endpoint terlindungi menolak request anonim; Member A tidak dapat membaca/mengubah data Member B; kata sandi tidak disimpan plaintext; migration dan seed dapat dijalankan ulang sesuai prosedur.

### Milestone M3 — Dashboard, profil, kartu demo, check-in, dan riwayat

**Tujuan:** menyelesaikan alur member utama dengan data backend.

Urutan pekerjaan:
1. Profil: baca/simpan field minimum, validasi front-end dan server, nilai tetap tampil sesudah reload.
2. Kartu member demo: ID non-sensitif yang diperlukan saja dan disclaimer jelas “DEMO — BUKAN KARTU KEANGGOTAAN RESMI”.
3. Check-in demo: server menetapkan waktu dan pemilik, menerapkan aturan duplikasi yang telah diputuskan, mengembalikan status yang jelas.
4. Riwayat: hanya data pengguna aktif, urutan terbaru ke terlama, tipe aktivitas dan label demo/metode.
5. Dashboard: merangkum profil dan check-in dari API tanpa membuat angka palsu yang tampak sebagai data nyata.
6. UI menangani loading, empty, success, error, sesi berakhir, dan kegagalan jaringan.

**Exit criteria:** acceptance criteria profil, dashboard, kartu, check-in, dan riwayat di `PRD.md` lulus; semua catatan kehadiran tetap jelas berstatus demo.

### Milestone M4 — Kontrak rekomendasi, baseline workout demo, dan baseline makro

**Tujuan:** menyiapkan fitur rekomendasi tanpa menggantungkan demo pada model ML yang belum tersedia.

Pekerjaan:
- Tetapkan kontrak output rekomendasi yang mencakup jenis, label metode (`DEMO`, `BASELINE`, atau model versi tertentu), timestamp, penjelasan, dan batasan yang relevan.
- Implementasikan baseline workout split deterministik yang sederhana dan didokumentasikan, atau konten DEMO statis yang tidak diklaim sebagai hasil personal jika dasar pemilihan kategori belum disetujui.
- Sebelum perhitungan makro dibuat, pilih dan tinjau metode baseline serta rujukannya. Dokumentasikan input yang dipakai, satuan, rentang validasi, asumsi, pembulatan, dan disclaimer. Jangan menambahkan field baru pada profil sebelum kebutuhan dan privasinya disetujui.
- Tempatkan logika baseline pada modul/service terpisah, bukan di komponen React atau handler yang mencampur semua logika.
- Simpan riwayat rekomendasi/estimasi hanya dengan input snapshot minimum yang dibutuhkan; jangan menyalin profil lengkap secara otomatis.
- Tampilkan status dan metode secara jelas serta konsisten dengan `UI-GUIDELINE.md`.

**Exit criteria:** hasil dapat ditelusuri ke baseline atau demo yang benar-benar dijalankan; input invalid tidak menghasilkan angka tebakan; tidak ada klaim ML; metode makro telah ditinjau sebelum dipakai.

### Milestone M5 — Gerbang data dan pipeline penelitian ML

**Tujuan:** mengetahui apakah penelitian mempunyai dasar data yang cukup untuk melatih dan menguji kandidat model.

#### M5-A: sumber, tata kelola, dan data dictionary

- Identifikasi sumber data legal: dataset publik dengan lisensi yang sesuai, dataset yang pemakaiannya mendapat izin, atau data yang dikumpulkan melalui prosedur yang disetujui.
- Jangan melakukan scraping, mengambil data pribadi member, atau memakai data operasional gym tanpa izin dan dasar penggunaan yang sesuai.
- Catat sumber, lisensi/izin, tujuan penggunaan, skema, unit analisis, definisi setiap fitur, definisi label/target, aturan missing values, dan batasan cakupan.
- Hapus identifier langsung yang tidak diperlukan; pseudonimkan identifier bila perlu; pisahkan tabel penghubung dengan akses terbatas. Anonimisasi harus dipilih berdasarkan risiko re-identifikasi, bukan sekadar menghapus nama.
- Evaluasi apakah profil input yang direncanakan memang tersedia pada dataset. Jangan mengisi atribut yang hilang dengan asumsi pribadi atau data yang dikarang.

#### M5-B: workout split — kandidat Random Forest Classifier

- Tetapkan kategori label sebelum training dan dokumentasikan dasar pelabelan. Idealnya label ditinjau pelatih yang kompeten atau berasal dari sumber berizin dengan definisi yang jelas.
- Periksa jumlah data per kelas, ketidakseimbangan, nilai hilang, duplikasi, label yang ambigu, dan apakah sampel benar-benar mewakili tujuan penggunaan.
- Bandingkan kandidat dengan baseline yang relevan, misalnya aturan sederhana yang telah ditetapkan atau prediksi kelas mayoritas jika sesuai.
- Pisahkan data train/evaluasi tanpa kebocoran. Jika terdapat beberapa baris per orang atau sumber, lakukan pembagian yang mempertimbangkan kelompok tersebut. Semua preprocessing dan seleksi fitur harus dipelajari hanya dari fold train.
- Gunakan stratified cross-validation jika jumlah serta distribusi kelas memungkinkan. Jika volume data tidak memadai, dokumentasikan keterbatasan dan jangan menyimpulkan generalisasi yang tidak didukung.
- Laporkan distribusi kelas, precision, recall, F1-score, confusion matrix, baseline pembanding, variasi antar-fold, dan keterbatasan. Tetapkan kriteria kelayakan sebelum meninjau hasil final; jangan memilih ambang setelah melihat test set.

#### M5-C: target makro — kandidat Random Forest Regressor

- Tetapkan target numerik dan sumber nilai rujukan terlebih dahulu. Target harus mempunyai definisi serta dasar yang dapat dipertanggungjawabkan; sekadar menyalin output rumus tidak otomatis membuktikan manfaat regresi.
- Konfirmasi kecukupan data, rentang target, cakupan profil, kualitas label, nilai ekstrem, missing values, dan kemungkinan target leakage.
- Bandingkan dengan baseline yang masuk akal dan gunakan protokol validasi yang mencegah leakage.
- Hitung MAE dan RMSE pada data evaluasi yang tidak dipakai untuk training/tuning; jelaskan satuan dan distribusi error. Pertimbangkan evaluasi per rentang/kelompok jika jumlah data mendukung, tanpa mengklaim keamanan klinis.
- Regressor tidak menjadi kewajiban integrasi jika datanya tidak layak. Dalam keadaan itu, gunakan baseline transparan sebagai hasil aplikasi dan jelaskan bahwa jalur ML tidak diaktifkan.

**Exit criteria M5:** laporan sumber dan izin data, data dictionary, preprocessing reproducible, baseline pembanding, konfigurasi eksperimen, hasil evaluasi, keterbatasan, serta keputusan lanjut/tidak lanjut terdokumentasi. Jika salah satu gerbang data/label tidak terpenuhi, tandai model sebagai belum tersedia dan jangan lanjut mengintegrasikannya sebagai prediksi.

### Milestone M6 — Integrasi model bersyarat

**Hanya dikerjakan jika M5 menyatakan kandidat model layak dan pemilik proyek menyetujui aktivasi model pada aplikasi.**

Pekerjaan:
- Versikan artefak model dan metadata minimal: jenis model, versi pipeline, fitur/urutan input, tanggal eksperimen, dataset referensi yang sah, konfigurasi, metrik evaluasi, serta batasan.
- Pilih cara penyajian inferensi yang paling sederhana dan dapat dirawat. Kandidat awal adalah service Python internal ringan yang memuat pipeline scikit-learn; service ini tidak wajib dipasang jika model belum layak atau waktu proyek tidak mendukung.
- Express tetap menjadi gerbang autentikasi, otorisasi, validasi profil, dan pencatatan riwayat. Jangan biarkan browser memanggil service ML internal secara langsung atau mempercayai output request dari klien.
- Validasi tipe, range, urutan fitur, missing values, versi model, timeout, dan kegagalan service. Sediakan fallback DEMO/baseline yang dilabeli jujur, bukan prediksi acak.
- Simpan metode dan versi model bersama riwayat agar hasil lama dapat dibedakan dari model baru. Jangan mencatat data pribadi ke log inferensi tanpa kebutuhan.
- Uji konsistensi prediksi service terhadap pipeline evaluasi offline dengan kasus tetap yang aman untuk dibagikan.

**Exit criteria:** hanya model yang lulus gerbang dipanggil dalam jalur ML; output mempunyai metadata metode/versi; kesalahan atau model tidak tersedia ditangani secara jujur; hasil integrasi tidak diklaim melampaui bukti evaluasi.

### Milestone M7 — Wrapper Android dengan Capacitor

**Tujuan:** menguji web app yang sudah stabil dalam kemasan Android, tanpa menulis ulang UI secara native.

Pekerjaan:
- Pasang Capacitor dan integrasikan build web sesuai dokumentasi versi stabil yang dipilih pada saat implementasi.
- Verifikasi konfigurasi URL API untuk build Android; jangan memakai URL localhost developer sebagai endpoint produksi perangkat.
- Periksa sesi/cookie, CORS, HTTPS, safe area, keyboard virtual, back navigation, scrolling, ukuran layar, dan error saat jaringan tidak tersedia.
- Build debug APK dan jalankan pada emulator atau perangkat Android jika toolchain tersedia.
- Jangan menambah plugin native tambahan kecuali ada kebutuhan MVP yang jelas dan disetujui.

**Exit criteria:** alur login, dashboard, profil, check-in demo, rekomendasi, serta riwayat dapat digunakan pada Android target; tidak ada rahasia di bundle; batasan platform yang tersisa didokumentasikan. Jika build gagal karena lingkungan, catat error dan blocker yang dapat direproduksi tanpa mengklaim APK berhasil.

### Milestone M8 — QA, perbaikan, dan paket demo

**Tujuan:** membuktikan alur end-to-end sesuai SOT dan menyiapkan demonstrasi akademik.

Pekerjaan:
- Jalankan test client, server, database, baseline, dan ML (jika memang aktif).
- Selesaikan regression testing setelah perubahan.
- Periksa seluruh layar menurut checklist `UI-GUIDELINE.md`.
- Audit source code/config untuk secret, log sensitif, endpoint tanpa auth, data silang antar-member, serta seed demo yang aktif di lingkungan yang tidak sesuai.
- Siapkan skenario demo dengan akun sintetis dan reset database yang dapat diulang.
- Siapkan ringkasan keterbatasan: izin owner, sumber data, metode baseline, status model, hasil evaluasi yang benar-benar didapat, status Android build, dan hal yang belum dibuat.

**Exit criteria:** semua acceptance criteria Must pada `PRD.md` lulus atau pengecualian/blocker ditulis secara eksplisit dan disetujui; tidak ada klaim palsu mengenai sistem resmi atau model; aplikasi siap untuk didemonstrasikan pada lingkungan yang diuji.

## 7. Dependensi Antar-Milestone

```text
M0 Setup
  -> M1 Fondasi UI
  -> M2 API + Database + Auth
  -> M3 Fitur member utama
  -> M4 Baseline + kontrak rekomendasi
  -> M5 Gerbang data + evaluasi ML
       |                         |
       | model tidak layak       | model layak + disetujui
       v                         v
    tetap baseline             M6 integrasi model bersyarat
       \                         /
        -> M7 Capacitor Android <-
                  -> M8 QA dan demo
```

Catatan: desain shell UI dapat dikerjakan dengan placeholder sebelum API tersedia, tetapi fitur tidak boleh dianggap selesai hanya berdasarkan data statis. Gerbang ML dapat berakhir dengan keputusan sah “tidak cukup bukti untuk mengaktifkan model”; baseline aplikasi tetap berjalan sesuai PRD.

## 8. Rencana Database dan API

### 8.1 Entitas logis minimum

Skema final ditetapkan melalui migration saat implementasi; daftar ini adalah rancangan awal, bukan skema yang telah dibuat.

| Entitas | Field/aturan inti | Batas akses |
|---|---|---|
| `users` | ID internal, login identifier unik, `password_hash`, timestamp | Credential tidak pernah dikirim dalam response profil. |
| `member_profiles` | FK pengguna, nama tampilan, tujuan, pengalaman, hari/minggu, tinggi cm, berat kg, waktu pembaruan | Pengguna hanya dapat membaca/mengubah profil sendiri. |
| `check_ins` | ID, user FK, waktu yang ditetapkan server, status demo | Seluruh record MVP berstatus simulasi; aturan anti-duplikasi ditentukan sebelum coding. |
| `recommendation_history` | ID, user FK, tipe hasil, input snapshot minimum, output, method label, versi rule/model, timestamp | Hindari menyimpan atribut berlebih; hanya pemilik dapat membaca riwayatnya. |
| `sessions` / session store | Data sesi sesuai library dan kebijakan yang dipilih | Session secret tidak menjadi bagian tabel aplikasi umum atau respons API. |

Gunakan foreign key, unique constraint, index untuk kolom pencarian yang benar-benar digunakan, timestamp konsisten (penyimpanan UTC direkomendasikan), dan migration yang dapat dijalankan pada database kosong. Jangan melakukan hard delete/cascade yang dapat menghapus data terkait secara tak terduga sebelum kebijakan retensi ditetapkan.

### 8.2 Peta API awal

Prefix `/api`; semua endpoint member selain login/health memerlukan autentikasi yang sesuai.

| Endpoint awal | Tujuan | Catatan keamanan/perilaku |
|---|---|---|
| `GET /api/health` | Pemeriksaan server | Tidak mengembalikan konfigurasi atau secret. |
| `POST /api/auth/login` | Memulai sesi demo | Pesan gagal tidak mengungkap apakah identifier terdaftar. |
| `POST /api/auth/logout` | Mengakhiri sesi | Invalidate sesi di server. |
| `GET /api/auth/me` | Identitas sesi saat ini | Jangan mengembalikan hash password atau data sensitif. |
| `GET /api/member/dashboard` | Ringkasan dashboard | Data diturunkan dari sesi aktif. |
| `GET /api/member/profile` | Membaca profil | Tidak menerima user ID arbitrer sebagai otorisasi. |
| `PUT /api/member/profile` | Mengubah field yang diizinkan | Validasi server, allowlist field, dan unit eksplisit. |
| `GET /api/member/card` | Kartu identitas demo | Selalu menyertakan status demo yang jelas. |
| `POST /api/member/check-ins` | Membuat check-in simulasi | Server menetapkan pemilik/waktu serta memeriksa duplikasi. |
| `GET /api/member/check-ins` | Membaca riwayat check-in | Hanya record member aktif. |
| `POST /api/recommendations/workout-split` | Mendapatkan workout split | Response menyertakan method/status dan batasan. |
| `POST /api/recommendations/macros` | Menghitung baseline makro | Input minimum; method baseline dan satuan harus jelas. |
| `GET /api/member/activity` | Membaca gabungan aktivitas | Hanya riwayat member aktif, urutan jelas. |

Nama dan bentuk route dapat diselaraskan saat implementasi untuk menghindari duplikasi; penambahan route tidak boleh memperluas scope. Endpoint admin tidak dibuat. Semua error response harus konsisten dan tidak mengekspos SQL, stack trace, session ID, atau secret.

## 9. Strategi Testing dan Acceptance Criteria

### 9.1 Lapisan pengujian

| Lapisan | Fokus | Strategi minimum |
|---|---|---|
| Unit — frontend | Formatter, validasi form, pemetaan state, komponen reusable | Vitest dan React Testing Library untuk logika/komponen yang memang memiliki perilaku. |
| Unit — backend | Validasi, aturan check-in, baseline, pembentukan response | Gunakan test runner Node yang sesuai dan fixture deterministik. |
| API/integrasi | Auth, session, database, ownership data, validasi request | Test route Express dengan database test terpisah dan data seed sintetis; Supertest dapat digunakan bila dibutuhkan. |
| Database | Migration, foreign key, unique/index, pemulihan seed | Mulai dari database kosong dan ulangi migration pada lingkungan test. |
| ML pipeline | Skema data, preprocessing, split, reproducibility, metrik, model serialization | Gunakan fixture sintetis hanya untuk menguji pipeline, bukan mengklaim performa ilmiah. |
| UI/manual | Layout, navigasi, aksesibilitas, loading/error, keyboard virtual | Checklist pada browser desktop dan viewport/perangkat Android yang tersedia. |
| End-to-end | Alur utama dari login sampai riwayat | Minimal satu skenario demo yang dapat diulang; otomasi browser dapat ditambahkan jika waktu dan manfaatnya sepadan. |

Tool pengujian di atas adalah rekomendasi ringan. Jangan menambahkan beberapa framework yang menumpuk fungsi sama. Pilih versi yang kompatibel pada saat implementasi dan dokumentasikan perintah test aktual.

### 9.2 Traceability requirement ke test

| Area PRD | Test wajib |
|---|---|
| `FR-AUTH-*`, `AC-01`, `AC-02` | Login valid/gagal, logout, sesi kedaluwarsa, request anonim ditolak. |
| `FR-AUTH-03`, `AC-03` | Uji akses horizontal: Member A mencoba membaca dan mengubah profil/riwayat Member B. Harus ditolak. |
| `FR-PROF-*`, `AC-05` | Input valid/invalid, simpan, reload, field tak diizinkan, pemilik data benar. |
| `FR-CARD-*`, `AC-06` | Disclaimer demo tampil pada ukuran layar kecil dan tidak menyiratkan status resmi. |
| `FR-CHECK-*`, `AC-07`, `AC-08` | Check-in sukses, duplikasi, waktu server, kesalahan API, serta tidak ada success palsu. |
| `FR-WORK-*`, `AC-09`, `AC-10` | Model tersedia/tidak tersedia, label metode tepat, output sesuai metode, fallback deterministik. |
| `FR-MACRO-*`, `AC-11`, `AC-12` | Kalkulasi kasus valid, input hilang/tidak valid, satuan, metode, pembulatan, disclaimer. |
| `FR-HIST-*`, `AC-13` | Riwayat kosong/terisi, urutan tanggal, label tipe, isolasi data antar-member. |
| `NFR-UX-*`, `NFR-A11Y-*`, `AC-14`, `AC-15` | Viewport 320/360/390 px, keyboard, focus-visible, kontras, loading/empty/error. |
| `NFR-SEC-*`, `AC-16` | Secret scan/manual review, hashing, session config, authorization, error response, log. |
| `AC-17` | Review manual naskah demo, label UI, presentasi, dan laporan penelitian terhadap klaim yang dapat dibuktikan. |

### 9.3 Kriteria rilis demo

- Semua acceptance criteria Must pada `PRD.md` diuji dan hasilnya dicatat.
- Tidak ada bug terbuka yang memungkinkan akses data silang, penyimpanan kata sandi plaintext, kebocoran secret, atau klaim hasil palsu.
- Alur utama berhasil dijalankan dengan akun dan data sintetis.
- UI lolos checklist relevan di `UI-GUIDELINE.md` pada viewport target yang tersedia.
- Jika ML belum lulus, aplikasi secara konsisten menampilkan DEMO/baseline dan laporan menyatakan model belum diaktifkan.
- Jika wrapper Android belum dapat dibangun, hambatan teknis disebut spesifik; build tidak boleh diklaim berhasil tanpa artefak dan pengujian nyata.

## 10. Risiko Teknis dan Mitigasi

| ID | Risiko | Mitigasi/rencana respons |
|---|---|---|
| TR-01 | Scope terlalu besar untuk satu developer | Utamakan alur Must dan milestone berurutan; admin/integrasi kompleks tetap keluar dari MVP. |
| TR-02 | Dataset kecil, tidak seimbang, tidak relevan, atau tidak berizin | Gerbang data sebelum training; gunakan baseline/DEMO bila tidak layak; jangan mengarang metrik. |
| TR-03 | Label workout split tidak konsisten | Tetapkan definisi dan proses label sebelum training; minta tinjauan pelatih bila rekomendasi nyata akan ditampilkan. |
| TR-04 | Target makro tidak memiliki ground truth yang sahih | Tinjau metode baseline; jalankan Regressor hanya jika target dan protokol evaluasinya dapat dibenarkan. |
| TR-05 | Kebocoran data antar-member | Turunkan owner dari sesi server; tambahkan integration test untuk akses lintas akun. |
| TR-06 | Rahasia atau data pribadi ikut ter-commit | `.gitignore`, `.env.example`, seed sintetis, review Git, log minimization, dan pemeriksaan sebelum ZIP/demo. |
| TR-07 | Sesi web tidak berperilaku sama di Capacitor | Lakukan spike auth/cookie/CORS sebelum integrasi wrapper lengkap; jangan menyimpan secret di localStorage. |
| TR-08 | Setup MySQL/Python menjadi hambatan pemula | Dokumentasikan langkah setup kecil dan jalankan setiap milestone sebelum menambah fitur berikutnya. |
| TR-09 | Baseline/hasil demo disalahartikan sebagai rekomendasi ahli | Label metode pada layar hasil, penjelasan yang jelas, dan tinjauan pakar sebelum penggunaan nyata. |
| TR-10 | Formula makro dianggap nasihat medis | Gunakan rujukan yang disetujui, tampilkan input/asumsi/batasan, dan sertakan disclaimer. |
| TR-11 | Perubahan framework/versi mengganggu setup | Pin versi yang diuji melalui lockfile dan catat perintah setup; perubahan dependency ditinjau, bukan diperbarui serampangan. |
| TR-12 | Dokumen SOT drift dari implementasi | Setiap perubahan requirement memerlukan pembaruan SOT yang disetujui; gunakan traceability test dan audit konsistensi. |

## 11. Open Decisions sebelum milestone terkait

| ID | Keputusan terbuka | Harus selesai sebelum |
|---|---|---|
| OD-01 | Izin penggunaan nama/logo/aset dan klaim afiliasi Trisis Gym | Publikasi atau demo eksternal yang memakai identitas resmi |
| OD-02 | Formula baseline makronutrisi dan rujukan yang dipakai | M4 implementasi kalkulasi makro |
| OD-03 | Input tambahan untuk metode makro, bila memang diperlukan | Menambah field pada profil atau form rekomendasi |
| OD-04 | Aturan anti-duplikasi check-in demo dan timezone tampilan | M3 migration dan test check-in |
| OD-05 | Sumber dataset, izin/lisensi, data dictionary, label, dan target | M5 training/evaluasi ML |
| OD-06 | Kriteria kelayakan model yang ditetapkan sebelum evaluasi final | M5 keputusan model dan sebelum klaim penggunaan |
| OD-07 | Cara deployment, domain/origin API, dan konfigurasi HTTPS | Sebelum demo online atau build wrapper terhubung backend |
| OD-08 | Ketersediaan Android Studio/emulator/perangkat serta kewajiban APK akademik | M7 Capacitor |
| OD-09 | Kebijakan retensi/penghapusan data dan ekspor artefak penelitian | Sebelum data nyata dikumpulkan atau digunakan |

Jika keputusan membutuhkan perubahan scope atau field baru, hentikan bagian tersebut dan minta persetujuan. Data demo dapat digunakan untuk mengembangkan UI selama tidak menyaru sebagai data nyata.

## 12. Definition of Done per Milestone

| Milestone | Definition of Done |
|---|---|
| M0 — Setup | Setup lokal dapat diulang; client/server/Python berjalan; koneksi MySQL berhasil; secret terabaikan Git. |
| M1 — Fondasi UI | Rute MVP tersedia; token UI konsisten; navigasi bekerja; viewport 320/360/390 px ditinjau. |
| M2 — Auth/API/DB | Migration dan seed berjalan; autentikasi/session diuji; request anonim ditolak; pengujian akses antar-member lulus. |
| M3 — Fitur member | Profil persisten; kartu/check-in berlabel demo; riwayat terisolasi per member; empty/loading/error ditangani. |
| M4 — Baseline | Metode makro ditinjau sebelum implementasi; baseline/demo deterministik; label dan alasan metode terlihat; input invalid ditangani. |
| M5 — Pipeline ML | Sumber/izin serta data dictionary dicatat; eksperimen reproducible; metrik dibanding baseline; keputusan layak/tidak layak terdokumentasi. |
| M6 — Integrasi ML bersyarat | Model yang memenuhi syarat saja terhubung; versi/metode terlihat; timeout/error/fallback diuji; tidak ada klaim di luar evaluasi. |
| M7 — Capacitor | Build debug Android dibuat dan diuji pada emulator/perangkat bila environment tersedia; sesi, layout, keyboard, dan navigasi diperiksa. |
| M8 — QA/demo | Test yang disyaratkan berjalan; acceptance criteria dan UI checklist ditinjau; akun/data sintetis dapat di-reset; keterbatasan dijelaskan. |

Milestone M6 boleh ditandai **Not applicable — model belum memenuhi gerbang** tanpa menghambat demo berbasis baseline, sepanjang keputusan dan keterbatasannya tercatat. Kriteria DoD tidak membenarkan model dianggap valid hanya karena sebuah script training berhasil berjalan.

## 13. Aturan Kolaborasi Developer/Agent

- Sebelum coding, baca `AGENTS.md` bila sudah dibuat, lalu baca ketiga dokumen SOT terbaru. Jika belum ada izin Phase 6, hanya boleh melakukan discovery atau pekerjaan dokumentasi yang secara eksplisit diminta.
- Kerjakan satu milestone dalam satu waktu. Laporkan file yang diubah, test yang dijalankan, hasilnya, keterbatasan, dan keputusan yang dibutuhkan.
- Jangan mengubah scope, stack, data yang dikumpulkan, metode baseline, strategi autentikasi, atau strategi ML yang sudah disetujui secara sepihak.
- Jangan menghasilkan data pribadi atau hasil model palsu untuk membuat demo terlihat lengkap. Seed harus sintetis dan jelas ditandai.
- Jangan menambahkan framework/library/layanan baru tanpa alasan fungsional dan persetujuan jika dampaknya mengubah keputusan SOT.
- Jangan mengklaim test, integrasi, APK, izin, training, metrik, atau deployment berhasil sebelum benar-benar dijalankan dan diverifikasi.
- Jika implementasi menemukan konflik dengan SOT, hentikan perubahan terkait dan minta persetujuan revisi; jangan memperbaiki konflik dengan mengubah dokumen secara diam-diam.
- Persetujuan satu milestone bukan persetujuan untuk semua milestone setelahnya bila pemilik proyek meminta approval terpisah.

## 14. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1 | 12 Oktober 2026 | Draft pertama tahapan implementasi, arsitektur, struktur direktori, testing, pipeline ML bersyarat, risiko, dan DoD berdasarkan keputusan Phase 0 serta PRD/UI Guideline. | Draft awal |
| 1.0 | 12 Oktober 2026 | Persetujuan Phase 3 tercatat; audit Phase 4 menyelaraskan status metadata dan gerbang fase tanpa mengubah scope atau stack yang disetujui. | Disetujui pengguna |

---

**Status persetujuan:** IMPLEMENTATION_PLAN.md telah disetujui pada Phase 3 dan diaudit pada Phase 4. Dokumen ini merencanakan urutan kerja, tetapi bukan izin untuk memulai implementasi. `AGENTS.md` dan prompt execution awal hanya dibuat pada Phase 5 setelah persetujuan eksplisit; kode aplikasi hanya boleh dimulai pada Phase 6 setelah persetujuan eksplisit terpisah. Perubahan terhadap SOT tetap mengikuti aturan persetujuan proyek.
