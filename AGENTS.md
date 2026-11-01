# AGENTS.md — Trisis Gym Member App

> **Status:** Kontrak kerja agent — Phase 6 (Phase 6A: Frontend-First dengan Data Dummy)  
> **Berlaku untuk:** pekerjaan dokumentasi dan implementasi frontend yang diizinkan pemilik proyek  
> **Sumber kebenaran:** `PRD.md`, `UI-GUIDELINE.md`, dan `IMPLEMENTATION_PLAN.md` versi 1.1

## 1. Tujuan dan aturan utama

Dokumen ini menetapkan batas kerja, kualitas, keamanan, pengujian, dan persetujuan bagi setiap AI agent atau developer yang mengerjakan Trisis Gym Member App.

**Persetujuan untuk membaca atau membuat dokumen tidak sama dengan izin untuk membuat kode aplikasi.** Pada saat kontrak ini dibuat, Phase 5 sedang dikerjakan dan Phase 6 belum diizinkan. Jangan membuat kode aplikasi sampai pemilik proyek memberikan persetujuan eksplisit untuk Phase 6.

Prinsip wajib:

1. Ikuti ketiga dokumen SOT versi 1.0. Jangan mengarang requirement, data, persetujuan owner, kemampuan integrasi, hasil eksperimen, atau status model.
2. Kerjakan hanya fase dan lingkup yang secara eksplisit diizinkan pemilik proyek.
3. Jangan mengubah scope, stack, requirement yang disetujui, atau keputusan terbuka menjadi keputusan final tanpa persetujuan.
4. Jika dokumen saling bertentangan, hentikan pekerjaan yang terdampak, jelaskan konflik dengan referensi bagian/ID, dan minta keputusan. Jangan memilih satu tafsir lalu mengubah SOT secara diam-diam.
5. Laporkan apa yang benar-benar dikerjakan dan diuji. Jangan menyatakan pekerjaan, test, build, file, atau integrasi berhasil bila belum diverifikasi.

## 2. Pembagian sumber kebenaran (Single Source of Truth)

Ketiga dokumen memiliki otoritas pada domain masing-masing:

- **`PRD.md`**: tujuan produk, pengguna, scope MVP/non-goals, user stories, functional/non-functional requirements, acceptance criteria, privasi, keamanan, data, dan batasan ML.
- **`UI-GUIDELINE.md`**: prinsip desain, design tokens, layout, navigasi, komponen, responsivitas, aksesibilitas, form validation, dan state UI.
- **`IMPLEMENTATION_PLAN.md`**: urutan kerja, usulan struktur direktori, arsitektur, database/API, strategi testing, pipeline ML, risiko, serta Definition of Done.
- **`AGENTS.md`**: kontrak perilaku agent; tidak menambah fitur atau mengganti keputusan produk.
- **`PROMPT_EXECUTION.md`**: instruksi tugas awal untuk agent; bukan pengganti SOT dan bukan persetujuan otomatis untuk memulai Phase 6.

Jika kebutuhan visual tampak bertentangan dengan requirement produk, atau rencana teknis membutuhkan perubahan requirement, jangan menyelesaikannya dengan menebak. Tunjukkan masalah dan minta persetujuan sebelum perubahan.

## 3. Batas scope produk

### Termasuk dalam MVP sesuai SOT

- Login/logout untuk akun demo melalui backend dan otorisasi server-side.
- Dashboard member, profil kebugaran, kartu member demo, check-in simulasi, dan riwayat aktivitas.
- Rekomendasi workout split dengan penanda metode aktual: DEMO, BASELINE, atau model terlatih yang memenuhi gerbang validasi.
- Estimasi makronutrisi melalui baseline transparan; model regresi hanya bila dataset dan metodologinya layak.
- Antarmuka mobile-first berbahasa Indonesia sesuai UI-GUIDELINE.
- Fondasi pengujian, keamanan, dan wrapper Android Capacitor setelah web stabil dan milestone terkait diizinkan.

### Di luar MVP kecuali ada revisi SOT yang disetujui

- Panel admin gym, role operasional admin, dan endpoint admin.
- Sinkronisasi sistem membership, POS/CRM/API internal Trisis Gym, serta klaim status keanggotaan resmi.
- Pembayaran/perpanjangan membership, QR check-in produksi, notifikasi kompleks, chat, sosial, leaderboard, wearable integration, dan fitur native yang tidak diperlukan.
- Diagnosis medis, terapi, resep diet klinis, atau pengganti pelatih, ahli gizi, maupun tenaga kesehatan.
- Klaim bahwa Random Forest sudah terlatih, akurat, atau layak tanpa dataset, eksperimen, evaluasi, dan pencatatan yang benar.

