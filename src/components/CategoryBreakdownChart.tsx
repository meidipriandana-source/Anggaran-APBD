import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { FORMAT_RUPIAH, TOTAL_PAGU_ANGGARAN } from '../data/budgetData';
import { PieChart as PieIcon, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

interface CategoryBreakdownChartProps {
  onFilterCategory?: (category: string) => void;
}

export const CategoryBreakdownChart: React.FC<CategoryBreakdownChartProps> = ({ onFilterCategory }) => {
  // Breakdown by Major Account Category
  const macroData = [
    {
      name: 'Belanja Perjalanan Dinas',
      value: 820000000,
      percentage: 47.56,
      color: '#8b5cf6', // Violet
      packagesCount: 1,
      desc: 'Transport & Uang Harian Perjalanan Dinas 82 Orang'
    },
    {
      name: 'Belanja Jasa (Kontribusi & Honor)',
      value: 779200000,
      percentage: 45.19,
      color: '#059669', // Emerald Green
      packagesCount: 2,
      desc: 'Kontribusi Diklat (Rp 550 Jt) + Honorarium Pengajar (Rp 229.2 Jt)'
    },
    {
      name: 'Belanja Barang (Mamin Rapat)',
      value: 124920000,
      percentage: 7.25,
      color: '#f97316', // Orange
      packagesCount: 1,
      desc: 'Makan Minum Rapat Spesifikasi Nasi Kotak Biasa (Rp 124.92 Jt)'
    }
  ];

  // Specific thematic breakdown
  const thematicData = [
    { name: 'Perjalanan Dinas Dalam Negeri', value: 820000000, color: '#8b5cf6', share: '47.56%' },
    { name: 'Kontribusi Kursus/Pelatihan', value: 550000000, color: '#3b82f6', share: '31.90%' },
    { name: 'Honorarium Pengajar / Narasumber', value: 229200000, color: '#10b981', share: '13.29%' },
    { name: 'Makanan & Minuman Rapat', value: 124920000, color: '#f97316', share: '7.25%' }
  ];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-bold text-slate-100">{data.name}</span>
          </div>
          <div className="text-emerald-400 font-mono font-bold text-sm mt-1">
            {FORMAT_RUPIAH(data.value)}
          </div>
          <div className="text-slate-300 text-[11px] mt-0.5 font-mono">
            Porsi: {((data.value / TOTAL_PAGU_ANGGARAN) * 100).toFixed(2)}% dari Total Pagu
          </div>
          {data.desc && (
            <div className="text-[10px] text-slate-400 mt-1 border-t border-slate-700 pt-1">
              {data.desc}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left: Interactive Donut Chart */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <PieIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Struktur Komposisi Belanja
              </h3>
              <p className="text-[11px] text-slate-500">
                Distribusi Pagu berdasarkan 3 Kelompok Akun Utama
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full h-56 relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pagu</span>
              <span className="text-xs font-extrabold text-slate-800 font-mono">Rp 2,09 Miliar</span>
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          {macroData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-bold text-slate-800 text-[11px]">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900 text-[11px]">
                  {FORMAT_RUPIAH(item.value)}
                </div>
                <div className="text-[10px] font-mono text-slate-500">{item.percentage}% ({item.packagesCount} Paket)</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Thematic Breakdown Progress Bars & Strategic Highlights */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Perbandingan Tematik Belanja (Alokasi Utama)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Sorotan porsi dominan biaya perjalanan dinas & kontribusi pelatihan
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Progress Bars */}
          <div className="space-y-3.5 my-4">
            {thematicData.map((item, idx) => {
              const pct = (item.value / TOTAL_PAGU_ANGGARAN) * 100;
              const isPerdinOrKontribusi = idx < 2;
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${isPerdinOrKontribusi ? 'text-slate-900' : 'text-slate-700'}`}>
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-600 font-semibold">{FORMAT_RUPIAH(item.value)}</span>
                      <span
                        className={`font-mono text-[11px] font-bold px-1.5 py-0.2 rounded ${
                          idx === 0
                            ? 'bg-blue-100 text-blue-800'
                            : idx === 1
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.share}
                      </span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Insight Callout */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-blue-950">Fokus Peningkatan SDM Kesehatan:</span>
              <p className="text-slate-600 text-[11px]">
                Total <strong>Rp 1,51 Miliar (72.11%)</strong> dialokasikan langsung untuk pengiriman ASN nakes ke diklat nasional & sertifikasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
