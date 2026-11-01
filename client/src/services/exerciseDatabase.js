/**
 * Exercise Database — Trisis Gym Member App
 * Database panduan gerakan latihan, anatomi otot primer/sekunder, parameter set/reps,
 * instruksi teknik eksekusi, dan video tutorial.
 */

export const EXERCISE_DATABASE = {
  'Bench Press': {
    name: 'Flat Barbell Bench Press',
    category: 'Push (Dada)',
    equipment: 'Barbell & Flat Bench',
    primaryMuscles: ['Dada Utama (Pectoralis Major)'],
    secondaryMuscles: ['Bahu Depan (Anterior Deltoid)', 'Triceps Brachii'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    restSeconds: '90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/rT7DgCr-3pg',
    steps: [
      'Berbaring di bench datar dengan mata sejajar tepat di bawah barbel.',
      'Genggam barbel sedikit lebih lebar dari lebar bahu, tarik bahu ke belakang dan ke bawah (retract scapula).',
      'Turunkan barbel terkontrol ke bagian tengah dada (sekitar puting susu), jaga sudut siku ~45-70 derajat.',
      'Dorong barbel kembali ke atas dengan mengontraksikan otot dada tanpa mengunci siku secara ekstrem.'
    ],
    tips: 'Kaki harus menapak kokoh di lantai untuk menghasilkan leg drive yang stabil.'
  },
  'Barbell Bench Press': {
    name: 'Barbell Bench Press',
    category: 'Push (Dada)',
    equipment: 'Barbell & Flat Bench',
    primaryMuscles: ['Dada Utama (Pectoralis Major)'],
    secondaryMuscles: ['Bahu Depan (Anterior Deltoid)', 'Triceps Brachii'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '6 - 10 Repetisi',
    restSeconds: '90 - 120 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/rT7DgCr-3pg',
    steps: [
      'Posisikan badan di flat bench dengan 5 titik tumpuan (kepala, punggung atas, bokong, kaki kanan, kaki kiri).',
      'Tarik skapula ke belakang dan kencangkan otot punggung atas.',
      'Tarik napas dalam, turunkan beban secara perlahan hingga menyentuh dada secara lembut.',
      'Dorong ke atas sambil menghembuskan napas kuat.'
    ],
    tips: 'Hindari memantulkan barbel dari tulang dada.'
  },
  'Incline DB Press': {
    name: 'Incline Dumbbell Press',
    category: 'Push (Dada Atas)',
    equipment: 'Dumbbell & Incline Bench (30-45°)',
    primaryMuscles: ['Dada Bagian Atas (Clavicular Pectoralis)'],
    secondaryMuscles: ['Bahu Depan (Anterior Deltoid)', 'Triceps'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 12 Repetisi',
    restSeconds: '60 - 90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/8iPEnn-ltC8',
    steps: [
      'Atur kemiringan bench pada sudut 30 hingga 45 derajat.',
      'Bawa dumbel ke posisi awal di samping dada bagian atas dengan telapak tangan menghadap ke depan.',
      'Dorong dumbel ke atas mengikuti lengkungan alami hingga dumbel hampir bertemu di atas dada.',
      'Turunkan kembali dumbel secara perlahan hingga merasakan regangan pada otot dada atas.'
    ],
    tips: 'Kemiringan bench jangan terlalu tegak (>45°) agar fokus tidak bergeser ke bahu.'
  },
  'Dumbbell Shoulder Press': {
    name: 'Seated Dumbbell Shoulder Press',
    category: 'Push (Bahu)',
    equipment: 'Dumbbells & 90° Bench',
    primaryMuscles: ['Bahu Depan & Samping (Anterior & Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Trapezius Atas'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    restSeconds: '60 - 90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/qEwKCR5JCog',
    steps: [
      'Duduk tegak dengan punggung menempel erat pada sandaran kursi.',
      'Angkat dumbel setinggi telinga dengan siku membentuk sudut 90 derajat.',
      'Dorong dumbel lurus ke atas hingga lengan hampir lurus di atas kepala.',
      'Turunkan dumbel terkendali kembali ke ketinggian telinga.'
    ],
    tips: 'Kunci otot perut (core) agar pinggang tidak melengkung secara berlebihan.'
  },
  'Triceps Rope Pushdown': {
    name: 'Cable Triceps Rope Pushdown',
    category: 'Push (Trisep)',
    equipment: 'Cable Machine & Tali Rope',
    primaryMuscles: ['Triceps (Lateral & Medial Head)'],
    secondaryMuscles: ['Otot Lengan Bawah (Forearms)'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '12 - 15 Repetisi',
    restSeconds: '60 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/vB5OHsJ3EME',
    steps: [
      'Berdiri menghadap cable machine dengan tali terpasang di pulley atas.',
      'Posisikan siku terkunci rapat di samping pinggang sepanjang gerakan.',
      'Dorong tali ke bawah dan pisahkan ujung tali di bagian bawah untuk kontraksi puncak.',
      'Kembali ke posisi awal perlahan sampai lengan bawah sejajar lantai.'
    ],
    tips: 'Jangan biarkan siku bergerak maju-mundur; hanya lengan bawah yang bergerak.'
  },
  'Barbell Deadlift': {
    name: 'Conventional Barbell Deadlift',
    category: 'Pull (Rantai Posterior)',
    equipment: 'Olympic Barbell & Weight Plates',
    primaryMuscles: ['Punggung Bawah (Erector Spinae)', 'Gluteus (Bokong)', 'Hamstrings'],
    secondaryMuscles: ['Punggung Atas (Latissimus & Traps)', 'Core & Forearms'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '5 - 8 Repetisi',
    restSeconds: '120 - 180 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/op9kVnSso6Q',
    steps: [
      'Berdiri dengan telapak kaki selebar pinggul, barbel tepat di atas pertengahan telapak kaki.',
      'Engsel pinggul ke belakang, pegang barbel dengan punggung lurus dan dada dibusungkan.',
      'Tarik napas dalam, dorong lantai dengan kaki sambil menarik barbel meluncur dekat tulang kering.',
      'Kunci pinggul di puncak gerakan tanpa membusungkan pinggang ke belakang secara berlebihan.'
    ],
    tips: 'Jaga tulang punggung selalu dalam posisi netral (tidak membungkuk).'
  },
  'Pull-up / Lat Pulldown': {
    name: 'Cable Lat Pulldown / Pull-up',
    category: 'Pull (Punggung Lebar)',
    equipment: 'Cable Machine Wide Bar / Pull-Up Bar',
    primaryMuscles: ['Sayap Punggung (Latissimus Dorsi)'],
    secondaryMuscles: ['Biceps Brachii', 'Rhomboids', 'Bahu Belakang'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    restSeconds: '60 - 90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/CAwf7n6Luuc',
    steps: [
      'Genggam palang dengan pegangan lebar, telapak tangan menghadap ke depan.',
      'Duduk dan kunci paha di bawah bantalan penahan.',
      'Tarik palang ke bawah menuju dada bagian atas dengan memeras tulang belikat ke bawah.',
      'Lepaskan beban perlahan ke atas hingga otot sayap terasa meregang penuh.'
    ],
    tips: 'Hindari mengayunkan badan terlalu jauh ke belakang.'
  },
  'Seated Cable Row': {
    name: 'Seated Cable Row',
    category: 'Pull (Ketebalan Punggung)',
    equipment: 'Cable Machine & V-Bar',
    primaryMuscles: ['Punggung Tengah (Rhomboids & Mid-Traps)'],
    secondaryMuscles: ['Latissimus Dorsi', 'Biceps'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 12 Repetisi',
    restSeconds: '60 - 90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/GZbfZ033f74',
    steps: [
      'Duduk dengan lutut sedikit ditekuk dan kaki bertumpu pada pijakan.',
      'Tarik pegangan ke arah perut bawah dengan siku ditarik ke belakang sedalam mungkin.',
      'Tahan kontraksi selama 1 detik, lalu kembalikan beban ke depan dengan terkendali.'
    ],
    tips: 'Pertahankan dada tetap tegak dan hindari membungkukkan punggung saat merentang.'
  },
  'Barbell Bicep Curl': {
    name: 'Standing Barbell Bicep Curl',
    category: 'Pull (Bisep)',
    equipment: 'EZ-Bar atau Straight Barbell',
    primaryMuscles: ['Biceps Brachii (Long & Short Head)'],
    secondaryMuscles: ['Brachialis', 'Otot Lengan Bawah'],
    recommendedSets: '3 Set',
    recommendedReps: '10 - 12 Repetisi',
    restSeconds: '60 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/kwG2ipFRgfo',
    steps: [
      'Berdiri tegak, pegang barbel selebar bahu dengan telapak tangan menghadap ke atas.',
      'Jaga siku tetap diam di sisi tubuh.',
      'Angkat barbel ke arah dada dengan hanya menggerakkan lengan bawah.',
      'Rem beban saat turun secara perlahan (fase eksentrik 2-3 detik).'
    ],
    tips: 'Hindari mengayunkan pinggang untuk mengangkat beban yang terlalu berat.'
  },
  'Barbell Squat': {
    name: 'Barbell Back Squat',
    category: 'Legs (Kaki Menyeluruh)',
    equipment: 'Squat Rack & Olympic Barbell',
    primaryMuscles: ['Paha Depan (Quadriceps)', 'Bokong (Gluteus Maximus)'],
    secondaryMuscles: ['Hamstrings', 'Betis (Calves)', 'Core & Abdominals'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    restSeconds: '90 - 120 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/bEv6CCg2BC8',
    steps: [
      'Posisikan barbel di punggung atas (otot trapezius), bukan di tulang leher.',
      'Buka kaki selebar bahu dengan ujung jari sedikit menyerong keluar.',
      'Tarik napas, tekuk pinggul dan lutut bersamaan seperti hendak duduk di kursi hingga paha minimal sejajar lantai.',
      'Dorong melalui seluruh telapak kaki untuk kembali berdiri tegak.'
    ],
    tips: 'Jaga lutut tetap sejajar dengan arah jari kaki; jangan biarkan lutut tertekuk ke dalam (valgus).'
  },
  'Romanian Deadlift': {
    name: 'Romanian Deadlift (RDL)',
    category: 'Legs (Paha Belakang)',
    equipment: 'Barbell atau Dumbbells',
    primaryMuscles: ['Paha Belakang (Hamstrings)', 'Bokong (Gluteus Maximus)'],
    secondaryMuscles: ['Erector Spinae (Punggung Bawah)'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 12 Repetisi',
    restSeconds: '75 - 90 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/JCXUYuzwNrM',
    steps: [
      'Pegang beban setinggi paha dengan lutut sedikit ditekuk lembut (soft bend).',
      'Dorong pinggul jauh ke belakang sambil menurunkan beban meluncur di sepanjang paha hingga tulang kering atas.',
      'Rasakan regangan kuat pada paha belakang saat beban berada di bawah lutut.',
      'Dorong pinggul kembali ke depan untuk kembali ke posisi awal.'
    ],
    tips: 'Gerakan ini adalah engsel pinggul (hip hinge), bukan jongkok (squat).'
  },
  'Leg Press': {
    name: '45-Degree Leg Press',
    category: 'Legs (Paha & Bokong)',
    equipment: 'Leg Press Machine',
    primaryMuscles: ['Quadriceps (Paha Depan)'],
    secondaryMuscles: ['Gluteus', 'Hamstrings'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 15 Repetisi',
    restSeconds: '75 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/IZxyjW7MPJQ',
    steps: [
      'Duduk di mesin leg press dengan punggung dan kepala menempel rata pada bantalan.',
      'Tempatkan kaki selebar bahu di platform depan.',
      'Buka kunci pengaman dan turunkan platform perlahan hingga lutut membentuk sudut 90 derajat.',
      'Dorong platform kembali ke atas tanpa mengunci sendi lutut.'
    ],
    tips: 'Jangan pernah mengunci lutut lurus secara tiba-tiba di bagian atas gerakan.'
  },
  'Plank': {
    name: 'Core Forearm Plank',
    category: 'Core (Perut & Stabilitas)',
    equipment: 'Matras Yoga',
    primaryMuscles: ['Otot Perut Dalam (Transverse Abdominis)', 'Rectus Abdominis'],
    secondaryMuscles: ['Bahu', 'Otot Gluteus', 'Punggung Bawah'],
    recommendedSets: '3 Set',
    recommendedReps: '30 - 60 Detik Tahan',
    restSeconds: '45 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/ASdvN_XEl_c',
    steps: [
      'Posisikan lengan bawah di lantai dengan siku tepat di bawah bahu.',
      'Luruskan kaki ke belakang dan topang tubuh pada ujung jari kaki.',
      'Kencangkan perut, bokong, dan paha agar tubuh membentuk satu garis lurus sempurna dari kepala hingga tumit.',
      'Bernapas teratur dan tahan posisi tanpa membiarkan pinggul melorot atau terangkat terlalu tinggi.'
    ],
    tips: 'Fokus pada kontraksi perut yang stabil dan pernapasan ritmis.'
  }
};

/**
 * Mencari data panduan latihan berdasarkan nama gerakan
 */
export function getExerciseDetails(exerciseName) {
  if (!exerciseName) return null;
  // Cek match langsung
  if (EXERCISE_DATABASE[exerciseName]) {
    return EXERCISE_DATABASE[exerciseName];
  }

  // Cek partial match
  const foundKey = Object.keys(EXERCISE_DATABASE).find(k => 
    exerciseName.toLowerCase().includes(k.toLowerCase()) || 
    k.toLowerCase().includes(exerciseName.toLowerCase())
  );

  if (foundKey) {
    return EXERCISE_DATABASE[foundKey];
  }

  // Fallback generik jika belum ada di database
  return {
    name: exerciseName,
    category: 'Latihan Terpandu',
    equipment: 'Standar Gym Trisis',
    primaryMuscles: ['Kelompok Otot Target'],
    secondaryMuscles: ['Otot Pendukung & Stabilitas'],
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    restSeconds: '60 Detik',
    videoUrl: 'https://www.youtube-nocookie.com/embed/rT7DgCr-3pg',
    steps: [
      'Lakukan pemanasan ringan sebelum mengangkat beban kerja.',
      'Posisikan tubuh dengan tumpuan yang kokoh dan punggung netral.',
      'Kendalikan beban pada fase penurunan (eksentrik) selama 2-3 detik.',
      'Hembuskan napas saat mendorong/menarik beban dan rasakan kontraksi otot target.'
    ],
    tips: 'Utamakan teknik form yang tepat daripada beban yang terlalu berat.'
  };
}