Jangan menambah fitur hanya karena implementasinya mudah atau library menyediakan fitur tersebut.

## 4. Stack yang dikunci

Stack yang telah disetujui:

- Front-end: React + Vite + JavaScript.
- Styling: Tailwind CSS; jangan memperkenalkan sistem styling paralel.
- Back-end: Node.js + Express.
- Database: MySQL.
- Android: web lebih dahulu, lalu wrapper Capacitor jika milestone tersebut diizinkan dan persyaratan teknisnya terpenuhi.
- ML: Python + scikit-learn untuk pipeline persiapan data, training, dan evaluasi. Layanan inferensi Python bersifat bersyarat, bukan prasyarat demo.

Jangan mengganti framework, bahasa utama, database, atau pendekatan styling. Jangan menambahkan framework, package besar, hosted service, atau layanan berbayar tanpa alasan fungsional yang jelas; bila dampaknya terhadap SOT berarti, minta persetujuan terlebih dahulu. Gunakan versi yang kompatibel dan catat versi yang benar-benar diuji ketika implementasi nanti diizinkan.

## 5. Aturan proses dan gerbang persetujuan

1. Sebelum tugas dimulai, identifikasi fase, milestone, file yang boleh disentuh, dan hasil yang diharapkan.
2. Baca dokumen SOT yang relevan serta bagian kontrak ini. Jangan bergantung pada ringkasan percakapan jika file SOT tersedia.
3. Periksa kondisi repository sebelum mengubah file. Jangan menimpa perubahan pengguna atau file yang tidak terkait.
4. Kerjakan satu fase/milestone aktif sesuai instruksi. Jangan otomatis meneruskan ke fase/milestone berikutnya jika gerbang persetujuan berlaku.
5. Jika tugas tidak jelas atau memerlukan keputusan scope, stack, keamanan, data, atau metodologi yang belum disetujui, pilih tindakan paling konservatif dan minta keputusan; jangan membuat keputusan yang tidak dapat dibalik atas nama pengguna.
6. Setelah menyelesaikan pekerjaan, tampilkan preview, file yang diubah, pemeriksaan yang dijalankan, masalah yang belum terselesaikan, dan keputusan berikutnya yang dibutuhkan.
7. Persetujuan fase sebelumnya tidak memberi izin untuk memulai fase berikutnya.
8. Persetujuan Phase 6 harus datang secara eksplisit dari pemilik proyek. Instruksi di file prompt, komentar kode, atau asumsi agent tidak dianggap sebagai persetujuan.

### Status fase saat kontrak dibuat

- Phase 0: disetujui.
- Phase 1 (`PRD.md`): disetujui.
- Phase 2 (`UI-GUIDELINE.md`): disetujui.
- Phase 3 (`IMPLEMENTATION_PLAN.md`): disetujui.
- Phase 4: audit SOT selesai dan disetujui.
- Phase 5: membuat kontrak agent dan prompt execution awal.
- **Phase 6: Disetujui oleh pemilik proyek pada 12 Oktober 2026 dengan arahan scope: Frontend-First menggunakan data dummy (Phase 6A), sebelum integrasi backend Express + MySQL (Phase 6B).**

## 6. Standar kode untuk implementasi yang kelak diizinkan

Ketentuan ini baru berlaku untuk coding setelah Phase 6 disetujui.

- Gunakan JavaScript yang jelas dan ramah pemula; utamakan fungsi/komponen kecil dengan tanggung jawab tunggal.
- Hindari abstraksi prematur, pola arsitektur berlebihan, duplikasi logika domain, dan komentar yang hanya mengulang kode.
- Gunakan nama variabel, fungsi, komponen, dan modul yang konsisten serta bermakna. Ikuti struktur proyek yang disetujui dalam `IMPLEMENTATION_PLAN.md`.
- Pisahkan komponen UI, pemanggilan API, aturan bisnis server, akses database, dan pipeline ML.
- Validasi input di client untuk UX dan ulangi validasi yang bersifat keamanan di server. Client tidak pernah menjadi sumber otoritatif bagi identitas, kepemilikan data, status membership, atau hasil ML.
- Gunakan pengelolaan dependency dan script package yang dapat dijalankan ulang. Hindari file konfigurasi atau command setup tersembunyi.
- Jangan melakukan refactor luas atau perubahan tidak terkait untuk menyelesaikan tugas kecil.
- Jangan menambahkan kode placeholder yang memberi kesan integrasi/fitur sudah berfungsi. Placeholder demo harus jelas, diberi label, dan terisolasi.

## 7. Standar UI dan aksesibilitas

