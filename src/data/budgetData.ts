import { BudgetItem, BudgetSummary, JournalTransaction } from '../types';

export const TOTAL_PAGU_ANGGARAN = 2090455000; // Rp 2.090.455.000,00 (Total 13 Rincian Belanja Aktif DPA Perubahan)
export const TOTAL_TERSERAP_ANGGARAN = 838072668; // Rp 838.072.668,00 (Total realisasi seluruh mutasi SP2D)
export const TOTAL_SISA_ANGGARAN = 1252382332; // Rp 1.252.382.332,00 (Sisa pagu efektif)

export const DPA_PERUBAHAN_INFO = {
  nomorSubKegiatan: '1.02.03.1.02.0001',
  namaSubKegiatan: 'Peningkatan Kompetensi dan Kualifikasi Sumber Daya Manusia Kesehatan',
  skpd: 'RSUD dr. H. Jusuf SK',
  provinsi: 'Kalimantan Utara',
  tahunAnggaran: '2026',
  totalSebelum: 0,
  totalSesudah: 2090455000,
  totalCetakanDPA: 2090477464,
  pajakRokok: 2040455000,
  pad: 50000000,
  direktur: 'dr Budy Azis B, Sp.PK., MH',
  nipDirektur: '197403362008031002',
  tapd: [
    { nama: 'BERTIUS, S.Hut', nip: '197202061993011001', jabatan: 'ANGGOTA' },
    { nama: 'H. SAPTITI, S.T., M.AP', nip: '197202082001121004', jabatan: 'ANGGOTA' }
  ]
};

/**
 * Daftar Rincian Anggaran Belanja Sub Kegiatan:
 * 1.02.03.1.02.0001 Peningkatan Kompetensi dan Kualifikasi Sumber Daya Manusia Kesehatan
 * RSUD dr. H. Jusuf SK - TA 2026 (14 Rincian Belanja Berdasarkan DPA Perubahan SKPD)
 */
