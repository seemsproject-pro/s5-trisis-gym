# UI Guideline — Trisis Gym Member App

> **Status:** Disetujui — Phase 2; audit konsistensi Phase 4 selesai  
> **Versi:** 1.0  
> **Tanggal:** 12 Oktober 2026  
> **Pemilik dokumen:** Proyek akademik individu, mahasiswa Informatika semester 4  
> **Jenis dokumen:** UI/UX dan visual implementation guideline

## 1. Tujuan Dokumen dan Aturan SOT

Dokumen ini menetapkan prinsip desain, design tokens, pola navigasi, komponen, state antarmuka, aksesibilitas, dan aturan responsif Trisis Gym Member App. Dokumen ini menjadi sumber kebenaran untuk **bagaimana pengalaman dan tampilan antarmuka** harus bekerja.

- `PRD.md` adalah sumber kebenaran kebutuhan produk, aktor, dan batas scope.
- `IMPLEMENTATION_PLAN.md` menetapkan urutan implementasi, pengujian, dan integrasi teknis.
- Pedoman ini tidak menambah fitur produk baru. Detail UI harus memenuhi kebutuhan yang ditetapkan di PRD.
- Jika terdapat konflik, jangan mengubah scope atau keputusan yang sudah disetujui secara sepihak. Catat konflik dan minta persetujuan sebelum mengubah SOT.
- Status membership, check-in, dan rekomendasi wajib menyampaikan keadaan sebenarnya: **DEMO**, **BASELINE**, atau status **MODEL** dengan evaluasi yang terdokumentasi sesuai kondisi implementasi. Warna saja tidak cukup untuk menyampaikan status.

## 2. Design Principles

1. **Mobile-first, bukan desktop yang diperkecil.** Susun konten berdasarkan tugas yang paling sering dilakukan dengan satu tangan pada layar Android.
2. **Premium, futuristik, sporty.** Gunakan bidang gelap yang tenang, tipografi tegas, aksen ungu dan kuning neon secara terukur, serta hierarki yang kuat.
3. **Fokus sebelum dekorasi.** Angka kehadiran, langkah berikutnya, status rekomendasi, dan aksi utama lebih penting daripada ornamen atau grafik dekoratif.
4. **Jujur tentang status data.** Tandai demo dan baseline dengan teks yang terlihat. Tidak membuat UI seolah tersambung ke sistem resmi atau model terlatih jika belum.
5. **Satu tindakan utama per konteks.** Hindari banyak tombol berwarna mencolok dalam satu kartu atau layar.
6. **Konsisten dan dapat dipelajari.** Komponen, jarak, istilah, format angka, dan perilaku state harus berulang secara konsisten.
7. **Aksesibel dan toleran terhadap kesalahan.** Pesan validasi jelas, target sentuh nyaman, fokus keyboard terlihat, dan status tidak hanya dibedakan melalui warna.
8. **Data minimum.** Form hanya menampilkan input yang dibutuhkan oleh fitur yang benar-benar tersedia dan disetujui.

## 3. Brand dan Design Tokens

### 3.1 Palet warna

Warna merek inti berasal dari brief proyek. Token pendukung di bawah dipakai untuk hierarki dan aksesibilitas; tidak mengubah identitas utama.

| Token | Nilai | Kegunaan |
|---|---|---|
| `color.bg.canvas` | `#0C1018` | Latar utama aplikasi. |
| `color.bg.surface` | `#151C29` | Kartu, bottom navigation, dan panel. |
| `color.bg.surfaceRaised` | `#1D2636` | Elemen bertingkat, popover, atau area input terangkat. |
| `color.brand.purple` | `#7C4DFF` | Aksen visual, indikator terpilih, grafik dekoratif, dan elemen brand nonteks. |
| `color.brand.purpleText` | `#B7A3FF` | Tautan atau teks aksen kecil pada latar gelap bila kontrasnya sudah diverifikasi. |
| `color.brand.yellow` | `#F4E500` | Aksi utama dan aksen prioritas tinggi. Gunakan teks gelap di atasnya. |
| `color.text.primary` | `#F5F6FB` | Judul dan isi utama. |
| `color.text.secondary` | `#9CA8BA` | Deskripsi, metadata, dan label sekunder. |
| `color.text.muted` | `#758197` | Hanya metadata berprioritas rendah bila kontras telah diverifikasi; jangan untuk isi penting. |
| `color.border.default` | `#3D485B` | Batas kartu, divider, dan kontrol pada latar gelap. |
| `color.border.strong` | `#65738B` | Batas/fokus yang perlu lebih mudah dikenali. |
| `color.status.success` | `#55D6A0` | Status berhasil; selalu sertai label atau ikon. |
| `color.status.warning` | `#FFD166` | Peringatan dan baseline yang membutuhkan perhatian. |
| `color.status.error` | `#FF6B78` | Error validasi atau operasi yang gagal. |
| `color.status.info` | `#7FCBFF` | Informasi netral dan bantuan. |

