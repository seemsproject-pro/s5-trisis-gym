# PRD — Trisis Gym Member App

> **Status:** Disetujui — Phase 1; audit konsistensi Phase 4 selesai; revisi Phase 6A disetujui  
> **Versi:** 1.1  
> **Tanggal:** 12 Oktober 2026  
> **Pemilik dokumen:** Proyek akademik individu, mahasiswa Informatika semester 4  
> **Jenis dokumen:** Product Requirements Document (PRD)

## 1. Tujuan Dokumen dan Aturan SOT

Dokumen ini menetapkan kebutuhan produk, batas scope, aktor, alur pengguna, serta kriteria penerimaan Trisis Gym Member App. Dokumen ini adalah sumber kebenaran untuk **apa** yang perlu dibangun.

- Detail visual dan perilaku komponen mengacu pada `UI-GUIDELINE.md`.
- Urutan kerja, struktur implementasi, strategi testing, dan pipeline ML mengacu pada `IMPLEMENTATION_PLAN.md`.
- Ketiga dokumen telah disusun dan diaudit konsistensinya pada Phase 4; persetujuan dokumen tidak otomatis memberi izin untuk memulai implementasi.
- Perubahan terhadap requirement yang telah disetujui harus dicatat dan disetujui sebelum diterapkan.
- Pernyataan bertanda **Asumsi** belum dikonfirmasi kepada pemilik Trisis Gym atau pihak lain yang berwenang.
- Data, akun, identitas keanggotaan, check-in, model, dan hasil prediksi demo tidak boleh ditampilkan seolah-olah berasal dari sistem resmi atau model teruji.

## 2. Ringkasan Produk

**Trisis Gym Member App** adalah aplikasi pendamping member gym berbasis web, dengan desain mobile-first untuk penggunaan utama melalui Android. Aplikasi menggabungkan ringkasan akun, profil kebugaran, kartu member digital demo, simulasi check-in, riwayat aktivitas, rekomendasi workout split, dan estimasi target makronutrisi.

Proyek ini juga mendukung penelitian berjudul:

> *Penerapan Algoritma Random Forest untuk Rekomendasi Program Latihan (Workout Split) dan Target Makronutrisi Berdasarkan Profil Kebugaran Berbasis Web.*

Judul penelitian tersebut merupakan konteks akademik, bukan bukti bahwa model sudah tersedia atau valid. Dataset belum terkonfirmasi. Random Forest untuk klasifikasi workout split menjadi kandidat utama; Random Forest Regressor untuk target makronutrisi hanya dipertimbangkan jika tersedia label numerik berkualitas dan dasar metodologis yang memadai. Sampai syarat tersebut dipenuhi, fitur harus menggunakan hasil DEMO atau baseline transparan sesuai penandanya.

### 2.1 Keputusan awal yang telah dikonfirmasi

| Area | Keputusan Phase 0 | Penyesuaian Tahap Phase 6A (12 Okt 2026) |
|---|---|---|
| Front-end | React + Vite, JavaScript | **Fokus Utama Saat Ini** (Frontend-first prototype) |
| Styling | Tailwind CSS | Diimplementasikan langsung pada web app |
| Back-end | Node.js + Express | Ditunda ke Phase 6B; saat ini menggunakan client mock data service |
| Database | MySQL | Ditunda ke Phase 6B; saat ini menggunakan browser persistence/mock store |
| Android | Web lebih dahulu, kemudian disiapkan sebagai wrapper dengan Capacitor jika layak dalam batas waktu | Web mobile-first responsif diuji terlebih dahulu |
| ML | Random Forest bersyarat pada kelayakan dataset dan evaluasi | Ditunda ke Phase 6C; saat ini menggunakan deterministic baseline & demo |
| Dataset | Belum tersedia/terkonfirmasi | Tetap menggunakan mock/seed data sintetis |
| Admin gym | Di luar MVP awal | Tetap di luar MVP |
| Autentikasi MVP | Login demo yang ditangani backend, tidak memakai akun resmi gym | Login demo disimulasikan via mock service / state lokal pada Phase 6A |
| Makronutrisi | Baseline transparan; evaluasi Regressor terpisah dan bersyarat | Formula baseline transparan di client |
| Bahasa UI | Bahasa Indonesia (**asumsi awal**) | Bahasa Indonesia pada seluruh UI |

### 2.3 Revisi Alur Eksekusi: Phase 6A Frontend-First dengan Data Dummy

Berdasarkan instruksi pemilik proyek pada 12 Oktober 2026, implementasi aplikasi dipecah menjadi dua tahap:
1. **Phase 6A (Aktif):** Pembangunan prototipe antarmuka frontend lengkap (React + Vite + Tailwind CSS) menggunakan data dummy/mock yang interaktif, mencakup login demo, dashboard member, profil kebugaran, kartu member demo, simulasi check-in, rekomendasi split & estimasi makro baseline, dan riwayat aktivitas dengan persistensi browser.
2. **Phase 6B (Tahap Lanjutan):** Pembangunan server Express, skema database MySQL, migrasi data, dan penggantian mock service menjadi pemanggilan REST API riil.

### 2.2 Ringkasan nilai produk

- Member mendapat satu tempat untuk melihat profil, status keanggotaan demo, kehadiran, dan rekomendasi kebugaran.
- Pengalaman utama dirancang nyaman pada layar Android dan tetap dapat digunakan melalui browser desktop.
- Fondasi teknis memisahkan UI, API, penyimpanan data, dan pipeline pelatihan ML.
- Hasil yang belum terverifikasi selalu memiliki label dan penjelasan yang jujur.

## 3. Latar Belakang dan Masalah Pengguna

