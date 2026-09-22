import React, { useState, useEffect, useMemo } from 'react';
import { BudgetItem, PergeseranRecord } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import {
  X,
  SlidersHorizontal,
  PlusCircle,
  MinusCircle,
  RotateCcw,
  Save,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Check,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';
import { DayakRibbonTrim } from './DayakPatternDecor';

interface PergeseranModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: BudgetItem[];
  initialItemId?: string;
  onSavePergeseran: (record: PergeseranRecord) => void;
  onResetPergeseran: (itemId: string) => void;
}

export const PergeseranModal: React.FC<PergeseranModalProps> = ({
  isOpen,
  onClose,
  items,
  initialItemId,
  onSavePergeseran,
  onResetPergeseran
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialItemId || (items[0]?.id ?? ''));

  // Form state
  const [mode, setMode] = useState<'tambah' | 'kurang' | 'nol'>('tambah');
  const [nominalStr, setNominalStr] = useState<string>('');
  const [dasarHukum, setDasarHukum] = useState<string>('');
  const [keterangan, setKeterangan] = useState<string>('');
  const [tanggalPerubahan, setTanggalPerubahan] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  // Synchronize when initialItemId changes
  useEffect(() => {
    if (initialItemId) {
      setSelectedId(initialItemId);
    } else if (items.length > 0 && !selectedId) {
      setSelectedId(items[0].id);
    }
  }, [initialItemId, items, selectedId]);

  const currentItem = useMemo(() => {
    return items.find((i) => i.id === selectedId) || items[0] || null;
  }, [items, selectedId]);

  // Load existing pergeseran data into form when currentItem changes
  useEffect(() => {
    if (!currentItem) return;

    if (currentItem.pergeseran > 0) {
      setMode('tambah');
      setNominalStr(String(currentItem.pergeseran));
    } else if (currentItem.pergeseran < 0) {
      setMode('kurang');
      setNominalStr(String(Math.abs(currentItem.pergeseran)));
    } else {
      setMode('nol');
      setNominalStr('0');
    }

    setDasarHukum(currentItem.dasarHukumPergeseran || '');
    setKeterangan(currentItem.keteranganPergeseran || '');
    setTanggalPerubahan(
      currentItem.tanggalPergeseran || new Date().toISOString().slice(0, 10)
    );
  }, [currentItem]);

  // Compute values directly without conditional hooks
  const clean = nominalStr.replace(/\D/g, '');
  const parsedNominal = clean ? parseInt(clean, 10) : 0;
  const finalPergeseran = mode === 'nol' ? 0 : mode === 'kurang' ? -Math.abs(parsedNominal) : Math.abs(parsedNominal);

  if (!isOpen || !currentItem) {
    return null;
  }

  // Projected budget calculations
  const projectedPaguEfektif = currentItem.paguMurni + finalPergeseran;
  const projectedSisa = projectedPaguEfektif - currentItem.terserap;
  const isOverRealisasi = projectedPaguEfektif < currentItem.terserap;
  const isNegativePagu = projectedPaguEfektif < 0;

  // Quick nominal buttons
  const QUICK_AMOUNTS = [
    { label: '+ 1 Juta', value: 1000000 },
    { label: '+ 5 Juta', value: 5000000 },
    { label: '+ 10 Juta', value: 10000000 },
    { label: '+ 25 Juta', value: 25000000 },
    { label: '+ 50 Juta', value: 50000000 },
    { label: '+ 100 Juta', value: 100000000 }
  ];

  const handleQuickAdd = (amt: number) => {
    const nextVal = (parsedNominal || 0) + amt;
    setNominalStr(String(nextVal));
    if (mode === 'nol') setMode('tambah');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNegativePagu) {
      alert('Pagu efektif tidak boleh kurang dari Rp 0!');
      return;
    }

    onSavePergeseran({
      itemId: currentItem.id,
      pergeseran: finalPergeseran,
      dasarHukum: dasarHukum.trim() || undefined,
      keterangan: keterangan.trim() || undefined,
      tanggalPerubahan
    });

    onClose();
  };

  const handleReset = () => {
    if (confirm(`Kembalikan anggaran ${currentItem.uraianSpesifik} ke Pagu Murni awal (tanpa pergeseran)?`)) {
      onResetPergeseran(currentItem.id);
      setMode('nol');
      setNominalStr('0');
      setDasarHukum('');
      setKeterangan('');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <DayakRibbonTrim colorScheme="gold" />

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-5 flex items-start justify-between border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-400/30 rounded-xl text-amber-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                Perekaman Anggaran Pergeseran & Perubahan
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 font-sans">
                Penambahan (+) atau Pengurangan (-) Pagu DPA APBD TA 2026
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Sasaran Anggaran Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Pilih Sasaran Belanja / Kode Rekening
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden transition-all shadow-2xs"
            >
              {items.map((it) => (
                <option key={it.id} value={it.id}>
                  {it.kodeRekening} &bull; {it.uraianSpesifik} (Pagu: {FORMAT_RUPIAH(it.jumlahTotal)})
                </option>
              ))}
            </select>
          </div>

          {/* Current Budget Info Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pagu Murni Awal</div>
              <div className="font-mono font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                {FORMAT_RUPIAH(currentItem.paguMurni)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pergeseran Saat Ini</div>
              <div className={`font-mono font-bold text-xs sm:text-sm mt-0.5 ${
                currentItem.pergeseran > 0
                  ? 'text-emerald-600'
                  : currentItem.pergeseran < 0
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}>
                {currentItem.pergeseran > 0 ? '+' : ''}
                {FORMAT_RUPIAH(currentItem.pergeseran)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Realisasi SP2D</div>
              <div className="font-mono font-bold text-blue-600 text-xs sm:text-sm mt-0.5">
                {FORMAT_RUPIAH(currentItem.terserap)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pagu Efektif Berjalan</div>
              <div className="font-mono font-black text-slate-900 text-xs sm:text-sm mt-0.5">
                {FORMAT_RUPIAH(currentItem.jumlahTotal)}
              </div>
            </div>
          </div>

          {/* Mode Penyesuaian Anggaran */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Jenis Penyesuaian Anggaran (Pergeseran / Perubahan)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Option 1: Penambahan (+) */}
              <button
                type="button"
                onClick={() => setMode('tambah')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  mode === 'tambah'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/30 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-black">Penambahan (+)</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">
                  Pagu anggaran bertambah
                </span>
              </button>

              {/* Option 2: Pengurangan (-) */}
              <button
                type="button"
                onClick={() => setMode('kurang')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  mode === 'kurang'
                    ? 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/30 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1 text-rose-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-black">Pengurangan (-)</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">
                  Pagu anggaran berkurang
                </span>
              </button>

              {/* Option 3: Tetap / Reset (0) */}
              <button
                type="button"
                onClick={() => {
                  setMode('nol');
                  setNominalStr('0');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  mode === 'nol'
                    ? 'bg-slate-100 border-slate-500 text-slate-900 ring-2 ring-slate-400/30 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1 text-slate-600">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-black">Pagu Murni (0)</span>
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">
                  Kembali tanpa pergeseran
                </span>
              </button>
            </div>
          </div>

          {/* Nominal Input (if not 'nol') */}
          {mode !== 'nol' && (
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Nominal {mode === 'tambah' ? 'Penambahan' : 'Pengurangan'} (Rp)
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-black text-sm ${
                  mode === 'tambah' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {mode === 'tambah' ? '+ Rp' : '- Rp'}
                </span>
                <input
                  type="text"
                  required
                  value={nominalStr ? new Intl.NumberFormat('id-ID').format(parsedNominal) : ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setNominalStr(raw);
                  }}
                  placeholder="0"
                  className={`w-full pl-16 pr-4 py-2.5 text-base font-mono font-bold text-slate-900 bg-white border rounded-xl focus:ring-2 outline-hidden transition-all ${
                    mode === 'tambah'
                      ? 'border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500'
                      : 'border-rose-300 focus:ring-rose-500 focus:border-rose-500'
                  }`}
                />
              </div>

              {/* Quick Increment Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] font-bold text-slate-400 mr-1 uppercase">Cepat:</span>
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => handleQuickAdd(q.value)}
                    className="text-[10.5px] font-mono font-semibold px-2 py-0.8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors border border-slate-200"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dasar Dokumen & Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Dasar Hukum / Nomor Dokumen Perubahan
              </label>
              <div className="relative">
                <FileCheck2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dasarHukum}
                  onChange={(e) => setDasarHukum(e.target.value)}
                  placeholder="Contoh: Pergub No. 12 Thn 2026 / DPPA-SKPD TA 2026"
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Tanggal Penetapan
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={tanggalPerubahan}
                  onChange={(e) => setTanggalPerubahan(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Keterangan / Alasan Pergeseran */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Keterangan / Alasan Penyesuaian Anggaran
            </label>
            <textarea
              rows={2}
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Contoh: Penyesuaian target peserta asessor atau efisiensi anggaran belanja perjalanan dinas..."
              className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden resize-none"
            />
          </div>

          {/* LIVE SIMULATION CARD (Dampak Anggaran) */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Simulasi Hasil Pagu Efektif Baru
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Otomatis mengupdate laporan & grafik
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Pagu Murni</div>
                <div className="font-mono font-bold text-slate-700 text-xs mt-0.5">
                  {FORMAT_RUPIAH(currentItem.paguMurni)}
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Nilai Pergeseran</div>
                <div className={`font-mono font-black text-xs mt-0.5 ${
                  finalPergeseran > 0
                    ? 'text-emerald-600'
                    : finalPergeseran < 0
                    ? 'text-rose-600'
                    : 'text-slate-500'
                }`}>
                  {finalPergeseran > 0 ? '+' : ''}
                  {FORMAT_RUPIAH(finalPergeseran)}
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Pagu Efektif Baru</div>
                <div className="font-mono font-black text-slate-900 text-xs sm:text-sm mt-0.5">
                  {FORMAT_RUPIAH(projectedPaguEfektif)}
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Proyeksi Sisa Pagu</div>
                <div className={`font-mono font-black text-xs sm:text-sm mt-0.5 ${
                  projectedSisa < 0 ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {FORMAT_RUPIAH(projectedSisa)}
                </div>
              </div>
            </div>

            {/* Warning if over-realisasi */}
            {isOverRealisasi && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-900 flex items-start gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Peringatan Pengurangan Anggaran:</strong>
                  <p className="text-[11px] text-red-800 mt-0.5 leading-relaxed">
                    Pengurangan ini menyebabkan Pagu Efektif baru ({FORMAT_RUPIAH(projectedPaguEfektif)}) lebih kecil dari Realisasi SP2D yang telah terserap ({FORMAT_RUPIAH(currentItem.terserap)}). Sisa anggaran menjadi defisit minus ({FORMAT_RUPIAH(projectedSisa)}).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200">
            {currentItem.pergeseran !== 0 ? (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset ke Pagu Murni (Rp 0)
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Simpan Pergeseran
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
