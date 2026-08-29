import React from 'react';
import { Construction, Clock, Sparkles } from 'lucide-react';

export const SertifikatView: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs max-w-lg w-full p-8 text-center space-y-5">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-2xs">
          <Construction className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Dalam Pengembangan</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-display">
            Modul Sertifikat Outhouse
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">
            Fitur sertifikat dan pelatihan outhouse sedang dalam proses penyesuaian data dan integrasi sistem.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 font-display uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>RSUD dr. H. Jusuf SK - TA 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

