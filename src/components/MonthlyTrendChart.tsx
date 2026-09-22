import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_RUPIAH, FORMAT_NUM } from '../data/budgetData';
import {
  TrendingUp,
  BarChart3,
  Layers,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  PieChart as PieIcon,
  Sparkles
} from 'lucide-react';

interface MonthlyTrendChartProps {
  items: BudgetItem[];
  transactions: JournalTransaction[];
  selectedRowIds: Set<string>;
  activeHighlightMonth: string;
  onSelectMonth: (monthKey: string) => void;
}

const MONTH_LIST = [
  { key: 'januari', label: 'Jan', fullName: 'Januari' },
  { key: 'februari', label: 'Feb', fullName: 'Februari' },
  { key: 'maret', label: 'Mar', fullName: 'Maret' },
  { key: 'april', label: 'Apr', fullName: 'April' },
  { key: 'mei', label: 'Mei', fullName: 'Mei' },
  { key: 'juni', label: 'Jun', fullName: 'Juni' },
  { key: 'juli', label: 'Jul', fullName: 'Juli' },
  { key: 'agustus', label: 'Agu', fullName: 'Agustus' },
  { key: 'september', label: 'Sep', fullName: 'September' },
  { key: 'oktober', label: 'Okt', fullName: 'Oktober' },
  { key: 'november', label: 'Nov', fullName: 'November' },
  { key: 'desember', label: 'Des', fullName: 'Desember' }
];

