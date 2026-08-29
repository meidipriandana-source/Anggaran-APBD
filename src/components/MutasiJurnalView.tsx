import React, { useState, useMemo, useRef } from 'react';
import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Calendar,
  Lock,
  ChevronDown,
  ArrowLeft,
  Upload,
  FileCheck,
  Download,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';

interface MutasiJurnalViewProps {
  item: BudgetItem;
  transactions: JournalTransaction[];
  onAddTransaction: (transaction: Omit<JournalTransaction, 'id'>) => void;
  onUpdateTransaction: (transaction: JournalTransaction) => void;
  onDeleteTransaction: (id: string) => void;
  onBackToRingkasan?: () => void;
}

const BULAN_OPTIONS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

export const MutasiJurnalView: React.FC<MutasiJurnalViewProps> = ({
  item,
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  onBackToRingkasan
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    return new Set(transactions.map((t) => t.id));
  });

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<JournalTransaction | null>(null);

  // State for Delete Confirmation Modal (avoids blocked window.confirm in iframe)
  const [txToDelete, setTxToDelete] = useState<JournalTransaction | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // Form State matching screenshot
  const [formTanggal, setFormTanggal] = useState('29/08/2026');
  const [formBulan, setFormBulan] = useState('Agustus');
  const [formUraian, setFormUraian] = useState('');
  const [formNominal, setFormNominal] = useState<number | ''>('');
  const [formFileName, setFormFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter transactions for this specific BudgetItem
  const itemTransactions = useMemo(() => {
    return transactions.filter((t) => t.itemId === item.id);
  }, [transactions, item.id]);

  // Keep selectedIds updated when transactions list changes
  React.useEffect(() => {
    setSelectedIds((prev) => {
      const next = new Set<string>();
      itemTransactions.forEach((t) => {
        if (prev.has(t.id) || prev.size === 0) {
          next.add(t.id);
        }
      });
      return next.size > 0 ? next : new Set(itemTransactions.map((t) => t.id));
    });
  }, [itemTransactions]);

  // Apply search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return itemTransactions;
    const q = searchQuery.toLowerCase();
    return itemTransactions.filter(
      (t) =>
        t.uraianKeterangan.toLowerCase().includes(q) ||
        t.tanggalTransaksi.toLowerCase().includes(q) ||
        t.mataRekening.toLowerCase().includes(q) ||
        t.bulan.toLowerCase().includes(q)
    );
  }, [itemTransactions, searchQuery]);

  // Calculate sum of selected/checked rows
  const totalNominalTerpilih = useMemo(() => {
    return itemTransactions
      .filter((t) => selectedIds.has(t.id))
      .reduce((sum, t) => sum + t.nominal, 0);
  }, [itemTransactions, selectedIds]);

  // Checkbox toggle handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredTransactions.length && filteredTransactions.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTransactions.map((t) => t.id)));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setFormTanggal('29/08/2026');
    setFormBulan('Agustus');
    setFormUraian('');
    setFormNominal('');
    setFormFileName('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (tx: JournalTransaction) => {
    setEditingTransaction(tx);
    // Format tanggal
    setFormTanggal(tx.tanggalTransaksi.includes('/') ? tx.tanggalTransaksi : '29/08/2026');
    setFormBulan(tx.bulan.replace('Bulan ', ''));
    setFormUraian(tx.uraianKeterangan);
    setFormNominal(tx.nominal);
    setFormFileName(tx.fileKuitansiName || '');
    setIsModalOpen(true);
  };

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFileName(file.name);
    }
  };

  // Save Add/Edit
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const num = typeof formNominal === 'number' ? formNominal : parseFloat(String(formNominal));
    if (!formUraian.trim() || isNaN(num) || num <= 0) return;

    if (editingTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        tanggalTransaksi: formTanggal.includes('/') ? `${formTanggal.split('/')[0]} ${formBulan} 2026` : formTanggal,
        bulan: `Bulan ${formBulan}`,
        uraianKeterangan: formUraian,
        nominal: num,
        fileKuitansiName: formFileName || undefined
      });
    } else {
      const newId = `j-${item.id}-${Date.now()}`;
      onAddTransaction({
        itemId: item.id,
        tanggalTransaksi: `${formTanggal.split('/')[0] || '29'} ${formBulan} 2026`,
        bulan: `Bulan ${formBulan}`,
        mataRekening: item.uraianSpesifik,
        jenisBelanjaBadge: 'BELANJA LANGSUNG',
        uraianKeterangan: formUraian,
        nominal: num,
        isChecked: true,
        fileKuitansiName: formFileName || undefined
      });
      setSelectedIds((prev) => new Set([...prev, newId]));
    }

    setIsModalOpen(false);
  };

  // Delete Handlers
  const handleOpenDelete = (tx: JournalTransaction) => {
    setTxToDelete(tx);
  };

  const handleConfirmDeleteSingle = () => {
    if (txToDelete) {
      onDeleteTransaction(txToDelete.id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(txToDelete.id);
        return next;
      });
      setTxToDelete(null);
    }
  };

  const handleConfirmDeleteBulk = () => {
    selectedIds.forEach((id) => {
      onDeleteTransaction(id);
    });
    setSelectedIds(new Set());
    setIsBulkDeleteModalOpen(false);
  };

  // Export CSV of transactions
  const handleExportCSV = () => {
    const exportData = filteredTransactions.filter((t) => selectedIds.has(t.id));
    const dataToExport = exportData.length > 0 ? exportData : filteredTransactions;

    const headers = ['No', 'Tanggal Transaksi', 'Bulan', 'Mata Rekening', 'Uraian Keterangan', 'Nominal (Rp)'];
    const rows = dataToExport.map((t, idx) => [
      idx + 1,
      `"${t.tanggalTransaksi}"`,
      `"${t.bulan}"`,
      `"${t.mataRekening}"`,
      `"${t.uraianKeterangan.replace(/"/g, '""')}"`,
      t.nominal
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mutasi_Jurnal_${item.uraianSpesifik.replace(/[^a-zA-Z0-9]/g, '_')}_2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isAllSelected =
    filteredTransactions.length > 0 && selectedIds.size === filteredTransactions.length;

  return (
    <div className="space-y-6">
      {/* Back button option */}
      {onBackToRingkasan && (
        <button
          type="button"
          onClick={onBackToRingkasan}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 active:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Ringkasan Belanja</span>
        </button>
      )}

      {/* Dark Modern Mutasi Jurnal Card Container */}
      <div className="bg-[#0b1329] text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Header toolbar */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  Mutasi Jurnal
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  ({itemTransactions.length} Tercatat)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Centang baris untuk menyertakannya dalam cetakan dan penjumlahan otomatis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari uraian atau bulan..."
                className="w-full pl-9 pr-8 py-2 bg-[#131f3b] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Ekspor CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#131f3b] hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700/80 transition-all active:scale-95 cursor-pointer"
              title="Ekspor daftar mutasi transaksi terpilih ke CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Ekspor CSV</span>
            </button>

            {/* + Rekam Data Button */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-blue-600/20 transition-all shrink-0 active:scale-95 cursor-pointer"
              title="Tambah kuitansi / mutasi jurnal baru"
            >
              <Plus className="w-4 h-4" />
              <span>Rekam Data</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0e172e] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center w-10">
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    className="p-1 hover:text-white text-slate-400 cursor-pointer"
                    title={isAllSelected ? 'Batal pilih semua' : 'Pilih semua'}
                  >
                    {isAllSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4 min-w-[140px]">TANGGAL TRANSAKSI</th>
                <th className="py-3.5 px-4 min-w-[220px]">MATA REKENING</th>
                <th className="py-3.5 px-4 min-w-[320px]">URAIAN / KETERANGAN</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap min-w-[130px]">NOMINAL (RP)</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap w-28">TINDAKAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Belum ada data mutasi jurnal untuk komponen belanja ini. Klik tombol{' '}
                    <strong className="text-blue-400">+ Rekam Data</strong> untuk menambahkan kuitansi/transaksi.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isChecked = selectedIds.has(tx.id);
                  return (
                    <tr
                      key={tx.id}
                      className={`group transition-colors duration-150 ${
                        isChecked ? 'bg-[#0f1b38]/50 hover:bg-[#132349]/70' : 'hover:bg-slate-800/40 opacity-70'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleRow(tx.id)}
                          className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Tanggal Transaksi */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white leading-tight">
                          {tx.tanggalTransaksi}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                          {tx.bulan}
                        </div>
                      </td>

                      {/* Mata Rekening */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200 leading-snug">
                          {tx.mataRekening}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-blue-950/80 text-blue-400 border border-blue-800/60 uppercase">
                            {tx.jenisBelanjaBadge || 'BELANJA LANGSUNG'}
                          </span>
                          {tx.fileKuitansiName && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40">
                              <FileCheck className="w-3 h-3" />
                              PDF Lampiran
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Uraian / Keterangan */}
                      <td className="py-4 px-4">
                        <p className="text-slate-300 font-normal leading-relaxed">
                          {tx.uraianKeterangan}
                        </p>
                      </td>

                      {/* Nominal (RP) */}
                      <td className="py-4 px-4 text-right whitespace-nowrap font-mono font-bold text-sm text-white">
                        {FORMAT_RUPIAH(tx.nominal)}
                      </td>

                      {/* Tindakan (Edit & Hapus) */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(tx)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold bg-blue-900/60 hover:bg-blue-800 active:bg-blue-700 text-blue-300 hover:text-white border border-blue-700/60 transition-all active:scale-95 cursor-pointer"
                            title="Edit data transaksi ini"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          {/* Hapus Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(tx)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold bg-red-950/70 hover:bg-red-900/90 active:bg-red-800 text-red-400 hover:text-white border border-red-800/60 transition-all active:scale-95 cursor-pointer"
                            title="Hapus data transaksi ini"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Dynamic Sum Bar */}
        <div className="p-4 sm:p-5 bg-[#0a1024] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-slate-400">
              Terpilih: <strong className="text-slate-200 font-mono">{selectedIds.size}</strong> dari {itemTransactions.length} transaksi
            </span>
            <button
              type="button"
              onClick={handleToggleSelectAll}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline cursor-pointer"
            >
              {isAllSelected ? 'Kosongkan Pilihan' : 'Pilih Semua'}
            </button>
            {selectedIds.size > 0 && (
              <button
                type="button"
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 transition-all cursor-pointer active:scale-95 ml-2"
                title="Hapus semua transaksi yang dicentang"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
                <span>Hapus ({selectedIds.size}) Terpilih</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              TOTAL NOMINAL TERPILIH:
            </span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">
              {FORMAT_RUPIAH(totalNominalTerpilih)}
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Hapus Single Transaksi */}
      {txToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#0b1329] border border-red-900/60 text-slate-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 bg-red-950/80 border border-red-800/80 text-red-400 rounded-2xl shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                    Hapus Mutasi Jurnal?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tindakan ini akan menghapus data transaksi dari sistem dan memperbarui sisa pagu anggaran.
                  </p>
                </div>
              </div>

              {/* Transaction Detail Card */}
              <div className="p-3.5 bg-[#131f3b] border border-slate-700/80 rounded-xl space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tanggal:</span>
                  <span className="font-medium text-slate-200">{txToDelete.tanggalTransaksi}</span>
                </div>
                <div className="flex items-start justify-between text-xs text-slate-400 gap-2">
                  <span className="shrink-0">Uraian:</span>
                  <span className="font-medium text-slate-200 text-right line-clamp-2">{txToDelete.uraianKeterangan}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-700/60">
                  <span className="text-slate-400 font-bold uppercase">Nominal:</span>
                  <span className="font-mono font-bold text-red-400 text-sm">{FORMAT_RUPIAH(txToDelete.nominal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setTxToDelete(null)}
                  className="px-4 py-2.5 text-slate-300 hover:text-white font-bold text-xs rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteSingle}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Ya, Hapus Mutasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Hapus Bulk Transaksi */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#0b1329] border border-red-900/60 text-slate-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 bg-red-950/80 border border-red-800/80 text-red-400 rounded-2xl shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                    Hapus {selectedIds.size} Transaksi Terpilih?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Seluruh {selectedIds.size} transaksi yang dicentang dengan total nominal{' '}
                    <strong className="text-red-400 font-mono">{FORMAT_RUPIAH(totalNominalTerpilih)}</strong> akan dihapus permanen.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => setIsBulkDeleteModalOpen(false)}
                  className="px-4 py-2.5 text-slate-300 hover:text-white font-bold text-xs rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteBulk}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Ya, Hapus Semua Terpilih</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Mutasi Jurnal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#0b1329] border border-slate-800 text-slate-100 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                    {editingTransaction ? 'Edit Realisasi Belanja' : 'Form Perekaman Realisasi Belanja'}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    REKAM PENGGUNAAN ANGGARAN SECARA VALID
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveForm} className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Field 1: KATEGORI BELANJA */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  KATEGORI BELANJA
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled
                    value={item.uraianSpesifik}
                    className="w-full bg-[#131f3b] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-medium pr-10 focus:outline-none cursor-not-allowed select-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 2 & 3: TANGGAL KUITANSI & BULAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    TANGGAL KUITANSI
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      value={formTanggal}
                      onChange={(e) => setFormTanggal(e.target.value)}
                      placeholder="29/08/2026"
                      className="w-full bg-[#131f3b] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-medium pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    BULAN
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={formBulan}
                      onChange={(e) => setFormBulan(e.target.value)}
                      className="w-full bg-[#131f3b] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-medium pr-10 appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 cursor-pointer"
                    >
                      {BULAN_OPTIONS.map((bln) => (
                        <option key={bln} value={bln} className="bg-slate-900 text-white">
                          {bln}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 4: BESARAN RUPIAH (IDR) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  BESARAN RUPIAH (IDR)
                </label>
                <div className="relative flex items-center bg-[#131f3b] border border-slate-700/80 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40">
                  <span className="px-3.5 py-2.5 text-xs font-bold text-slate-400 bg-slate-800/60 border-r border-slate-700/80 select-none">
                    Rp
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formNominal}
                    onChange={(e) => setFormNominal(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Contoh: 15000000"
                    className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 font-mono font-medium focus:outline-none placeholder-slate-500"
                  />
                </div>
                {formNominal !== '' && typeof formNominal === 'number' && formNominal > 0 && (
                  <div className="mt-1 text-[11px] text-emerald-400 font-mono font-semibold">
                    = {FORMAT_RUPIAH(formNominal)}
                  </div>
                )}
              </div>

              {/* Field 5: KETERANGAN / DESKRIPSI BELANJA */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  KETERANGAN / DESKRIPSI BELANJA
                </label>
                <textarea
                  rows={3}
                  required
                  value={formUraian}
                  onChange={(e) => setFormUraian(e.target.value)}
                  placeholder="Misal: Biaya Perjalanan Dinas..."
                  className="w-full bg-[#131f3b] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 placeholder-slate-500 resize-none leading-relaxed"
                />
              </div>

              {/* Field 6: FILE KUITANSI (PDF) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    FILE KUITANSI (PDF)
                  </label>
                  {formFileName && (
                    <button
                      type="button"
                      onClick={() => setFormFileName('')}
                      className="text-[10px] text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Hapus File
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-slate-700/90 rounded-xl p-4 sm:p-5 text-center cursor-pointer hover:border-blue-500/60 hover:bg-slate-800/30 transition-all flex flex-col items-center justify-center gap-1.5 group bg-[#0e172e]/50"
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {formFileName ? formFileName : 'Pilih Kuitansi PDF'}
                  </span>
                  {formFileName && (
                    <span className="text-[10px] text-emerald-400 font-medium">
                      ✓ File terpilih siap diunggah
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white font-bold text-xs rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