Informasi keanggotaan, aktivitas kunjungan, dan arahan latihan berpotensi tersebar di beberapa media atau disampaikan secara manual. Aplikasi pendamping dapat menyatukan pengalaman tersebut dalam antarmuka yang mudah diakses.

Namun, kondisi operasional Trisis Gym belum dikonfirmasi. PRD ini **tidak mengasumsikan** bahwa gym sudah memiliki sistem keanggotaan digital, mekanisme QR, API, dataset, atau izin penggunaan data. Nilai awal aplikasi adalah prototipe akademik yang dapat diuji menggunakan data demo dan dikembangkan lebih lanjut setelah ada persetujuan terkait.

### 3.1 Masalah yang ingin diselesaikan

1. Member memerlukan ringkasan profil dan informasi aktivitas yang mudah ditemukan dari ponsel.
2. Member memerlukan representasi kartu keanggotaan digital yang jelas statusnya dan tidak menimbulkan kesan sebagai kartu resmi ketika hanya demo.
3. Alur check-in dan riwayat kehadiran perlu dapat didemonstrasikan, sambil memisahkan simulasi dari verifikasi operasional.
4. Member membutuhkan gambaran awal program latihan yang dapat dijelaskan berdasarkan profil kebugarannya.
5. Estimasi makronutrisi perlu menunjukkan metode, input, asumsi, dan keterbatasan—bukan hanya memberikan angka tanpa penjelasan.
6. Penelitian membutuhkan rancangan data serta evaluasi yang dapat diuji, bukan klaim performa model tanpa eksperimen.

## 4. Tujuan, Indikator Keberhasilan, dan Non-Goals

### 4.1 Tujuan MVP

- Menyediakan alur demo member end-to-end yang mencakup login, dashboard, profil, kartu demo, check-in simulasi, rekomendasi, estimasi makro, dan riwayat.
- Menyimpan data aplikasi melalui backend dan database, dengan validasi serta otorisasi di server.
- Memisahkan data demo, baseline, dan hasil ML terlatih agar statusnya terlihat jelas.
- Menyiapkan arsitektur yang dapat diuji dan dikembangkan oleh satu developer pemula.
- Menetapkan kondisi minimum untuk pengumpulan data yang sah dan evaluasi model.

### 4.2 Indikator keberhasilan demo

| ID | Indikator |
|---|---|
| KPI-01 | Pengguna demo dapat login dan logout tanpa mengakses data milik akun lain. |
| KPI-02 | Alur utama dashboard → profil/rekomendasi → riwayat dapat diselesaikan pada viewport ponsel. |
| KPI-03 | Perubahan profil tervalidasi dan tampil konsisten setelah dimuat ulang. |
| KPI-04 | Check-in demo menghasilkan entri riwayat yang konsisten dan mencegah duplikasi sesuai aturan aplikasi. |
| KPI-05 | Rekomendasi selalu diberi label metode yang benar: DEMO, baseline, atau model terlatih tervalidasi. |
| KPI-06 | Estimasi makro memperlihatkan input utama, metode, dan batasan yang digunakan. |
| KPI-07 | Tidak ada klaim model terlatih, status membership resmi, atau integrasi gym yang belum dibuktikan. |
| KPI-08 | Jalur pengujian utama dan pemeriksaan keamanan dasar lulus sebelum demonstrasi. |

Target numerik kinerja atau kualitas ML belum ditentukan karena kapasitas perangkat, dataset, dan baseline belum diketahui. Target tersebut harus ditetapkan berdasarkan pengujian, bukan dikarang di PRD.

### 4.3 Non-goals (di luar scope MVP)

- Pengelolaan admin gym lengkap atau dashboard staf.
- Sinkronisasi dengan sistem membership/POS/CRM atau API internal Trisis Gym yang belum dikonfirmasi.
- Status keanggotaan aktif resmi, pembayaran, perpanjangan membership, dan penagihan.
- Validasi QR produksi atau perangkat pemindai yang dianggap sah tanpa desain serta izin owner.
- Chat dengan pelatih, feed sosial, leaderboard, gamifikasi kompleks, push notification, dan wearable integration.
- Diagnosis medis, rekomendasi terapi, resep diet klinis, atau pengganti pelatih/ahli gizi/tenaga kesehatan.
- Mengklaim bahwa Random Forest sudah dilatih, akurat, atau layak digunakan tanpa dataset dan evaluasi yang terdokumentasi.
- Native Android UI yang ditulis ulang dari nol sebelum web MVP stabil.

## 5. Target Pengguna dan User Stories

### 5.1 Aktor MVP

| Aktor | Deskripsi | Hak akses awal |
|---|---|---|
| Member demo | Pengguna utama yang mengakses profil dan fitur kebugaran miliknya. | Membaca/mengubah profil terbatas, melakukan check-in demo, melihat riwayat sendiri dan rekomendasi. |
| Developer/penguji | Menjalankan demonstrasi, pengujian, dan verifikasi fungsional. | Akses melalui akun uji yang disediakan secara aman; bukan peran admin gym dalam produk. |
| Admin gym | Peran operasional yang mungkin relevan di masa depan. | Tidak disediakan pada MVP; memerlukan persetujuan scope dan model otorisasi terpisah. |

**Asumsi:** demo dapat dimulai dengan akun uji yang dipersiapkan developer. Registrasi publik dan verifikasi identitas member asli tidak diperlukan untuk MVP awal.

### 5.2 User stories prioritas

