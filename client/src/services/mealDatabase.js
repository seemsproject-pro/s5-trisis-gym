/**
 * Meal & Nutrition Database — Trisis Gym Member App
 * Menyusun jadwal makan harian terstruktur, alokasi kalori dan makronutrisi per waktu makan,
 * serta rincian porsi bahan makanan nyata (khas Indonesia & ramah kantong mahasiswa/member).
 */

/**
 * Menghitung dan menyusun rencana jadwal makan harian berdasarkan target kalori dan makro
 * @param {number} targetCalories - Total target kalori harian
 * @param {Object} macros - Rincian makro harian { protein: { grams }, carbs: { grams }, fat: { grams } }
 * @param {string} fitnessGoal - Tujuan ('fat_loss', 'muscle_building', 'general_fitness')
 * @returns {Array} Daftar 4 sesi makan dengan jam, alokasi kalori, makro, dan rincian bahan makanan
 */
export function generateDailyMealPlan(targetCalories = 2200, macros = null, _fitnessGoal = 'general_fitness') {
  // Alokasi persentase per sesi makan
  // 1. Sarapan: 25%
  // 2. Makan Siang: 35%
  // 3. Snack Pre-Workout: 15%
  // 4. Makan Malam: 25%

  const totalProtein = macros?.protein?.grams || Math.round((targetCalories * 0.25) / 4);
  const totalCarbs = macros?.carbs?.grams || Math.round((targetCalories * 0.50) / 4);
  const totalFat = macros?.fat?.grams || Math.round((targetCalories * 0.25) / 9);

  // Hitung gramatur ayam / nasi yang disesuaikan proporsional
  const scale = targetCalories / 2000;
  const chickenWeight = Math.round(150 * scale);
  const riceWeight = Math.round(150 * scale);
  const oatWeight = Math.round(50 * scale);

  const mealWindows = [
    {
      id: 'sarapan',
      timeWindow: '07.00 - 08.00 WIB',
      title: 'Sarapan Pagi (Breakfast)',
      phase: 'Energi Awal & Anti-Katabolik',
      targetPercent: 25,
      calories: Math.round(targetCalories * 0.25),
      protein: Math.round(totalProtein * 0.25),
      carbs: Math.round(totalCarbs * 0.25),
      fat: Math.round(totalFat * 0.25),
      iconColor: 'bg-amber-100 text-amber-700',
      image: '/images/meals/breakfast.jpg',
      imageAlt: 'Ilustrasi sarapan sehat: mangkuk oatmeal, potongan pisang segar, telur rebus, dan air putih',
      description: 'Asupan bernutrisi untuk memecah puasa tidur malam dan menyediakan energi berkelanjutan.',
      items: [
        {
          name: 'Telur Ayam (2 Butir Rebus / Orak-Arik)',
          portion: '2 butir (~100 gram)',
          protein: 13,
          carbs: 1,
          fat: 10,
          calories: 145,
          note: 'Gunakan sedikit minyak zaitun jika digoreng'
        },
        {
          name: `Oatmeal Instan / Roti Gandum Utuh`,
          portion: `${oatWeight} gram (atau 2 lembar roti)`,
          protein: 6,
          carbs: 34,
          fat: 3,
          calories: 190,
          note: 'Sumber karbohidrat kompleks rendah GI'
        },
        {
          name: 'Pisang Cavendish / Ambon',
          portion: '1 buah ukuran sedang (~100 gram)',
          protein: 1,
          carbs: 23,
          fat: 0,
          calories: 95,
          note: 'Kaya kalium & elektrolit pencegah kram'
        },
        {
          name: 'Air Putih Hangat',
          portion: '1 - 2 Gelas (400 - 500 ml)',
          protein: 0,
          carbs: 0,
          fat: 0,
          calories: 0,
          note: 'Hidrasi metabolisme awal hari'
        }
      ],
      timingTip: 'Konsumsi maksimal 1 jam setelah bangun tidur untuk menyalakan metabolisme tubuh.'
    },
    {
      id: 'siang',
      timeWindow: '12.00 - 13.00 WIB',
      title: 'Makan Siang (Lunch Feast)',
      phase: 'Puncak Volume Nutrisi & Sintesis Otot',
      targetPercent: 35,
      calories: Math.round(targetCalories * 0.35),
      protein: Math.round(totalProtein * 0.35),
      carbs: Math.round(totalCarbs * 0.35),
      fat: Math.round(totalFat * 0.35),
      iconColor: 'bg-emerald-100 text-emerald-700',
      image: '/images/meals/lunch.jpg',
      imageAlt: 'Ilustrasi menu makan siang: mangkuk dada ayam panggang, nasi merah, brokoli kukus, dan tempe',
      description: 'Porsi makan utama terbesar untuk memasok asam amino esensial dan energi latihan harian.',
      items: [
        {
          name: 'Dada Ayam Fillet (Panggang / Kukus / Tumis)',
          portion: `${chickenWeight} gram (mentah seimbang)`,
          protein: 36,
          carbs: 0,
          fat: 4,
          calories: 185,
          note: 'Bisa diganti Ikan Gurame / Nila fillet segar'
        },
        {
          name: 'Nasi Merah / Nasi Putih Pulen',
          portion: `${riceWeight} gram (1 centong padat)`,
          protein: 4,
          carbs: 45,
          fat: 1,
          calories: 200,
          note: 'Pilihan bahan bakar glikogen otot'
        },
        {
          name: 'Tempe / Tahu Bacem atau Goreng Airfryer',
          portion: '2 potong sedang (~60 gram)',
          protein: 10,
          carbs: 5,
          fat: 5,
          calories: 105,
          note: 'Sumber isoflavon & protein nabati murah'
        },
        {
          name: 'Sayur Tumis Brokoli, Wortel & Buncis',
          portion: '1 mangkuk sedang (~100 gram)',
          protein: 3,
          carbs: 8,
          fat: 2,
          calories: 60,
          note: 'Kaya serat mikro, vitamin C & magnesium'
        }
      ],
      timingTip: 'Makan siang teratur membantu mencegah rasa lemas di sore hari.'
    },
    {
      id: 'snack',
      timeWindow: '16.30 - 17.00 WIB',
      title: 'Snack Pre-Workout (Booster Latihan)',
      phase: 'Bahan Bakar Sesi Latihan Gym',
      targetPercent: 15,
      calories: Math.round(targetCalories * 0.15),
      protein: Math.round(totalProtein * 0.15),
      carbs: Math.round(totalCarbs * 0.15),
      fat: Math.round(totalFat * 0.15),
      iconColor: 'bg-purple-100 text-[#6D28D9]',
      image: '/images/meals/snack.jpg',
      imageAlt: 'Ilustrasi pre-workout snack: roti gandum panggang dengan selai kacang, irisan pisang, dan susu kedelai',
      description: 'Camilan ringan tinggi karbohidrat cepat serap dan protein untuk tenaga saat angkat beban.',
      items: [
        {
          name: 'Roti Gandum Panggang + Selai Kacang',
          portion: '1 lembar roti + 1 sendok makan selai',
          protein: 7,
          carbs: 18,
          fat: 8,
          calories: 170,
          note: 'Energi pelepasan bertahap selama sesi gym'
        },
        {
          name: 'Susu Kedelai Murni / Susu UHT Low-Fat',
          portion: '1 gelas (200 ml)',
          protein: 7,
          carbs: 10,
          fat: 3,
          calories: 95,
          note: 'Alternatif whey protein ekonomis'
        },
        {
          name: 'Kopi Hitam Polos (Opsional Pre-Workout)',
          portion: '1 cangkir (tanpa gula)',
          protein: 0,
          carbs: 0,
          fat: 0,
          calories: 5,
          note: 'Kafein alami untuk fokus latihan di Trisis Gym'
        }
      ],
      timingTip: 'Konsumsi 45-60 menit sebelum sesi latihan di gym agar lambung tidak terasa begah.'
    },
    {
      id: 'malam',
      timeWindow: '19.30 - 20.30 WIB',
      title: 'Makan Malam Post-Workout (Recovery)',
      phase: 'Regenerasi Jaringan & Pemulihan Tidur',
      targetPercent: 25,
      calories: Math.round(targetCalories * 0.25),
      protein: Math.round(totalProtein * 0.25),
      carbs: Math.round(totalCarbs * 0.25),
      fat: Math.round(totalFat * 0.25),
      iconColor: 'bg-blue-100 text-blue-700',
      image: '/images/meals/dinner.jpg',
      imageAlt: 'Ilustrasi recovery dinner: ikan bakar fillet, potongan ubi jalar kukus, dan sayuran bening bayam',
      description: 'Makanan pemulihan pasca-latihan untuk memperbaiki serat otot yang rusak selama tidur malam.',
      items: [
        {
          name: 'Ikan Tongkol / Nila Bakar / Daging Sapi Cincang',
          portion: `${Math.round(chickenWeight * 0.9)} gram`,
          protein: 30,
          carbs: 0,
          fat: 6,
          calories: 175,
          note: 'Kaya asam lemak omega-3 anti-inflamasi'
        },
        {
          name: 'Ubi Jalar Rebus / Kentang Kukus / Nasi Merah',
          portion: '1 buah ubi sedang (~150 gram)',
          protein: 2,
          carbs: 35,
          fat: 0,
          calories: 150,
          note: 'Mengisi kembali cadangan glikogen pasca-latihan'
        },
        {
          name: 'Sayur Bening Bayam & Jagung Manis',
          portion: '1 mangkuk sedang',
          protein: 3,
          carbs: 12,
          fat: 1,
          calories: 70,
          note: 'Mudah dicerna & menenangkan sistem cerna'
        }
      ],
      timingTip: 'Usahakan selesai makan malam minimal 2 jam sebelum tidur agar kualitas istirahat maksimal.'
    }
  ];

  return mealWindows;
}