**Aturan kontras:** teks isi normal menargetkan rasio minimum WCAG AA 4.5:1 terhadap latarnya; teks besar menargetkan 3:1. Komponen, indikator fokus, dan batas visual yang dibutuhkan untuk memahami kontrol menargetkan 3:1 terhadap warna sekitar. Nilai aktual harus diuji saat implementasi. Jangan gunakan `#7C4DFF` sebagai teks kecil pada `#0C1018` atau `#151C29` tanpa penyesuaian; kontrasnya tidak cukup untuk teks normal. Jangan memakai teks putih kecil di atas ungu inti tanpa verifikasi kontras karena kombinasi tersebut dapat berada di bawah 4.5:1. Untuk tombol utama, gunakan kuning neon dengan teks gelap.

**Larangan:** jangan menggunakan kuning neon sebagai latar besar untuk seluruh layar; jangan menempatkan teks putih di atas kuning; jangan menyampaikan status hanya dengan warna; jangan menambahkan gradien kuat di setiap kartu.

### 3.2 Tipografi

Gunakan stack sans-serif modern yang tersedia lintas perangkat, misalnya `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Jangan mewajibkan unduhan font eksternal agar layout tetap andal saat offline atau koneksi lambat.

| Token | Ukuran / line-height | Weight | Penggunaan |
|---|---:|---:|---|
| `type.display` | 30 / 36 px | 700 | Angka utama atau heading pembuka yang jarang digunakan. |
| `type.h1` | 24 / 32 px | 700 | Judul halaman. |
| `type.h2` | 20 / 28 px | 650–700 | Judul bagian utama. |
| `type.h3` | 16 / 24 px | 600 | Judul kartu dan kelompok konten. |
| `type.body` | 14 / 22 px | 400–500 | Isi utama mobile; gunakan 16 px bila panjang atau padat. |
| `type.bodyLarge` | 16 / 24 px | 400–500 | Pengantar, instruksi, atau isi penting. |
| `type.label` | 13 / 18 px | 500–600 | Label kontrol dan metadata yang tetap penting. |
| `type.caption` | 12 / 16 px | 400–500 | Timestamp dan keterangan tambahan; bukan satu-satunya tempat informasi penting. |
| `type.metric` | 28 / 34 px | 700 | Angka ringkasan seperti jumlah check-in. |

- Heading menggunakan sentence case; hindari kapital penuh untuk seluruh teks.
- Angka statistik boleh menggunakan tabular numerals agar nilai sejajar.
- Hindari paragraf panjang di dalam kartu. Pecah menjadi ringkasan dan detail.
- Jangan mengandalkan ukuran huruf kecil untuk memadatkan informasi pada layar 320–360 px.

### 3.3 Spacing, grid, radius, dan elevation

Gunakan skala spacing berbasis kelipatan 4 px.

| Token | Nilai | Penggunaan |
|---|---:|---|
| `space.1` | 4 px | Jarak mikro antar ikon dan label yang terkait. |
| `space.2` | 8 px | Jarak internal kontrol kecil. |
| `space.3` | 12 px | Jarak dalam komponen kompak. |
| `space.4` | 16 px | Padding standar komponen dan jarak antarkelompok kecil. |
| `space.5` | 20 px | Jarak antarkartu pada area rapat. |
| `space.6` | 24 px | Padding halaman mobile dan jarak bagian. |
| `space.8` | 32 px | Pemisah antarseksi besar. |
| `space.10` | 40 px | Ruang longgar pada hero atau awal halaman. |

- **Grid mobile:** satu kolom untuk konten utama; gunakan dua kolom hanya untuk metrik pendek atau aksi yang tetap terbaca.
- **Padding horizontal:** 20 px sebagai nilai awal; dapat turun menjadi 16 px pada viewport sangat sempit. Sisakan ruang aman pada tepi layar.
- **Radius:** `radius.sm = 8 px`, `radius.md = 12 px`, `radius.lg = 16 px`, `radius.xl = 20 px`, `radius.pill = 999 px`.
- **Kartu:** default radius 16 px, padding 16 px; jangan mencampur banyak ukuran radius dalam satu layar tanpa alasan.
- **Elevation:** gunakan border tipis sebagai pembeda utama di tema gelap. Shadow hanya untuk menu/modal atau lapisan yang benar-benar mengambang; hindari glow neon luas.
- **Icon:** ukuran dasar 20–24 px, konsisten dalam satu kelompok. Icon tanpa label hanya digunakan untuk tindakan yang maknanya jelas dan tetap memiliki accessible name.

### 3.4 Motion

- Transisi status dan navigasi singkat, sekitar 120–200 ms bila membantu pemahaman.
- Jangan menganimasikan angka, kartu, atau latar secara terus-menerus.
- Hargai `prefers-reduced-motion`; fungsi tidak boleh bergantung pada animasi.
- Loading state memakai skeleton sederhana atau indikator progress yang jelas, tidak menggunakan animasi dekoratif yang mengganggu.

## 4. Navigasi dan Struktur Layout

### 4.1 Navigasi member

Navigasi utama mobile terdiri dari empat tujuan:

1. **Beranda** — ringkasan dashboard dan pintasan ke check-in/kartu member.
2. **Aktivitas** — riwayat check-in serta riwayat rekomendasi.
3. **Rekomendasi** — workout split dan target makronutrisi.
4. **Profil** — profil kebugaran serta pengaturan akun yang memang tersedia di scope.

Gunakan bottom navigation yang tetap mudah ditemukan pada layar ponsel. Setiap item memiliki ikon dan label teks. Beri indikator aktif yang jelas melalui bentuk/warna/teks, bukan warna saja. Perhatikan safe area sistem Android dan pastikan konten terakhir tidak tertutup navigasi.

Check-in dan kartu member bukan tab utama tersendiri pada MVP awal; akses keduanya melalui pintasan dashboard dan/atau tautan yang relevan dari area member. Jangan menambahkan tab baru tanpa meninjau kebutuhan dan ruang pada viewport kecil.

### 4.2 Pola halaman

- **Dashboard:** sapaan singkat, ringkasan status demo, metrik absensi, aksi check-in yang mudah ditemukan, dan pintasan rekomendasi. Batasi jumlah kartu dalam area awal.
- **Profil:** ringkasan identitas demo terpisah dari form preferensi latihan; tombol simpan terlihat dan status perubahan jelas.
- **Kartu member:** desain seperti kartu identitas digital tetapi selalu memiliki teks jelas “DEMO — BUKAN KARTU KEANGGOTAAN RESMI”. Jangan meniru elemen keamanan kartu resmi.
- **Check-in:** jelaskan bahwa aksi merupakan simulasi, tunjukkan konfirmasi hanya setelah backend merespons sukses, dan sediakan tautan menuju riwayat.
- **Rekomendasi:** pisahkan workout split dan target makro menjadi bagian yang mudah dipindai. Tampilkan metode/status hasil dekat judul hasil, bukan tersembunyi di catatan bawah.
- **Aktivitas:** daftar waktu terbaru ke terlama dengan label jenis aktivitas dan status metode bila relevan.
- **Login:** satu kolom, fokus ke kredensial dan tindakan masuk. Hindari promosi, formulir panjang, atau field yang tidak diperlukan.

### 4.3 Layout responsif

| Viewport | Perilaku |
|---|---|
| `320–359 px` | Satu kolom; padding horizontal 16 px; kartu statistik ditumpuk bila dua kolom menyebabkan teks sempit. |
| `360–479 px` | Target utama Android; satu kolom untuk konten inti dan dua kolom hanya untuk metrik pendek. Bottom nav empat item. |
| `480–767 px` | Konten dapat sedikit melebar; pertahankan urutan membaca satu kolom untuk form dan penjelasan panjang. |
| `768–1023 px` | Gunakan area konten terpusat dan grid dua kolom jika meningkatkan pemindaian. Navigasi dapat berubah menjadi rail/sidebar ringkas hanya jika implementasinya konsisten. |
| `1024 px ke atas` | Konten memiliki lebar maksimum yang nyaman; hindari baris teks yang terlalu panjang. Dashboard boleh memakai beberapa kolom, tetapi hierarki mobile tetap menjadi acuan. |

- Gunakan breakpoint Tailwind secara konsisten dan dokumentasikan override khusus bila memang diperlukan.
- Jangan menetapkan lebar halaman menggunakan nilai tetap yang menyebabkan scroll horizontal.
- Pada desktop, bottom nav boleh diganti dengan navigasi yang sesuai, tetapi item dan nama rute harus sama.
- Pastikan keyboard virtual Android tidak menutupi field aktif atau tombol submit. Field yang sedang diedit harus tetap dapat discroll ke area terlihat.
- Jangan mensyaratkan hover; semua fungsi harus bekerja dengan sentuh, keyboard, dan pembaca layar yang didukung.

## 5. Komponen UI dan Perilakunya

### 5.1 Tombol

| Variant | Penggunaan | Aturan |
|---|---|---|
| `Primary` | Satu aksi utama pada satu konteks, misalnya “Simpan profil” atau “Check-in demo”. | Latar kuning neon, teks gelap, tinggi minimum 48 px pada layar sentuh. |
| `Secondary` | Aksi pendamping, misalnya “Lihat riwayat”. | Permukaan gelap atau transparan dengan border terlihat dan teks utama. |
| `Tertiary/Ghost` | Aksi ringan seperti kembali atau tautan sekunder. | Tanpa latar dominan; tetap mempunyai area target sentuh yang memadai. |
| `Danger` | Tindakan destruktif jika kelak di scope. | Gaya error, teks tindakan eksplisit, konfirmasi jika berdampak signifikan. |

State wajib: `default`, `pressed`, `focus-visible`, `disabled`, `loading`, dan `success/error` pada konteks operasi. Saat loading, cegah submit ganda dan pertahankan label yang menjelaskan proses. Jangan menyatakan berhasil sebelum backend mengonfirmasi.

### 5.2 Form dan field

- Setiap field memiliki label permanen; placeholder bukan pengganti label.
- Tampilkan satuan dan format yang diharapkan dekat field, misalnya `Berat badan (kg)`.
- Validasi saat blur atau submit dengan bahasa yang membantu, bukan hanya “Input salah”. Pertahankan nilai yang sudah dimasukkan bila server mengembalikan error yang bisa diperbaiki.
- Hubungkan pesan error dengan field terkait. Tandai error menggunakan teks dan indikator visual, bukan merah saja.
- Gunakan input type dan keyboard yang sesuai pada Android; hindari memaksa keyboard numerik untuk kolom yang memerlukan tanda atau desimal bila itu menyulitkan input sah.
- Batasi field pada data yang dibutuhkan PRD. Input tambahan untuk formula nutrisi memerlukan justifikasi metodologis dan persetujuan scope.
- Tombol simpan menunjukkan state `pristine`, `dirty`, `validating`, `submitting`, `saved`, atau `failed` sesuai keadaan yang benar.
- Sebelum navigasi meninggalkan form yang memiliki perubahan belum disimpan, beri peringatan yang jelas jika risiko kehilangan data nyata.

### 5.3 Kartu, metrik, dan status

- Kartu standar menggunakan `color.bg.surface`, border default, radius 16 px, padding 16 px, dan jarak internal konsisten.
- Kartu metrik menampilkan label, angka, satuan, serta periode atau konteks. Hindari grafik dekoratif jika satu angka sudah cukup.
- Badge status selalu memuat teks yang bermakna, seperti `DEMO`, `BASELINE`, `MODEL DIEVALUASI`, atau `GAGAL`. Jangan menyimpulkan status model hanya dari warna.
- Badge kecil tidak boleh menjadi satu-satunya penjelasan untuk klaim penting; sertakan keterangan singkat pada layar hasil.
- Tampilkan timestamp dengan format yang konsisten dan zona waktu lokal aplikasi. Hindari istilah waktu yang membingungkan tanpa tanggal pendukung.

### 5.4 Status metode rekomendasi

Gunakan empat keadaan konseptual; tampilkan hanya keadaan yang sesuai implementasi aktual:

| Status | Penanda UI | Isi penjelasan |
|---|---|---|
| Demo/mock | `DEMO` | “Contoh tampilan untuk demonstrasi; bukan prediksi model.” |
| Baseline | `BASELINE` | Menjelaskan metode aturan/perhitungan yang benar-benar digunakan. |
| Model kandidat belum layak | `MODEL BELUM TERSEDIA` | Hasil ML belum tersedia; tampilkan baseline/demo jika ada dan tandai metodenya. |
| Model terlatih dan dievaluasi | Label hanya setelah bukti implementasi tersedia | Tampilkan metode/model version dan ringkasan metrik yang benar-benar terukur. Jangan menyebut “valid” hanya karena training selesai. |

Jangan menampilkan badge “AI”, “akurat”, atau “personalized by Random Forest” pada hasil mock. Penjelasan hasil harus menyebut data/input relevan, alasan ringkas jika tersedia, metode, dan batasan. Rekomendasi latihan nyata memerlukan tinjauan pelatih yang kompeten; estimasi makro bukan nasihat medis.

### 5.5 Empty, loading, success, dan error

- **Empty:** jelaskan mengapa belum ada konten dan satu tindakan berikutnya bila tersedia. Contoh: “Belum ada check-in demo” dengan tombol “Coba check-in demo”.
- **Loading:** gunakan skeleton atau indikator pada area yang sedang dimuat; hindari membuat layout melompat drastis. Untuk aksi tombol, tampilkan progres pada tombol terkait.
- **Success:** nyatakan hasil operasi setelah server mengonfirmasi, misalnya “Profil berhasil disimpan”. Jangan gunakan notifikasi sukses untuk perubahan yang baru terjadi di state lokal.
- **Error:** gunakan bahasa yang dapat ditindaklanjuti, pertahankan input, sediakan retry bila masuk akal, dan jangan bocorkan stack trace, SQL, atau detail internal.
- **Offline/network error:** bedakan dari input yang tidak valid. Jangan tampilkan data lokal lama sebagai data terkini tanpa penanda.
- **Unauthorized/session expired:** minta pengguna masuk kembali dengan pesan yang jelas; jangan tampilkan konten terlindungi setelah sesi berakhir.
- **Partial data:** tampilkan komponen yang berhasil dimuat bila aman, dan jelaskan bagian yang gagal tanpa mengarang nilai.

## 6. Panduan Visual per Fitur

### 6.1 Dashboard

Urutan prioritas visual:

1. Identitas/sapaan member dan judul halaman.
2. Status keanggotaan demo yang jelas.
3. Ringkasan kehadiran dengan periode/konteks.
4. Satu aksi utama yang relevan, seperti check-in demo.
5. Pintasan ke kartu member, rekomendasi, dan riwayat.

Tidak perlu menampilkan semua data profil pada dashboard. Hindari menampilkan berat dan tinggi badan di area pembuka jika tidak dibutuhkan oleh tugas utama. Gunakan grafik hanya bila menambah informasi yang bisa ditindaklanjuti.

### 6.2 Profil

- Bedakan informasi identitas tampilan dari preferensi dan data tubuh.
- Beri label jelas untuk tujuan latihan, pengalaman, hari latihan per minggu, tinggi dan berat badan.
- Jelaskan tujuan data tubuh secara singkat dan jangan gunakan bahasa yang menghakimi bentuk tubuh.
- Jangan mengasumsikan nilai yang belum diisi. Tampilkan “Belum diisi” dan minta input hanya ketika diperlukan.

### 6.3 Kartu dan check-in demo

- Penanda DEMO harus cukup dekat dan cukup kontras dengan identitas kartu; jangan menyembunyikannya di tooltip atau footer kecil.
- Check-in menampilkan kondisi awal, proses, hasil sukses/gagal, dan waktu yang dikembalikan server.
- Jika check-in dibatasi per periode, jelaskan alasan penolakan secara ramah dan konsisten dengan aturan backend.
- QR code hanya boleh ditampilkan sebagai demonstrasi jika diberi label jelas dan tidak terlihat sebagai mekanisme absensi resmi. Implementasi operasional memerlukan persetujuan owner serta rancangan verifikasi yang terpisah.

### 6.4 Rekomendasi workout split

- Tampilkan kategori workout split, jumlah hari yang digunakan sebagai input, dan ringkasan penjelasan yang relevan.
- Jangan menampilkan jadwal latihan terperinci sebagai rekomendasi profesional jika konten tersebut belum ditinjau oleh pelatih.
- Pisahkan hasil rekomendasi dari disclaimer; disclaimer tetap mudah ditemukan tanpa mendominasi seluruh layar.
- Jika output kosong atau model belum tersedia, jelaskan keadaan dan jangan menggantinya dengan hasil acak yang tampak personal.

### 6.5 Target makronutrisi

- Tampilkan satuan gram per hari serta label `Estimasi baseline` selama yang digunakan adalah baseline.
- Jelaskan input dan metode yang digunakan pada layar yang sama atau melalui detail yang jelas dijangkau.
- Jangan tampilkan presisi palsu: pembulatan harus mengikuti metode dan kualitas input, lalu dijelaskan secara konsisten.
- Hindari diagram lingkaran kecil yang sulit dibaca; angka dan label sederhana menjadi pilihan awal.
- Sertakan batasan bahwa hasil bukan pengganti konsultasi ahli gizi/tenaga kesehatan.

### 6.6 Riwayat aktivitas

- Kelompokkan atau bedakan check-in dan rekomendasi menggunakan label, ikon, atau filter yang jelas.
- Urutkan terbaru ke terlama.
- Untuk hasil rekomendasi, simpan/display metode dan waktu pembuatan jika informasi itu tersedia.
- Empty state tidak boleh menyiratkan bahwa pengguna belum pernah berlatih di gym sungguhan; gunakan istilah “belum ada aktivitas tercatat di aplikasi/demo”.

## 7. Aksesibilitas dan Usability

- Targetkan WCAG 2.2 AA untuk kontras teks dan interaksi sejauh relevan dengan aplikasi web.
- Gunakan struktur heading berurutan, landmark yang benar, label kontrol yang terhubung, dan urutan fokus yang logis.
- Pastikan semua fungsi inti dapat digunakan dengan keyboard tanpa jebakan fokus; sediakan indikator `focus-visible` yang jelas.
- Target sentuh ideal 44 × 44 CSS px atau lebih; tombol utama sekurangnya 48 px tinggi bila sesuai layout. Beri jarak yang cukup antar kontrol berdekatan.
- Jangan memakai warna sebagai satu-satunya pembeda status; tambah teks, ikon bermakna, atau pola visual lain.
- Pastikan zoom teks/browser tidak memotong tombol, label, atau navigasi. Jangan mengunci zoom halaman.
- Berikan teks alternatif pada gambar informatif; gunakan alt kosong pada gambar dekoratif.
- Gunakan bahasa sederhana dalam Bahasa Indonesia. Akronim teknis dijelaskan ketika ditujukan kepada member.
- Pengumuman status dinamis seperti simpan berhasil/error perlu dapat dikenali teknologi bantu, tetapi jangan memindahkan fokus secara tidak terduga.
- Uji tampilan minimal pada viewport 320 px dan 360 px, pembesaran teks, navigasi keyboard, dan kombinasi kontras utama.

## 8. Format dan Konsistensi Konten

- Gunakan Bahasa Indonesia untuk label dan pesan UI, kecuali istilah brand atau istilah kebugaran yang lazim. Konsisten antara “check-in”, “riwayat”, “target makronutrisi”, dan “workout split”.
- Format tinggi menggunakan cm, berat kg, serta target makro gram/hari jika sesuai metode yang dipilih.
- Format tanggal/waktu konsisten dalam konteks Indonesia; gunakan zona waktu aplikasi yang ditetapkan implementasi.
- Gunakan kalimat singkat dengan kata kerja yang jelas pada tombol: “Simpan profil”, “Lihat riwayat”, “Coba check-in demo”.
- Jangan menggunakan teks yang menakut-nakuti, menghakimi bentuk tubuh, atau berjanji bahwa hasil kebugaran pasti tercapai.
- Semua konten placeholder yang terlihat saat demo harus ditandai sebagai contoh jika dapat disalahartikan sebagai data nyata.

## 9. Konsistensi Implementasi Visual

- Gunakan token pada bagian 3 sebagai acuan utama. Hindari nilai warna, spacing, radius, dan shadow acak yang tersebar di komponen.
- Styling memakai **Tailwind CSS** sesuai keputusan Phase 0. Token proyek dipetakan ke konfigurasi/theme atau CSS variables yang terpusat; jangan membangun sistem styling kedua tanpa alasan yang disetujui.
- Buat komponen bersama hanya untuk pola berulang yang benar-benar konsisten, seperti `Button`, `FormField`, `StatusBadge`, `MetricCard`, `PageHeader`, `EmptyState`, dan `BottomNavigation`. Ini adalah usulan pola komponen, bukan kewajiban menambah library komponen eksternal.
- Gunakan satu sumber untuk label status metode agar `DEMO`, `BASELINE`, dan status model tidak berbeda antarhalaman.
- Responsif, aksesibilitas, serta state operasi harus dipertimbangkan saat komponen dibuat, bukan ditempelkan setelah visual selesai.
- Jangan menambahkan framework UI atau animasi tambahan tanpa kebutuhan nyata dan persetujuan scope.

## 10. Checklist Review UI

Sebelum halaman dianggap siap ditinjau, periksa:

- [ ] Tampilan berfungsi pada viewport 320, 360, dan 390 px tanpa scroll horizontal yang tidak perlu.
- [ ] Aksi utama jelas dan mudah dijangkau dengan satu tangan.
- [ ] Hierarki heading, padding, spacing, radius, dan typography mengikuti token.
- [ ] Kontras teks dan fokus telah diperiksa; status tidak bergantung pada warna saja.
- [ ] Semua field memiliki label, unit bila perlu, validasi, dan pesan error yang jelas.
- [ ] Empty, loading, success, error, dan sesi berakhir ditangani bila relevan.
- [ ] Data demo, baseline, atau output model ditandai dengan tepat.
- [ ] Tidak ada status membership resmi atau prediksi ML yang belum terbukti.
- [ ] Konten dan tindakan tidak tertutup keyboard virtual atau safe area perangkat.
- [ ] Perubahan tampilan tidak menambah scope atau bertentangan dengan `PRD.md`.

## 11. Keputusan yang Masih Terbuka

Hal berikut belum menjadi fakta atau keputusan final dan tidak boleh ditebak selama implementasi:

- Logo resmi Trisis Gym, aset brand yang boleh digunakan, dan izin penggunaannya.
- Font brand resmi, bila ada; sementara gunakan stack sans-serif sistem pada bagian 3.2.
- Copywriting final, istilah operasional gym, serta sumber status membership yang sah.
- Formula baseline makronutrisi, input tambahannya, dan sumber metodologis yang akan disetujui.
- Bentuk/isi detail rekomendasi yang telah ditinjau pelatih.
- Hasil usability test atau audit aksesibilitas aktual; pedoman ini menetapkan target, bukan menyatakan semua pengujian sudah lulus.

## 12. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1 | 12 Oktober 2026 | Draft pertama design principles, tokens, navigasi, komponen, state, aksesibilitas, dan responsif berdasarkan PRD serta keputusan Phase 0. | Draft awal |
| 1.0 | 12 Oktober 2026 | Persetujuan Phase 2 tercatat; audit Phase 4 menyelaraskan status metadata dan referensi silang tanpa mengubah keputusan desain. | Disetujui pengguna |


**Status persetujuan:** UI-GUIDELINE.md telah disetujui pada Phase 2 dan diaudit pada Phase 4. Pedoman ini mengatur pengalaman dan tampilan UI; persetujuannya tidak memberi izin untuk memperluas scope atau memulai coding sebelum Phase 6 disetujui.