| ID | User story | Prioritas |
|---|---|---|
| US-01 | Sebagai member demo, saya ingin login dan logout supaya fitur pribadi hanya dapat diakses melalui sesi saya. | Must |
| US-02 | Sebagai member, saya ingin melihat ringkasan profil, status membership demo, kehadiran, dan pintasan supaya mengetahui kondisi akun saya dengan cepat. | Must |
| US-03 | Sebagai member, saya ingin melihat dan memperbarui informasi kebugaran yang diperlukan supaya rekomendasi dapat menggunakan profil terbaru. | Must |
| US-04 | Sebagai member, saya ingin melihat kartu member digital demo tanpa salah mengartikannya sebagai bukti membership resmi. | Must |
| US-05 | Sebagai member, saya ingin melakukan check-in simulasi dan melihat riwayatnya supaya alur absensi dapat didemonstrasikan. | Must |
| US-06 | Sebagai member, saya ingin menerima kategori workout split dengan alasan singkat agar saya memahami dasar rekomendasi. | Must |
| US-07 | Sebagai member, saya ingin melihat estimasi protein, karbohidrat, dan lemak serta metode dan asumsi perhitungannya. | Must |
| US-08 | Sebagai member, saya ingin melihat riwayat check-in dan rekomendasi agar aktivitas sebelumnya dapat ditinjau. | Must |
| US-09 | Sebagai peneliti/developer, saya ingin membedakan DEMO, baseline, dan model terlatih agar tidak menyampaikan hasil penelitian secara keliru. | Must |
| US-10 | Sebagai developer, saya ingin menjalankan test terhadap alur utama dan pembatasan akses agar demo lebih dapat diandalkan. | Must |
| US-11 | Sebagai owner gym, saya mungkin ingin mengelola member dan absensi pada versi lanjutan. | Won't for MVP |

## 6. Scope Fungsional dan Functional Requirements

Prioritas: **Must** = wajib untuk MVP demo; **Should** = penting bila sumber daya memungkinkan tanpa mengganggu Must; **Won't** = bukan bagian MVP.

### 6.1 Autentikasi dan otorisasi

- **FR-AUTH-01 (Must):** sistem menyediakan login dan logout melalui backend Express.
- **FR-AUTH-02 (Must):** endpoint dan halaman terlindungi hanya dapat diakses oleh pengguna yang terautentikasi.
- **FR-AUTH-03 (Must):** member hanya dapat membaca dan mengubah profil serta riwayat miliknya sendiri; identitas pemilik data ditentukan server, bukan dipercaya dari ID yang dikirim UI.
- **FR-AUTH-04 (Must):** kredensial demo tidak disimpan sebagai teks biasa; gunakan hashing kata sandi yang sesuai dan pengelolaan rahasia melalui konfigurasi environment.
- **FR-AUTH-05 (Must):** kredensial uji, secret, dan token tidak boleh di-commit ke repository atau ditanam di front-end.
- **FR-AUTH-06 (Must):** kegagalan login dan respons API tidak membocorkan apakah kredensial tertentu valid melalui pesan yang terlalu spesifik.
- **FR-AUTH-07 (Should):** sediakan seed akun uji untuk lingkungan lokal/demo, dengan panduan agar kredensial default diganti atau tidak digunakan pada deployment publik.
- **Batas:** integrasi identitas resmi Trisis Gym, SSO, reset kata sandi melalui email, dan registrasi publik berada di luar scope awal.

### 6.2 Dashboard

- **FR-DASH-01 (Must):** dashboard menampilkan ringkasan profil member.
- **FR-DASH-02 (Must):** dashboard menampilkan status keanggotaan dengan penanda demo yang jelas; tidak menyatakan status aktif resmi tanpa sumber data sah.
- **FR-DASH-03 (Must):** dashboard menampilkan ringkasan check-in yang bersumber dari data aplikasi dan pintasan menuju fitur utama.
- **FR-DASH-04 (Must):** dashboard menunjukkan empty, loading, dan error state yang tepat ketika data belum tersedia atau gagal dimuat.
- **FR-DASH-05 (Must):** konten penting dan tindakan utama mudah dijangkau pada layar Android tanpa mengandalkan hover.

### 6.3 Profil member dan privasi

- **FR-PROF-01 (Must):** profil menyediakan data minimum yang diperlukan untuk demonstrasi: nama tampilan, tujuan latihan, tingkat pengalaman, hari latihan per minggu, tinggi, dan berat badan.
- **FR-PROF-02 (Must):** nilai input divalidasi di sisi UI dan server, termasuk batas rentang yang ditetapkan secara eksplisit saat implementasi.
- **FR-PROF-03 (Must):** pengguna dapat menyimpan perubahan profil dan melihat nilai terbaru saat halaman dibuka kembali.
- **FR-PROF-04 (Must):** tujuan penggunaan tiap field dijelaskan secara ringkas saat relevan, terutama untuk data tubuh.
- **FR-PROF-05 (Must):** sistem tidak meminta data identitas sensitif atau data kesehatan tambahan kecuali data tersebut terbukti diperlukan oleh fitur yang telah disetujui.
- **FR-PROF-06 (Should):** pengguna dapat mengoreksi atau menghapus data profil demo sesuai aturan penyimpanan yang ditetapkan.
- **Batas:** pengumpulan tanggal lahir lengkap, nomor identitas resmi, kontak darurat, detail penyakit, obat, dan data biometrik tidak termasuk kebutuhan default.
- **Catatan:** bila formula makronutrisi yang dipilih ternyata membutuhkan input tambahan seperti usia, jenis kelamin, atau tingkat aktivitas, kebutuhan tersebut harus dijustifikasi, dijelaskan, dan disetujui sebelum ditambahkan. Jangan menebak nilai yang tidak dimasukkan pengguna.

### 6.4 Kartu member digital

