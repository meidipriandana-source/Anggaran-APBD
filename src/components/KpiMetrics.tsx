import React from 'react';
import { CreditCard, Wallet, Scale, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { TOTAL_PAGU_ANGGARAN, TOTAL_TERSERAP_ANGGARAN, TOTAL_SISA_ANGGARAN, FORMAT_RUPIAH } from '../data/budgetData';

interface KpiMetricsProps {
  totalPagu?: number;
  totalTerserap?: number;
  totalSisa?: number;
}

export const KpiMetrics: React.FC<KpiMetricsProps> = ({
  totalPagu = TOTAL_PAGU_ANGGARAN,
  totalTerserap = TOTAL_TERSERAP_ANGGARAN,
  totalSisa = TOTAL_SISA_ANGGARAN
}) => {
  const persenSerapan = totalPagu > 0 ? (totalTerserap / totalPagu) * 100 : 0;
  const persenSisa = totalPagu > 0 ? (totalSisa / totalPagu) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
      {/* Card 1: TOTAL PAGU EFEKTIF */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        {/* Ambient glow & icon */}
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-blue-100/50 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-200/40 transition-colors" />
        <div className="absolute right-4 top-4 w-11 h-11 bg-blue-50/80 rounded-xl flex items-center justify-center text-blue-600/40 pointer-events-none group-hover:text-blue-600/70 transition-colors">
          <CreditCard className="w-5 h-5" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-display">
                TOTAL PAGU EFEKTIF
              </span>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              {FORMAT_RUPIAH(totalPagu)}
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
            <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-mono font-bold">
              100%
            </span>
            <span>Alokasi Pagu APBD Murni</span>
          </div>
        </div>
      </div>

      {/* Card 2: TOTAL TERSERAP */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        {/* Ambient glow & icon */}
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-200/40 transition-colors" />
        <div className="absolute right-4 top-4 w-11 h-11 bg-emerald-50/80 rounded-xl flex items-center justify-center text-emerald-600/40 pointer-events-none group-hover:text-emerald-600/70 transition-colors">
          <TrendingUp className="w-5 h-5" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-display">
                TOTAL TERSERAP
              </span>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight font-display">
              {FORMAT_RUPIAH(totalTerserap)}
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono font-bold">
              <ArrowUpRight className="w-3 h-3" />
              {persenSerapan.toFixed(1)}%
            </span>
            <span>Realisasi SP2D / Mutasi</span>
          </div>
        </div>
      </div>

      {/* Card 3: SISA ANGGARAN */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        {/* Ambient glow & icon */}
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-amber-100/50 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-200/40 transition-colors" />
        <div className="absolute right-4 top-4 w-11 h-11 bg-amber-50/80 rounded-xl flex items-center justify-center text-amber-600/40 pointer-events-none group-hover:text-amber-600/70 transition-colors">
          <Scale className="w-5 h-5" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-xl shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-display">
                SISA ANGGARAN
              </span>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              {FORMAT_RUPIAH(totalSisa)}
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
            <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-mono font-bold">
              {persenSisa.toFixed(1)}%
            </span>
            <span>Sisa Kas Tersedia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

