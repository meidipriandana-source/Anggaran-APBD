import { BudgetItem, BudgetSummary, JournalTransaction } from '../types';

export const TOTAL_PAGU_ANGGARAN = 1724120000; // Rp 1.724.120.000,00
export const TOTAL_TERSERAP_ANGGARAN = 808167334; // Rp 808.167.334,00 (Total realisasi seluruh mutasi SP2D)
export const TOTAL_SISA_ANGGARAN = 915952666; // Rp 915.952.666,00 (Sisa pagu efektif)

/**
 * Daftar Rincian Anggaran Belanja Sub Kegiatan:
 * 1.02.03.1.02.0001 Peningkatan Kompetensi dan Kualifikasi Sumber Daya Manusia Kesehatan
 * RSUD dr. H. Jusuf SK - TA 2026
 * Disesuaikan khusus 4 Komponen Utama Terpilih
 */
export const BUDGET_DATA: BudgetItem[] = [
  // 1. Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa
  {
    id: 'item-1',
    kodeRekening: '5.1.02.01.01.0052',
    kategoriBelanja: 'Makanan dan Minuman Rapat',
    kelompokAkun: 'Belanja Barang',
    subKegiatanKelompok: 'BELANJA MAKANAN DAN MINUMAN RAPAT / KEGIATAN',
    uraianSpesifik: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    spesifikasiDetail: 'Konsumsi Rapat Koordinasi & Pembahasan Peningkatan Mutu SDM Rumah Sakit',
    koefisienVolume: '2.082 Kotak',
    volumeAngka: 2082,
    satuan: 'Kotak / Porsi',
    hargaSatuan: 60000,
    paguMurni: 124920000,
    pergeseran: 0,
    jumlahTotal: 124920000,
    terserap: 113350000,
    sisa: 11570000,
    persenSerapan: 90.7,
    persentaseTotal: (124920000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#f97316', // orange
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    catatanAnalisis: 'Realisasi serapan 90.7% (Rp 113.350.000) untuk rapat koordinasi berkala dan diklat.'
  },

  // 2. Honorarium Pengajar / Narasumber
  {
    id: 'item-2',
    kodeRekening: '5.1.02.02.01.0011',
    kategoriBelanja: 'Honorarium Narasumber',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'HONORARIUM PENGAJAR DALAM / LUAR DAERAH',
    uraianSpesifik: 'Honorarium Pengajar / Narasumber',
    spesifikasiDetail: 'Honor Pengajar / Narasumber Diklat yang Berasal dari Luar SKPD Penyelenggara (764 Jam)',
    koefisienVolume: '764 Jam',
    volumeAngka: 764,
    satuan: 'Orang / Jam',
    hargaSatuan: 300000,
    paguMurni: 229200000,
    pergeseran: 0,
    jumlahTotal: 229200000,
    terserap: 142820000,
    sisa: 86380000,
    persenSerapan: 62.3,
    persentaseTotal: (229200000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#10b981', // green
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    catatanAnalisis: 'Terserap 62.3% (Rp 142.820.000) untuk honor narasumber spesialis dan workshop teknis.'
  },

  // 3. Belanja Kontribusi Kursus/Pelatihan (Pelatihan Tenaga Medis / Keperawatan / Penunjang)
  {
    id: 'item-3',
    kodeRekening: '5.1.02.02.12.0001',
    kategoriBelanja: 'Belanja Kontribusi Kursus/Pelatihan',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KONTRIBUSI (PENINGKATAN KOMPETENSI KAPASITAS ASN)',
    uraianSpesifik: 'Belanja Kontribusi Kursus/Pelatihan (Pelatihan Tenaga Medis / Keperawatan / Penunjang)',
    spesifikasiDetail: 'Biaya Kontribusi Lembaga Diklat Eksternal Terakreditasi Kemenkes',
    koefisienVolume: '50 Orang',
    volumeAngka: 50,
    satuan: 'Orang / Kegiatan',
    hargaSatuan: 11000000,
    paguMurni: 550000000,
    pergeseran: 0,
    jumlahTotal: 550000000,
    terserap: 195125000,
    sisa: 354875000,
    persenSerapan: 35.5,
    persentaseTotal: (550000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#3b82f6', // blue
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: true,
    targetSDM: 50,
    catatanAnalisis: 'Realisasi 25 mutasi pelatihan tenaga medis/keperawatan (Total: Rp 195.125.000).'
  },

  // 4. Perjalanan Dinas Dalam Negeri
  {
    id: 'item-4',
    kodeRekening: '5.1.02.04.01.0001',
    kategoriBelanja: 'Perjalanan Dinas Dalam Negeri',
    kelompokAkun: 'Belanja Perjalanan Dinas',
    subKegiatanKelompok: 'PERJALANAN DINAS DALAM NEGERI',
    uraianSpesifik: 'Perjalanan Dinas Dalam Negeri',
    spesifikasiDetail: 'Biaya Perjalanan Dinas, Tiket Pesawat, Uang Harian, Uang Saku, dan Penginapan Pelatihan/Workshop',
    koefisienVolume: '82 Orang',
    volumeAngka: 82,
    satuan: 'Orang / Paket',
    hargaSatuan: 10000000,
    paguMurni: 820000000,
    pergeseran: 0,
    jumlahTotal: 820000000,
    terserap: 356872334,
    sisa: 463127666,
    persenSerapan: 43.5,
    persentaseTotal: (820000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#8b5cf6', // purple
    isHighlightPerjalananDinas: true,
    isHighlightKontribusi: false,
    targetSDM: 82,
    catatanAnalisis: 'Realisasi 20 mutasi perjalanan dinas dalam negeri (Total: Rp 356.872.334).'
  }
];

export const BUDGET_SUMMARY: BudgetSummary = {
  totalPagu: TOTAL_PAGU_ANGGARAN,
  totalTerserap: TOTAL_TERSERAP_ANGGARAN,
  totalSisa: TOTAL_SISA_ANGGARAN,
  persenSerapanTotal: (TOTAL_TERSERAP_ANGGARAN / TOTAL_PAGU_ANGGARAN) * 100,
  totalItems: BUDGET_DATA.length
};

export const MONTHLY_REALIZATION_DATA = [
  { bulan: 'Januari 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Selesai' },
  { bulan: 'Februari 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Selesai' },
  { bulan: 'Maret 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Selesai' },
  { bulan: 'April 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Selesai' },
  { bulan: 'Mei 2026', pagu: 147843333, realisasi: 87619560, serapan: 59.26, status: 'Selesai' },
  { bulan: 'Juni 2026', pagu: 147843333, realisasi: 181958619, serapan: 123.07, status: 'Selesai' },
  { bulan: 'Juli 2026', pagu: 147843333, realisasi: 148560384, serapan: 100.48, status: 'Selesai' },
  { bulan: 'Agustus 2026', pagu: 147843333, realisasi: 390028771, serapan: 263.81, status: 'Berjalan' },
  { bulan: 'September 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'Oktober 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'November 2026', pagu: 147843333, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'Desember 2026', pagu: 147843337, realisasi: 0, serapan: 0.0, status: 'Rencana' }
];

export const FORMAT_RUPIAH = (val: number, withDecimals = false): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0
  }).format(val);
};

export const FORMAT_NUM = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

export const DEFAULT_JOURNAL_DATA: JournalTransaction[] = [
  // Item 1: Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa (Total 7 Transaksi = Rp 113.350.000)
  {
    id: 'j-1-1',
    itemId: 'item-1',
    tanggalTransaksi: '29 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Triase (Belum Mulai)',
    nominal: 4800000,
    isChecked: true
  },
  {
    id: 'j-1-2',
    itemId: 'item-1',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'psikiatri (Belum Mulai)',
    nominal: 12650000,
    isChecked: true
  },
  {
    id: 'j-1-3',
    itemId: 'item-1',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'APN (Belum Mulai)',
    nominal: 17400000,
    isChecked: true
  },
  {
    id: 'j-1-4',
    itemId: 'item-1',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'PALS (Belum Mulai)',
    nominal: 4560000,
    isChecked: true
  },
  {
    id: 'j-1-5',
    itemId: 'item-1',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Penatalaksanaan keperawatan perioperatif bagi perawat kamar bedah Tanggal 8 s.d 9 Agustus 2026 di RSUD dr.H Jusuf.SK Tarakan (Belum SPJ)',
    nominal: 4320000,
    isChecked: true
  },
  {
    id: 'j-1-6',
    itemId: 'item-1',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Basic Trauma and Cardiac Life Support (BTCLS) Gelombang 1-56Tanggal 27 Juni s.d 6 Agustus 2026 di RSUD dr H Jusuf SK ( Belum SPJ)',
    nominal: 38880000,
    isChecked: true
  },
  {
    id: 'j-1-7',
    itemId: 'item-1',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Refresh Bantuan Hidup Dasar (BHD) Bagi staf Non-Medis Tahun 2026 Gelombang 1 s.d 5 Tanggal 19 Mei s.d 4 Juni 2026 di RSUD dr.H Jusuf.SK Tarakan (Belum SPJ)',
    nominal: 30740000,
    isChecked: true
  },

  // Item 2: Honorarium Pengajar / Narasumber (Total 3 Transaksi = Rp 142.820.000)
  {
    id: 'j-2-1',
    itemId: 'item-2',
    tanggalTransaksi: '15 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honor Narasumber Diklat BTCLS Batch 1-3 (Dokter Spesialis Anastesi & Bedah)',
    nominal: 48000000,
    isChecked: true
  },
  {
    id: 'j-2-2',
    itemId: 'item-2',
    tanggalTransaksi: '10 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honor Pengajar Workshop Refresh BHD Non-Medis Gelombang 1-5',
    nominal: 42820000,
    isChecked: true
  },
  {
    id: 'j-2-3',
    itemId: 'item-2',
    tanggalTransaksi: '20 Mei 2026',
    bulan: 'Bulan Mei',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honorarium Narasumber Pelatihan Perioperatif Kamar Bedah',
    nominal: 52000000,
    isChecked: true
  },

  // Item 3: Belanja Kontribusi Kursus/Pelatihan (Total 25 Transaksi = Rp 195.125.000)
  {
    id: 'j-3-1',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Tatalaksana TB Komprehensif di ruang Isolasi Tanggal 12 s.d 16 Oktober 2026 di RSUP Kariadi Semarang an : Defi Miftahul Jannah, A.Md.Kep (Belum SPJ)',
    nominal: 4500000,
    isChecked: true
  },
  {
    id: 'j-3-2',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Nutri Symposium 2026 (Beyond Calories - Protein For Growth Strength Recovery and Survival) tanggal 24 - 26 Juli 2026 di Jakarta an : dr. Husnul Khatimah, Sp.GK (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-3',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan PKKVTD ( Pelatihan Keperawatan kardiovaskuler Tingkat Dasar) Tanggal 7 September s.d 18 November 2026 di Jakarta an : Muhammad Amin Usman Tarro, A.Md.Kep (Belum SPJ)',
    nominal: 22500000,
    isChecked: true
  },
  {
    id: 'j-3-4',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop ACPID ASINPO Tanggal 14 s.d 16 Agustus 2026 di Jakarta an : dr. Franky Siantoro, Sp.A (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-5',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Keperawatan Intensif Neonatus bagi perawat di ruang NICU Tanggal 18 Oktober s.d 5 Desember 2026 di RS Sardjito Yogyakarta an : Ns. Rizkini Layuk, S.Kep (Belum SPJ)',
    nominal: 15000000,
    isChecked: true
  },
  {
    id: 'j-3-6',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti 3rd PEGOSUS Pediatric Gastroenterology Hepatology Symposium Updates Tanggal 31 Juli s.d. 2 Agustus 2026 di Jakarta an : dr. Erma Ratna Fury, Sp.A (Belum SPJ)',
    nominal: 3000000,
    isChecked: true
  },
  {
    id: 'j-3-7',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Symposium 4th Solo Surgical Forum Current Surgical Update: Exploring Update and Innovation in Surgery Tanggal 25 s.d 26 Juli 2026 di Solo (Jawa Tengah) an : dr. Rodjaya Putra, Sp.B-KBD (Belum SPJ)',
    nominal: 2750000,
    isChecked: true
  },
  {
    id: 'j-3-8',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan / Kontribusi : Mengikuti workshop Baperuom Bandung Pediatric Urogenital and Oncology Surgery Meeting Tanggal 30 Juli s.d 1 Agustus 2026 di Bandung an : dr. Amir Sautin Sibarani, Sp.BA. (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-9',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PIT PERDOSRI XXV (The 25th Annual Scientific Meeting of Indonesian Association of Physical Medicine & Rehabilitation), pada tanggal 23-26 September 2026 di Batam an : dr. Jerry Kurnia Wahyudi, Sp.KFR (Belum SPJ)',
    nominal: 2125000,
    isChecked: true
  },
  {
    id: 'j-3-10',
    itemId: 'item-3',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Daring (Platform Ujian Online dan Zoom Meeting) Sertifikasi CCAE Tanggal 15 Agustus 2026 an : Fatmairinah, S.Ak., M.M., CRMP., CRPP',
    nominal: 2500000,
    isChecked: true
  },
  {
    id: 'j-3-11',
    itemId: 'item-3',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan : Mengikuti PIT PDS PA (Working Conference XVII and Annual Scientific Meeting) 2026 Tanggal 30 Juni s.d 7 Juli 2026 di Malang ( Jawa Timur ) an : dr. Ledyna Rumapar, Sp.PA',
    nominal: 3550000,
    isChecked: true
  },
  {
    id: 'j-3-12',
    itemId: 'item-3',
    tanggalTransaksi: '4 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Training of trainer (TOT) BT&CLS Instruktur Course Tanggal 3 s.d 7 Agustus 2026 di Jakarta an : Suhud Tri Rahim, S.Kep,Ns, Bayu Purnomo, S.Kep',
    nominal: 5200000,
    isChecked: true
  },
  {
    id: 'j-3-13',
    itemId: 'item-3',
    tanggalTransaksi: '4 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan BLINC (Bali International Neurovascular Intervention Conference) 2026 "Stroke Wars:Beyond the Circle" tanggal 26 s.d 29 April 2026 di Bali an : dr. I Nyoman Gunawan, Sp.Rad',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-14',
    itemId: 'item-3',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa, Mengikuti Workshop dan Simposium American Institute of Functional Integrate Dry Needling (Module 1, Module 2 & Module 3) Tanggal 25 s.d 1 April 2026 an : dr. Septian Widyantoro, Sp.N',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-15',
    itemId: 'item-3',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan Pelatihan Workshop ELSA OUTREACH PROGRAMME Tanggal 18-20 Juni 2026 di Balikpapan an. dr. Yufriadi Yunus, Sp.B',
    nominal: 2500000,
    isChecked: true
  },
  {
    id: 'j-3-16',
    itemId: 'item-3',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PelatihanNeurointervensi bagi perawat di rumah sakit Tanggal 27 Juli s.d 24 Agustus 2026 di RS PON Jakarta an : Ns. Ragil Prasojo,S.Kep',
    nominal: 19000000,
    isChecked: true
  },
  {
    id: 'j-3-17',
    itemId: 'item-3',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan: Mengikuti Pelatihan Perawatan Intensif ICVCU Tanggal 22 Juli - 21 Oktober 2026 di RS Jantung dan Pembuluh Darah Harapan Kita Jakarta an : Ns. Abelia Pongkaluran, S.Kep',
    nominal: 20000000,
    isChecked: true
  },
  {
    id: 'j-3-18',
    itemId: 'item-3',
    tanggalTransaksi: '6 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan : Pelatihan Keperawatan Kardiovaskuler Tingkat Dasar (PKKVTD) bagi Perawat di Pelayanan Kesehatan Tanggal 7 Juni sampai dengan 15 Agustus 2026 di RS Dr.Kariadi Semarang an : Ns. Sutrisno, S.Kep',
    nominal: 20000000,
    isChecked: true
  },
  {
    id: 'j-3-19',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat Pelatihan, Mengikuti Workshop dan Simposium USG Abdomen – Pelvis Tahap I Angkatan ke - 101 Tanggal 15 s.d 19 April 2026 Jakarta an : dr. Ryan Vientino Pratama, Sp.PD',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-20',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas, Workshop dan Simposium Jakarta International Endoscopy Symposium & Live Demonstration (JIGES-LD) 2026 Tanggal 11 s.d 15 Februari 2026 Jakarta an : dr. M. Anief Ferdianto, Sp.PD-KGEH',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-21',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan National Scientific Meeting 2026 tanggal 30 April 2026 s.d 03 Mei 2026 di Makassar an : dr. Andry Ardhani, Sp.N',
    nominal: 3000000,
    isChecked: true
  },
  {
    id: 'j-3-22',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan IPDAC 19 "Global Perspectives on Cranial Growth and Development in Children; Challenges and Innovation."di Makassar tanggal 28 April s.d 2 Mei 2026 an : drg. Olivia Triifina Ngo, MDSc.,Sp.KGA',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-3-23',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Kegiatan Pelatihan Kompetensi pengadaan BARJAS level 1 di Jakarta Tanggal 16-30 April 2026 an : dr.Rustam Samsuddin,MM',
    nominal: 5250000,
    isChecked: true
  },
  {
    id: 'j-3-24',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Pelatihan/ Sertifikasi Penanganan Obat Kanker (Handling Cytotoxic) bagi Tenaga Kefarmasian Tanggal 16 s.d 20 Juni/ Juni 2026 di Jakarta an : Nur Atika, A.Md., Farm.Sti Widia Astuti, A.Md., Farm.',
    nominal: 16000000,
    isChecked: true
  },
  {
    id: 'j-3-25',
    itemId: 'item-3',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Pelatihan Asuhan Keperawatan EEG dibutuhkan perawat spesifik (Mahir/Kompeten melakukan Pemeriksaan EEG) di RS Universitas Airlangga Surabaya Tanggal 2 Juni s.d 6 Juni an : Ns. Trysnawati, S.Kep',
    nominal: 8250000,
    isChecked: true
  },

  // Item 4: Perjalanan Dinas Dalam Negeri (Total 20 Transaksi = Rp 356.872.334)
  {
    id: 'j-4-1',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Mengikuti Pelatihan Dialisis Batch3 bagi perawat di rumah sakit dan klinik khusus dialisis di RS Airlangga Surabaya, Jawa Timur Tanggal 23 Februari s.d 22 Juli 2026, (Pembayaran Tahap 2 an: Ns. Vidyani Firdosi, S.Kep,Ns. Setiawan Tri Handoko, S.Kep(Belum SPJ)',
    nominal: 19483500,
    isChecked: true
  },
  {
    id: 'j-4-2',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop Baperuom Bandung Pediatric Urogenital and Oncology Surgery Meeting Tanggal 30 Juli s.d. 1 Agustus 2026 di Bandung an : dr. Amir Sautin Sibarani, Sp.BA. (Belum SPJ Belum Fix)',
    nominal: 9076051,
    isChecked: true
  },
  {
    id: 'j-4-3',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Keperawatan Intensif Neonatus bagi perawat di ruang NICU Tanggal 1 September s.d 20 November 2026 di RSAB Harapan Kita an : Ns. Rizkini Layuk, S.Kep (Belum Fix)',
    nominal: 61130000,
    isChecked: true
  },
  {
    id: 'j-4-4',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop ACPID ASINPO Tanggal 14 s.d. 16 Agustus 2026 di Jakarta an : dr. Franky Siantoro, Sp.A (Belum SPJ)',
    nominal: 10950000,
    isChecked: true
  },
  {
    id: 'j-4-5',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan PKKVTD ( Pelatihan Keperawatan kardiovaskuler Tingkat Dasar) Tanggal 7 September s.d 18 November 2026 di Jakarta an : Muhammad Amin Usman Tarro, A.Md.Kep (Belum Fix)',
    nominal: 26340000,
    isChecked: true
  },
  {
    id: 'j-4-6',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Tatalaksana TB Komperhensif di ruang Isolasi Tanggal 12 s.d 16 Oktober 2026 di RSUP Kariadi Semarang an : Defi Miftahul Jannah, A.Md.Kep (Belum Fix)',
    nominal: 13790000,
    isChecked: true
  },
  {
    id: 'j-4-7',
    itemId: 'item-4',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PIT PERDOSRI XXV (The 25th Annual Scientific Meeting of Indonesian Association of Physical Medicine & Rehabilitation), pada tanggal 23-26 September 2026 di Batam an : dr. Jerry Kurnia Wahyudi, Sp.KFR (Belum Fix)',
    nominal: 9719700,
    isChecked: true
  },
  {
    id: 'j-4-8',
    itemId: 'item-4',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa Mengikuti Pelatihan Perawatan Intensif ICVCU Tanggal 21 Juli – 22 Oktober 2026 di RS Jantung dan Pembuluh Darah Harapan Kita Jakarta, Pembayaran Tahap 1 dari total hak peserta meliputi biayaan : Uang Harian 1 Hari,Uang Saku 74 Hari, Uang Kos 1 Bulanan : Ns. Abelia Pongkaluran, S.Kep',
    nominal: 17185600,
    isChecked: true
  },
  {
    id: 'j-4-9',
    itemId: 'item-4',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Perfuat Tingkat Lanjut (Advance) akan dilaksanakan pada tanggal 13 Januari 2026 sd 17 Juli 2026,di Jakarta (Pembayaran Tahap 2 : akan dilakukan dari Januari s.d April 2026 an : Ayu Putu Marta, S.Kep.Ners,Tirta Lestari, S.Kep.Ns,Ayu Putu Marta,S.Kep',
    nominal: 35619560,
    isChecked: true
  },
  {
    id: 'j-4-10',
    itemId: 'item-4',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan/ Sertifikasi Penanganan Obat Kanker (Handling Cytotoxic) bagi Tenaga Kefarmasian Tanggal 16 s.d 20 Juni/ Juni 2026 di Jakarta an : Nur Atika, A.Md., Farm,Siti Widia Astuti, A.Md., Farm.',
    nominal: 16124760,
    isChecked: true
  },
  {
    id: 'j-4-11',
    itemId: 'item-4',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Keperawatan Kardiovaskuler Tingkat Dasar (PKKVTD) bagi Perawat di Pelayanan Kesehatan Tanggal 7 Juni sampai dengan 15 Agustus 2026 di RS Dr.Kariadi Semarang (Jawa Tengah), Pembayaran Tahap 1 dari total hak peserta meliputi biayaan : Uang Harian 1 Hari,Uang Saku 55 Hari, Uang Kos 1 Bulan. an : Ns. Sutrisno, S.Kep',
    nominal: 10984400,
    isChecked: true
  },
  {
    id: 'j-4-12',
    itemId: 'item-4',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Asuhan Keperawatan EEG dibutuhkan perawat spesifik (Mahir/Kompeten melakukan Pemeriksaan EEG) di RS Universitas Airlangga Surabaya Tanggal 1 Juni s.d 7 Juni an : Ns. Trysnawati, S.Kep',
    nominal: 9844364,
    isChecked: true
  },
  {
    id: 'j-4-13',
    itemId: 'item-4',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa, Mengikuti Workshop dan Simposium American Institute of Functional Integrate Dry Needling (Module 1, Module 2 & Module 3) Tanggal 25 s.d 1 April 2026 an : dr. Septian Widyantoro, Sp.N',
    nominal: 9998900,
    isChecked: true
  },
  {
    id: 'j-4-14',
    itemId: 'item-4',
    tanggalTransaksi: '18 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Mengikuti Pelatihan Dialisis Batch3 bagi perawat di rumah sakit dan klinik khusus dialisis di RS Airlangga Surabaya, Jawa Timur Tanggal 23 Februari s.d 22 Juli 2026, (Pembayaran Tahap 1 : akan dilakukan dari total hak peserta yaitu 121 Hari. Sisa pembayaran, yang meliputi uang harian 1 hari, uang saku selama 29 hari, dan biaya tiket pesawat pulang, dan kos, akan dibayarkan setelah peserta kembali dari pelatihan dan melengkapi seluruh berkas administrasi pelatihan.) an: Ns. Vidyani Firdosi, S.Kep,Ns. Setiawan Tri Handoko, S.Kep',
    nominal: 21758600,
    isChecked: true
  },
  {
    id: 'j-4-15',
    itemId: 'item-4',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat Pelatihan, Mengikuti Workshop dan Simposium USG Abdomen – Pelvis Tahap I Angkatan ke - 101 Tanggal 15 s.d 19 April 2026 Jakarta an : dr. Ryan Vientino Pratama, Sp.PD',
    nominal: 9970515,
    isChecked: true
  },
  {
    id: 'j-4-16',
    itemId: 'item-4',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas, Workshop dan Simposium Jakarta International Endoscopy Symposium & Live Demonstration (JIGES-LD) 2026 Tanggal 11 s.d 15 Februari 2026 Jakarta an : dr. M. Anief Ferdianto, Sp.PD-KGEH',
    nominal: 9501088,
    isChecked: true
  },
  {
    id: 'j-4-17',
    itemId: 'item-4',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan National Scientific Meeting 2026 tanggal 30 April 2026 s.d 03 Mei 2026 di Makassar an : dr. Andry Ardhani, Sp.N',
    nominal: 7386260,
    isChecked: true
  },
  {
    id: 'j-4-18',
    itemId: 'item-4',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan IPDAC 19 "Global Perspectives on Cranial Growth and Development in Children; Challenges and Innovation."di Makassar tanggal 28 April s.d 2 Mei 2026 an : drg. Olivia Triifina Ngo, MDSc.,Sp.KGA',
    nominal: 9590088,
    isChecked: true
  },
  {
    id: 'j-4-19',
    itemId: 'item-4',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Kegiatan Pelatihan Kompetensi pengadaan BARJAS level 1 di Jakarta Tanggal 16-30 April 2026 an : dr.Rustam Samsuddin,MM',
    nominal: 12799388,
    isChecked: true
  },
  {
    id: 'j-4-20',
    itemId: 'item-4',
    tanggalTransaksi: '15 Mei 2026',
    bulan: 'Bulan Mei',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Perfuat Tingkat Lanjut (Advance) akan dilaksanakan pada tanggal 13 Januari 2026 sd 17 Juli 2026,di Jakarta (Pembayaran Tahap 1 : akan dilakukan dari total hak peserta, berupa Kos 4 Bulan dari dari Januari s.d April 2026 dan Uang Saku selama 110 Hari dan uang harian 1 hari) an : Ayu Putu Marta, S.Kep.Ners,Tirta Lestari, S.Kep.Ns',
    nominal: 35619560,
    isChecked: true
  }
];
