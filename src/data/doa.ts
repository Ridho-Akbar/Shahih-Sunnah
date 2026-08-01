// src/data/doa.ts
export interface Doa {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  evidence: string; // Berisi teks hadits/sabda Nabi yang relevan
  status: "shahih" | "hasan" | "dhaif" | "dishahihkan";
  statusBy?: string;
  source: string;
}

export const doaList: Doa[] = [
  {
    "title": "Doa Meminta Surga dan Perlindungan dari Neraka",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    "latin": "Allahumma innii as'alukal-jannata wa a'uudzu bika minan-naar.",
    "translation": "Ya Allah, sesungguhnya aku memohon kepada-Mu surga dan aku berlindung kepada-Mu dari neraka.",
    "evidence": "Rasulullah ﷺ bersabda: 'Barangsiapa meminta surga kepada Allah tiga kali, maka surga berkata: Ya Allah, masukkanlah ia ke dalam surga. Dan barangsiapa meminta perlindungan dari neraka tiga kali, maka neraka berkata: Ya Allah, lindungilah ia dari neraka.'",
    "status": "shahih",
    "statusBy": "HR. At-Tirmidzi No. 2572, An-Nasa'i No. 452. Dishahihkan oleh Syaikh Al-Albani.",
    "source": "HR. At-Tirmidzi No. 2572",
  },
  {
    "title": "Doa Memohon Cinta Allah, Cinta Orang Beriman, dan Amal Penyebar Cinta",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَالْعَمَلَ الَّذِي يُبَلِّغُنِي حُبَّكَ وَاجْعَلْ حُبَّكَ أَحَبَّ إِلَيَّ مِنْ نَفْسِي وَأَهْلِي وَمِنَ الْمَاءِ الْبَارِدِ",
    "latin": "Allahumma innii as'aluka hubbaka wa hubba man yuhibbuka wal-'amalalladzii yuballighunii hubbaka waj'al hubbaka ahabba ilayya min nafsi wa ahlii wa minal-maa'il baarid.",
    "translation": "Ya Allah, aku memohon cinta-Mu, cinta orang yang mencintai-Mu, amal yang dapat menyampaikan aku pada cinta-Mu, dan jadikanlah cinta-Mu lebih aku cintai daripada diriku, keluargaku, dan air yang dingin.",
    "evidence": "Rasulullah ﷺ bersabda: 'Di antara doa-doa Nabi Daud 'alaihis salam adalah: Ya Allah, aku memohon cinta-Mu...'",
    "status": "hasan",
    "statusBy": "HR. At-Tirmidzi No. 3490. Dihasankan oleh Syaikh Al-Albani dalam Shahih At-Tirmidzi.",
    "source": "HR. At-Tirmidzi No. 3490",
  },
  {
    "title": "Doa Memohon Husnul Khatimah (Akhir Hidup yang Baik)",
    "arabic": "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    "latin": "Yaa muqallibal-quluubi tsabbit qalbii 'alaa diinik.",
    "translation": "Wahai Dzat yang membolak-balikkan hati, tetapkanlah hatiku di atas agama-Mu.",
    "evidence": "Dari Ummu Salamah radhiyallahu 'anha, ia bertanya mengapa Nabi sering membaca doa ini. Beliau menjawab: 'Wahai Ummu Salamah, tidak ada seorang manusia pun yang hatinya tidak berada di bawah kendali Allah. Barangsiapa yang hatinya ditetapkan Allah pada agama-Nya, maka dia akan tetap teguh.'",
    "status": "shahih",
    "statusBy": "HR. Ahmad No. 26386, At-Tirmidzi No. 3522. Dishahihkan oleh Syaikh Al-Albani.",
    "source": "HR. At-Tirmidzi No. 3522",
  },
  {
    "title": "Doa Meminta Rezeki yang Halal, Luas, dan Berkah",
    "arabic": "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    "latin": "Allahummakfinii bihalaalika 'an haraamika wa aghniniy bifadhlika 'amman siwaak.",
    "translation": "Ya Allah, cukupkanlah aku dengan rezeki halal-Mu sehingga aku tidak perlu menyentuh yang haram, dan kayakanlah aku dengan karunia-Mu sehingga aku tidak membutuhkan selain-Mu.",
    "evidence": "Rasulullah ﷺ mengajarkan doa ini kepada Ali bin Abi Thalib radhiyallahu 'anhu ketika ia meminta doa agar dibebaskan dari utang, seraya bersabda: 'Maukah aku ajarkan kepadamu kalimat-kalimat yang jika engkau membacanya, Allah akan menghilangkan kecemasanmu dan melunasi utangmu?'",
    "status": "hasan",
    "statusBy": "HR. At-Tirmidzi No. 3563. Dihasankan oleh Syaikh Al-Albani.",
    "source": "HR. At-Tirmidzi No. 3563",
  },
  {
    "title": "Doa Meminta Pertolongan dalam Ibadah dan Syukur",
    "arabic": "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    "latin": "Allahumma a'innii 'alaa dzikrika wa syukrika wa husni 'ibaadatik.",
    "translation": "Ya Allah, bantulah aku untuk selalu berdzikir kepada-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.",
    "evidence": "Rasulullah ﷺ memegang tangan Mu'adz bin Jabal dan bersabda: 'Wahai Mu'adz, sungguh aku mencintaimu.' Lalu beliau mengajarkan: 'Janganlah engkau meninggalkan untuk mengucapkan di akhir setiap shalat: Allahumma a'inni 'ala dzikrika...'",
    "status": "shahih",
    "statusBy": "HR. Abu Daud No. 1522, An-Nasa'i No. 1302. Dishahihkan oleh Syaikh Al-Albani.",
    "source": "HR. Abu Daud No. 1522",
  },
  {
    "title": "Doa Ampunan untuk Diri, Orang Tua, dan Kaum Mukminin",
    "arabic": "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    "latin": "Rabbanaaghfir lii wa liwaalidayya wa lil-mu'miniina yauma yaquumul-hisaab.",
    "translation": "Ya Tuhan kami, ampunilah aku, kedua orang tuaku, dan seluruh orang-orang yang beriman pada hari diadakan perhitungan amal.",
    "evidence": "Allah Subhanahu wa Ta'ala berfirman mengisahkan doa Nabi Ibrahim 'alaihis salam: 'Ya Tuhan kami, ampunilah aku, kedua orang tuaku, dan seluruh orang-orang yang beriman pada hari diadakan perhitungan amal.'",
    "status": "shahih",
    "statusBy": "QS. Ibrahim ayat 41. Merupakan firman Allah yang pasti kebenarannya.",
    "source": "QS. Ibrahim: 41",
  },
  {
    "title": "Doa Memohon Ketetapan Hati di Atas Agama",
    "arabic": "اللَّهُمَّ مُصَرِّفَ الْقُلُوبِ صَرِّفْ قُلُوبَنَا عَلَى طَاعَتِكَ",
    "latin": "Allahumma mushorrifal-quluubi shorrif quluubanaa 'alaa thoo'atik.",
    "translation": "Ya Allah, Dzat yang mengarahkan hati, arahkanlah hati kami kepada ketaatan kepada-Mu.",
    "evidence": "Rasulullah ﷺ bersabda: 'Sesungguhnya hati manusia berada di antara jari-jari Allah Yang Maha Pemurah, Dia membolak-balikkannya sesuai kehendak-Nya.' Kemudian beliau berdoa: 'Allahumma musharrifal qulubi...'",
    "status": "shahih",
    "statusBy": "HR. Muslim No. 2654",
    "source": "HR. Muslim No. 2654",
  },
  {
    "title": "Doa Perlindungan Lengkap: Neraka, Kubur, Fitnah Hidup-Mati, dan Dajjal",
    "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    "latin": "Allahumma innii a'uudzu bika min 'adzaabi jahannama wa min 'adzaabil-qabri wa min fitnatil-mahyaa wal-mamaati wa min syarri fitnatil-masiihid-dajjaal.",
    "translation": "Ya Allah, aku berlindung kepada-Mu dari siksa neraka Jahannam, dari siksa kubur, dari fitnah kehidupan dan kematian, serta dari kejahatan fitnah Al-Masih Ad-Dajjal.",
    "evidence": "Rasulullah ﷺ bersabda: 'Apabila salah seorang dari kalian selesai dari tasyahud akhir, maka hendaklah ia berlindung kepada Allah dari empat perkara...' lalu beliau menyebutkan doa ini.",
    "status": "shahih",
    "statusBy": "HR. Al-Bukhari No. 1377, Muslim No. 588",
    "source": "HR. Al-Bukhari No. 1377 & Muslim No. 588",
  },
  {
    "title": "Doa Meminta Kebaikan Dunia dan Akhirat serta Perlindungan dari Siksa Neraka",
    "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    "latin": "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa 'adzaaban-naar.",
    "translation": "Ya Tuhan kami, berikanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa neraka.",
    "evidence": "Anas bin Malik radhiyallahu 'anhu berkata: 'Doa yang paling sering dibaca oleh Rasulullah ﷺ adalah: Rabbanaa aatinaa fid dunya hasanah...'",
    "status": "shahih",
    "statusBy": "HR. Al-Bukhari No. 6389, Muslim No. 2690. Juga tercantum dalam QS. Al-Baqarah: 201.",
    "source": "HR. Al-Bukhari No. 6389",
  },
  {
    "title": "Doa Istikharah (Meminta Pilihan Terbaik Saat Bingung)",
    "arabic": "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
    "latin": "Allahumma innii astakhiiruka bi'ilmika wa astaqdiruka biqudratika wa as'aluka min fadhlikal-'aziim.",
    "translation": "Ya Allah, sesungguhnya aku meminta pilihan terbaik kepada-Mu dengan ilmu-Mu, aku meminta kemampuan kepada-Mu dengan kuasa-Mu, dan aku memohon kepada-Mu dari karunia-Mu yang agung.",
    "evidence": "Rasulullah ﷺ mengajarkan: 'Jika salah seorang dari kalian berniat dalam suatu urusan, maka hendaklah ia shalat dua rakaat... lalu ucapkan: Allahumma inni astakhiruka bi'ilmika...'",
    "status": "shahih",
    "statusBy": "HR. Al-Bukhari No. 1162, Muslim No. 771",
    "source": "HR. Al-Bukhari No. 1162",
  }
]