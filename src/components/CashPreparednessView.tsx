import React, { useState, useMemo } from 'react';
import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import {
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { DayakCornerSilhouette, DayakRibbonTrim, DayakTableWatermark } from './DayakPatternDecor';
import { PrintPreviewModal } from './PrintPreviewModal';

interface CashPreparednessViewProps {
  items: BudgetItem[];
  transactions: Record<string, JournalTransaction[]>;
}

export const CashPreparednessView: React.FC<CashPreparednessViewProps> = ({
  items,
  transactions
}) => {
  const [selectedTab, setSelectedTab] = useState<'semua' | 'belum_mulai' | 'menunggu_spj' | 'cair'>('semua');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Kompilasi analisis per komponen
  const componentsAnalysis = useMemo(() => {
    return items.map((item) => {
      const txs = transactions[item.id] || [];
      const totalPagu = item.jumlahTotal;
      const totalCair = item.terserap; // Sudah SPJ/cair
      const sisaPagu = item.sisa;

      // Klasifikasikan transaksi
      // Transaksi yang nominalnya tercatat di mutasi dianggap sudah cair
      // Kita hitung estimasi komitmen yang sedang dipersiapkan/menunggu SPJ vs belum ada kegiatan
      const menungguSpjEstimasi = txs
        .filter((t) => (t as any).statusKesiapan === 'menunggu_spj')
        .reduce((sum, t) => sum + t.nominal, 0);

      // Jika belum ada penandaan eksplisit pada transaksi, kita hitung alokasi sisa:
      // Sisa anggaran = kegiatan yang belum dilaksanakan (dana yang harus siap disimpan di kas)
      const danaBelumDilaksanakan = sisaPagu;

      return {
        item,
        txs,
        totalPagu,
        totalCair,
        persenCair: totalPagu > 0 ? (totalCair / totalPagu) * 100 : 0,
        danaBelumDilaksanakan,
        persenBelumDilaksanakan: totalPagu > 0 ? (danaBelumDilaksanakan / totalPagu) * 100 : 0,
        menungguSpjEstimasi,
        jumlahTransaksi: txs.length
      };
    });
  }, [items, transactions]);

  // Total Agregat
  const totals = useMemo(() => {
    const totalPagu = componentsAnalysis.reduce((acc, c) => acc + c.totalPagu, 0);
    const totalCair = componentsAnalysis.reduce((acc, c) => acc + c.totalCair, 0);
    const totalBelumDilaksanakan = componentsAnalysis.reduce((acc, c) => acc + c.danaBelumDilaksanakan, 0);

    return {
      totalPagu,
      totalCair,
      totalBelumDilaksanakan,
      persenCair: totalPagu > 0 ? (totalCair / totalPagu) * 100 : 0,
      persenBelum: totalPagu > 0 ? (totalBelumDilaksanakan / totalPagu) * 100 : 0
    };
  }, [componentsAnalysis]);

  // Filter items
  const filteredList = useMemo(() => {
    if (selectedTab === 'belum_mulai') {
      return componentsAnalysis.filter((c) => c.danaBelumDilaksanakan > 0);
    }
    if (selectedTab === 'cair') {
      return componentsAnalysis.filter((c) => c.totalCair > 0);
    }
    return componentsAnalysis;
  }, [componentsAnalysis, selectedTab]);

  // Generate Print HTML
  const printHtml = useMemo(() => {
    const rows = filteredList
      .map(
        (c, idx) => `
        <tr>
          <td style="text-align:center; padding: 8px; border: 1px solid #cbd5e1;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">
            <strong>${c.item.uraianSpesifik}</strong><br/>
            <small style="color: #64748b;">${c.item.kodeRekening} &bull; ${c.item.subKegiatanKelompok}</small>
          </td>
          <td style="text-align:right; padding: 8px; border: 1px solid #cbd5e1; font-family: monospace;">${FORMAT_RUPIAH(c.totalPagu)}</td>
          <td style="text-align:right; padding: 8px; border: 1px solid #cbd5e1; font-family: monospace; color: #047857; font-weight: bold;">
            ${FORMAT_RUPIAH(c.totalCair)}<br/>
            <small style="color: #64748b;">(${c.persenCair.toFixed(1)}%)</small>
          </td>
          <td style="text-align:right; padding: 8px; border: 1px solid #cbd5e1; font-family: monospace; color: #b45309; font-weight: bold;">
            ${FORMAT_RUPIAH(c.danaBelumDilaksanakan)}<br/>
            <small style="color: #64748b;">(${c.persenBelumDilaksanakan.toFixed(1)}%)</small>
          </td>
          <td style="text-align:center; padding: 8px; border: 1px solid #cbd5e1;">
            ${c.danaBelumDilaksanakan > 0 ? '<span style="background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;">Perlu Persiapan Kas</span>' : '<span style="background:#d1fae5;color:#065f46;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;">Selesai 100%</span>'}
          </td>
        </tr>
      `
      )
      .join('');

    return `
      <div style="font-family: Arial, sans-serif; color: #0f172a; padding: 20px;">
        <div style="text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase;">PEMERINTAH PROVINSI KALIMANTAN UTARA</h2>
          <h3 style="margin: 4px 0; font-size: 16px;">RSUD dr. H. JUSUF SK - TAHUN ANGGARAN 2026</h3>
          <h4 style="margin: 0; font-size: 14px; color: #0284c7; text-transform: uppercase;">MATRIKS KESIAPAN KAS & PERSIAPAN PEMBAYARAN KEGIATAN</h4>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div><strong>Total Pagu:</strong> ${FORMAT_RUPIAH(totals.totalPagu)}</div>
          <div><strong>Kegiatan Sudah Cair:</strong> <span style="color: #047857; font-weight: bold;">${FORMAT_RUPIAH(totals.totalCair)} (${totals.persenCair.toFixed(1)}%)</span></div>
          <div><strong>Dana Perlu Dipersiapkan:</strong> <span style="color: #b45309; font-weight: bold;">${FORMAT_RUPIAH(totals.totalBelumDilaksanakan)} (${totals.persenBelum.toFixed(1)}%)</span></div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #0284c7; color: white;">
              <th style="padding: 10px; border: 1px solid #0284c7; width: 35px;">No</th>
              <th style="padding: 10px; border: 1px solid #0284c7;">Kegiatan / Komponen Belanja</th>
              <th style="padding: 10px; border: 1px solid #0284c7; width: 140px;">Pagu Anggaran</th>
              <th style="padding: 10px; border: 1px solid #0284c7; width: 150px;">Sudah Dilaksanakan (Cair)</th>
              <th style="padding: 10px; border: 1px solid #0284c7; width: 160px;">Belum Dilaksanakan (Siapkan Kas)</th>
              <th style="padding: 10px; border: 1px solid #0284c7; width: 130px;">Status Kesiapan</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
          <tfoot>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <td colspan="2" style="text-align: center; padding: 10px; border: 1px solid #cbd5e1;">TOTAL KESELURUHAN</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #cbd5e1; font-family: monospace;">${FORMAT_RUPIAH(totals.totalPagu)}</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #cbd5e1; font-family: monospace; color: #047857;">${FORMAT_RUPIAH(totals.totalCair)}</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #cbd5e1; font-family: monospace; color: #b45309;">${FORMAT_RUPIAH(totals.totalBelumDilaksanakan)}</td>
              <td style="text-align: center; padding: 10px; border: 1px solid #cbd5e1;">100% TERMONITOR</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
          <div style="text-align: center; width: 220px; font-size: 12px;">
            <p>Tarakan, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p style="font-weight: bold; margin-bottom: 60px;">Pejabat Pengelola Keuangan,</p>
            <p style="text-decoration: underline; font-weight: bold; margin: 0;">BENDAHARA PENGELUARAN</p>
            <p style="margin: 0; color: #64748b;">NIP. 19820315 200801 1 002</p>
          </div>
        </div>
      </div>
    `;
  }, [filteredList, totals]);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Penjelasan Konsep */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 shadow-md border border-indigo-800/40">
        <DayakRibbonTrim colorScheme="gold" />
        <DayakCornerSilhouette position="top-right" size={120} className="opacity-25" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Matriks Manajemen Kesiapan Kas & Komitmen Pembayaran</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Persiapan Dana Kas Pembayaran Kegiatan
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Membandingkan langsung antara <strong>Kegiatan yang Sudah Dilaksanakan (Cair)</strong> bersebelahan dengan <strong>Kegiatan yang Belum Dilaksanakan</strong>. Menampilkan total alokasi anggaran yang harus siap disiapkan di kas daerah untuk pembayaran mendatang.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 active:bg-slate-200 text-indigo-950 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-indigo-700" />
              <span>Cetak Matriks Kas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Kartu KPI Komparasi Bersebelahan (Side-by-Side Comparison) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Pagu */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Pagu Anggaran
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-mono">
              {FORMAT_RUPIAH(totals.totalPagu)}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Total 4 Komponen Utama APBD 2026
            </div>
          </div>
        </div>

        {/* Kegiatan Sudah Dilaksanakan (Cair) */}
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/80 p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                1. Kegiatan Sudah Dilaksanakan (Cair)
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-800 font-mono">
              {FORMAT_RUPIAH(totals.totalCair)}
            </div>
            <div className="flex items-center justify-between mt-1 text-xs">
              <span className="text-emerald-700 font-bold">
                {totals.persenCair.toFixed(1)}% Dari Total Pagu
              </span>
              <span className="text-emerald-600/80 text-[11px]">SPJ Selesai</span>
            </div>
          </div>
        </div>

        {/* Kegiatan Belum Dilaksanakan (DANA PERSIAPAN KAS) */}
        <div className="bg-amber-50/60 rounded-2xl border-2 border-amber-300 p-5 shadow-md relative overflow-hidden ring-4 ring-amber-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                2. Kegiatan Belum Dilaksanakan (Siapkan Kas)
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-950 font-mono">
              {FORMAT_RUPIAH(totals.totalBelumDilaksanakan)}
            </div>
            <div className="flex items-center justify-between mt-1 text-xs">
              <span className="text-amber-800 font-extrabold">
                {totals.persenBelum.toFixed(1)}% Wajib Disiapkan di Kas
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 text-[10px] font-bold">
                Harus Siap Bayar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Penjelasan Visual Proporsi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            Sudah Dilaksanakan & Cair: {totals.persenCair.toFixed(1)}% ({FORMAT_RUPIAH(totals.totalCair)})
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 font-extrabold">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            Belum Dilaksanakan (Alokasi Kas yang Harus Siap): {totals.persenBelum.toFixed(1)}% ({FORMAT_RUPIAH(totals.totalBelumDilaksanakan)})
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${totals.persenCair}%` }}
            title={`Sudah Cair: ${totals.persenCair.toFixed(1)}%`}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${totals.persenBelum}%` }}
            title={`Belum Dilaksanakan / Harus Disiapkan: ${totals.persenBelum.toFixed(1)}%`}
          />
        </div>
      </div>

      {/* 4. Tabel Matriks Bersebelahan */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <DayakRibbonTrim colorScheme="blue" />

        {/* Toolbar Filter */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTab('semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedTab === 'semua'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Komponen ({componentsAnalysis.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('belum_mulai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedTab === 'belum_mulai'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              Perlu Persiapan Kas ({componentsAnalysis.filter((c) => c.danaBelumDilaksanakan > 0).length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('cair')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedTab === 'cair'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              Sudah Ada Realisasi ({componentsAnalysis.filter((c) => c.totalCair > 0).length})
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>Kolom <strong>Sudah Dilaksanakan</strong> dan <strong>Belum Dilaksanakan</strong> ditampilkan bersebelahan</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3.5 px-4 text-center w-12">No</th>
                <th className="py-3.5 px-4 min-w-[240px]">Komponen & Uraian Kegiatan</th>
                <th className="py-3.5 px-4 text-right min-w-[140px]">Pagu Anggaran</th>
                {/* Kolom Bersebelahan 1: Sudah Dilaksanakan */}
                <th className="py-3.5 px-4 text-right min-w-[170px] bg-emerald-50/70 text-emerald-900 border-x border-emerald-100">
                  <div className="flex items-center justify-end gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kegiatan Sudah Dilaksanakan (Cair)</span>
                  </div>
                </th>
                {/* Kolom Bersebelahan 2: Belum Dilaksanakan */}
                <th className="py-3.5 px-4 text-right min-w-[180px] bg-amber-50/70 text-amber-950 border-r border-amber-200">
                  <div className="flex items-center justify-end gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kegiatan Belum Dilaksanakan (Siapkan Kas)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center min-w-[130px]">Status Kesiapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((row, index) => (
                <tr
                  key={row.item.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 leading-snug">
                      {row.item.uraianSpesifik}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {row.item.kodeRekening} &bull; {row.item.kategoriBelanja}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                    {FORMAT_RUPIAH(row.totalPagu)}
                  </td>
                  {/* Kolom Bersebelahan 1: Sudah Dilaksanakan */}
                  <td className="py-3.5 px-4 text-right font-mono bg-emerald-50/30 border-x border-emerald-100/60">
                    <div className="font-extrabold text-emerald-700">
                      {FORMAT_RUPIAH(row.totalCair)}
                    </div>
                    <div className="text-[10px] font-medium text-emerald-600 mt-0.5">
                      {row.persenCair.toFixed(1)}% Pagu ({row.jumlahTransaksi} kuitansi)
                    </div>
                  </td>
                  {/* Kolom Bersebelahan 2: Belum Dilaksanakan */}
                  <td className="py-3.5 px-4 text-right font-mono bg-amber-50/30 border-r border-amber-200/60">
                    <div className="font-extrabold text-amber-900">
                      {FORMAT_RUPIAH(row.danaBelumDilaksanakan)}
                    </div>
                    <div className="text-[10px] font-bold text-amber-700 mt-0.5">
                      {row.persenBelumDilaksanakan.toFixed(1)}% Dana Harus Standby
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.danaBelumDilaksanakan > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Siapkan Kas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        100% Terealisasi
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/90 font-bold text-slate-800 border-t-2 border-slate-300">
                <td colSpan={2} className="py-3.5 px-4 text-center uppercase tracking-wider text-[11px]">
                  TOTAL KESELURUHAN ANGGARAN
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                  {FORMAT_RUPIAH(totals.totalPagu)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-800 bg-emerald-100/50 border-x border-emerald-200">
                  {FORMAT_RUPIAH(totals.totalCair)}
                  <div className="text-[10px] font-bold text-emerald-700">
                    ({totals.persenCair.toFixed(1)}%)
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-black text-amber-950 bg-amber-100/60 border-r border-amber-300">
                  {FORMAT_RUPIAH(totals.totalBelumDilaksanakan)}
                  <div className="text-[10px] font-bold text-amber-800">
                    ({totals.persenBelum.toFixed(1)}%)
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 text-[11px]">
                  Semua Komponen
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. Catatan Petunjuk Penggunaan untuk Bagian Keuangan / Kasir */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start gap-3.5 text-xs text-indigo-900 leading-relaxed">
        <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-indigo-950 text-sm mb-1">
            Panduan Kesiapan Kas Daerah (Cashflow Readiness)
          </div>
          <p>
            Nominal pada kolom <strong>Kegiatan Belum Dilaksanakan</strong> sebesar <strong className="font-mono text-indigo-950">{FORMAT_RUPIAH(totals.totalBelumDilaksanakan)}</strong> merupakan komitmen dana yang wajib tersedia di kas atau rekening bendahara pengeluaran agar saat SPJ kegiatan diajukan oleh PPTK / pelaksana, proses pembayaran dapat dicairkan tanpa keterlambatan likuiditas.
          </p>
        </div>
      </div>

      {/* Modal Cetak */}
      <PrintPreviewModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Matriks Kesiapan Kas & Komitmen Pembayaran"
        subtitle="RSUD dr. H. Jusuf SK - Provinsi Kalimantan Utara"
        htmlContent={printHtml}
        defaultLandscape={true}
      />
    </div>
  );
};
