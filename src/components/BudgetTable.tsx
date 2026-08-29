import React, { useState, useMemo } from 'react';
import { BudgetItem } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import { ArrowRight, Search, Download, X, Layers, CheckSquare, Square, Printer, Check } from 'lucide-react';
import { PrintPreviewModal } from './PrintPreviewModal';
import { generateBudgetSummaryHtml } from '../utils/printHelper';

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
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(() => {
    return new Set(items.map((i) => i.id));
  });

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
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
  }, [items, selectedCategory, searchQuery]);

  // Handle toggle selection
  const handleToggleRow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isAllFilteredSelected =
    filteredItems.length > 0 && filteredItems.every((item) => selectedItemIds.has(item.id));

  const handleToggleAll = () => {
    if (isAllFilteredSelected) {
      setSelectedItemIds((prev) => {
        const next = new Set(prev);
        filteredItems.forEach((i) => next.delete(i.id));
        return next;
      });
    } else {
      setSelectedItemIds((prev) => {
        const next = new Set(prev);
        filteredItems.forEach((i) => next.add(i.id));
        return next;
      });
    }
  };

  // Selected items for printing and totals
  const selectedItemsToPrint = useMemo(() => {
    const subset = filteredItems.filter((i) => selectedItemIds.has(i.id));
    return subset.length > 0 ? subset : filteredItems;
  }, [filteredItems, selectedItemIds]);

  const selectedTotals = useMemo(() => {
    return selectedItemsToPrint.reduce(
      (acc, item) => ({
        pagu: acc.pagu + item.jumlahTotal,
        terserap: acc.terserap + item.terserap,
        sisa: acc.sisa + item.sisa
      }),
      { pagu: 0, terserap: 0, sisa: 0 }
    );
  }, [selectedItemsToPrint]);

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

    const rows = selectedItemsToPrint.map((item, idx) => [
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
    link.setAttribute('download', `Ringkasan_Belanja_APBD_2026_${selectedItemsToPrint.length}_Item.csv`);
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
          {/* Ekspor CSV */}
          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Unduh data anggaran yang dicontreng dalam format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV ({selectedItemIds.size})</span>
          </button>

          {/* Cetak Terpilih */}
          <button
            type="button"
            onClick={() => {
              if (selectedItemIds.size === 0) {
                alert('Silakan contreng minimal 1 komponen belanja terlebih dahulu untuk dicetak.');
                return;
              }
              setIsPrintModalOpen(true);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 ${
              selectedItemIds.size > 0
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
            title="Cetak komponen belanja yang telah dicontreng"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Terpilih ({selectedItemIds.size})</span>
          </button>
        </div>
      </div>

      {/* Checkbox Quick Bar */}
      <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleAll}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer shadow-2xs transition-all"
          >
            {isAllFilteredSelected ? (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Batalkan Semua</span>
              </>
            ) : (
              <>
                <Square className="w-3.5 h-3.5 text-slate-400" />
                <span>Contreng Semua ({filteredItems.length})</span>
              </>
            )}
          </button>
          <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
            &bull; Hanya komponen yang <strong className="text-slate-800">dicontreng</strong> yang akan dicetak.
          </span>
        </div>

        <div className="text-[11px] font-bold text-slate-700">
          {selectedItemIds.size === 0 ? (
            <span className="text-rose-600 font-medium">Belum ada yang dicontreng</span>
          ) : (
            <span className="text-emerald-700">
              {selectedItemIds.size} dari {items.length} komponen siap dicetak
            </span>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/90 text-[11px] font-black text-slate-500 uppercase tracking-wider font-display">
              <th className="py-3 px-3 text-center w-10">
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className="p-0.5 hover:text-blue-600 cursor-pointer"
                  title={isAllFilteredSelected ? 'Batalkan Semua' : 'Contreng Semua'}
                >
                  {isAllFilteredSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600 inline-block" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 inline-block" />
                  )}
                </button>
              </th>
              <th className="py-3 px-3 text-center w-10 font-mono">#</th>
              <th className="py-3 px-4 min-w-[260px]">KOMPONEN / URAIAN</th>
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
                <td colSpan={10} className="py-12 text-center text-slate-400 font-medium">
                  Tidak ditemukan rincian belanja yang cocok dengan filter atau pencarian.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = selectedItemId === item.id;
                const isChecked = selectedItemIds.has(item.id);
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`group transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 ring-1 ring-inset ring-blue-500/40'
                        : isChecked
                        ? 'hover:bg-slate-50/80 bg-white'
                        : 'hover:bg-slate-100/60 bg-slate-50/40 opacity-60'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleToggleRow(item.id, e)}
                        className="p-1 hover:text-blue-600 text-slate-400 cursor-pointer"
                        title={isChecked ? 'Batal contreng' : 'Contreng untuk cetak'}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* Index */}
                    <td className="py-3.5 px-2 text-center font-mono text-slate-400 font-semibold text-[11px]">
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
                          <div className="font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                            {item.uraianSpesifik}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 tracking-tight">
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">{item.kodeRekening}</span> &bull; {item.koefisienVolume}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Pagu Murni */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 font-medium whitespace-nowrap">
                      {FORMAT_RUPIAH(item.paguMurni)}
                    </td>

                    {/* Pergeseran */}
                    <td className="py-3.5 px-3 text-right font-mono text-slate-500 font-medium whitespace-nowrap">
                      {FORMAT_RUPIAH(item.pergeseran)}
                    </td>

                    {/* Pagu Efektif */}
                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-slate-900 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.jumlahTotal)}
                    </td>

                    {/* Terserap (Rp) */}
                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-blue-600 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.terserap)}
                    </td>

                    {/* Sisa (Rp) */}
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {FORMAT_RUPIAH(item.sisa)}
                    </td>

                    {/* % Serapan with Progress Bar */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-mono font-extrabold text-[11px] text-slate-800">
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50 active:bg-blue-100 border border-slate-200 hover:border-blue-300 transition-all shadow-2xs cursor-pointer active:scale-95"
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

      {/* Print Preview Modal for Ringkasan Belanja */}
      <PrintPreviewModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="LAPORAN REALISASI BELANJA APBD 2026"
        subtitle={`RSUD dr. H. JUSUF SK - ${selectedItemsToPrint.length} Komponen Terpilih`}
        htmlContent={generateBudgetSummaryHtml(
          selectedItemsToPrint,
          selectedTotals.pagu,
          selectedTotals.terserap,
          selectedTotals.sisa
        )}
        defaultLandscape={true}
      />
    </div>
  );
};

