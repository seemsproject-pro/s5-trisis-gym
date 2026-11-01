/**
 * Google Gemini API Service — Trisis Gym Member App
 * Menyediakan integrasi cerdas dengan Google Gemini API (gemini-1.5-flash)
 * untuk analisis program latihan personal, rekomendasi menu makan dinamis,
 * serta fitur interaktif konsultasi kebugaran dengan Coach Trisis AI.
 */

const STORAGE_KEY = 'trisis_gemini_api_key';
const GEMINI_MODEL = 'gemini-1.5-flash';

/**
 * Mengambil API key Gemini dari localStorage atau environment variable
 * @returns {string} API key aktif atau string kosong
 */
export function getGeminiApiKey() {
  const localKey = localStorage.getItem(STORAGE_KEY);
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

/**
 * Menyimpan API key Gemini ke localStorage
 * @param {string} key 
 */
export function saveGeminiApiKey(key) {
  if (!key) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

/**
 * Menghapus API key Gemini dari localStorage
 */
export function removeGeminiApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Memeriksa apakah API key Gemini telah terpasang
 * @returns {boolean}
 */
export function isGeminiKeyConfigured() {
  const key = getGeminiApiKey();
  return Boolean(key && key.length > 5);
}

/**
 * Menguji koneksi Gemini API dengan key yang diberikan
 * @param {string} apiKey 
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function testGeminiConnection(apiKey) {
  const keyToTest = apiKey || getGeminiApiKey();
  if (!keyToTest) {
    return { success: false, message: 'API key Gemini belum dimasukkan.' };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${keyToTest}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'Halo Gemini! Jawab dengan satu kata saja: Terhubung.' }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `HTTP ${response.status}: Gagal terhubung ke Gemini API`;
      return { success: false, message: msg };
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { 
      success: true, 
      message: reply ? `Koneksi Gemini API berhasil! (${reply.trim()})` : 'Koneksi Gemini API berhasil!' 
    };
  } catch (err) {
    return { 
      success: false, 
      message: err.message || 'Gagal menghubungi server Google Gemini API. Periksa koneksi internet.' 
    };
  }
}

/**
 * Memanggil Gemini API untuk menghasilkan analisis personal mendalam
 * terkait program split latihan dan menu nutrisi harian member
 * @param {Object} params - { profile, workoutSplit, macroEstimates }
 * @returns {Promise<{ success: boolean, source: 'GEMINI' | 'FALLBACK', text: string }>}
 */
export async function generateGeminiCoachAnalysis({ profile, workoutSplit, macroEstimates }) {
  const apiKey = getGeminiApiKey();

  // Prompt sistem yang kaya konteks kebugaran & Trisis Gym Bogor
  const prompt = `
Anda adalah "Coach Trisis AI", pelatih kebugaran dan nutrisionis bersertifikat di Trisis Gym (Est. Bogor, Indonesia).
Analisis data biometrik dan program anggota gym berikut:

[PROFIL MEMBER]
- Nama: ${profile.fullName || profile.name || 'Member Trisis'}
- Usia: ${profile.age || 23} tahun
- Gender: ${profile.gender === 'female' ? 'Wanita' : 'Pria'}
- Berat Badan: ${profile.weight || profile.weightKg || 68} kg
- Tinggi Badan: ${profile.height || profile.heightCm || 172} cm
- BMI: ${profile.bmi || ((profile.weight || 68) / Math.pow((profile.height || 172) / 100, 2)).toFixed(1)}
- Body Fat: ${profile.bodyFatPercent ? profile.bodyFatPercent + '%' : 'Standar'}
- Tujuan Kebugaran: ${profile.fitnessGoal}
- Tingkat Pengalaman: ${profile.experienceLevel}
- Frekuensi Latihan: ${profile.daysPerWeek} hari/minggu

[PROGRAM LATIHAN TERPILIH]
- Kategori Split: ${workoutSplit.splitName}
- Deskripsi: ${workoutSplit.description}

[TARGET NUTRISI HARIAN]
- Target Kalori: ${macroEstimates.targetCalories} kkal/hari
- Protein: ${macroEstimates.macros.protein.grams} g (${macroEstimates.macros.protein.percentage}%)
- Karbohidrat: ${macroEstimates.macros.carbs.grams} g (${macroEstimates.macros.carbs.percentage}%)
- Lemak: ${macroEstimates.macros.fat.grams} g (${macroEstimates.macros.fat.percentage}%)

Instruksi format respon:
Berikan analisis mendalam, hangat, terstruktur dan memotivasi dalam Bahasa Indonesia menggunakan format markdown:
1. **🔍 Evaluasi Biometrik & Kesesuaian Program**: Mengapa split ${workoutSplit.splitName} dan target ${macroEstimates.targetCalories} kkal ini tepat untuk profilnya.
2. **🥗 Strategi Makronutrisi & Jam Makan**: Tips mengatur 4 waktu makan (sarapan, makan siang, pre-workout snack, makan malam recovery) agar energi stabil.
3. **🛒 Variasi Bahan Makanan Lokal Murah & Bergizi**: Rekomendasi alternatif makanan lokal bergizi ramah budget (ayam, tempe, tahu, ikan tongkol/nila, telur, pisang, sayuran).
4. **🏋️ Tips Latihan & Progresif Overload di Trisis Gym**: Panduan aman menaikkan intensitas latihan dan menjaga form agar terhindar dari cedera.
5. **⚡ Pesan Semangat Coach**: Kalimat pemacu konsistensi.

Gunakan bahasa yang profesional namun bersahabat, ramah anak muda/mahasiswa, jelas dan actionable.
`;

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return {
            success: true,
            source: 'GEMINI',
            text: generatedText
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart local template:', err);
    }
  }

  // Fallback respons cerdas lokal jika tanpa API key atau offline
  return {
    success: true,
    source: 'FALLBACK',
    text: generateFallbackCoachAnalysis({ profile, workoutSplit, macroEstimates })
  };
}

/**
 * Mengirim pertanyaan interaktif ke Coach Trisis AI (Gemini)
 * @param {string} question - Pertanyaan pengguna
 * @param {Object} context - { profile, workoutSplit, macroEstimates }
 * @param {Array} history - Riwayat percakapan sebelumnya [{ role: 'user'|'model', text: string }]
 * @returns {Promise<{ success: boolean, source: 'GEMINI' | 'FALLBACK', reply: string }>}
 */
export async function askGeminiCoach(question, context, history = []) {
  const apiKey = getGeminiApiKey();

  const systemInstruction = `Anda adalah "Coach Trisis AI", pelatih kebugaran dan nutrisionis ramah di Trisis Gym (Est. Bogor, Indonesia). 
Profil anggota: ${context?.profile?.fullName || 'Member'}, Goal: ${context?.profile?.fitnessGoal || 'Kebugaran Umum'}, Target Kalori: ${context?.macroEstimates?.targetCalories || 2200} kkal, Split: ${context?.workoutSplit?.splitName || 'Upper/Lower'}.
Jawab pertanyaan member dengan ringkas, ramah, berbasis sains olahraga praktis, dan bahasa Indonesia yang mudah dipahami.`;

  if (apiKey) {
    try {
      const formattedHistory = history.map((item) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nPertanyaan: ${question}` }]
        }
      ];

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return {
            success: true,
            source: 'GEMINI',
            reply
          };
        }
      }
    } catch (err) {
      console.warn('Gemini chat failed, using local smart response:', err);
    }
  }

  // Fallback local smart response jika offline/no key
  return {
    success: true,
    source: 'FALLBACK',
    reply: generateFallbackChatResponse(question, context)
  };
}

/**
 * Template analisis coach cerdas lokal saat API key belum diisi
 */
function generateFallbackCoachAnalysis({ profile, workoutSplit, macroEstimates }) {
  const goalLabel = 
    profile.fitnessGoal === 'fat_loss' ? 'Penurunan Lemak Tubuh (Fat Loss)' :
    profile.fitnessGoal === 'muscle_building' ? 'Membangun Massa Otot (Hypertrophy)' : 'Kebugaran Umum & Stamina';

  const memberName = profile.fullName || profile.name || 'Sobat Trisis';
  const heightVal = profile.height || profile.heightCm || 172;
  const weightVal = profile.weight || profile.weightKg || 68;

  return `### 🔍 Evaluasi Biometrik & Kesesuaian Program
Halo **${memberName}**! Dengan target utama **${goalLabel}**, tinggi **${heightVal} cm** dan berat **${weightVal} kg**, program latihan **${workoutSplit.splitName}** sangat ideal untuk frekuensi **${profile.daysPerWeek} hari per minggu**.

Format ini memberikan stimulus optimal per kelompok otot tanpa membebani sistem saraf pusat, sehingga proses recovery berjalan maksimal.

---

### 🥗 Strategi Makronutrisi & Jam Makan (${macroEstimates.targetCalories} kkal)
- **Target Protein (${macroEstimates.macros.protein.grams}g)**: Prioritaskan pembagian protein merata di 4 sesi makan (masing-masing 30-40g). Ini menjaga muscle protein synthesis (MPS) tetap aktif sepanjang hari.
- **Pre-Workout Booster (16.30 - 17.00)**: Pastikan konsumsi karbohidrat mudah serap seperti roti gandum selai kacang atau pisang 45 menit sebelum latihan di Trisis Gym agar tenaga tidak drop.
- **Recovery Malam (19.30 - 20.30)**: Isi kembali glikogen otot dengan sumber karbohidrat alami (ubi jalar atau kentang kukus) dan protein hewani rendah lemak.

---

### 🛒 Variasi Pangan Ramah Kantong Sehari-hari
Jika bosan dengan dada ayam fillet, variasikan dengan bahan lokal terjangkau:
- **Telur Utuh + Putih Telur**: Murah meriah, bioavailabilitas protein sangat tinggi.
- **Tempe & Tahu Bacem/Kukus**: Sumber protein nabati kaya isoflavon dan serat mikro.
- **Ikan Tongkol atau Nila**: Alternatif ikan segar pasar lokal yang kaya omega-3 esensial.

---

### 🏋️ Tips Progresif Overload di Trisis Gym
- **Prioritaskan Teknik Sebelum Beban**: Pastikan rentang gerak (full range of motion) terkendali sebelum menambah beban.
- **Catat Beban Setiap Sesi**: Tambah 1 repetisi atau 1-2 kg setiap 1-2 minggu untuk memicu hipertrofi berkelanjutan.

---

> 💡 *Catatan: Anda dapat memasukkan Google Gemini API Key Anda sendiri melalui tombol "Atur API Key" di atas untuk mendapatkan analisis personal live real-time dari model Gemini 1.5 Flash!*`;
}

/**
 * Respon chatbot lokal saat tidak ada API key
 */
function generateFallbackChatResponse(question, context) {
  const q = question.toLowerCase();
  const calories = context?.macroEstimates?.targetCalories || 2200;

  if (q.includes('istirahat') || q.includes('jeda') || q.includes('rest')) {
    return 'Untuk latihan hypertrophy (massa otot), jeda istirahat ideal adalah 90-120 detik antar set gerakan compound (Bench Press, Squat) dan 60-90 detik untuk gerakan isolasi (Biceps Curl, Lateral Raise). Ini memberi waktu bagi cadangan ATP-CP untuk pulih.';
  }
  if (q.includes('ayam') || q.includes('dada ayam') || q.includes('ganti') || q.includes('substitusi')) {
    return 'Tentu! Alternatif pengganti dada ayam yang sama tingginya dalam protein: 100g dada ayam sebanding dengan 4 butir putih telur + 1 telur utuh, 120g ikan nila/tongkol, atau 150g tempe kedelai padat.';
  }
  if (q.includes('kopi') || q.includes('pre workout') || q.includes('minum')) {
    return 'Kopi hitam tanpa gula 30-45 menit sebelum latihan sangat bagus! Kafein alami meningkatkan fokus saraf, kewaspadaan, dan daya tahan otot selama mengangkat beban di Trisis Gym.';
  }
  if (q.includes('nasi') || q.includes('karbo') || q.includes('padang')) {
    return `Makan nasi padang sesekali tidak masalah asalkan tetap masuk dalam jatah ${calories} kkal Anda! Trik cerdas: pilih lauk ayam bakar/pop (bukan goreng berlemak jenuh), kurangi siraman kuah santan pekat, dan tambahkan porsi lalapan daun singkong.`;
  }

  return `Pertanyaan yang bagus seputar kebugaran! Untuk menjaga hasil latihan optimal di Trisis Gym dengan target ${calories} kkal, kuncinya adalah konsistensi pemenuhan target protein harian dan tidur berkualitas minimal 7-8 jam per malam. Ada yang ingin ditanyakan lebih spesifik seputar gerakan atau menu makan?`;
}