export const BUDGET_DATA: BudgetItem[] = [
  // 1. Makanan dan Minuman Jamuan Tamu Akreditasi (Prasmanan)
  {
    id: 'item-2',
    kodeRekening: '5.1.02.01.001.00053',
    kategoriBelanja: 'Makanan dan Minuman Jamuan Tamu',
    kelompokAkun: 'Belanja Barang',
    subKegiatanKelompok: 'KEGIATAN AKREDITASI (JAMUAN TAMU AKREDITASI)',
    uraianSpesifik: 'Belanja Makanan dan Minuman Jamuan Tamu Akreditasi (Prasmanan)',
    spesifikasiDetail: 'Makanan dan Minuman Jamuan Tamu (Prasmanan) Khusus Tim Asesor Akreditasi',
    koefisienVolume: '7 Paket',
    volumeAngka: 7,
    satuan: 'Paket',
    hargaSatuan: 5000000,
    paguMurni: 35000000,
    pergeseran: 0,
    jumlahTotal: 35000000,
    terserap: 0,
    sisa: 35000000,
    persenSerapan: 0.0,
    persentaseTotal: (35000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#f59e0b',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Jamuan resmi prasmanan untuk tim surveyor dan asesor akreditasi.'
  },
  // 3. Makanan dan Minuman Rapat (Nasi Kotak Biasa)
  {
    id: 'item-3',
    kodeRekening: '5.1.02.01.01.0052',
    kategoriBelanja: 'Makanan dan Minuman Rapat',
    kelompokAkun: 'Belanja Barang',
    subKegiatanKelompok: 'BELANJA MAKANAN DAN MINUMAN RAPAT / KEGIATAN',
    uraianSpesifik: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    spesifikasiDetail: 'Konsumsi Rapat Koordinasi, Pembahasan Peningkatan Mutu SDM & Pelayanan RS',
    koefisienVolume: '2.842 Kotak / Porsi',
    volumeAngka: 2842,
    satuan: 'Kotak / Porsi',
    hargaSatuan: 60000,
    paguMurni: 170520000,
    pergeseran: 0,
    jumlahTotal: 170520000,
    terserap: 113350000,
    sisa: 57170000,
    persenSerapan: (113350000 / 170520000) * 100,
    persentaseTotal: (170520000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#f97316',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Realisasi 7 mutasi SP2D konsumsi rapat (Total: Rp 113.350.000).'
  },
  // 4. Makanan dan Minuman Rapat (Nasi Kotak Akreditasi)
  {
    id: 'item-4',
    kodeRekening: '5.1.02.01.01.0052',
    kategoriBelanja: 'Makanan dan Minuman Rapat',
    kelompokAkun: 'Belanja Barang',
    subKegiatanKelompok: 'MAKANAN DAN MINUMAN AKREDITASI (NASI KOTAK)',
    uraianSpesifik: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa (Akreditasi)',
    spesifikasiDetail: 'Konsumsi Nasi Kotak Tim Akreditasi & Pendampingan Mutu RS',
    koefisienVolume: '2.250 Kotak / Porsi',
    volumeAngka: 2250,
    satuan: 'Kotak / Porsi',
    hargaSatuan: 60000,
    paguMurni: 135000000,
    pergeseran: 0,
    jumlahTotal: 135000000,
    terserap: 0,
    sisa: 135000000,
    persenSerapan: 0.0,
    persentaseTotal: (135000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#f97316',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Alokasi konsumsi nasi kotak untuk rangkaian survei akreditasi rumah sakit.'
  },
  // 5. Prasmanan VIP (Akreditasi)
  {
    id: 'item-5',
    kodeRekening: '5.1.02.01.01.0052',
    kategoriBelanja: 'Makanan dan Minuman Rapat',
    kelompokAkun: 'Belanja Barang',
    subKegiatanKelompok: 'MAKANAN DAN MINUMAN AKREDITASI (PRASMANAN AKREDITASI)',
    uraianSpesifik: 'Prasmanan VIP (Akreditasi)',
    spesifikasiDetail: 'Prasmanan VIP Spesifikasi: Per Porsi untuk Tim Penilai / Asesor Akreditasi & Jajaran Direksi',
    koefisienVolume: '251 Orang / Kali / Acara',
    volumeAngka: 251,
    satuan: 'Porsi',
    hargaSatuan: 85000,
    paguMurni: 21335000,
    pergeseran: 0,
    jumlahTotal: 21335000,
    terserap: 0,
    sisa: 21335000,
    persenSerapan: 0.0,
    persentaseTotal: (21335000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#eab308',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Penyediaan jamuan VIP untuk pleno pembukaan dan penutupan survei akreditasi.'
  },
  // 6. Honorarium Pengajar Dalam / Luar Daerah
  {
    id: 'item-6',
    kodeRekening: '5.1.02.02.001.00011',
    kategoriBelanja: 'Honorarium Narasumber',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'HONORARIUM PENGAJAR DALAM / LUAR DAERAH',
    uraianSpesifik: 'Honorarium Pengajar Dalam / Luar Daerah',
    spesifikasiDetail: 'Honorarium Pengajar yang Berasal dari Luar Satuan Kerja Perangkat Daerah Penyelenggara',
    koefisienVolume: '1.012 Jam',
    volumeAngka: 1012,
    satuan: 'Jam / Orang / Kali',
    hargaSatuan: 300000,
    paguMurni: 303600000,
    pergeseran: 0,
    jumlahTotal: 303600000,
    terserap: 142820000,
    sisa: 160780000,
    persenSerapan: (142820000 / 303600000) * 100,
    persentaseTotal: (303600000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#10b981',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Terserap Rp 142.820.000 untuk honorarium narasumber dan instruktur diklat teknis.'
  },
  // 7. Jasa Iklan/Reklame, Film, dan Pemotretan (Akreditasi)
  {
    id: 'item-7',
    kodeRekening: '5.1.02.02.001.00055',
    kategoriBelanja: 'Jasa Iklan / Reklame',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KEGIATAN AKREDITASI',
    uraianSpesifik: 'Jasa Iklan/Reklame, Film, dan Pemotretan (Akreditasi)',
    spesifikasiDetail: 'Media Cetak, Surat Kabar Harian - Publikasi Hasil Akreditasi & Mutu RS',
    koefisienVolume: '10 Paket',
    volumeAngka: 10,
    satuan: 'Paket',
    hargaSatuan: 1500000,
    paguMurni: 15000000,
    pergeseran: 0,
    jumlahTotal: 15000000,
    terserap: 0,
    sisa: 15000000,
    persenSerapan: 0.0,
    persentaseTotal: (15000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#06b6d4',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Publikasi transparansi mutu pelayanan RS di media cetak daerah.'
  },
  // 8. Belanja Kontribusi Tenaga Medis / Keperawatan / Penunjang / Manajemen
  {
    id: 'item-8',
    kodeRekening: '5.1.02.02.012.00001',
    kategoriBelanja: 'Belanja Kursus Singkat/Pelatihan',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KONTRIBUSI (PENINGKATAN KOMPETENSI KAPASITAS ASN)',
    uraianSpesifik: 'Belanja Kontribusi Tenaga Medis / Keperawatan / Penunjang / Manajemen',
    spesifikasiDetail: 'Kontribusi biaya kepesertaan diklat teknis medis, keperawatan & manajemen rumah sakit',
    koefisienVolume: '40 Orang / Kegiatan',
    volumeAngka: 40,
    satuan: 'Orang / Kegiatan',
    hargaSatuan: 10000000,
    paguMurni: 400000000,
    pergeseran: 0,
    jumlahTotal: 400000000,
    terserap: 225030334,
    sisa: 174969666,
    persenSerapan: (225030334 / 400000000) * 100,
    persentaseTotal: (400000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#3b82f6',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: true,
    sumberDana: 'Pajak Rokok',
    targetSDM: 40,
    catatanAnalisis: 'Realisasi 26 mutasi SP2D pelatihan tenaga medis/keperawatan & sertifikasi ATCLS (Total: Rp 225.030.334).'
  },
  // 9. Biaya Perjalanan Dinas Dalam Negeri (Paket 10 - 76 Orang)
  {
    id: 'item-9',
    kodeRekening: '5.1.02.04.001.00001',
    kategoriBelanja: 'Perjalanan Dinas Dalam Negeri',
    kelompokAkun: 'Belanja Perjalanan Dinas',
    subKegiatanKelompok: 'PERJALANAN DINAS TENAGA MEDIS/PENUNJANG/KEPERAWATAN/MANAJEMEN',
    uraianSpesifik: 'Biaya Perjalanan Dinas Dalam Negeri (Paket 10 - 76 Orang)',
    spesifikasiDetail: 'Biaya Perjalanan Dinas, Tiket Pesawat, Uang Harian & Penginapan Pelatihan/Workshop Nakes',
    koefisienVolume: '76 Orang / Paket',
    volumeAngka: 76,
    satuan: 'Orang / Paket',
    hargaSatuan: 10000000,
    paguMurni: 760000000,
    pergeseran: 0,
    jumlahTotal: 760000000,
    terserap: 356872334,
    sisa: 403127666,
    persenSerapan: (356872334 / 760000000) * 100,
    persentaseTotal: (760000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#3b82f6',
    isHighlightPerjalananDinas: true,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    targetSDM: 76,
    catatanAnalisis: 'Realisasi 20 mutasi SP2D perjalanan dinas dalam negeri nakes (Total: Rp 356.872.334).'
  },
  // 10. Biaya Perjalanan Dinas Tenaga Medis (Batch 6 Orang Spesialis Prioritas)
  {
    id: 'item-10',
    kodeRekening: '5.1.02.04.001.00001',
    kategoriBelanja: 'Perjalanan Dinas',
    kelompokAkun: 'Belanja Perjalanan Dinas',
    subKegiatanKelompok: 'PERJALANAN DINAS TENAGA MEDIS/PENUNJANG/KEPERAWATAN/MANAJEMEN',
    uraianSpesifik: 'Biaya Perjalanan Dinas Dalam Negeri (Paket 10 - 6 Orang Spesialis Prioritas)',
    spesifikasiDetail: 'Transportasi dan akomodasi pelatihan fellowship/subspesialis prioritas',
    koefisienVolume: '6 Orang / Paket',
    volumeAngka: 6,
    satuan: 'Orang / Paket',
    hargaSatuan: 10000000,
    paguMurni: 60000000,
    pergeseran: 0,
    jumlahTotal: 60000000,
    terserap: 0,
    sisa: 60000000,
    persenSerapan: 0.0,
    persentaseTotal: (60000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#3b82f6',
    isHighlightPerjalananDinas: true,
    isHighlightKontribusi: false,
    sumberDana: 'Pajak Rokok',
    targetSDM: 6,
    catatanAnalisis: 'Pelatihan fellowship subspesialis prioritas semester II.'
  },
  // 11. Biaya Perjalanan Dinas Surveyor Akreditasi (AKREDITASI) (5 Paket)
  {
    id: 'item-12',
    kodeRekening: '5.1.02.04.001.00001',
    kategoriBelanja: 'Perjalanan Dinas',
    kelompokAkun: 'Belanja Perjalanan Dinas',
    subKegiatanKelompok: 'PERJALANAN DINAS SURVEYOR (AKREDITASI)',
    uraianSpesifik: 'Biaya Perjalanan Dinas Dalam Negeri - Surveyor Akreditasi (AKREDITASI)',
    spesifikasiDetail: 'Tiket pesawat & akomodasi tim surveyor lembaga independen akreditasi RS',
    koefisienVolume: '5 Paket / Paket',
    volumeAngka: 5,
    satuan: 'Paket',
    hargaSatuan: 10000000,
    paguMurni: 50000000,
    pergeseran: 0,
    jumlahTotal: 50000000,
    terserap: 0,
    sisa: 50000000,
    persenSerapan: 0.0,
    persentaseTotal: (50000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#3b82f6',
    isHighlightPerjalananDinas: true,
    isHighlightKontribusi: false,
    sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
    catatanAnalisis: 'Akomodasi survei lapangan penilaian akreditasi nasional.'
  },
  // 13. Kontribusi Surveyor / Pendampingan Akreditasi (1 Orang @ Rp 40.000.000)
  {
    id: 'item-13',
    kodeRekening: '5.1.02.02.012.00001',
    kategoriBelanja: 'Kontribusi Lembaga Surveyor',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KEGIATAN AKREDITASI (KONTRIBUSI SURVEYOR)',
    uraianSpesifik: 'Kontribusi Surveyor / Pendampingan Akreditasi (1 Orang / Kegiatan)',
    spesifikasiDetail: 'Kontribusi Surveyor / Pendampingan Akreditasi - Tenaga Ahli Utama',
    koefisienVolume: '1 Orang / Kegiatan',
    volumeAngka: 1,
    satuan: 'Orang / Kegiatan',
    hargaSatuan: 40000000,
    paguMurni: 40000000,
    pergeseran: 0,
    jumlahTotal: 40000000,
    terserap: 0,
    sisa: 40000000,
    persenSerapan: 0.0,
    persentaseTotal: (40000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#0d9488',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: true,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Kontribusi surveyor pendampingan akreditasi independen nasional.'
  },
  // 14. Kontribusi Surveyor / Pendampingan Akreditasi (2 Orang @ Rp 30.000.000)
  {
    id: 'item-14',
    kodeRekening: '5.1.02.02.012.00001',
    kategoriBelanja: 'Kontribusi Lembaga Surveyor',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KEGIATAN AKREDITASI (KONTRIBUSI SURVEYOR)',
    uraianSpesifik: 'Kontribusi Surveyor / Pendampingan Akreditasi (2 Orang / Kegiatan)',
    spesifikasiDetail: 'Kontribusi Surveyor / Pendampingan Akreditasi - Tim Asesor Pendamping',
    koefisienVolume: '2 Orang / Kegiatan',
    volumeAngka: 2,
    satuan: 'Orang / Kegiatan',
    hargaSatuan: 30000000,
    paguMurni: 60000000,
    pergeseran: 0,
    jumlahTotal: 60000000,
    terserap: 0,
    sisa: 60000000,
    persenSerapan: 0.0,
    persentaseTotal: (60000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#0d9488',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: true,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Kontribusi 2 orang tim asesor survei akreditasi rumah sakit.'
  },
  // 15. Kontribusi Surveyor / Pendampingan Akreditasi (1 Orang @ Rp 40.000.000)
  {
    id: 'item-15',
    kodeRekening: '5.1.02.02.012.00001',
    kategoriBelanja: 'Kontribusi Lembaga Surveyor',
    kelompokAkun: 'Belanja Jasa',
    subKegiatanKelompok: 'KEGIATAN AKREDITASI (KONTRIBUSI SURVEYOR)',
    uraianSpesifik: 'Kontribusi Surveyor / Pendampingan Akreditasi (1 Orang / Kegiatan)',
    spesifikasiDetail: 'Kontribusi Surveyor / Pendampingan Akreditasi - Evaluator Standar Mutu',
    koefisienVolume: '1 Orang / Kegiatan',
    volumeAngka: 1,
    satuan: 'Orang / Kegiatan',
    hargaSatuan: 40000000,
    paguMurni: 40000000,
    pergeseran: 0,
    jumlahTotal: 40000000,
    terserap: 0,
    sisa: 40000000,
    persenSerapan: 0.0,
    persentaseTotal: (40000000 / TOTAL_PAGU_ANGGARAN) * 100,
    colorDot: '#0d9488',
    isHighlightPerjalananDinas: false,
    isHighlightKontribusi: true,
    sumberDana: 'Pajak Rokok',
    catatanAnalisis: 'Kontribusi verifikator instrumen akreditasi standar mutu.'
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
  { bulan: 'Januari 2026', pagu: 174204583, realisasi: 45000000, serapan: 25.83, status: 'Selesai' },
  { bulan: 'Februari 2026', pagu: 174204583, realisasi: 95500000, serapan: 54.82, status: 'Selesai' },
  { bulan: 'Maret 2026', pagu: 174204583, realisasi: 142820000, serapan: 81.98, status: 'Selesai' },
  { bulan: 'April 2026', pagu: 174204583, realisasi: 180000000, serapan: 103.33, status: 'Selesai' },
  { bulan: 'Mei 2026', pagu: 174204583, realisasi: 212755334, serapan: 122.13, status: 'Selesai' },
  { bulan: 'Juni 2026', pagu: 174204583, realisasi: 190000000, serapan: 109.07, status: 'Berjalan' },
  { bulan: 'Juli 2026', pagu: 174204583, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'Agustus 2026', pagu: 174204583, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'September 2026', pagu: 174204583, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'Oktober 2026', pagu: 174204583, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'November 2026', pagu: 174204583, realisasi: 0, serapan: 0.0, status: 'Rencana' },
  { bulan: 'Desember 2026', pagu: 174204587, realisasi: 0, serapan: 0.0, status: 'Rencana' }
];

export const FORMAT_RUPIAH = (val: number, withDecimals = false): string => {
  if (isNaN(val)) return 'Rp 0';
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0
  }).format(absVal);
  // Ensure consistent spacing 'Rp ' instead of 'Rp'
  const clean = formatted.replace(/^Rp\s*/, 'Rp ');
  return isNegative ? `- ${clean}` : clean;
};

export const FORMAT_NUM = (val: number): string => {
  if (isNaN(val)) return '0';
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(absVal);
  return isNegative ? `-${formatted}` : formatted;
};

export const PARSE_ID_NUMBER = (str: string): number => {
  if (!str) return 0;
  const clean = str.replace(/[^\d]/g, '');
  return clean ? parseInt(clean, 10) : 0;
};

export const DEFAULT_JOURNAL_DATA: JournalTransaction[] = [
  // Item 3: Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa
  {
    id: 'j-3-1',
    itemId: 'item-3',
    tanggalTransaksi: '29 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Triase (Belum Mulai)',
    nominal: 4800000,
    isChecked: true
  },
  {
    id: 'j-3-2',
    itemId: 'item-3',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'psikiatri (Belum Mulai)',
    nominal: 12650000,
    isChecked: true
  },
  {
    id: 'j-3-3',
    itemId: 'item-3',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'APN (Belum Mulai)',
    nominal: 17400000,
    isChecked: true
  },
  {
    id: 'j-3-4',
    itemId: 'item-3',
    tanggalTransaksi: '28 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'PALS (Belum Mulai)',
    nominal: 4560000,
    isChecked: true
  },
  {
    id: 'j-3-5',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Penatalaksanaan keperawatan perioperatif bagi perawat kamar bedah Tanggal 8 s.d 9 Agustus 2026 di RSUD dr.H Jusuf.SK Tarakan (Belum SPJ)',
    nominal: 4320000,
    isChecked: true
  },
  {
    id: 'j-3-6',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Basic Trauma and Cardiac Life Support (BTCLS) Gelombang 1-56Tanggal 27 Juni s.d 6 Agustus 2026 di RSUD dr H Jusuf SK ( Belum SPJ)',
    nominal: 38880000,
    isChecked: true
  },
  {
    id: 'j-3-7',
    itemId: 'item-3',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Refresh Bantuan Hidup Dasar (BHD) Bagi staf Non-Medis Tahun 2026 Gelombang 1 s.d 5 Tanggal 19 Mei s.d 4 Juni 2026 di RSUD dr.H Jusuf.SK Tarakan (Belum SPJ)',
    nominal: 30740000,
    isChecked: true
  },

  // Item 6: Honorarium Pengajar / Narasumber (Total Rp 142.820.000)
  {
    id: 'j-6-1',
    itemId: 'item-6',
    tanggalTransaksi: '15 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honor Narasumber Diklat BTCLS Batch 1-3 (Dokter Spesialis Anastesi & Bedah)',
    nominal: 48000000,
    isChecked: true
  },
  {
    id: 'j-6-2',
    itemId: 'item-6',
    tanggalTransaksi: '10 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honor Pengajar Workshop Refresh BHD Non-Medis Gelombang 1-5',
    nominal: 42820000,
    isChecked: true
  },
  {
    id: 'j-6-3',
    itemId: 'item-6',
    tanggalTransaksi: '20 Mei 2026',
    bulan: 'Bulan Mei',
    mataRekening: 'Honorarium Pengajar / Narasumber',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Honorarium Narasumber Pelatihan Perioperatif Kamar Bedah',
    nominal: 52000000,
    isChecked: true
  },

  // Item 8: Belanja Kontribusi Kursus/Pelatihan (Total 25 Transaksi = Rp 195.125.000)
  {
    id: 'j-8-1',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Tatalaksana TB Komprehensif di ruang Isolasi Tanggal 12 s.d 16 Oktober 2026 di RSUP Kariadi Semarang an : Defi Miftahul Jannah, A.Md.Kep (Belum SPJ)',
    nominal: 4500000,
    isChecked: true
  },
  {
    id: 'j-8-2',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Nutri Symposium 2026 (Beyond Calories - Protein For Growth Strength Recovery and Survival) tanggal 24 - 26 Juli 2026 di Jakarta an : dr. Husnul Khatimah, Sp.GK (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-3',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan PKKVTD ( Pelatihan Keperawatan kardiovaskuler Tingkat Dasar) Tanggal 7 September s.d 18 November 2026 di Jakarta an : Muhammad Amin Usman Tarro, A.Md.Kep (Belum SPJ)',
    nominal: 22500000,
    isChecked: true
  },
  {
    id: 'j-8-4',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop ACPID ASINPO Tanggal 14 s.d 16 Agustus 2026 di Jakarta an : dr. Franky Siantoro, Sp.A (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-5',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Keperawatan Intensif Neonatus bagi perawat di ruang NICU Tanggal 18 Oktober s.d 5 Desember 2026 di RS Sardjito Yogyakarta an : Ns. Rizkini Layuk, S.Kep (Belum SPJ)',
    nominal: 15000000,
    isChecked: true
  },
  {
    id: 'j-8-6',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti 3rd PEGOSUS Pediatric Gastroenterology Hepatology Symposium Updates Tanggal 31 Juli s.d. 2 Agustus 2026 di Jakarta an : dr. Erma Ratna Fury, Sp.A (Belum SPJ)',
    nominal: 3000000,
    isChecked: true
  },
  {
    id: 'j-8-7',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Symposium 4th Solo Surgical Forum Current Surgical Update: Exploring Update and Innovation in Surgery Tanggal 25 s.d 26 Juli 2026 di Solo (Jawa Tengah) an : dr. Rodjaya Putra, Sp.B-KBD (Belum SPJ)',
    nominal: 2750000,
    isChecked: true
  },
  {
    id: 'j-8-8',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan / Kontribusi : Mengikuti workshop Baperuom Bandung Pediatric Urogenital and Oncology Surgery Meeting Tanggal 30 Juli s.d 1 Agustus 2026 di Bandung an : dr. Amir Sautin Sibarani, Sp.BA. (Belum SPJ)',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-9',
    itemId: 'item-8',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PIT PERDOSRI XXV (The 25th Annual Scientific Meeting of Indonesian Association of Physical Medicine & Rehabilitation), pada tanggal 23-26 September 2026 di Batam an : dr. Jerry Kurnia Wahyudi, Sp.KFR (Belum SPJ)',
    nominal: 2125000,
    isChecked: true
  },
  {
    id: 'j-8-10',
    itemId: 'item-8',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Daring (Platform Ujian Online dan Zoom Meeting) Sertifikasi CCAE Tanggal 15 Agustus 2026 an : Fatmairinah, S.Ak., M.M., CRMP., CRPP',
    nominal: 2500000,
    isChecked: true
  },
  {
    id: 'j-8-11',
    itemId: 'item-8',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan : Mengikuti PIT PDS PA (Working Conference XVII and Annual Scientific Meeting) 2026 Tanggal 30 Juni s.d 7 Juli 2026 di Malang ( Jawa Timur ) an : dr. Ledyna Rumapar, Sp.PA',
    nominal: 3550000,
    isChecked: true
  },
  {
    id: 'j-8-12',
    itemId: 'item-8',
    tanggalTransaksi: '4 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Training of trainer (TOT) BT&CLS Instruktur Course Tanggal 3 s.d 7 Agustus 2026 di Jakarta an : Suhud Tri Rahim, S.Kep,Ns, Bayu Purnomo, S.Kep',
    nominal: 5200000,
    isChecked: true
  },
  {
    id: 'j-8-13',
    itemId: 'item-8',
    tanggalTransaksi: '4 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan BLINC (Bali International Neurovascular Intervention Conference) 2026 "Stroke Wars:Beyond the Circle" tanggal 26 s.d 29 April 2026 di Bali an : dr. I Nyoman Gunawan, Sp.Rad',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-14',
    itemId: 'item-8',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa, Mengikuti Workshop dan Simposium American Institute of Functional Integrate Dry Needling (Module 1, Module 2 & Module 3) Tanggal 25 s.d 1 April 2026 an : dr. Septian Widyantoro, Sp.N',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-15',
    itemId: 'item-8',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan Pelatihan Workshop ELSA OUTREACH PROGRAMME Tanggal 18-20 Juni 2026 di Balikpapan an. dr. Yufriadi Yunus, Sp.B',
    nominal: 2500000,
    isChecked: true
  },
  {
    id: 'j-8-16',
    itemId: 'item-8',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PelatihanNeurointervensi bagi perawat di rumah sakit Tanggal 27 Juli s.d 24 Agustus 2026 di RS PON Jakarta an : Ns. Ragil Prasojo,S.Kep',
    nominal: 19000000,
    isChecked: true
  },
  {
    id: 'j-8-17',
    itemId: 'item-8',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan: Mengikuti Pelatihan Perawatan Intensif ICVCU Tanggal 22 Juli - 21 Oktober 2026 di RS Jantung dan Pembuluh Darah Harapan Kita Jakarta an : Ns. Abelia Pongkaluran, S.Kep',
    nominal: 20000000,
    isChecked: true
  },
  {
    id: 'j-8-18',
    itemId: 'item-8',
    tanggalTransaksi: '6 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan : Pelatihan Keperawatan Kardiovaskuler Tingkat Dasar (PKKVTD) bagi Perawat di Pelayanan Kesehatan Tanggal 7 Juni sampai dengan 15 Agustus 2026 di RS Dr.Kariadi Semarang an : Ns. Sutrisno, S.Kep',
    nominal: 20000000,
    isChecked: true
  },
  {
    id: 'j-8-19',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat Pelatihan, Mengikuti Workshop dan Simposium USG Abdomen – Pelvis Tahap I Angkatan ke - 101 Tanggal 15 s.d 19 April 2026 Jakarta an : dr. Ryan Vientino Pratama, Sp.PD',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-20',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas, Workshop dan Simposium Jakarta International Endoscopy Symposium & Live Demonstration (JIGES-LD) 2026 Tanggal 11 s.d 15 Februari 2026 Jakarta an : dr. M. Anief Ferdianto, Sp.PD-KGEH',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-21',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan National Scientific Meeting 2026 tanggal 30 April 2026 s.d 03 Mei 2026 di Makassar an : dr. Andry Ardhani, Sp.N',
    nominal: 3000000,
    isChecked: true
  },
  {
    id: 'j-8-22',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan IPDAC 19 "Global Perspectives on Cranial Growth and Development in Children; Challenges and Innovation."di Makassar tanggal 28 April s.d 2 Mei 2026 an : drg. Olivia Triifina Ngo, MDSc.,Sp.KGA',
    nominal: 5000000,
    isChecked: true
  },
  {
    id: 'j-8-23',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Kegiatan Pelatihan Kompetensi pengadaan BARJAS level 1 di Jakarta Tanggal 16-30 April 2026 an : dr.Rustam Samsuddin,MM',
    nominal: 5250000,
    isChecked: true
  },
  {
    id: 'j-8-24',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Pelatihan/ Sertifikasi Penanganan Obat Kanker (Handling Cytotoxic) bagi Tenaga Kefarmasian Tanggal 16 s.d 20 Juni/ Juni 2026 di Jakarta an : Nur Atika, A.Md., Farm.Sti Widia Astuti, A.Md., Farm.',
    nominal: 16000000,
    isChecked: true
  },
  {
    id: 'j-8-25',
    itemId: 'item-8',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti Pelatihan Asuhan Keperawatan EEG dibutuhkan perawat spesifik (Mahir/Kompeten melakukan Pemeriksaan EEG) di RS Universitas Airlangga Surabaya Tanggal 2 Juni s.d 6 Juni an : Ns. Trysnawati, S.Kep',
    nominal: 8250000,
    isChecked: true
  },

  // Item 9: Perjalanan Dinas Dalam Negeri (Total 20 Transaksi = Rp 336.772.334)
  {
    id: 'j-9-1',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Mengikuti Pelatihan Dialisis Batch3 bagi perawat di rumah sakit dan klinik khusus dialisis di RS Airlangga Surabaya, Jawa Timur Tanggal 23 Februari s.d 22 Juli 2026, (Pembayaran Tahap 2 an: Ns. Vidyani Firdosi, S.Kep,Ns. Setiawan Tri Handoko, S.Kep(Belum SPJ)',
    nominal: 19483500,
    isChecked: true
  },
  {
    id: 'j-9-2',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop Baperuom Bandung Pediatric Urogenital and Oncology Surgery Meeting Tanggal 30 Juli s.d. 1 Agustus 2026 di Bandung an : dr. Amir Sautin Sibarani, Sp.BA. (Belum SPJ Belum Fix)',
    nominal: 9076051,
    isChecked: true
  },
  {
    id: 'j-9-3',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Keperawatan Intensif Neonatus bagi perawat di ruang NICU Tanggal 1 September s.d 20 November 2026 di RSAB Harapan Kita an : Ns. Rizkini Layuk, S.Kep (Belum Fix)',
    nominal: 61130000,
    isChecked: true
  },
  {
    id: 'j-9-4',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti workshop ACPID ASINPO Tanggal 14 s.d. 16 Agustus 2026 di Jakarta an : dr. Franky Siantoro, Sp.A (Belum SPJ)',
    nominal: 10950000,
    isChecked: true
  },
  {
    id: 'j-9-5',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan PKKVTD ( Pelatihan Keperawatan kardiovaskuler Tingkat Dasar) Tanggal 7 September s.d 18 November 2026 di Jakarta an : Muhammad Amin Usman Tarro, A.Md.Kep (Belum Fix)',
    nominal: 26340000,
    isChecked: true
  },
  {
    id: 'j-9-6',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Tatalaksana TB Komperhensif di ruang Isolasi Tanggal 12 s.d 16 Oktober 2026 di RSUP Kariadi Semarang an : Defi Miftahul Jannah, A.Md.Kep (Belum Fix)',
    nominal: 13790000,
    isChecked: true
  },
  {
    id: 'j-9-7',
    itemId: 'item-9',
    tanggalTransaksi: '23 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat/Pelatihan Mengikuti PIT PERDOSRI XXV (The 25th Annual Scientific Meeting of Indonesian Association of Physical Medicine & Rehabilitation), pada tanggal 23-26 September 2026 di Batam an : dr. Jerry Kurnia Wahyudi, Sp.KFR (Belum Fix)',
    nominal: 9719700,
    isChecked: true
  },
  {
    id: 'j-9-8',
    itemId: 'item-9',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa Mengikuti Pelatihan Perawatan Intensif ICVCU Tanggal 21 Juli – 22 Oktober 2026 di RS Jantung dan Pembuluh Darah Harapan Kita Jakarta, Pembayaran Tahap 1 dari total hak peserta meliputi biayaan : Uang Harian 1 Hari,Uang Saku 74 Hari, Uang Kos 1 Bulanan : Ns. Abelia Pongkaluran, S.Kep',
    nominal: 17185600,
    isChecked: true
  },
  {
    id: 'j-9-9',
    itemId: 'item-9',
    tanggalTransaksi: '8 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Perfuat Tingkat Lanjut (Advance) akan dilaksanakan pada tanggal 13 Januari 2026 sd 17 Juli 2026,di Jakarta (Pembayaran Tahap 2 : akan dilakukan dari Januari s.d April 2026 an : Ayu Putu Marta, S.Kep.Ners,Tirta Lestari, S.Kep.Ns,Ayu Putu Marta,S.Kep',
    nominal: 35619560,
    isChecked: true
  },
  {
    id: 'j-9-10',
    itemId: 'item-9',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan/ Sertifikasi Penanganan Obat Kanker (Handling Cytotoxic) bagi Tenaga Kefarmasian Tanggal 16 s.d 20 Juni/ Juni 2026 di Jakarta an : Nur Atika, A.Md., Farm,Siti Widia Astuti, A.Md., Farm.',
    nominal: 16124760,
    isChecked: true
  },
  {
    id: 'j-9-11',
    itemId: 'item-9',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Keperawatan Kardiovaskuler Tingkat Dasar (PKKVTD) bagi Perawat di Pelayanan Kesehatan Tanggal 7 Juni sampai dengan 15 Agustus 2026 di RS Dr.Kariadi Semarang (Jawa Tengah), Pembayaran Tahap 1 dari total hak peserta meliputi biayaan : Uang Harian 1 Hari,Uang Saku 55 Hari, Uang Kos 1 Bulan. an : Ns. Sutrisno, S.Kep',
    nominal: 10984400,
    isChecked: true
  },
  {
    id: 'j-9-12',
    itemId: 'item-9',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Pelatihan Asuhan Keperawatan EEG dibutuhkan perawat spesifik (Mahir/Kompeten melakukan Pemeriksaan EEG) di RS Universitas Airlangga Surabaya Tanggal 1 Juni s.d 7 Juni an : Ns. Trysnawati, S.Kep',
    nominal: 9844364,
    isChecked: true
  },
  {
    id: 'j-9-13',
    itemId: 'item-9',
    tanggalTransaksi: '23 Juli 2026',
    bulan: 'Bulan Juli',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Biasa, Mengikuti Workshop dan Simposium American Institute of Functional Integrate Dry Needling (Module 1, Module 2 & Module 3) Tanggal 25 s.d 1 April 2026 an : dr. Septian Widyantoro, Sp.N',
    nominal: 9998900,
    isChecked: true
  },
  {
    id: 'j-9-14',
    itemId: 'item-9',
    tanggalTransaksi: '18 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas Mengikuti Pelatihan Dialisis Batch3 bagi perawat di rumah sakit dan klinik khusus dialisis di RS Airlangga Surabaya, Jawa Timur Tanggal 23 Februari s.d 22 Juli 2026, (Pembayaran Tahap 1 : akan dilakukan dari total hak peserta yaitu 121 Hari. Sisa pembayaran, yang meliputi uang harian 1 hari, uang saku selama 29 hari, dan biaya tiket pesawat pulang, dan kos, akan dibayarkan setelah peserta kembali dari pelatihan dan melengkapi seluruh berkas administrasi pelatihan.) an: Ns. Vidyani Firdosi, S.Kep,Ns. Setiawan Tri Handoko, S.Kep',
    nominal: 21758600,
    isChecked: true
  },
  {
    id: 'j-9-15',
    itemId: 'item-9',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Kursus Singkat Pelatihan, Mengikuti Workshop dan Simposium USG Abdomen – Pelvis Tahap I Angkatan ke - 101 Tanggal 15 s.d 19 April 2026 Jakarta an : dr. Ryan Vientino Pratama, Sp.PD',
    nominal: 9970515,
    isChecked: true
  },
  {
    id: 'j-9-16',
    itemId: 'item-9',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Belanja Perjalanan Dinas, Workshop dan Simposium Jakarta International Endoscopy Symposium & Live Demonstration (JIGES-LD) 2026 Tanggal 11 s.d 15 Februari 2026 Jakarta an : dr. M. Anief Ferdianto, Sp.PD-KGEH',
    nominal: 9501088,
    isChecked: true
  },
  {
    id: 'j-9-17',
    itemId: 'item-9',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan National Scientific Meeting 2026 tanggal 30 April 2026 s.d 03 Mei 2026 di Makassar an : dr. Andry Ardhani, Sp.N',
    nominal: 7386260,
    isChecked: true
  },
  {
    id: 'j-9-18',
    itemId: 'item-9',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Mengikuti Kegiatan IPDAC 19 "Global Perspectives on Cranial Growth and Development in Children; Challenges and Innovation."di Makassar tanggal 28 April s.d 2 Mei 2026 an : drg. Olivia Triifina Ngo, MDSc.,Sp.KGA',
    nominal: 9590088,
    isChecked: true
  },
  {
    id: 'j-9-19',
    itemId: 'item-9',
    tanggalTransaksi: '4 Juni 2026',
    bulan: 'Bulan Juni',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Kegiatan Pelatihan Kompetensi pengadaan BARJAS level 1 di Jakarta Tanggal 16-30 April 2026 an : dr.Rustam Samsuddin,MM',
    nominal: 12799388,
    isChecked: true
  },
  {
    id: 'j-9-20',
    itemId: 'item-9',
    tanggalTransaksi: '15 Mei 2026',
    bulan: 'Bulan Mei',
    mataRekening: 'Perjalanan Dinas Dalam Negeri',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Pelatihan Perfuat Tingkat Lanjut (Advance) akan dilaksanakan pada tanggal 13 Januari 2026 sd 17 Juli 2026,di Jakarta (Pembayaran Tahap 1 : akan dilakukan dari total hak peserta, berupa Kos 4 Bulan dari dari Januari s.d April 2026 dan Uang Saku selama 110 Hari dan uang harian 1 hari) an : Ayu Putu Marta, S.Kep.Ners,Tirta Lestari, S.Kep.Ns',
    nominal: 35619560,
    isChecked: true
  },

  // Item 8 (mutasi tambahan ATCLS): Biaya Kontribusi Pelatihan ATCLS (Total Rp 29.905.334)
  {
    id: 'j-8-26',
    itemId: 'item-8',
    tanggalTransaksi: '02 Agustus 2026',
    bulan: 'Bulan Agustus',
    mataRekening: 'Belanja Kontribusi Kursus/Pelatihan',
    jenisBelanjaBadge: 'BELANJA LANGSUNG',
    uraianKeterangan: 'Kontribusi Registrasi Ujian Sertifikasi ATCLS PERKI (3 Dokter Spesialis)',
    nominal: 29905334,
    isChecked: true
  }
];

