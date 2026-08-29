import React from 'react';
import { BudgetItem } from '../types';
import { FORMAT_RUPIAH, TOTAL_PAGU_ANGGARAN } from '../data/budgetData';
import { X, Plane, GraduationCap, Building2, Tag, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { printHtmlDirectly } from '../utils/printHelper';
import { DayakRibbonTrim, DayakTableWatermark } from './DayakPatternDecor';

interface ItemDetailModalProps {
  item: BudgetItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isPerdin = item.isHighlightPerjalananDinas;
  const isKontribusi = item.isHighlightKontribusi;

  const handlePrintItem = () => {
    const htmlContent = `
      <div style="border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; margin-bottom: 15px; background: #f8fafc;">
        <table style="width: 100%; border: none;">
          <tr><td style="border:none; width: 140px; font-weight: bold;">Kode Rekening:</td><td style="border:none; font-family: monospace;">${item.kodeRekening}</td></tr>
          <tr><td style="border:none; font-weight: bold;">Kategori Belanja:</td><td style="border:none;">${item.kategoriBelanja} (${item.kelompokAkun})</td></tr>
          <tr><td style="border:none; font-weight: bold;">Uraian Komponen:</td><td style="border:none; font-weight: bold;">${item.uraianSpesifik}</td></tr>
          <tr><td style="border:none; font-weight: bold;">Sub Kegiatan:</td><td style="border:none;">${item.subKegiatanKelompok}</td></tr>
          <tr><td style="border:none; font-weight: bold;">Volume & Satuan:</td><td style="border:none;">${item.koefisienVolume} @ ${FORMAT_RUPIAH(item.hargaSatuan)}</td></tr>
        </table>
      </div>

      <table>
        <thead>
          <tr>
            <th>PAGU MURNI</th>
            <th>PERGESERAN</th>
            <th>PAGU EFEKTIF</th>
            <th>REALISASI TERSERAP</th>
            <th>SISA PAGU</th>
            <th>% SERAPAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="num">${FORMAT_RUPIAH(item.paguMurni)}</td>
            <td class="num">${FORMAT_RUPIAH(item.pergeseran)}</td>
            <td class="num" style="font-weight: bold;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
            <td class="num" style="font-weight: bold; color: #1e3a8a;">${FORMAT_RUPIAH(item.terserap)}</td>
            <td class="num" style="font-weight: bold;">${FORMAT_RUPIAH(item.sisa)}</td>
            <td class="center" style="font-weight: bold;">${item.persenSerapan.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 15px;">
        <h4 style="margin: 0 0 5px 0; text-transform: uppercase;">Spesifikasi & Rincian Teknis Belanja:</h4>
        <p style="margin: 0; padding: 10px; background: #ffffff; border: 1px solid #cbd5e1; font-size: 11px; line-height: 1.5;">
          ${item.spesifikasiDetail}
        </p>
      </div>

      ${
        item.catatanAnalisis
          ? `
        <div style="margin-top: 10px;">
          <h4 style="margin: 0 0 5px 0; text-transform: uppercase;">Catatan Analisis / Kebijakan:</h4>
          <p style="margin: 0; padding: 8px; background: #eff6ff; border: 1px solid #bfdbfe; font-size: 10px; color: #1e40af;">
            ${item.catatanAnalisis}
          </p>
        </div>
      `
          : ''
      }
    `;

    printHtmlDirectly({
      title: `LEMBAR RINCIAN BELANJA: ${item.uraianSpesifik}`,
      subtitle: `Kode Rekening: ${item.kodeRekening} - APBD TA 2026`,
      landscape: false,
      htmlContent
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <DayakRibbonTrim colorScheme={isPerdin ? 'blue' : isKontribusi ? 'emerald' : 'gold'} />
        <DayakTableWatermark opacity={0.04} />
        {/* Header */}
        <div
          className={`p-4 sm:p-5 flex items-start justify-between border-b ${
            isPerdin
              ? 'bg-blue-50/80 border-blue-200 text-blue-950'
              : isKontribusi
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-xl text-white shrink-0 ${
                isPerdin ? 'bg-blue-600' : isKontribusi ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            >
              {isPerdin ? (
                <Plane className="w-5 h-5" />
              ) : isKontribusi ? (
                <GraduationCap className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white/80 rounded-md border border-slate-300">
                  {item.kodeRekening}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {item.kategoriBelanja}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black mt-1 leading-snug font-display">
                {item.uraianSpesifik}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Sub Header & Kelompok */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Kelompok / Tagging Sub Kegiatan
            </span>
            <div className="font-bold text-slate-800 text-xs">
              {item.subKegiatanKelompok}
            </div>
            {item.spesifikasiDetail && (
              <div className="text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                <strong>Spesifikasi RKA:</strong> {item.spesifikasiDetail}
              </div>
            )}
          </div>

          {/* Pricing Calculation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Koefisien / Volume</span>
              <div className="text-sm font-extrabold text-slate-900 font-mono mt-1">
                {item.koefisienVolume}
              </div>
              <span className="text-[10px] text-slate-500">{item.satuan}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Harga Satuan</span>
              <div className="text-sm font-extrabold text-slate-900 font-mono mt-1">
                {FORMAT_RUPIAH(item.hargaSatuan)}
              </div>
              <span className="text-[10px] text-slate-500">Per Satuan</span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-center">
              <span className="text-[10px] font-bold text-blue-800 uppercase">Jumlah Total Paket</span>
              <div className="text-sm font-extrabold text-blue-700 font-mono mt-1">
                {FORMAT_RUPIAH(item.jumlahTotal)}
              </div>
              <span className="text-[10px] font-mono text-blue-600 font-bold">
                {item.persentaseTotal.toFixed(2)}% dari Pagu
              </span>
            </div>
          </div>

          {/* Analyst Note */}
          {item.catatanAnalisis && (
            <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl text-slate-800">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Catatan Analis Anggaran:
              </div>
              <p className="leading-relaxed text-xs">{item.catatanAnalisis}</p>
            </div>
          )}

          {/* Government Compliance metadata */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              RSUD dr. H. Jusuf SK (Kalimantan Utara)
            </span>
            <span className="font-mono">Pagu Total: {FORMAT_RUPIAH(TOTAL_PAGU_ANGGARAN)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrintItem}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Cetak Rincian</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer active:scale-95"
          >
            Tutup Rincian
          </button>
        </div>
      </div>
    </div>
  );
};
