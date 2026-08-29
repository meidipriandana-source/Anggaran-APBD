import React, { useState, useMemo } from 'react';
import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_NUM } from '../data/budgetData';
import { Download, Printer, Filter, Calendar } from 'lucide-react';

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

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = () => {
  const [highlightMonth, setHighlightMonth] = useState<string>('all');

  // 10 Consolidated Items corresponding directly to APBD 2026
  const monthlyRows: MonthlyRowItem[] = useMemo(() => {
    return [
      {
        id: 'row-1',
        sasaranKegiatan: 'Bahan Cetak (Sertifikat & Dokumen)',
        paguEfektif: 30024768,
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
        sisa: 30024768
      },
      {
        id: 'row-2',
        sasaranKegiatan: 'Suvenir / Cendera Mata',
        paguEfektif: 6200000,
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
        sisa: 6200000
      },
      {
        id: 'row-3',
        sasaranKegiatan: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa',
        paguEfektif: 124920000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 113350000,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 113350000,
        sisa: 11570000
      },
      {
        id: 'row-4',
        sasaranKegiatan: 'Makanan dan Minuman Rapat Spesifikasi: Nasi Kotak Biasa (Akreditasi)',
        paguEfektif: 157380000,
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
        sisa: 157380000
      },
      {
        id: 'row-5',
        sasaranKegiatan: 'Prasmanan VIP Spesifikasi: Per Porsi (Akreditasi)',
        paguEfektif: 21250000,
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
        sisa: 21250000
      },
      {
        id: 'row-6',
        sasaranKegiatan: 'Honorarium Pengajar / Narasumber',
        paguEfektif: 229200000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 16000000,
        agustus: 126820000,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 142820000,
        sisa: 86380000
      },
      {
        id: 'row-7',
        sasaranKegiatan: 'Jasa Iklan / Reklame',
        paguEfektif: 15000000,
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
        sisa: 15000000
      },
      {
        id: 'row-8',
        sasaranKegiatan: 'Belanja Kontribusi Kursus/Pelatihan',
        paguEfektif: 550000000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 67500000,
        juli: 46500000,
        agustus: 81125000,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 195125000,
        sisa: 354875000
      },
      {
        id: 'row-9',
        sasaranKegiatan: 'Perjalanan Dinas Dalam Negeri',
        paguEfektif: 870000000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 35619560,
        juni: 70905939,
        juli: 46952424,
        agustus: 183294411,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 336772334,
        sisa: 533227666
      },
      {
        id: 'row-10',
        sasaranKegiatan: 'Kontribusi Surveyor',
        paguEfektif: 90000000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 78008000,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
        realisasi: 78008000,
        sisa: 11992000
      }
    ];
  }, []);

  // Overall sums across all columns
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

  const handleExportCSV = () => {
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

    const rows = monthlyRows.map((r) => [
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

  return (
    <div className="w-full space-y-4">
      {/* Clean Card Container with Full Border Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Title Header with Action Buttons */}
        <div className="px-5 py-4 border-b border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
              LAPORAN ANGGARAN PER-BULAN (APBD 2026)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Rekapitulasi realisasi belanja seluruh komponen per bulan secara menyeluruh
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Unduh tabel bulanan ke format CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor CSV</span>
            </button>

            {/* Cetak */}
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Cetak tabel laporan bulanan"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Cetak</span>
            </button>
          </div>
        </div>

        {/* Dense Precision Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-800 uppercase tracking-wider">
                <th className="border border-slate-200 py-3 px-3.5 text-left font-bold text-slate-800 min-w-[240px]">
                  SASARAN KEGIATAN
                </th>
                <th className="border border-slate-200 py-3 px-3 text-right font-bold text-slate-800 min-w-[100px]">
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
              {monthlyRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Sasaran Kegiatan */}
                  <td className="border border-slate-200 py-2.5 px-3.5 font-bold text-slate-900 leading-snug">
                    {row.sasaranKegiatan}
                  </td>

                  {/* Pagu Efektif */}
                  <td className="border border-slate-200 py-2.5 px-3 text-right font-mono font-medium text-slate-800 whitespace-nowrap">
                    {FORMAT_NUM(row.paguEfektif)}
                  </td>

                  {/* Januari - April */}
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>

                  {/* Mei */}
                  <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono text-slate-800 whitespace-nowrap ${highlightMonth === 'mei' ? 'bg-blue-50/80 font-bold' : ''}`}>
                    {row.mei > 0 ? FORMAT_NUM(row.mei) : <span className="text-slate-400 block text-center">-</span>}
                  </td>

                  {/* Juni */}
                  <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono text-slate-800 whitespace-nowrap ${highlightMonth === 'juni' ? 'bg-blue-50/80 font-bold' : ''}`}>
                    {row.juni > 0 ? FORMAT_NUM(row.juni) : <span className="text-slate-400 block text-center">-</span>}
                  </td>

                  {/* Juli */}
                  <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono text-slate-800 whitespace-nowrap ${highlightMonth === 'juli' ? 'bg-blue-50/80 font-bold' : ''}`}>
                    {row.juli > 0 ? FORMAT_NUM(row.juli) : <span className="text-slate-400 block text-center">-</span>}
                  </td>

                  {/* Agustus */}
                  <td className={`border border-slate-200 py-2.5 px-2 text-right font-mono text-slate-800 whitespace-nowrap ${highlightMonth === 'agustus' ? 'bg-blue-50/80 font-bold' : ''}`}>
                    {row.agustus > 0 ? FORMAT_NUM(row.agustus) : <span className="text-slate-400 block text-center">-</span>}
                  </td>

                  {/* September - Desember */}
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
                  </td>
                  <td className="border border-slate-200 py-2.5 px-1 text-center font-mono text-slate-400">
                    -
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
              ))}
            </tbody>

            {/* TOTAL KESELURUHAN Footer Row */}
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-[#edf2f7] font-bold text-slate-900 text-[11px]">
                <td className="border border-slate-200 py-3 px-3.5 font-black uppercase tracking-wider text-slate-900">
                  TOTAL KESELURUHAN
                </td>
                <td className="border border-slate-200 py-3 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                  {FORMAT_NUM(totals.paguEfektif)}
                </td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className={`border border-slate-200 py-3 px-2 text-right font-mono font-black text-slate-900 whitespace-nowrap ${highlightMonth === 'mei' ? 'bg-blue-200/80' : ''}`}>
                  {FORMAT_NUM(totals.mei)}
                </td>
                <td className={`border border-slate-200 py-3 px-2 text-right font-mono font-black text-slate-900 whitespace-nowrap ${highlightMonth === 'juni' ? 'bg-blue-200/80' : ''}`}>
                  {FORMAT_NUM(totals.juni)}
                </td>
                <td className={`border border-slate-200 py-3 px-2 text-right font-mono font-black text-slate-900 whitespace-nowrap ${highlightMonth === 'juli' ? 'bg-blue-200/80' : ''}`}>
                  {FORMAT_NUM(totals.juli)}
                </td>
                <td className={`border border-slate-200 py-3 px-2 text-right font-mono font-black text-slate-900 whitespace-nowrap ${highlightMonth === 'agustus' ? 'bg-blue-200/80' : ''}`}>
                  {FORMAT_NUM(totals.agustus)}
                </td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-1 text-center font-mono text-slate-400">-</td>
                <td className="border border-slate-200 py-3 px-3 text-right font-mono font-black text-blue-600 whitespace-nowrap">
                  {FORMAT_NUM(totals.realisasi)}
                </td>
                <td className="border border-slate-200 py-3 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
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

