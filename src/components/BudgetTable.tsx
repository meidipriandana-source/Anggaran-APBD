import React, { useState } from 'react';
import { BudgetItem } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import { ArrowRight, Search, Download, X, Layers } from 'lucide-react';

interface BudgetTableProps {
  items: BudgetItem[];
  selectedItemId?: string;
  onSelectItem: (item: BudgetItem) => void;
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Semua Komponen' },
  { id: 'perdin', label: 'Perjalanan Dinas' },
  { id: 'kursus', label: 'Kursus / Pelatihan' },
  { id: 'honor', label: 'Honorarium & Narasumber' },
  { id: 'mamin', label: 'Makanan & Minuman' },
  { id: 'lainnya', label: 'Bahan & Lainnya' }
];

export const BudgetTable: React.FC<BudgetTableProps> = ({
  items,
  selectedItemId,
  onSelectItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter items based on category and search query
  const filteredItems = items.filter((item) => {
    // Category filter
    if (selectedCategory === 'perdin' && !item.isHighlightPerjalananDinas) return false;
    if (selectedCategory === 'kursus' && !item.isHighlightKontribusi) return false;
    if (selectedCategory === 'honor' && !item.uraianSpesifik.toLowerCase().includes('honor')) return false;
    if (selectedCategory === 'mamin' && !item.uraianSpesifik.toLowerCase().includes('makanan')) return false;
    if (
      selectedCategory === 'lainnya' &&
      (item.isHighlightPerjalananDinas || item.isHighlightKontribusi || item.uraianSpesifik.toLowerCase().includes('honor') || item.uraianSpesifik.toLowerCase().includes('makanan'))
    )
      return false;

    // Search filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.uraianSpesifik.toLowerCase().includes(q) ||
      item.kodeRekening.toLowerCase().includes(q) ||
      item.kategoriBelanja.toLowerCase().includes(q) ||
      item.subKegiatanKelompok.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    const headers = [
      'No',
      'Komponen / Uraian',
      'Kode Rekening',
      'Pagu Murni',
      'Pergeseran',
      'Pagu Efektif',
      'Terserap (Rp)',
      'Sisa (Rp)',
      '% Serapan'
    ];

    const rows = filteredItems.map((item, idx) => [
      idx + 1,
      `"${item.uraianSpesifik}"`,
      `"${item.kodeRekening}"`,
      item.paguMurni,
      item.pergeseran,
      item.jumlahTotal,
      item.terserap,
      item.sisa,
      `${item.persenSerapan.toFixed(1)}%`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Rincian_Anggaran_APBD_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden space-y-0">
      {/* Category Pills Toolbar */}
      <div className="p-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 pr-2 shrink-0 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          Filter:
        </span>
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search & Export Toolbar */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari rincian paket, kode rekening, atau uraian..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Unduh seluruh data anggaran dalam format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3 text-center w-12">#</th>
              <th className="py-3 px-4 min-w-[300px]">KOMPONEN / URAIAN</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">PAGU MURNI</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">PERGESERAN</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">PAGU EFEKTIF</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">TERSERAP (RP)</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">SISA (RP)</th>
              <th className="py-3 px-4 text-center whitespace-nowrap min-w-[120px]">% SERAPAN</th>
              <th className="py-3 px-4 text-center whitespace-nowrap w-32">TINDAKAN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  Tidak ditemukan rincian belanja yang cocok dengan filter atau pencarian.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`group transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 ring-1 ring-inset ring-blue-500/40'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Index */}
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400 font-medium">
                      {idx + 1}
                    </td>

                    {/* Komponen / Uraian with Dot */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 shadow-2xs"
                          style={{ backgroundColor: item.colorDot || '#3b82f6' }}
                        />
                        <div>
                          <div className="font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                            {item.uraianSpesifik}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {item.kodeRekening} &bull; {item.koefisienVolume}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Pagu Murni */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.paguMurni)}
                    </td>

                    {/* Pergeseran */}
                    <td className="py-3.5 px-3 text-right font-mono text-slate-500 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.pergeseran)}
                    </td>

                    {/* Pagu Efektif */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.jumlahTotal)}
                    </td>

                    {/* Terserap (Rp) */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-blue-600 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.terserap)}
                    </td>

                    {/* Sisa (Rp) */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.sisa)}
                    </td>

                    {/* % Serapan with Progress Bar */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-mono font-bold text-[11px] text-slate-700">
                          {item.persenSerapan.toFixed(1)}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.persenSerapan > 80
                                ? 'bg-emerald-600'
                                : item.persenSerapan > 0
                                ? 'bg-blue-600'
                                : 'bg-slate-300'
                            }`}
                            style={{ width: `${Math.min(item.persenSerapan, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Tindakan Button */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50 active:bg-blue-100 border border-slate-200/80 group-hover:border-blue-300 transition-all shadow-2xs cursor-pointer active:scale-95"
                        title={`Buka mutasi jurnal untuk ${item.uraianSpesifik}`}
                      >
                        <span>Buka Rincian</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 text-slate-500 group-hover:text-blue-600" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

