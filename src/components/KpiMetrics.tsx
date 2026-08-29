import React from 'react';
import { CreditCard, Wallet, Scale } from 'lucide-react';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1: TOTAL PAGU EFEKTIF */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
        {/* Soft background shape */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-sky-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 pointer-events-none opacity-40">
          <CreditCard className="w-6 h-6" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              TOTAL PAGU EFEKTIF
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {FORMAT_RUPIAH(totalPagu)}
          </div>
        </div>
      </div>

      {/* Card 2: TOTAL TERSERAP */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
        {/* Soft background shape */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 pointer-events-none opacity-40">
          <Wallet className="w-6 h-6" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              TOTAL TERSERAP
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight mt-1">
            {FORMAT_RUPIAH(totalTerserap)}
          </div>
        </div>
      </div>

      {/* Card 3: SISA ANGGARAN */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
        {/* Soft background shape */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 pointer-events-none opacity-40">
          <Scale className="w-6 h-6" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 bg-amber-600 text-white rounded-lg shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              SISA ANGGARAN
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {FORMAT_RUPIAH(totalSisa)}
          </div>
        </div>
      </div>
    </div>
  );
};
