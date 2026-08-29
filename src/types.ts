export interface BudgetItem {
  id: string;
  kodeRekening: string;
  kategoriBelanja: string;
  kelompokAkun: 'Belanja Barang' | 'Belanja Jasa' | 'Belanja Perjalanan Dinas';
  subKegiatanKelompok: string;
  uraianSpesifik: string;
  spesifikasiDetail?: string;
  koefisienVolume: string;
  volumeAngka: number;
  satuan: string;
  hargaSatuan: number;
  paguMurni: number;
  pergeseran: number;
  jumlahTotal: number; // Pagu Efektif
  terserap: number;
  sisa: number;
  persenSerapan: number;
  persentaseTotal: number; // % of total Rp 2.093.974.768
  colorDot?: string; // e.g. '#ef4444' (red), '#f97316' (orange), '#10b981' (green), '#06b6d4' (cyan), '#3b82f6' (blue)
  isHighlightPerjalananDinas?: boolean;
  isHighlightKontribusi?: boolean;
  targetSDM?: number;
  catatanAnalisis?: string;
}

export interface JournalTransaction {
  id: string;
  itemId: string;
  tanggalTransaksi: string;
  bulan: string;
  mataRekening: string;
  jenisBelanjaBadge: string;
  uraianKeterangan: string;
  nominal: number;
  isChecked?: boolean;
  fileKuitansiName?: string;
}

export type SidebarMenu = 'ringkasan' | 'sertifikat' | 'bulanan' | 'item-detail';

export interface BudgetSummary {
  totalPagu: number;
  totalTerserap: number;
  totalSisa: number;
  persenSerapanTotal: number;
  totalItems: number;
}