function getTxMonthKey(t: JournalTransaction): string {
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

export const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({
  items,
  transactions,
  selectedRowIds,
  activeHighlightMonth,
  onSelectMonth
}) => {
  // View mode: 'combo' (Bar + Cumulative Line), 'stacked' (per akun), 'area' (Cumulative curve)
  const [chartMode, setChartMode] = useState<'combo' | 'stacked' | 'area'>('combo');
  // Scope: 'selected' (only checked items) or 'all'
  const [scope, setScope] = useState<'selected' | 'all'>('selected');

  // Fast lookup map for item category
  const itemMap = useMemo(() => {
    const map = new Map<string, BudgetItem>();
    items.forEach((item) => map.set(item.id, item));
    return map;
  }, [items]);

  // Total pagu for current scope
  const targetPagu = useMemo(() => {
    const targetItems = scope === 'selected'
      ? items.filter((i) => selectedRowIds.has(i.id))
      : items;
    return targetItems.reduce((sum, i) => sum + i.jumlahTotal, 0);
  }, [items, selectedRowIds, scope]);

  // Monthly aggregated data from transactions
  const chartData = useMemo(() => {
    // Filter transactions based on scope
    const validTransactions = transactions.filter((tx) => {
      if (scope === 'selected') {
        return selectedRowIds.has(tx.itemId);
      }
      return true;
    });

    // Initialize map
    const monthStats: {
      [key: string]: {
        nominal: number;
        txCount: number;
        barang: number;
        jasa: number;
        perjalananDinas: number;
      };
    } = {};

    MONTH_LIST.forEach((m) => {
      monthStats[m.key] = {
        nominal: 0,
        txCount: 0,
        barang: 0,
        jasa: 0,
        perjalananDinas: 0
      };
    });

    // Accumulate transactions
    validTransactions.forEach((tx) => {
      const mKey = getTxMonthKey(tx);
      const target = monthStats[mKey] || monthStats['agustus'];
      target.nominal += tx.nominal;
      target.txCount += 1;

      const item = itemMap.get(tx.itemId);
      const cat = item?.kelompokAkun;
      if (cat === 'Belanja Barang') {
        target.barang += tx.nominal;
      } else if (cat === 'Belanja Jasa') {
        target.jasa += tx.nominal;
      } else if (cat === 'Belanja Perjalanan Dinas') {
        target.perjalananDinas += tx.nominal;
      } else {
        // Fallback categorization based on badge / name
        if (tx.mataRekening?.includes('Perjalanan')) {
          target.perjalananDinas += tx.nominal;
        } else if (tx.mataRekening?.includes('Makanan') || tx.mataRekening?.includes('Cetak')) {
          target.barang += tx.nominal;
        } else {
          target.jasa += tx.nominal;
        }
      }
    });

    // Calculate cumulative sums
    let runningCumulative = 0;
    const totalRealizedAll = Object.values(monthStats).reduce((sum, v) => sum + v.nominal, 0);

    return MONTH_LIST.map((m) => {
      const stat = monthStats[m.key];
      runningCumulative += stat.nominal;
      const share = totalRealizedAll > 0 ? (stat.nominal / totalRealizedAll) * 100 : 0;
      const cumulativePctPagu = targetPagu > 0 ? (runningCumulative / targetPagu) * 100 : 0;

      return {
        key: m.key,
        name: m.label,
        fullName: m.fullName,
        realisasi: stat.nominal,
        akumulatif: runningCumulative,
        txCount: stat.txCount,
        barang: stat.barang,
        jasa: stat.jasa,
        perjalananDinas: stat.perjalananDinas,
        share,
        cumulativePctPagu
      };
    });
  }, [transactions, selectedRowIds, scope, itemMap, targetPagu]);

  // Executive summary metrics
  const totalRealisasi = useMemo(() => {
    return chartData.length > 0 ? chartData[chartData.length - 1].akumulatif : 0;
  }, [chartData]);

  const activeMonths = useMemo(() => {
    return chartData.filter((d) => d.realisasi > 0);
  }, [chartData]);

  const peakMonth = useMemo(() => {
    if (activeMonths.length === 0) return null;
    return [...activeMonths].sort((a, b) => b.realisasi - a.realisasi)[0];
  }, [activeMonths]);

  const totalTxCount = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.txCount, 0);
  }, [chartData]);

  const avgMonthlyRealization = useMemo(() => {
    if (activeMonths.length === 0) return 0;
    return totalRealisasi / activeMonths.length;
  }, [totalRealisasi, activeMonths]);

  const serapanPercentage = useMemo(() => {
    if (targetPagu === 0) return 0;
    return (totalRealisasi / targetPagu) * 100;
  }, [totalRealisasi, targetPagu]);

  // Formatter for YAxis tick (e.g. 50 Jt, 100 Jt, 1 M)
  const formatYAxis = (value: number) => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} M`;
    }
    if (value >= 1_000_000) {
      return `${Math.round(value / 1_000_000)} Jt`;
    }
    if (value === 0) return '0';
    return `${Math.round(value / 1000)} rb`;
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-2xl border border-slate-700/80 text-xs min-w-[240px] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <span className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Bulan {data.fullName} 2026
            </span>
            {data.txCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {data.txCount} Transaksi SP2D
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400">
                Belum Ada SPJ
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Realisasi Bulanan:</span>
              <span className="font-mono font-bold text-blue-400 text-sm">
                {FORMAT_RUPIAH(data.realisasi)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Akumulatif s.d. Bulan Ini:</span>
              <span className="font-mono font-semibold text-emerald-400">
                {FORMAT_RUPIAH(data.akumulatif)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Progres Serapan Pagu:</span>
              <span className="font-mono font-medium text-amber-300">
                {data.cumulativePctPagu.toFixed(2)}%
              </span>
            </div>

            {/* Breakdown by Account Category */}
            {data.realisasi > 0 && (
              <div className="pt-2 mt-2 border-t border-slate-800 space-y-1 text-[10.5px]">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Rincian Komponen Belanja:
                </div>
                {data.perjalananDinas > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Perjalanan Dinas:
                    </span>
                    <span className="font-mono text-slate-200">
                      {FORMAT_RUPIAH(data.perjalananDinas)}
                    </span>
                  </div>
                )}
                {data.jasa > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Belanja Jasa / Honor:
                    </span>
                    <span className="font-mono text-slate-200">
                      {FORMAT_RUPIAH(data.jasa)}
                    </span>
                  </div>
                )}
                {data.barang > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Belanja Mamin & Barang:
                    </span>
                    <span className="font-mono text-slate-200">
                      {FORMAT_RUPIAH(data.barang)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-slate-50/90 via-white to-blue-50/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 font-mono">
              VISUALISASI RECHARTS
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
              TA 2026
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight font-display">
            Tren Realisasi Anggaran Per-Bulan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis serapan berkala dan akumulasi realisasi transaksi belanja secara kronologis
          </p>
        </div>

        {/* Controls: Scope & Mode Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Scope Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setScope('selected')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                scope === 'selected'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan grafik hanya untuk sasaran kegiatan yang dicontreng"
            >
              Terpilih ({selectedRowIds.size})
            </button>
            <button
              type="button"
              onClick={() => setScope('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                scope === 'all'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan grafik untuk seluruh 16 sasaran kegiatan"
            >
              Semua APBD ({items.length})
            </button>
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setChartMode('combo')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                chartMode === 'combo'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Diagram Batang Realisasi + Garis Tren Akumulatif"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Kombinasi</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('stacked')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                chartMode === 'stacked'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Komposisi Bertumpuk: Belanja Barang, Jasa, Perjalanan Dinas"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Komposisi Akun</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('area')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                chartMode === 'area'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kurva Pertumbuhan Akumulatif Realisasi"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Kurva Kumulatif</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
        {/* Metric 1 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Realisasi ({scope === 'selected' ? `${selectedRowIds.size} Item` : 'Semua'})
          </span>
          <div className="font-mono font-extrabold text-blue-700 text-sm sm:text-base mt-0.5">
            {FORMAT_RUPIAH(totalRealisasi)}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-600 mt-1 font-medium">
            <span className="font-bold text-emerald-700 font-mono">
              {serapanPercentage.toFixed(1)}%
            </span>
            <span>dari pagu {FORMAT_RUPIAH(targetPagu)}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
            Puncak Serapan
          </span>
          <div className="font-mono font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
            {peakMonth ? `${peakMonth.fullName}` : '-'}
          </div>
          <div className="text-[10px] text-slate-600 mt-1 font-mono font-medium">
            {peakMonth ? FORMAT_RUPIAH(peakMonth.realisasi) : 'Rp 0'}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
            Volume Mutasi Jurnal
          </span>
          <div className="font-mono font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
            {totalTxCount} SP2D / Kuitansi
          </div>
          <div className="text-[10px] text-slate-600 mt-1">
            Terdistribusi pada {activeMonths.length} bulan aktif
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
            Rata-rata Bulan Aktif
          </span>
          <div className="font-mono font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
            {FORMAT_RUPIAH(avgMonthlyRealization)}
          </div>
          <div className="text-[10px] text-slate-600 mt-1">
            per bulan dengan pencairan
          </div>
        </div>
      </div>

      {/* Main Recharts Area */}
      <div className="p-4 sm:p-5">
        <div className="w-full h-72 sm:h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'combo' ? (
              <ComposedChart
                data={chartData}
                margin={{ top: 15, right: 20, left: 15, bottom: 5 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const key = e.activePayload[0].payload.key;
                    onSelectMonth(activeHighlightMonth === key ? 'all' : key);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 10, fill: '#10b981' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 10, fontSize: '11px', fontWeight: 600 }}
                  formatter={(value) => (
                    <span className="text-slate-700">{value}</span>
                  )}
                />
                <Bar
                  yAxisId="left"
                  dataKey="realisasi"
                  name="Realisasi Bulanan"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                  cursor="pointer"
                >
                  {chartData.map((entry) => {
                    const isSelected = activeHighlightMonth === entry.key;
                    const isAnySelected = activeHighlightMonth !== 'all';
                    let fill = '#2563eb'; // blue-600
                    if (isSelected) fill = '#1d4ed8'; // blue-700
                    else if (isAnySelected) fill = '#93c5fd'; // lighter
                    return (
                      <Cell
                        key={`cell-${entry.key}`}
                        fill={fill}
                        stroke={isSelected ? '#1e3a8a' : 'none'}
                        strokeWidth={isSelected ? 2 : 0}
                      />
                    );
                  })}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="akumulatif"
                  name="Tren Akumulatif"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </ComposedChart>
            ) : chartMode === 'stacked' ? (
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 20, left: 15, bottom: 5 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const key = e.activePayload[0].payload.key;
                    onSelectMonth(activeHighlightMonth === key ? 'all' : key);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 10, fontSize: '11px', fontWeight: 600 }}
                  formatter={(value) => (
                    <span className="text-slate-700">{value}</span>
                  )}
                />
                <Bar
                  dataKey="perjalananDinas"
                  name="Belanja Perjalanan Dinas"
                  stackId="a"
                  fill="#2563eb"
                  maxBarSize={40}
                  cursor="pointer"
                />
                <Bar
                  dataKey="jasa"
                  name="Belanja Jasa (Kontribusi/Honor)"
                  stackId="a"
                  fill="#059669"
                  maxBarSize={40}
                  cursor="pointer"
                />
                <Bar
                  dataKey="barang"
                  name="Belanja Barang (Mamin/Cetak)"
                  stackId="a"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                  cursor="pointer"
                />
              </BarChart>
            ) : (
              <AreaChart
                data={chartData}
                margin={{ top: 15, right: 20, left: 15, bottom: 5 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const key = e.activePayload[0].payload.key;
                    onSelectMonth(activeHighlightMonth === key ? 'all' : key);
                  }
                }}
              >
                <defs>
                  <linearGradient id="areaColorAkumulatif" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="areaColorBulanan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 10, fontSize: '11px', fontWeight: 600 }}
                  formatter={(value) => (
                    <span className="text-slate-700">{value}</span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="akumulatif"
                  name="Akumulasi Realisasi"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#areaColorAkumulatif)"
                />
                <Area
                  type="monotone"
                  dataKey="realisasi"
                  name="Realisasi Bulan Berjalan"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#areaColorBulanan)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Interactive Month Selector Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Sorot Kolom Bulan pada Tabel:</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => onSelectMonth('all')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeHighlightMonth === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Bulan
            </button>
            {chartData.map((m) => {
              const hasData = m.realisasi > 0;
              const isActive = activeHighlightMonth === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => onSelectMonth(isActive ? 'all' : m.key)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : hasData
                      ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                  title={`${m.fullName}: ${FORMAT_RUPIAH(m.realisasi)} (${m.txCount} Transaksi)`}
                >
                  <span>{m.name}</span>
                  {hasData && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-white' : 'bg-blue-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
