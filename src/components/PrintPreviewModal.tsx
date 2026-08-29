import React, { useState } from 'react';
import { Printer, X, FileText, CheckCircle2, Sliders, ChevronDown } from 'lucide-react';
import { printHtmlDirectly } from '../utils/printHelper';
import { LOGO_KALTARA } from '../assets/logoKaltara';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  htmlContent: string;
  defaultLandscape?: boolean;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle = 'RSUD dr. H. Jusuf SK - APBD Tahun Anggaran 2026',
  htmlContent,
  defaultLandscape = true
}) => {
  const [landscape, setLandscape] = useState(defaultLandscape);
  const [paperSize, setPaperSize] = useState<'A4' | 'F4' | 'Legal'>('A4');
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  const handleExecutePrint = () => {
    setIsPrinting(true);
    printHtmlDirectly({
      title,
      subtitle,
      landscape,
      htmlContent
    });
    setTimeout(() => {
      setIsPrinting(false);
    }, 1000);
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:px-6 bg-slate-800 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 border border-blue-500/40 text-blue-400 rounded-xl">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight font-display">
                Pratinjau Dokumen Cetak
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {title} &bull; {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Paper Orientation Selector */}
            <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLandscape(true)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  landscape ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Landscape (Horizontal)
              </button>
              <button
                type="button"
                onClick={() => setLandscape(false)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  !landscape ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Portrait (Tegak)
              </button>
            </div>

            {/* Print Trigger Button */}
            <button
              type="button"
              onClick={handleExecutePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>{isPrinting ? 'Menyiapkan...' : 'Cetak / Simpan PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-700/60 transition-colors cursor-pointer"
              title="Tutup Pratinjau"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Container Viewport (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/90 flex flex-col items-center custom-scrollbar">
          <div
            className={`bg-white text-slate-900 shadow-2xl rounded-sm p-6 sm:p-10 sm:px-12 transition-all my-auto shrink-0 w-full border border-slate-200 ${
              landscape ? 'max-w-[1100px]' : 'max-w-[850px]'
            }`}
          >
            {/* Kop Surat */}
            <div className="border-b-2 border-double border-slate-900 pb-3 mb-4 flex items-center justify-between gap-4">
              <div className="shrink-0 w-16 sm:w-20 flex items-center justify-center">
                <img
                  src={LOGO_KALTARA}
                  alt="Logo Pemprov Kalimantan Utara"
                  className="w-14 sm:w-16 h-auto object-contain max-h-20"
                />
              </div>
              <div className="flex-1 text-center">
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight">
                  PEMERINTAH PROVINSI KALIMANTAN UTARA
                </h4>
                <h2 className="font-black text-base sm:text-xl uppercase tracking-tight text-slate-950 font-display mt-0.5">
                  RSUD dr. H. JUSUF SK
                </h2>
                <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 font-medium leading-tight">
                  Jl. P. Irian No. 1 Tarakan, Kalimantan Utara | Telp. (0551) 21100 | Website: rsudjusufsk.kaltaraprov.go.id
                </p>
              </div>
              {/* Invisible balancer on the right to keep center alignment perfect */}
              <div className="shrink-0 w-16 sm:w-20 hidden sm:block" aria-hidden="true" />
            </div>

            {/* Title */}
            <div className="text-center mb-5">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-tight underline text-slate-950 font-display">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Injected Content (Table with Explicit Light Paper Colors) */}
            <div
              className="overflow-x-auto text-[10px] w-full text-slate-900 [&_table]:w-full [&_table]:border-collapse [&_table]:bg-white [&_table]:text-slate-900 [&_thead]:bg-slate-100 [&_thead]:text-slate-900 [&_tbody]:bg-white [&_tbody]:text-slate-900 [&_th]:border [&_th]:border-slate-400 [&_th]:bg-slate-100 [&_th]:text-slate-900 [&_th]:p-2 [&_th]:font-extrabold [&_th]:text-center [&_th]:uppercase [&_td]:border [&_td]:border-slate-300 [&_td]:bg-white [&_td]:text-slate-900 [&_td]:p-2 [&_td.num]:text-right [&_td.num]:font-mono [&_td.center]:text-center [&_tr]:bg-white [&_tr.total-row]:bg-slate-200 [&_tr.total-row_td]:bg-slate-200 [&_tr.total-row]:font-black"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Signature Area */}
            <div className="mt-10 pt-4 grid grid-cols-2 gap-8 text-xs">
              <div className="text-center">
                <div>Mengetahui,</div>
                <div className="font-bold">Pejabat Pelaksana Teknis Kegiatan (PPTK)</div>
                <div className="h-16"></div>
                <div className="font-bold underline text-slate-900">( _________________________ )</div>
                <div className="text-[11px] text-slate-500 mt-0.5">NIP. ........................................</div>
              </div>

              <div className="text-center">
                <div>Tarakan, {currentDate}</div>
                <div className="font-bold">Bendahara Pengeluaran / Pembantu</div>
                <div className="h-16"></div>
                <div className="font-bold underline text-slate-900">( _________________________ )</div>
                <div className="text-[11px] text-slate-500 mt-0.5">NIP. ........................................</div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-3 border-t border-dashed border-slate-300 text-[10px] text-slate-400 flex justify-between">
              <span>Dicetak melalui Dashboard Analisis Anggaran APBD 2026</span>
              <span>Waktu: {new Date().toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="p-3.5 bg-slate-800 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Format kertas siap cetak / simpan langsung sebagai PDF dokumen resmi</span>
          <button
            type="button"
            onClick={handleExecutePrint}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Lanjutkan Cetak
          </button>
        </div>

      </div>
    </div>
  );
};