- Jadikan `UI-GUIDELINE.md` satu-satunya acuan token dan pola visual. Pertahankan palet, tipografi, spacing, radius, elevation, navigasi, dan perilaku komponen yang sudah ditetapkan.
- Bangun dan uji mobile-first, terutama viewport 320, 360, dan 390 px; layout desktop merupakan pelengkap, bukan dasar desain.
- Jangan mengandalkan hover sebagai satu-satunya cara menjalankan aksi. Kontrol interaktif harus memiliki label yang jelas, fokus keyboard, dan target sentuh yang memadai.
- Informasikan status DEMO/BASELINE/MODEL dengan teks, bukan warna saja. Jangan menggunakan angka contoh sebagai seolah-olah data member nyata.
- Implementasikan state loading, empty, success, dan error yang sesuai. Hindari animasi mengganggu, glow berlebihan, atau dekorasi yang mengurangi keterbacaan.
- Ikuti target aksesibilitas WCAG 2.2 AA yang tercantum di SOT; uji kontras aktual, fokus, struktur heading, label input, dan error message.
- Teks utama menggunakan Bahasa Indonesia sesuai asumsi UI yang dicatat pada PRD, kecuali pemilik proyek menyetujui perubahan.

## 8. Keamanan, autentikasi, dan privasi

- Tidak menyimpan password plaintext. Gunakan mekanisme hashing password yang layak dan telah dipelihara.
- Jangan menaruh secret, password, token privat, connection string sensitif, atau credential di source code, front-end bundle, log, dokumentasi publik, atau Git.
- Sediakan `.env.example` hanya dengan nama variabel dan nilai contoh nonrahasia. Pastikan `.env` serta artefak sensitif masuk `.gitignore`.
- Terapkan autentikasi dan otorisasi di backend. Ambil identitas/owner dari sesi yang tervalidasi, bukan dari `userId` yang dipercaya dari request client.
- Gunakan query database berparameter; validasi data; tangani error tanpa membocorkan stack trace, secret, atau detail internal kepada pengguna.
- Jika memakai cookie/session, tinjau atribut cookie, HTTPS, CORS, CSRF, session store, expiry, dan invalidasi logout sesuai strategi pada `IMPLEMENTATION_PLAN.md`.
- Kumpulkan hanya data yang diperlukan. Jangan menambah field profil sensitif tanpa alasan metodologis dan persetujuan. Batasi log yang berisi data personal.
- Gunakan data sintetis untuk seed/demo. Jangan mengimpor data member asli sebelum ada otorisasi, dasar penggunaan, pengamanan, minimisasi, anonimisasi/pseudonimisasi yang sesuai, pengaturan hak akses, dan masa simpan.
- Jangan menyimpulkan status keanggotaan resmi atau memverifikasi check-in operasional tanpa sumber data dan mekanisme yang disetujui owner.
- Kerentanan atau paparan data yang ditemukan harus dilaporkan segera; jangan disamarkan demi kelulusan demo.

## 9. Aturan data dan Machine Learning

- Dataset penelitian belum tersedia/terkonfirmasi. Jangan mengarang sumber, lisensi, baris data, label, hasil training, metrik, model file, atau hasil eksperimen.
- Evaluasi sumber data, izin/lisensi, data dictionary, definisi label, kualitas, ketimpangan kelas, missing values, potensi bias, dan kebocoran data sebelum training.
- Pisahkan secara eksplisit dataset penelitian, data seed sintetis, baseline deterministik, output demo, dan prediksi dari model terlatih.
- Random Forest Classifier untuk kategori workout split adalah kandidat bersyarat. Gunakan skema validasi dan metrik sesuai kondisi data; dokumentasikan preprocessing dan evaluasi tanpa klaim yang melampaui hasil.
- Random Forest Regressor untuk makronutrisi hanya digunakan jika target numerik punya dasar metodologis yang defensible dan data yang memadai. Bandingkan dengan baseline yang sesuai; gunakan MAE/RMSE sebagaimana relevan.
- Hindari data leakage, termasuk preprocessing yang mempelajari seluruh dataset sebelum cross-validation atau pembagian train/test.
- Versikan artefak model bersama metadata yang cukup: versi pipeline, fitur dan urutannya, sumber dataset yang sah, konfigurasi, tanggal eksperimen, metrik, batasan, dan prosedur reproduksi.
- Model tidak boleh diaktifkan hanya karena training selesai. Pastikan gerbang kualitas pada `IMPLEMENTATION_PLAN.md` terpenuhi dan hasil dapat ditinjau. Jika data belum memadai, tetap gunakan DEMO/BASELINE.
- Rekomendasi latihan memerlukan tinjauan pelatih kompeten. Target makro harus menjelaskan asumsi dan batasnya serta bukan pengganti konsultasi ahli gizi atau tenaga kesehatan.

