import React, { useState, useMemo } from 'react';
import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_NUM, BUDGET_DATA, DEFAULT_JOURNAL_DATA } from '../data/budgetData';
import { Download, Printer, Filter, Calendar, CheckSquare, Square, Check, Layers } from 'lucide-react';
import { PrintPreviewModal } from './PrintPreviewModal';
import { LOGO_KALTARA } from '../assets/logoKaltara';
import { DayakTableWatermark, DayakRibbonTrim, DayakCornerSilhouette } from './DayakPatternDecor';

interface MonthlyReportViewProps {
  items?: BudgetItem[];
  transactions?: JournalTransaction[];
}

interface MonthlyRowItem {
  id: string;
  sasaranKegiatan: string;
  paguEfektif: number;
  januari: number;
  februari: number;
  maret: number;
  april: number;
  mei: number;
  juni: number;
  juli: number;
  agustus: number;
  september: number;
  oktober: number;
  november: number;
  desember: number;
  realisasi: number;
  sisa: number;
}

function getMonthKey(t: JournalTransaction): string {
  const str = `${t.bulan || ''} ${t.tanggalTransaksi || ''}`.toLowerCase();
  if (str.includes('jan')) return 'januari';
  if (str.includes('feb')) return 'februari';
  if (str.includes('mar')) return 'maret';
  if (str.includes('apr')) return 'april';
  if (str.includes('mei') || str.includes('may')) return 'mei';
  if (str.includes('jun')) return 'juni';
  if (str.includes('jul')) return 'juli';
  if (str.includes('agu') || str.includes('aug')) return 'agustus';
  if (str.includes('sep')) return 'september';
  if (str.includes('okt') || str.includes('oct')) return 'oktober';
  if (str.includes('nov')) return 'november';
  if (str.includes('des') || str.includes('dec')) return 'desember';
  return 'agustus';
}

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  items = BUDGET_DATA,
  transactions = DEFAULT_JOURNAL_DATA
}) => {
  const [highlightMonth, setHighlightMonth] = useState<string>('all');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Dynamically compute monthly realization for ALL budget items synchronized with live transactions
  const monthlyRows: MonthlyRowItem[] = useMemo(() => {
    return items.map((item) => {
      const itemTx = transactions.filter((t) => t.itemId === item.id);

      const monthSums: { [key: string]: number } = {
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0
      };

      itemTx.forEach((tx) => {
        const mKey = getMonthKey(tx);
        if (monthSums[mKey] !== undefined) {
          monthSums[mKey] += tx.nominal;
        } else {
          monthSums['agustus'] += tx.nominal;
        }
      });

      const totalRealisasi = itemTx.reduce((sum, t) => sum + t.nominal, 0);
      const sisa = Math.max(0, item.jumlahTotal - totalRealisasi);

      return {
        id: item.id,
        sasaranKegiatan: item.uraianSpesifik,
        paguEfektif: item.jumlahTotal,
        januari: monthSums.januari,
        februari: monthSums.februari,
        maret: monthSums.maret,
        april: monthSums.april,
        mei: monthSums.mei,
        juni: monthSums.juni,
        juli: monthSums.juli,
        agustus: monthSums.agustus,
        september: monthSums.september,
        oktober: monthSums.oktober,
        november: monthSums.november,
        desember: monthSums.desember,
        realisasi: totalRealisasi,
        sisa
      };
    });
  }, [items, transactions]);

  // Track checked/contreng rows (default all selected)
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(() => {
    return new Set(items.map((i) => i.id));
  });

  // Keep selectedRowIds in sync if items change
  React.useEffect(() => {
    setSelectedRowIds((prev) => {
      const allIds = new Set(items.map((i) => i.id));
      if (prev.size === 0 && items.length > 0) return allIds;
      const next = new Set<string>();
      prev.forEach((id) => {
        if (allIds.has(id)) next.add(id);
      });
      return next.size > 0 ? next : allIds;
    });
  }, [items]);

  const handleToggleRow = (id: string) => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedRowIds(new Set(monthlyRows.map((r) => r.id)));
  };

  const handleDeselectAll = () => {
    setSelectedRowIds(new Set());
  };

  const handleToggleAll = () => {
    if (selectedRowIds.size === monthlyRows.length) {
      handleDeselectAll();
    } else {
      handleSelectAll();
    }
  };

  // Rows that are currently checked/contreng
  const selectedRows = useMemo(() => {
    return monthlyRows.filter((r) => selectedRowIds.has(r.id));
  }, [monthlyRows, selectedRowIds]);

  // Overall sums across all columns (for all rows)
  const totals = useMemo(() => {
    return monthlyRows.reduce(
      (acc, row) => ({
        paguEfektif: acc.paguEfektif + row.paguEfektif,
        januari: acc.januari + row.januari,
        februari: acc.februari + row.februari,
        maret: acc.maret + row.maret,
        april: acc.april + row.april,
        mei: acc.mei + row.mei,
        juni: acc.juni + row.juni,
        juli: acc.juli + row.juli,
        agustus: acc.agustus + row.agustus,
        september: acc.september + row.september,
        oktober: acc.oktober + row.oktober,
        november: acc.november + row.november,
        desember: acc.desember + row.desember,
        realisasi: acc.realisasi + row.realisasi,
        sisa: acc.sisa + row.sisa
      }),
      {
        paguEfektif: 0,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 0,
        sisa: 0
      }
    );
  }, [monthlyRows]);

  // Totals for only checked / contreng items
  const selectedTotals = useMemo(() => {
    return selectedRows.reduce(
      (acc, row) => ({
        paguEfektif: acc.paguEfektif + row.paguEfektif,
        januari: acc.januari + row.januari,
        februari: acc.februari + row.februari,
        maret: acc.maret + row.maret,
        april: acc.april + row.april,
        mei: acc.mei + row.mei,
        juni: acc.juni + row.juni,
        juli: acc.juli + row.juli,
        agustus: acc.agustus + row.agustus,
        september: acc.september + row.september,
        oktober: acc.oktober + row.oktober,
        november: acc.november + row.november,
        desember: acc.desember + row.desember,
        realisasi: acc.realisasi + row.realisasi,
        sisa: acc.sisa + row.sisa
      }),
      {
        paguEfektif: 0,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 0,
        sisa: 0
      }
    );
  }, [selectedRows]);

  const handleExportCSV = () => {
    const dataToExport = selectedRows.length > 0 ? selectedRows : monthlyRows;
    const headers = [
      'Sasaran Kegiatan',
      'Pagu Efektif',
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
      'Desember',
      'Total Realisasi',
      'Sisa Pagu'
    ];

    const rows = dataToExport.map((r) => [
      `"${r.sasaranKegiatan}"`,
      r.paguEfektif,
      r.januari,
      r.februari,
      r.maret,
      r.april,
      r.mei,
      r.juni,
      r.juli,
      r.agustus,
      r.september,
      r.oktober,
      r.november,
      r.desember,
      r.realisasi,
      r.sisa
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Anggaran_Bulanan_APBD_2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Only print rows that are checked (dicontreng)
  const printableHtml = useMemo(() => {
    const rowsToPrint = selectedRows;
    if (rowsToPrint.length === 0) {
      return `
        <div style="padding: 40px; text-align: center; color: #64748b; font-family: sans-serif;">
          <h3 style="color: #0f172a; margin-bottom: 8px;">Tidak Ada Sasaran Kegiatan yang Dicontreng</h3>
          <p>Silakan contreng minimal 1 sasaran kegiatan pada tabel laporan untuk dicetak.</p>
        </div>
      `;
    }

    return `
      <table>
        <thead>
          <tr>
            <th style="width: 25px;">NO</th>
            <th style="text-align: left; min-width: 180px;">SASARAN KEGIATAN</th>
            <th style="width: 80px;">PAGU EFEKTIF</th>
            <th style="width: 45px;">JAN</th>
            <th style="width: 45px;">FEB</th>
            <th style="width: 45px;">MAR</th>
            <th style="width: 45px;">APR</th>
            <th style="width: 55px;">MEI</th>
            <th style="width: 55px;">JUN</th>
            <th style="width: 55px;">JUL</th>
            <th style="width: 60px;">AGU</th>
            <th style="width: 45px;">SEP</th>
            <th style="width: 45px;">OKT</th>
            <th style="width: 45px;">NOV</th>
            <th style="width: 45px;">DES</th>
            <th style="width: 80px;">REALISASI</th>
            <th style="width: 80px;">SISA</th>
          </tr>
        </thead>
        <tbody>
          ${rowsToPrint
            .map(
              (r, idx) => `
            <tr>
              <td class="center">${idx + 1}</td>
              <td style="font-weight: 600;">${r.sasaranKegiatan}</td>
              <td class="num">${FORMAT_NUM(r.paguEfektif)}</td>
              <td class="center">${r.januari > 0 ? FORMAT_NUM(r.januari) : '-'}</td>
              <td class="center">${r.februari > 0 ? FORMAT_NUM(r.februari) : '-'}</td>
              <td class="center">${r.maret > 0 ? FORMAT_NUM(r.maret) : '-'}</td>
              <td class="num">${r.april > 0 ? FORMAT_NUM(r.april) : '-'}</td>
              <td class="num">${r.mei > 0 ? FORMAT_NUM(r.mei) : '-'}</td>
              <td class="num">${r.juni > 0 ? FORMAT_NUM(r.juni) : '-'}</td>
              <td class="num">${r.juli > 0 ? FORMAT_NUM(r.juli) : '-'}</td>
              <td class="num">${r.agustus > 0 ? FORMAT_NUM(r.agustus) : '-'}</td>
              <td class="center">${r.september > 0 ? FORMAT_NUM(r.september) : '-'}</td>
              <td class="center">${r.oktober > 0 ? FORMAT_NUM(r.oktober) : '-'}</td>
              <td class="center">${r.november > 0 ? FORMAT_NUM(r.november) : '-'}</td>
              <td class="center">${r.desember > 0 ? FORMAT_NUM(r.desember) : '-'}</td>
              <td class="num" style="font-weight: bold; color: #1e3a8a;">${FORMAT_NUM(r.realisasi)}</td>
              <td class="num" style="font-weight: bold;">${FORMAT_NUM(r.sisa)}</td>
            </tr>
          `
            )
            .join('')}
          <tr class="total-row">
            <td colspan="2" style="text-align: right; font-weight: 900; padding: 6px;">TOTAL TERPILIH (${rowsToPrint.length} SASARAN)</td>
            <td class="num" style="font-weight: 900;">${FORMAT_NUM(selectedTotals.paguEfektif)}</td>
            <td class="center">${selectedTotals.januari > 0 ? FORMAT_NUM(selectedTotals.januari) : '-'}</td>
            <td class="center">${selectedTotals.februari > 0 ? FORMAT_NUM(selectedTotals.februari) : '-'}</td>
            <td class="center">${selectedTotals.maret > 0 ? FORMAT_NUM(selectedTotals.maret) : '-'}</td>
            <td class="num">${selectedTotals.april > 0 ? FORMAT_NUM(selectedTotals.april) : '-'}</td>
            <td class="num" style="font-weight: 900;">${selectedTotals.mei > 0 ? FORMAT_NUM(selectedTotals.mei) : '-'}</td>
            <td class="num" style="font-weight: 900;">${selectedTotals.juni > 0 ? FORMAT_NUM(selectedTotals.juni) : '-'}</td>
            <td class="num" style="font-weight: 900;">${selectedTotals.juli > 0 ? FORMAT_NUM(selectedTotals.juli) : '-'}</td>
            <td class="num" style="font-weight: 900;">${selectedTotals.agustus > 0 ? FORMAT_NUM(selectedTotals.agustus) : '-'}</td>
            <td class="center">${selectedTotals.september > 0 ? FORMAT_NUM(selectedTotals.september) : '-'}</td>
            <td class="center">${selectedTotals.oktober > 0 ? FORMAT_NUM(selectedTotals.oktober) : '-'}</td>
            <td class="center">${selectedTotals.november > 0 ? FORMAT_NUM(selectedTotals.november) : '-'}</td>
            <td class="center">${selectedTotals.desember > 0 ? FORMAT_NUM(selectedTotals.desember) : '-'}</td>
            <td class="num" style="font-weight: 900; color: #1e3a8a;">${FORMAT_NUM(selectedTotals.realisasi)}</td>
            <td class="num" style="font-weight: 900;">${FORMAT_NUM(selectedTotals.sisa)}</td>
          </tr>
        </tbody>
      </table>
    `;
  }, [selectedRows, selectedTotals]);

  return (
    <div className="w-full space-y-4">
      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="LAPORAN ANGGARAN PER-BULAN (APBD 2026)"
        subtitle="Sub Kegiatan: Peningkatan Kompetensi dan Kualifikasi SDM Kesehatan"
        htmlContent={printableHtml}
        defaultLandscape={true}
      />

      {/* Clean Card Container with Full Border Grid */}
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Ornamen Lis Ukir Dayak Kaltara di Atas Tabel */}
        <DayakRibbonTrim colorScheme="emerald" />

        {/* Ornamen Sudut Siluet Batik Dayak */}
        <DayakCornerSilhouette position="top-right" size={90} className="opacity-20 text-emerald-900" />
        <DayakCornerSilhouette position="bottom-left" size={90} className="opacity-20 text-emerald-900" />

        {/* Watermark Seni Ukir & Batik Dayak Menempel Keseluruhan Tabel */}
        <DayakTableWatermark opacity={0.048} />

        {/* Subtle Silhouette Background Watermark */}
        <div className="absolute right-12 bottom-12 w-96 h-96 opacity-[0.025] grayscale pointer-events-none select-none z-0">
          <img src={LOGO_KALTARA} alt="" className="w-full h-full object-contain" />
        </div>

        {/* Table Title Header with Action Buttons */}
        <div className="px-5 py-4 border-b border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 font-mono">
                MATRIKS REALISASI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 font-mono">
                {selectedRowIds.size} / {monthlyRows.length} DICONTRENG
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight font-display">
              LAPORAN ANGGARAN PER-BULAN (APBD 2026)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium leading-relaxed">
              Contreng sasaran kegiatan yang ingin dicetak atau diekspor ke laporan resmi
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Month Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'mei', label: 'Mei' },
                { id: 'juni', label: 'Juni' },
                { id: 'juli', label: 'Juli' },
                { id: 'agustus', label: 'Agustus' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setHighlightMonth(m.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    highlightMonth === m.id
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Ekspor CSV */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Unduh data yang dicontreng ke format CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor ({selectedRowIds.size})</span>
            </button>

            {/* Cetak Terpilih */}
            <button
              type="button"
              onClick={() => {
                if (selectedRowIds.size === 0) {
                  alert('Silakan contreng minimal 1 sasaran kegiatan terlebih dahulu untuk dicetak.');
                  return;
                }
                setIsPrintModalOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 ${
                selectedRowIds.size > 0
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
              title="Cetak sasaran kegiatan yang telah dicontreng"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Terpilih ({selectedRowIds.size})</span>
            </button>
          </div>
        </div>

        {/* Checkbox Quick Bar */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer shadow-2xs transition-all"
            >
              {selectedRowIds.size === monthlyRows.length ? (
                <>
                  <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Batalkan Semua</span>
                </>
              ) : (
                <>
                  <Square className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contreng Semua</span>
                </>
              )}
            </button>
            <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
              &bull; Hanya baris yang <strong className="text-slate-800">dicontreng</strong> yang akan dicetak pada lembar laporan.
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-700">
            {selectedRowIds.size === 0 ? (
              <span className="text-rose-600 font-medium">Belum ada yang dicontreng</span>
            ) : (
              <span className="text-emerald-700">
                {selectedRowIds.size} dari {monthlyRows.length} item siap dicetak
              </span>
            )}
          </div>
        </div>

        {/* Dense Precision Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-[10.5px] font-black text-slate-800 uppercase tracking-wider font-display">
                <th className="border border-slate-200 py-3 px-2 text-center w-10">
                  <button
                    type="button"
                    onClick={handleToggleAll}
                    className="p-0.5 hover:text-blue-600 cursor-pointer"
                    title={selectedRowIds.size === monthlyRows.length ? 'Batalkan Semua' : 'Contreng Semua'}
                  >
                    {selectedRowIds.size === monthlyRows.length ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 inline-block" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 inline-block" />
                    )}
                  </button>
                </th>
                <th className="border border-slate-200 py-3 px-3 text-left font-black text-slate-800 min-w-[220px]">
                  SASARAN KEGIATAN
                </th>
                <th className="border border-slate-200 py-3 px-3 text-right font-black text-slate-800 min-w-[100px]">
                  PAGU EFEKTIF
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  JANUARI
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  FEBRUARI
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  MARET
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  APRIL
                </th>
                <th className={`border border-slate-200 py-3 px-2 text-right font-bold min-w-[85px] transition-colors ${highlightMonth === 'mei' ? 'bg-blue-100 text-blue-900' : 'text-slate-800'}`}>
                  MEI
                </th>
                <th className={`border border-slate-200 py-3 px-2 text-right font-bold min-w-[90px] transition-colors ${highlightMonth === 'juni' ? 'bg-blue-100 text-blue-900' : 'text-slate-800'}`}>
                  JUNI
                </th>
                <th className={`border border-slate-200 py-3 px-2 text-right font-bold min-w-[90px] transition-colors ${highlightMonth === 'juli' ? 'bg-blue-100 text-blue-900' : 'text-slate-800'}`}>
                  JULI
                </th>
                <th className={`border border-slate-200 py-3 px-2 text-right font-bold min-w-[95px] transition-colors ${highlightMonth === 'agustus' ? 'bg-blue-100 text-blue-900' : 'text-slate-800'}`}>
                  AGUSTUS
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  SEPTEMBER
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  OKTOBER
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  NOVEMBER
                </th>
                <th className="border border-slate-200 py-3 px-1 text-center font-bold text-slate-800 min-w-[65px]">
                  DESEMBER
                </th>
                <th className="border border-slate-200 py-3 px-3 text-right font-bold text-slate-800 min-w-[100px]">
                  REALISASI
                </th>
                <th className="border border-slate-200 py-3 px-3 text-right font-bold text-slate-800 min-w-[105px]">
                  SISA
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-800 font-sans">
              {monthlyRows.map((row, idx) => {
                const isChecked = selectedRowIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    onClick={() => handleToggleRow(row.id)}
                    className={`transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-white hover:bg-blue-50/40'
                        : 'bg-slate-50/50 hover:bg-slate-100/60 opacity-60'
                    }`}
                  >
                    {/* Checkbox Column */}
                    <td className="border border-slate-200 py-2.5 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleToggleRow(row.id)}
                        className="p-1 hover:text-blue-600 text-slate-400 cursor-pointer"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* Sasaran Kegiatan */}
                    <td className="border border-slate-200 py-2.5 px-3.5 font-bold text-slate-900 leading-snug">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{idx + 1}.</span>
                        <span className={isChecked ? 'text-slate-900' : 'text-slate-500'}>
                          {row.sasaranKegiatan}
                        </span>
                      </div>
                    </td>

                    {/* Pagu Efektif */}
                    <td className="border border-slate-200 py-2.5 px-3 text-right font-mono font-medium text-slate-800 whitespace-nowrap">
                      {FORMAT_NUM(row.paguEfektif)}
                    </td>

                    {/* Januari - April */}
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'januari' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.januari > 0 ? FORMAT_NUM(row.januari) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'februari' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.februari > 0 ? FORMAT_NUM(row.februari) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'maret' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.maret > 0 ? FORMAT_NUM(row.maret) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'april' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.april > 0 ? FORMAT_NUM(row.april) : <span className="text-slate-400">-</span>}
                    </td>

                    {/* Mei */}
                    <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono whitespace-nowrap ${highlightMonth === 'mei' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-800'}`}>
                      {row.mei > 0 ? FORMAT_NUM(row.mei) : <span className="text-slate-400 block text-center">-</span>}
                    </td>

                    {/* Juni */}
                    <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono whitespace-nowrap ${highlightMonth === 'juni' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-800'}`}>
                      {row.juni > 0 ? FORMAT_NUM(row.juni) : <span className="text-slate-400 block text-center">-</span>}
                    </td>

                    {/* Juli */}
                    <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono whitespace-nowrap ${highlightMonth === 'juli' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-800'}`}>
                      {row.juli > 0 ? FORMAT_NUM(row.juli) : <span className="text-slate-400 block text-center">-</span>}
                    </td>

                    {/* Agustus */}
                    <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono whitespace-nowrap ${highlightMonth === 'agustus' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-800'}`}>
                      {row.agustus > 0 ? FORMAT_NUM(row.agustus) : <span className="text-slate-400 block text-center">-</span>}
                    </td>

                    {/* September - Desember */}
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'september' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.september > 0 ? FORMAT_NUM(row.september) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'oktober' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.oktober > 0 ? FORMAT_NUM(row.oktober) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'november' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.november > 0 ? FORMAT_NUM(row.november) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className={`border border-slate-200 py-2.5 px-1 text-center font-mono whitespace-nowrap ${highlightMonth === 'desember' ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'}`}>
                      {row.desember > 0 ? FORMAT_NUM(row.desember) : <span className="text-slate-400">-</span>}
                    </td>

                    {/* Realisasi (Bold Blue) */}
                    <td className="border border-slate-200 py-2.5 px-3 text-right font-mono font-bold text-blue-600 whitespace-nowrap">
                      {row.realisasi > 0 ? FORMAT_NUM(row.realisasi) : '0'}
                    </td>

                    {/* Sisa */}
                    <td className="border border-slate-200 py-2.5 px-3 text-right font-mono font-medium text-slate-900 whitespace-nowrap">
                      {FORMAT_NUM(row.sisa)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* TOTAL Footers */}
            <tfoot>
              {/* TOTAL TERPILIH (DICONTRENG) */}
              <tr className="border-t-2 border-blue-300 bg-blue-50/80 font-bold text-blue-950 text-[11px]">
                <td className="border border-blue-200 py-2.5 px-2 text-center">
                  <Check className="w-4 h-4 text-blue-700 inline-block" />
                </td>
                <td className="border border-blue-200 py-2.5 px-3.5 font-black uppercase tracking-wider text-blue-900">
                  TOTAL TERPILIH ({selectedRowIds.size} SASARAN DICONTRENG)
                </td>
                <td className="border border-blue-200 py-2.5 px-3 text-right font-mono font-black text-blue-950 whitespace-nowrap">
                  {FORMAT_NUM(selectedTotals.paguEfektif)}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'januari' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.januari > 0 ? FORMAT_NUM(selectedTotals.januari) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'februari' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.februari > 0 ? FORMAT_NUM(selectedTotals.februari) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'maret' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.maret > 0 ? FORMAT_NUM(selectedTotals.maret) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'april' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.april > 0 ? FORMAT_NUM(selectedTotals.april) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-2 text-right font-mono font-black text-blue-950 whitespace-nowrap ${highlightMonth === 'mei' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.mei > 0 ? FORMAT_NUM(selectedTotals.mei) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-2 text-right font-mono font-black text-blue-950 whitespace-nowrap ${highlightMonth === 'juni' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.juni > 0 ? FORMAT_NUM(selectedTotals.juni) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-2 text-right font-mono font-black text-blue-950 whitespace-nowrap ${highlightMonth === 'juli' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.juli > 0 ? FORMAT_NUM(selectedTotals.juli) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-2 text-right font-mono font-black text-blue-950 whitespace-nowrap ${highlightMonth === 'agustus' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.agustus > 0 ? FORMAT_NUM(selectedTotals.agustus) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'september' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.september > 0 ? FORMAT_NUM(selectedTotals.september) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'oktober' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.oktober > 0 ? FORMAT_NUM(selectedTotals.oktober) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'november' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.november > 0 ? FORMAT_NUM(selectedTotals.november) : '-'}
                </td>
                <td className={`border border-blue-200 py-2.5 px-1 text-center font-mono text-blue-950 ${highlightMonth === 'desember' ? 'bg-blue-200/80' : ''}`}>
                  {selectedTotals.desember > 0 ? FORMAT_NUM(selectedTotals.desember) : '-'}
                </td>
                <td className="border border-blue-200 py-2.5 px-3 text-right font-mono font-black text-blue-700 whitespace-nowrap">
                  {FORMAT_NUM(selectedTotals.realisasi)}
                </td>
                <td className="border border-blue-200 py-2.5 px-3 text-right font-mono font-black text-blue-950 whitespace-nowrap">
                  {FORMAT_NUM(selectedTotals.sisa)}
                </td>
              </tr>

              {/* TOTAL KESELURUHAN (ALL ITEMS) */}
              <tr className="border-t border-slate-300 bg-[#edf2f7] font-bold text-slate-900 text-[10.5px]">
                <td className="border border-slate-200 py-2 px-2 text-center text-slate-400 font-mono text-[10px]">ALL</td>
                <td className="border border-slate-200 py-2 px-3.5 font-bold uppercase tracking-wider text-slate-700">
                  Total Seluruh Pagu APBD ({monthlyRows.length} Sasaran)
                </td>
                <td className="border border-slate-200 py-2 px-3 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {FORMAT_NUM(totals.paguEfektif)}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.januari > 0 ? FORMAT_NUM(totals.januari) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.februari > 0 ? FORMAT_NUM(totals.februari) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.maret > 0 ? FORMAT_NUM(totals.maret) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.april > 0 ? FORMAT_NUM(totals.april) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-2 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {totals.mei > 0 ? FORMAT_NUM(totals.mei) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-2 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {totals.juni > 0 ? FORMAT_NUM(totals.juni) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-2 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {totals.juli > 0 ? FORMAT_NUM(totals.juli) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-2 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {totals.agustus > 0 ? FORMAT_NUM(totals.agustus) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.september > 0 ? FORMAT_NUM(totals.september) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.oktober > 0 ? FORMAT_NUM(totals.oktober) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.november > 0 ? FORMAT_NUM(totals.november) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-1 text-center font-mono text-slate-600">
                  {totals.desember > 0 ? FORMAT_NUM(totals.desember) : '-'}
                </td>
                <td className="border border-slate-200 py-2 px-3 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {FORMAT_NUM(totals.realisasi)}
                </td>
                <td className="border border-slate-200 py-2 px-3 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                  {FORMAT_NUM(totals.sisa)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