- **FR-CARD-01 (Must):** aplikasi menampilkan kartu digital yang berisi identitas keanggotaan demo yang minimal.
- **FR-CARD-02 (Must):** kartu memuat penanda seperti “DEMO — BUKAN KARTU KEANGGOTAAN RESMI”.
- **FR-CARD-03 (Must):** aplikasi tidak mengklaim status aktif resmi, masa berlaku, atau validasi membership jika tidak berasal dari sistem sah yang terintegrasi dan diizinkan.
- **FR-CARD-04 (Should):** identitas demo dapat memiliki ID aplikasi non-sensitif yang dibuat untuk prototipe; jangan menampilkan data pribadi berlebihan.

### 6.5 Check-in dan riwayat kehadiran

- **FR-CHECK-01 (Must):** pengguna yang telah login dapat menjalankan check-in simulasi sesuai aturan demo.
- **FR-CHECK-02 (Must):** check-in berhasil menghasilkan catatan waktu dan identitas pemilik yang ditentukan server.
- **FR-CHECK-03 (Must):** sistem menetapkan aturan pencegahan check-in duplikat pada interval/periode yang didefinisikan selama implementasi dan mendokumentasikannya.
- **FR-CHECK-04 (Must):** member hanya dapat membaca riwayat check-in miliknya.
- **FR-CHECK-05 (Must):** semua status simulasi diberi penanda “DEMO”; jangan menyajikan data simulasi sebagai kehadiran gym yang terverifikasi.
- **FR-CHECK-06 (Must):** QR code, bila dieksplorasi, hanya bagian dari prototipe sampai owner menyetujui mekanisme, ancaman penyalahgunaan, alur staf/perangkat, serta sumber kebenaran absensi.
- **Batas:** integrasi mesin absensi, geolocation, face recognition, pemindaian QR operasional, dan verifikasi kehadiran resmi di luar MVP awal.

### 6.6 Rekomendasi workout split

- **FR-WORK-01 (Must):** sistem menyediakan formulir atau ringkasan input profil yang telah disetujui untuk menghasilkan/menampilkan rekomendasi workout split.
- **FR-WORK-02 (Must):** hasil mencakup kategori program, frekuensi latihan yang sesuai dengan input yang tersedia, dan penjelasan ringkas tentang alasan atau batasan hasil.
- **FR-WORK-03 (Must):** aplikasi memberi label metode yang akurat: DEMO, baseline, atau Random Forest terlatih dan dievaluasi.
- **FR-WORK-04 (Must):** saat dataset/model belum layak, aplikasi menggunakan hasil demo atau baseline yang deterministik dan menjelaskan bahwa hasil tersebut bukan prediksi ML tervalidasi.
- **FR-WORK-05 (Must):** input yang dibutuhkan model harus berasal dari data yang dikumpulkan secara sah dan sesuai dokumentasi fitur model; tidak boleh bergantung pada atribut yang tidak tersedia atau ditebak.
- **FR-WORK-06 (Must):** definisi label kategori workout split dan proses pelabelannya harus terdokumentasi sebelum pelatihan.
- **FR-WORK-07 (Must):** kategori dan panduan latihan perlu ditinjau pelatih yang kompeten sebelum disajikan sebagai rekomendasi yang ditujukan untuk penggunaan nyata.
- **FR-WORK-08 (Should):** simpan riwayat rekomendasi beserta waktu pembuatan dan versi/metode yang digunakan agar hasil lama tidak salah dianggap sebagai hasil model terkini.
- **Catatan penelitian:** Random Forest Classifier adalah kandidat, bukan keputusan final tanpa pemeriksaan dataset. Evaluasi kandidat mencakup cross-validation bila sesuai, precision, recall, F1-score, dan confusion matrix. Pembagian data dan pengolahan fitur harus menghindari data leakage.

### 6.7 Target makronutrisi

- **FR-MACRO-01 (Must):** aplikasi menampilkan estimasi gram protein, karbohidrat, dan lemak per hari menggunakan baseline yang metode dan asumsi utamanya dapat dibaca pengguna.
- **FR-MACRO-02 (Must):** hasil memperlihatkan input yang digunakan, satuan, serta penjelasan bahwa angka merupakan estimasi dan bukan saran medis individual.
- **FR-MACRO-03 (Must):** jika input wajib tidak tersedia atau di luar rentang, sistem meminta koreksi atau menjelaskan kenapa hasil tidak dapat dihitung; jangan membuat input fiktif.
- **FR-MACRO-04 (Must):** baseline rule/formula dipisahkan dari modul prediksi ML agar sumber angka dapat ditelusuri.
- **FR-MACRO-05 (Must):** dasar metode dan sumber rujukan untuk baseline ditetapkan serta ditinjau sebelum implementasi final; PRD ini tidak menetapkan rumus atau angka nutrisi tertentu sebagai kebenaran klinis.
- **FR-MACRO-06 (Must):** Random Forest Regressor hanya digunakan jika tersedia target numerik yang memiliki dasar metodologis, cakupan representatif, kualitas yang memadai, serta protokol evaluasi yang masuk akal.
- **FR-MACRO-07 (Must):** jika regresi tidak memenuhi syarat, baseline tetap diberi label sebagai baseline dan tidak disebut prediksi Random Forest.
- **FR-MACRO-08 (Must):** aplikasi menyatakan bahwa estimasi bukan pengganti konsultasi ahli gizi atau tenaga kesehatan.
- **FR-MACRO-09 (Should):** riwayat estimasi menyimpan waktu, metode dan versi yang dipakai untuk transparansi.
- **Catatan penelitian:** jika model regresi dilatih, evaluasi minimal yang dipertimbangkan adalah MAE dan RMSE serta perbandingan dengan baseline yang masuk akal. Metrik dan rancangan validasi akhir mengikuti struktur, ukuran, dan kualitas data.

