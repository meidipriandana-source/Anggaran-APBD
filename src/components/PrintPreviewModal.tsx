import React, { useState } from 'react';
import {
  Printer,
  X,
  FileText,
  CheckCircle2,
  Sliders,
  ChevronDown,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
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
  const [paperSize, setPaperSize] = useState<'F4' | 'A4' | 'Legal'>('F4');
  const [scale, setScale] = useState<number>(95);
  const [marginMm, setMarginMm] = useState<number>(5);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  const handleExecutePrint = () => {
    setIsPrinting(true);
    printHtmlDirectly({
      title,
      subtitle,
      landscape,
      paperSize,
      scale,
      marginMm,
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

  // Calculate preview wrapper max width according to paper size and orientation
  const getPreviewMaxWidth = () => {
    if (paperSize === 'F4') {
      return landscape ? 'max-w-[1160px]' : 'max-w-[760px]';
    }
    if (paperSize === 'Legal') {
      return landscape ? 'max-w-[1240px]' : 'max-w-[760px]';
    }
    return landscape ? 'max-w-[1040px]' : 'max-w-[740px]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl w-full max-w-6xl h-[94vh] max-h-[94vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="p-3.5 sm:px-6 bg-slate-800 border-b border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 border border-blue-500/40 text-blue-400 rounded-xl shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight font-display">
                  Pratinjau Dokumen Cetak
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Format {paperSize} {landscape ? 'Landscape' : 'Portrait'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate max-w-md">
                {title}
              </p>
            </div>
          </div>

          {/* Quick Print Configuration Controls */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Paper Size Selector */}
            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700 font-bold">
              <button
                type="button"
                onClick={() => setPaperSize('F4')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  paperSize === 'F4'
                    ? 'bg-emerald-600 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Kertas F4 / Folio (215 x 330 mm) - Standar Laporan Dinas / SPJ"
              >
                <span>F4 / Folio</span>
                {paperSize === 'F4' && <span className="text-[9px] bg-emerald-700 px-1 rounded-sm">215x330</span>}
              </button>

              <button
                type="button"
                onClick={() => setPaperSize('A4')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  paperSize === 'A4'
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Kertas A4 (210 x 297 mm)"
              >
                A4
              </button>

              <button
                type="button"
                onClick={() => setPaperSize('Legal')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  paperSize === 'Legal'
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Kertas Legal (216 x 356 mm)"
              >
                Legal
              </button>
            </div>

            {/* Paper Orientation Selector */}
            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700 font-bold">
              <button
                type="button"
                onClick={() => setLandscape(true)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  landscape ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Orientasi Landscape (Mendatar) - Sangat cocok untuk tabel 12 bulan & belanja"
              >
                Landscape
              </button>
              <button
                type="button"
                onClick={() => setLandscape(false)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  !landscape ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Orientasi Portrait (Tegak)"
              >
                Portrait
              </button>
            </div>

            {/* Scale Selector (Anti-Terpotong) */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-medium text-[11px]">Skala:</span>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-xs focus:outline-hidden cursor-pointer"
                title="Pilih skala cetak agar ketikan pas dan tidak terpotong"
              >
                <option value={100} className="bg-slate-800 text-white">100% (Normal)</option>
                <option value={95} className="bg-slate-800 text-white">95% (Pas F4)</option>
                <option value={90} className="bg-slate-800 text-white">90% (Aman)</option>
                <option value={85} className="bg-slate-800 text-white">85% (Rapat)</option>
                <option value={80} className="bg-slate-800 text-white">80% (Ekstra Rapat)</option>
              </select>
            </div>

            {/* Margin Selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-medium text-[11px]">Margin:</span>
              <select
                value={marginMm}
                onChange={(e) => setMarginMm(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-xs focus:outline-hidden cursor-pointer"
                title="Pilih margin kertas"
              >
                <option value={5} className="bg-slate-800 text-white">5mm (Ramping)</option>
                <option value={8} className="bg-slate-800 text-white">8mm (Standar)</option>
                <option value={3} className="bg-slate-800 text-white">3mm (Minimalis)</option>
              </select>
            </div>

            {/* Print Trigger Button */}
            <button
              type="button"
              onClick={handleExecutePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>{isPrinting ? 'Menyiapkan...' : 'Cetak / PDF'}</span>
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

        {/* F4 Optimization Notice Banner */}
        <div className="bg-emerald-950/40 border-b border-emerald-800/40 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Mode Kertas F4 / Folio (215 x 330 mm) Aktif:</strong> Format tabel, spasi ketikan, dan batas margin telah disesuaikan agar tidak terpotong di printer.
            </span>
          </div>
          <span className="hidden md:inline text-[11px] text-emerald-300/80">
            Skala saat ini: <strong>{scale}%</strong> &bull; Margin: <strong>{marginMm}mm</strong>
          </span>
        </div>

        {/* Paper Container Viewport (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-900/90 flex flex-col items-center custom-scrollbar">
          <div
            className={`bg-white text-slate-900 shadow-2xl rounded-sm p-5 sm:p-8 sm:px-10 transition-all my-auto shrink-0 w-full border border-slate-200 ${getPreviewMaxWidth()}`}
            style={{
              transform: scale < 100 ? `scale(${scale / 100})` : undefined,
              transformOrigin: 'top center'
            }}
          >
            {/* Kop Surat */}
            <div className="border-b-2 border-double border-slate-900 pb-2.5 mb-3 flex items-center justify-between gap-4">
              <div className="shrink-0 w-14 sm:w-16 flex items-center justify-center">
                <img
                  src={LOGO_KALTARA}
                  alt="Logo Pemprov Kalimantan Utara"
                  className="w-12 sm:w-14 h-auto object-contain max-h-16"
                />
              </div>
              <div className="flex-1 text-center">
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight">
                  PEMERINTAH PROVINSI KALIMANTAN UTARA
                </h4>
                <h2 className="font-black text-base sm:text-lg uppercase tracking-tight text-slate-950 font-display mt-0.5">
                  RSUD dr. H. JUSUF SK
                </h2>
                <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 mt-0.5 font-medium leading-tight">
                  Jl. P. Irian No. 1 Tarakan, Kalimantan Utara | Telp. (0551) 21100 | Website: rsudjusufsk.kaltaraprov.go.id
                </p>
              </div>
              {/* Invisible balancer on the right to keep center alignment perfect */}
              <div className="shrink-0 w-14 sm:w-16 hidden sm:block" aria-hidden="true" />
            </div>

            {/* Title */}
            <div className="text-center mb-4">
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-tight underline text-slate-950 font-display">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Injected Content (Table with Explicit Light Paper Colors & Anti-Clipping Styles) */}
            <div
              className="overflow-x-auto text-[9.5px] w-full text-slate-900 [&_table]:w-full [&_table]:border-collapse [&_table]:bg-white [&_table]:text-slate-900 [&_thead]:bg-slate-100 [&_thead]:text-slate-900 [&_tbody]:bg-white [&_tbody]:text-slate-900 [&_th]:border [&_th]:border-slate-500 [&_th]:bg-slate-100 [&_th]:text-slate-900 [&_th]:p-1.5 [&_th]:font-extrabold [&_th]:text-center [&_th]:uppercase [&_td]:border [&_td]:border-slate-400 [&_td]:bg-white [&_td]:text-slate-900 [&_td]:p-1.5 [&_td.num]:text-right [&_td.num]:font-mono [&_td.center]:text-center [&_td.sasaran]:whitespace-normal [&_td.sasaran]:break-words [&_td.desc]:whitespace-normal [&_td.desc]:break-words [&_tr]:bg-white [&_tr.total-row]:bg-slate-200 [&_tr.total-row_td]:bg-slate-200 [&_tr.total-row]:font-black"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Signature Area */}
            <div className="mt-8 pt-3 grid grid-cols-2 gap-8 text-[11px]">
              <div className="text-center">
                <div>Mengetahui,</div>
                <div className="font-bold">Pejabat Pelaksana Teknis Kegiatan (PPTK)</div>
                <div className="h-12"></div>
                <div className="font-bold underline text-slate-900">( _________________________ )</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NIP. ........................................</div>
              </div>

              <div className="text-center">
                <div>Tarakan, {currentDate}</div>
                <div className="font-bold">Bendahara Pengeluaran / Pembantu</div>
                <div className="h-12"></div>
                <div className="font-bold underline text-slate-900">( _________________________ )</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NIP. ........................................</div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-2.5 border-t border-dashed border-slate-300 text-[9px] text-slate-400 flex justify-between">
              <span>Format Kertas: {paperSize} ({landscape ? 'Landscape 330x215 mm' : 'Portrait 215x330 mm'}) &bull; Sistem Dashboard Anggaran APBD 2026</span>
              <span>Waktu: {new Date().toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Printing Advice */}
        <div className="p-3 bg-slate-800 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              Tips: Pada dialog cetak peramban (Chrome/Edge), pilih Ukuran Kertas <strong>Folio / F4</strong> (atau gunakan skala <strong>Fit to printable area</strong>).
            </span>
          </div>
          <button
            type="button"
            onClick={handleExecutePrint}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
          >
            Lanjutkan Cetak Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