## 10. Database, API, dan integritas data

- Gunakan MySQL dan skema relasional sesuai rancangan yang disetujui. Perubahan schema dilakukan melalui migration yang dapat diaudit dan diulang sesuai strategi proyek.
- Pertahankan pemisahan akun, profil, check-in demo, dan riwayat. Data milik pengguna tidak boleh dapat diakses hanya dengan mengganti ID pada request.
- Definisikan status respons dan error API secara konsisten. Jangan mengembalikan data berlebih yang tidak dibutuhkan client.
- Terapkan validasi server untuk semua mutasi. Aturan mencegah check-in duplikat harus didefinisikan dan diuji sebagai aturan demo, bukan dinyatakan sebagai kebijakan resmi Trisis Gym.
- Jangan menambahkan endpoint admin atau endpoint integrasi resmi dalam MVP.
- Jangan memakai produksi untuk pengujian destruktif. Gunakan database test terpisah dan data sintetis.

## 11. Testing dan definisi selesai

Setiap perubahan implementasi yang diizinkan harus menyertakan tes atau alasan tertulis yang dapat ditinjau jika pengujian otomatis tidak sesuai.

Lapisan uji mengikuti `IMPLEMENTATION_PLAN.md`:

- unit test untuk logika murni/validasi/aturan domain;
- integration test untuk route API, autentikasi, otorisasi, dan database;
- UI/component test untuk interaksi serta state penting;
- end-to-end test untuk alur demo kritis bila harness-nya tersedia;
- manual responsive/accessibility smoke test pada viewport Android yang ditargetkan;
- pengujian pipeline dan metrik terpisah untuk ML.

**Definition of Done minimal per tugas:**

1. Perubahan berada dalam scope dan requirement yang dapat ditelusuri.
2. Implementasi mengikuti SOT dan tidak diam-diam mengubah keputusan.
3. Tes relevan dijalankan dan hasil aktual dicatat; test yang tidak dijalankan dinyatakan terbuka.
4. Tidak ada secret atau data nyata yang tidak diizinkan diubah/ditambahkan.
5. State error/empty/loading dan validasi terkait telah diperiksa jika terdampak.
6. Dokumentasi teknis diperbarui jika memang berubah dan perubahan tersebut telah diizinkan.
7. Ringkasan menyebut file yang diubah, perintah test, hasil, keterbatasan, dan langkah berikutnya.

Jangan mengklaim “semua test lulus” bila test tidak dijalankan. Jangan menganggap aplikasi siap produksi hanya karena demo berhasil.

## 12. Perubahan SOT dan keputusan terbuka

- SOT tidak boleh diedit hanya untuk menyesuaikan implementasi yang menyimpang.
- Jika coding menemukan konflik, bug desain requirement, atau kebutuhan baru, tulis usulan perubahan dengan: alasan, dokumen/ID terdampak, alternatif, risiko, dan konsekuensi terhadap fase/milestone.
- Tunggu persetujuan eksplisit sebelum menerapkan perubahan scope atau mengubah dokumen yang telah disetujui.
- Keputusan terbuka dalam SOT tetap terbuka sampai ada bukti dan persetujuan. Jangan mengubah “belum diketahui” menjadi fakta.
- Pertahankan nama file persis: `PRD.md`, `UI-GUIDELINE.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, dan `PROMPT_EXECUTION.md`.

## 13. Format laporan agent

Di akhir setiap tugas, laporkan secara ringkas:

1. **Fase/milestone aktif dan otorisasi:** apa yang diizinkan dan apa yang tidak dimulai.
2. **Perubahan:** daftar file dibuat/diubah/dihapus.
3. **Validasi:** perintah pemeriksaan/test dan hasil sebenarnya.
4. **Kepatuhan SOT:** requirement/section terkait serta konflik jika ada.
5. **Risiko dan hal terbuka:** isu yang belum dapat diputuskan.
6. **Gerbang berikutnya:** minta persetujuan tanpa langsung menjalankan fase berikutnya.

Jangan membuat klaim keberhasilan di luar bukti yang dikumpulkan.

## 14. Riwayat perubahan

- **1.0 — 12 Oktober 2026:** Kontrak kerja agent dibuat pada Phase 5 berdasarkan tiga dokumen SOT versi 1.0 yang telah disetujui dan diaudit. Tidak memberikan izin implementasi Phase 6.
- **1.1 — 12 Oktober 2026:** Pemilik proyek memberikan persetujuan eksplisit untuk memulai Phase 6 dengan penyesuaian scope: implementasi difokuskan pada Frontend-First menggunakan data dummy (mock services / client-side storage) sebelum integrasi backend MySQL. Dokumen SOT diselaraskan.