### 6.8 Riwayat aktivitas

- **FR-HIST-01 (Must):** halaman riwayat menyatukan atau membedakan entri check-in demo dan rekomendasi yang pernah dibuat.
- **FR-HIST-02 (Must):** setiap entri menunjukkan waktu dan tipe aktivitas; sumber/metode rekomendasi ditampilkan bila relevan.
- **FR-HIST-03 (Must):** empty state ditampilkan bila belum ada aktivitas.
- **FR-HIST-04 (Must):** data yang ditampilkan dibatasi pada member yang sedang login.
- **FR-HIST-05 (Should):** daftar memiliki urutan terbaru ke terlama dan menangani kondisi jumlah entri yang bertambah.

### 6.9 Admin gym

- **FR-ADMIN-01 (Won't):** tidak ada panel admin gym pada MVP.
- **FR-ADMIN-02 (Won't):** tidak ada pengelolaan akun member resmi, verifikasi status membership, atau koreksi absensi operasional.
- **Syarat perubahan:** bila panel admin diminta, scope, role matrix, akses data, izin owner, kebutuhan audit, dan tambahan waktu harus disepakati terlebih dahulu.

## 7. Alur Pengguna Utama

### 7.1 Alur login dan dashboard

1. Member demo membuka aplikasi.
2. Pengguna login melalui backend.
3. Server memverifikasi kredensial dan membuat sesi/token sesuai desain implementasi.
4. Aplikasi membuka dashboard dan memuat data milik member.
5. Pengguna dapat berpindah ke profil, kartu demo, check-in, rekomendasi, dan riwayat.
6. Pengguna logout; area terlindungi tidak lagi dapat diakses.

### 7.2 Alur memperbarui profil

1. Member membuka profil.
2. Aplikasi memuat data terakhir dari API.
3. Member mengubah field yang tersedia.
4. UI memvalidasi format/rentang dan server memvalidasi ulang.
5. Server menyimpan perubahan; aplikasi menampilkan konfirmasi hanya setelah menerima respons sukses.
6. Jika gagal, perubahan tidak boleh diam-diam dianggap tersimpan; tampilkan pesan dan sediakan cara mencoba lagi.

### 7.3 Alur check-in demo

1. Member membuka fitur check-in.
2. Aplikasi menjelaskan bahwa check-in adalah simulasi.
3. Member menekan tombol check-in.
4. Server menerapkan aturan duplikasi dan mencatat waktu serta member pemilik.
5. Aplikasi menampilkan hasil dan entri tersebut muncul pada riwayat.
6. Jika gagal atau terjadi duplikasi, berikan status yang jelas. Tidak ada klaim kehadiran resmi.

### 7.4 Alur rekomendasi workout split

1. Member memastikan profil yang diperlukan lengkap.
2. Sistem mengecek ketersediaan metode/model.
3. Jika model terlatih belum tersedia atau tidak memenuhi syarat, sistem menggunakan jalur DEMO/baseline yang sudah disetujui.
4. Hasil ditampilkan bersama label metode, alasan/penjelasan, dan batasan.
5. Hasil dapat dicatat sebagai riwayat bersama versi/metode.
6. Rekomendasi untuk penggunaan nyata harus ditinjau pelatih yang kompeten.

### 7.5 Alur estimasi makronutrisi

1. Member melengkapi input yang benar-benar dibutuhkan oleh metode baseline terpilih.
2. Sistem memvalidasi input dan satuan.
3. Sistem menghitung estimasi dengan metode baseline yang terdokumentasi.
4. UI menampilkan protein, karbohidrat, lemak, input/metode utama, asumsi, dan disclaimer.
5. Jika metode tidak dapat diterapkan dengan aman atau input tidak lengkap, sistem menjelaskan kondisi tersebut, bukan mengarang angka.
6. Jika model regresi kelak layak, jalur ML harus diberi identitas terpisah beserta evaluasi dan versi model.

## 8. Acceptance Criteria Tingkat Produk

Acceptance criteria di bawah berlaku untuk demo MVP. Perincian state visual diatur pada `UI-GUIDELINE.md`; langkah dan tooling test ditetapkan di `IMPLEMENTATION_PLAN.md`.

| ID | Kriteria penerimaan |
|---|---|
| AC-01 | Login valid membuka area member; logout menutup akses terlindungi. |
| AC-02 | Request tanpa autentikasi ke endpoint member ditolak. |
| AC-03 | Member A tidak bisa membaca atau mengubah profil, check-in, atau riwayat Member B dengan mengubah parameter request. |
| AC-04 | Dashboard membedakan status demo dari status membership resmi. |
| AC-05 | Profil dapat dibaca, divalidasi, diperbarui, dan dimuat kembali dari database. |
| AC-06 | Kartu digital menampilkan disclaimer DEMO yang tidak ambigu. |
| AC-07 | Check-in demo berhasil dicatat oleh server, muncul di riwayat, dan mengikuti aturan anti-duplikasi. |
| AC-08 | Kegagalan jaringan/API menghasilkan state error dan tidak menampilkan konfirmasi sukses palsu. |
| AC-09 | Jalur rekomendasi secara eksplisit menandai DEMO/baseline/model; model belum terlatih tidak ditampilkan sebagai model aktif tervalidasi. |
| AC-10 | Hasil workout split menunjukkan kategori dan penjelasan yang konsisten dengan metode yang benar-benar dijalankan. |
| AC-11 | Target makro menggunakan baseline yang terdokumentasi dan memperlihatkan satuan, input, metode, asumsi, dan disclaimer. |
| AC-12 | Perhitungan gagal secara jelas jika input wajib tidak lengkap atau tidak valid; tidak ada nilai yang diam-diam ditebak. |
| AC-13 | Riwayat membedakan check-in simulasi dan rekomendasi, termasuk metode rekomendasi ketika tersedia. |
| AC-14 | Alur utama dapat dipakai dengan sentuhan pada viewport ponsel dan tidak memerlukan hover. |
| AC-15 | Kegunaan dasar tetap tersedia untuk kondisi loading, kosong, error, dan data yang tidak lengkap. |
| AC-16 | Tidak ada secret atau kredensial produksi di front-end maupun repository. |
| AC-17 | Tidak ada klaim integrasi owner, status resmi, atau metrik model yang belum dibuktikan. |

## 9. Non-Functional Requirements

### 9.1 Usability dan responsivitas

- **NFR-UX-01:** desain mengutamakan layar Android; tindakan utama mudah dijangkau dan kontrol cocok untuk interaksi sentuh.
- **NFR-UX-02:** layout tetap usable pada viewport kecil dan browser desktop tanpa sekadar mengecilkan dashboard desktop.
- **NFR-UX-03:** gunakan Bahasa Indonesia yang jelas, label status yang eksplisit, dan pesan kesalahan yang membantu pemulihan.
- **NFR-UX-04:** hindari animasi yang tidak perlu, dekorasi yang mengganggu, dan informasi demo yang menyerupai data resmi.

### 9.2 Aksesibilitas

- **NFR-A11Y-01:** kontras teks memadai; status tidak dibedakan hanya berdasarkan warna.
- **NFR-A11Y-02:** kontrol utama memiliki label yang dapat dipahami, fokus keyboard yang terlihat, serta struktur heading yang konsisten.
- **NFR-A11Y-03:** error form dikaitkan dengan field terkait dan tidak hanya disampaikan melalui warna.
- **NFR-A11Y-04:** ukuran target sentuh, ukuran teks, serta navigasi dievaluasi di layar ponsel selama pengujian.

### 9.3 Keamanan

- **NFR-SEC-01:** validasi dan otorisasi selalu ditegakkan pada server; validasi UI hanya membantu pengalaman pengguna.
- **NFR-SEC-02:** kata sandi di-hash; rahasia konfigurasi disimpan di environment yang sesuai dan tidak dikirim ke browser.
- **NFR-SEC-03:** endpoint sensitif meminimalkan data yang dikembalikan, menangani input tidak valid, dan memiliki kontrol akses yang tepat.
- **NFR-SEC-04:** pertimbangkan proteksi brute-force/rate limiting, pengaturan CORS, HTTPS pada deployment, serta mitigasi serangan terkait strategi sesi yang dipilih.
- **NFR-SEC-05:** pencatatan log tidak menyimpan password, token rahasia, atau data pribadi yang tidak dibutuhkan.
- **NFR-SEC-06:** keputusan final tentang cookie/session atau token, masa berlaku, CSRF, serta konfigurasi deployment ditentukan dan diuji dalam rencana implementasi.

### 9.4 Privasi dan minimisasi data

- **NFR-PRIV-01:** kumpulkan hanya data yang diperlukan untuk fitur yang disetujui.
- **NFR-PRIV-02:** data tubuh dan profil tidak dipakai untuk tujuan lain tanpa dasar dan persetujuan yang sesuai.
- **NFR-PRIV-03:** dataset penelitian harus mempunyai sumber dan izin penggunaan yang dapat dijelaskan; data harus diminimalkan dan dianonimkan/pseudonimkan sesuai risiko.
- **NFR-PRIV-04:** identitas langsung tidak dimasukkan ke dataset ML jika tidak diperlukan; identifier internal diganti kode penelitian dan tabel penghubung dipisahkan dengan akses terbatas bila memang dibutuhkan.
- **NFR-PRIV-05:** masa simpan, proses penghapusan, dan siapa yang dapat mengakses data harus ditentukan sebelum pemakaian data nyata.
- **NFR-PRIV-06:** persetujuan untuk penggunaan data aplikasi dan penggunaan data untuk penelitian tidak boleh diasumsikan sama.

### 9.5 Keandalan, maintainability, dan keterujian

- **NFR-REL-01:** UI menangani kegagalan API, timeout, data kosong, dan respons invalid tanpa crash yang tidak tertangani.
- **NFR-MAINT-01:** logika domain, API, akses database, dan pipeline ML dipisahkan agar dapat diuji serta diganti tanpa mengubah seluruh aplikasi.
- **NFR-MAINT-02:** requirement dan keputusan penting ditelusuri dari dokumen SOT ke test yang relevan.
- **NFR-TEST-01:** alur autentikasi, otorisasi antar-member, validasi profil, check-in, perhitungan baseline, dan penandaan hasil ML memiliki pengujian yang sesuai.
- **NFR-PORT-01:** web app menjadi sumber implementasi UI awal; pembungkusan Capacitor baru dievaluasi setelah alur web stabil.

Target numerik untuk waktu respons, uptime, dan batas skala belum ditetapkan karena deployment dan jumlah pengguna belum diketahui. Untuk MVP individu, prioritasnya adalah keamanan dasar, respons UI yang wajar pada lingkungan demo, dan perilaku yang konsisten.

## 10. Kebutuhan Data

### 10.1 Data aplikasi MVP

| Entitas konseptual | Field minimum yang diusulkan | Catatan |
|---|---|---|
| Akun demo | ID internal, identifier login, hash kata sandi, waktu dibuat | Tidak menyimpan password asli. Data akun nyata belum menjadi scope. |
| Profil member | ID pemilik, nama tampilan, tujuan latihan, pengalaman, hari latihan/minggu, tinggi, berat, waktu pembaruan | Hindari data tambahan tanpa kebutuhan yang disetujui. |
| Check-in demo | ID internal, ID member, timestamp server, status demo | Bukan catatan kehadiran resmi. |
| Riwayat rekomendasi | ID internal, ID member, waktu, jenis rekomendasi, input relevan yang diminimalkan, label metode, versi model/rule bila ada | Pertimbangkan minimisasi agar tidak menggandakan data profil lengkap. |
| Hasil makronutrisi | Dapat menjadi bagian record rekomendasi; input/metode/satuan/hasil yang diperlukan | Hindari menyimpan salinan data lebih banyak daripada kebutuhan riwayat. |

Skema fisik database, tipe data, relasi, index, dan kebijakan penghapusan direncanakan dalam `IMPLEMENTATION_PLAN.md`; detail implementasinya baru dibuat setelah Phase 6 disetujui.

### 10.2 Kebutuhan dataset penelitian

Sebelum pengumpulan data, peneliti harus menentukan:

1. Sumber dataset yang sah dan izin pemakaian untuk tujuan akademik.
2. Unit observasi, kriteria inklusi/eksklusi, ukuran sampel yang realistis, missing values, serta potensi ketidakseimbangan label.
3. Fitur input yang benar-benar tersedia dan relevan—misalnya tujuan latihan, pengalaman, hari latihan per minggu, dan atribut lain hanya bila dijustifikasi.
4. Target klasifikasi workout split beserta pedoman labeling yang konsisten dan tinjauan pelatih kompeten.
5. Jika melakukan regresi, definisi target makro numerik, sumber nilai, satuan, metode penentuan label, serta justifikasi penggunaan ML dibanding baseline.
6. Prosedur pembersihan, anonimisasi/pseudonimisasi, pembatasan akses, masa simpan, dan penghapusan data.
7. Strategi pemisahan train/validation/test atau cross-validation yang sesuai; mencegah data leakage dan duplikasi antar-split.
8. Protokol evaluasi dan pelaporan keterbatasan serta hasil negatif, bukan hanya hasil terbaik.

**Sumber dataset yang dapat dieksplorasi tetapi belum disetujui:** data publik dengan lisensi yang sesuai, dataset penelitian yang memberi izin penggunaan, atau data baru yang dikumpulkan secara sah dengan izin dan prosedur etik/privasi yang relevan. Ini adalah opsi pencarian, bukan klaim bahwa dataset tertentu telah tersedia atau boleh dipakai.

### 10.3 Persyaratan evaluasi model

- **Klasifikasi workout split:** kandidat metrik meliputi precision, recall, F1-score, confusion matrix, dan validasi silang bila sesuai. Laporkan distribusi label dan baseline pembanding.
- **Regresi makronutrisi:** hanya jika layak; kandidat metrik meliputi MAE dan RMSE serta perbandingan dengan baseline yang masuk akal.
- Model harus dibandingkan dengan baseline sederhana yang ditentukan sebelum evaluasi final.
- Jangan menganggap metrik dari data training sebagai bukti generalisasi.
- Dokumentasikan versi dataset, proses preprocessing, fitur yang digunakan, random seed jika relevan, konfigurasi model, metrik, dan batasan eksperimen.
- Bila dataset tidak cukup, distribusi label terlalu timpang, atau target tidak memiliki ground truth yang dapat dipertanggungjawabkan, integrasi model terlatih ditunda; UI tetap menggunakan DEMO/baseline yang diberi label.

## 11. Privasi, Keamanan, dan Batas Penggunaan

- Aplikasi awal menggunakan akun dan data demo; jangan memasukkan data member sungguhan sebelum izin, tujuan, akses, keamanan, dan masa simpan disepakati.
- Status membership dan attendance hanya dapat dianggap resmi bila diverifikasi oleh sumber yang sah serta integrasinya disetujui owner.
- QR bukan kontrol keamanan dengan sendirinya. Desain operasional harus mempertimbangkan pemalsuan, pemakaian ulang, screenshot, dan validasi server sebelum diimplementasikan.
- Data profil kebugaran dapat mengungkap informasi pribadi. Batasi pengumpulan, paparan di UI, log, ekspor, dan dataset penelitian.
- Jangan membuat keputusan klinis atau menjanjikan hasil fisik dari rekomendasi latihan/makro.
- Konten latihan perlu review pelatih yang kompeten; metode nutrisi perlu sumber transparan dan batasan yang jelas.
- Setiap pemakaian dataset publik tetap tunduk pada lisensi dan syarat penggunaan sumber tersebut.

## 12. Dependensi, Risiko, dan Asumsi

### 12.1 Dependensi

| ID | Dependensi | Status |
|---|---|---|
| DEP-01 | Lingkungan pengembangan Node.js, npm, React/Vite, Express, MySQL, dan Git | Perlu dipastikan saat setup |
| DEP-02 | Browser modern dan viewport pengujian Android | Perlu dipastikan saat pengujian |
| DEP-03 | Sumber metode baseline makro yang transparan dan dapat dipertanggungjawabkan | Belum dipilih |
| DEP-04 | Definisi kategori workout split dan review pelatih | Belum diperoleh |
| DEP-05 | Dataset yang sah, label berkualitas, dan izin penggunaan untuk penelitian | Belum tersedia/terkonfirmasi |
| DEP-06 | Persetujuan owner untuk identitas resmi, data nyata, atau verifikasi absensi | Belum dikonfirmasi; tidak dibutuhkan untuk demo mock |
| DEP-07 | Keputusan apakah APK wajib didemonstrasikan dan ketersediaan toolchain Android | Wrapper direncanakan; APK belum dijamin sebagai deliverable MVP |

### 12.2 Risiko dan mitigasi

| ID | Risiko | Dampak | Mitigasi awal |
|---|---|---|---|
| R-01 | Dataset tidak tersedia atau tidak layak | Tujuan evaluasi ML tidak tercapai | Dataset menjadi gerbang; jangan membuat klaim model; gunakan DEMO/baseline secara eksplisit. |
| R-02 | Label workout split tidak konsisten | Model mempelajari label yang bising | Susun pedoman labeling dan lakukan review pelatih sebelum melatih model. |
| R-03 | Target nutrisi tidak memiliki ground truth yang sahih | Regresi tidak bermakna atau mengulang rumus tanpa nilai tambah | Tetapkan definisi target dan bandingkan dengan baseline; batalkan Regressor bila tidak layak. |
| R-04 | Data nyata digunakan tanpa izin | Risiko privasi dan akademik | Mulai dengan data demo; verifikasi izin serta tata kelola sebelum data nyata dipakai. |
| R-05 | Demo disalahartikan sebagai sistem resmi | Ekspektasi pengguna dan owner keliru | Label DEMO pada kartu, check-in, status, dan metode rekomendasi. |
| R-06 | Scope terlalu besar bagi developer individu | Keterlambatan dan fitur tidak selesai | Prioritaskan alur member inti; admin dan integrasi kompleks dikeluarkan. |
| R-07 | Kebocoran data antar-member atau kredensial tidak aman | Dampak keamanan serius | Otorisasi server-side, hashing password, pengujian akses lintas akun, secret melalui environment. |
| R-08 | Mobile wrapper memiliki kendala build/perangkat | Target Android tertunda | Stabilkan web terlebih dahulu; evaluasi Capacitor setelah MVP web dapat diuji. |
| R-09 | Estimasi makro dianggap sebagai saran klinis | Potensi penggunaan yang tidak tepat | Tampilkan metode, asumsi, keterbatasan, disclaimer, dan review yang sesuai. |
| R-10 | Identitas visual/logo gym digunakan tanpa izin | Masalah branding/representasi | Gunakan nama visual seperlunya untuk konteks akademik; minta izin sebelum publikasi yang menyiratkan afiliasi resmi. |

### 12.3 Asumsi yang masih terbuka

- Tidak ada integrasi atau izin owner yang dianggap tersedia sebelum dikonfirmasi.
- Data member demo dapat dibuat untuk kebutuhan prototipe tanpa menyalin data pribadi nyata.
- Bahasa UI awal adalah Bahasa Indonesia.
- Pembuatan APK melalui Capacitor tergantung kelayakan waktu dan setup, bukan janji sebelum diuji.
- Pilihan formula makronutrisi dan field tambahan belum diputuskan.
- Dataset, label, serta hasil model belum tersedia dan belum dapat dipakai untuk menyimpulkan efektivitas.

## 13. Pertanyaan Terbuka untuk Fase Berikutnya

Pertanyaan berikut tetap terbuka meskipun PRD telah disetujui; jawabannya harus ditetapkan pada fase yang sesuai sebelum fitur nyata yang bergantung padanya dirilis.

| ID | Pertanyaan | Kapan dijawab |
|---|---|---|
| OQ-01 | Apakah owner menyetujui penggunaan nama/logo, data, dan representasi Trisis Gym untuk demonstrasi/publikasi? | Sebelum publikasi atau integrasi nyata |
| OQ-02 | Apakah APK Android wajib menjadi deliverable penilaian, atau web mobile cukup? | Saat menyusun rencana implementasi final |
| OQ-03 | Metode baseline makronutrisi mana yang akan digunakan dan input tambahan apa yang benar-benar diperlukan? | Sebelum implementasi perhitungan makro |
| OQ-04 | Bagaimana kategori workout split ditetapkan dan ditinjau pelatih? | Sebelum labeling atau finalisasi rekomendasi nyata |
| OQ-05 | Adakah dataset yang dapat digunakan secara legal, dan apakah target klasifikasi/regresi mempunyai ground truth yang sahih? | Sebelum pipeline pelatihan model |
| OQ-06 | Apakah ada batas waktu akademik, kebutuhan deployment, atau batas perangkat yang perlu dicatat? | Sebelum penguncian rencana implementasi |
| OQ-07 | Jika formula yang sahih membutuhkan data tambahan (misalnya usia atau aktivitas), apakah data tersebut proporsional dan dapat dibenarkan? | Sebelum field baru masuk ke profil |

## 14. Kriteria Penyelesaian PRD

Kriteria berikut digunakan untuk meninjau kelengkapan PRD pada Phase 1 dan konsistensinya pada Phase 4:

- Tujuan, target pengguna, scope MVP, dan non-goals dapat dipahami tanpa merujuk pada asumsi tak tertulis.
- Functional dan non-functional requirements memiliki ID yang dapat ditelusuri.
- Alur utama dan acceptance criteria sesuai dengan scope demo.
- Status data, absensi, keanggotaan, baseline, dan model dibedakan secara eksplisit.
- Privasi, minimisasi data, otorisasi, keamanan, kebutuhan dataset, dan risiko ML dinyatakan.
- Keputusan yang belum terkonfirmasi ditandai sebagai asumsi atau pertanyaan terbuka.
- Tidak ada klaim bahwa owner telah memberi izin, dataset telah tersedia, atau model telah valid.
- Pemilik proyek meninjau isi dan memberikan persetujuan eksplisit.

---

**Status persetujuan:** PRD.md telah disetujui pada Phase 1, diaudit pada Phase 4, dan diperbarui ke versi 1.1 pada 12 Oktober 2026 sesuai instruksi pemilik proyek untuk mengeksekusi Phase 6A (Frontend-First dengan data dummy). Dokumen ini tetap menjadi sumber kebenaran kebutuhan produk.
