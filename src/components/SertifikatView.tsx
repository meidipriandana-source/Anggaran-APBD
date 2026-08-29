import React from 'react';
import { Award, CheckCircle2, FileText, UserCheck, ShieldCheck, Download } from 'lucide-react';
import { FORMAT_RUPIAH } from '../data/budgetData';

export const SertifikatView: React.FC = () => {
  const certificatePackages = [
    {
      nama: 'Sertifikat Peserta Pelatihan Asessor Kompetensi RS',
      sasaran: '150 Peserta Tenaga Medis & Asesor Internal',
      pagu: 30000000,
      status: 'Terbit / Selesai Pelatihan',
      lembaga: 'Lembaga Sertifikasi Profesi Nakes & Kemkes RI',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      nama: 'Sertifikasi Kompetensi Advanced Trauma & Cardiac Life Support (ATCLS)',
      sasaran: '5 Dokter Spesialis & Dokter IGD',
      pagu: 50000000,
      status: 'Proses Sertifikasi Batch I',
      lembaga: 'Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      nama: 'Sertifikat Pelatihan Peningkatan Kapasitas ASN Bidang Medis & Manajemen',
      sasaran: '50 Orang ASN Nakes & Manajemen',
      pagu: 500000000,
      status: 'Sebagian Terbit (40 ASN)',
      lembaga: 'Bapelkes / Pusat Pengembangan SDM Kesehatan',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      nama: 'Sertifikat Akreditasi Paripurna Rumah Sakit',
      sasaran: 'RSUD dr. H. Jusuf SK',
      pagu: 140000000,
      status: 'Tahap Verifikasi & Mock Survey',
      lembaga: 'Komisi Akreditasi Rumah Sakit (KARS / LAM-KPRS)',
      badgeColor: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Sertifikasi Target</span>
          </div>
          <div className="text-2xl font-black text-slate-900">205+ Sertifikat</div>
          <p className="text-xs text-slate-500 mt-1">Tenaga medis, keperawatan & asesor</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <UserCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Nakes Tervalidasi</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">190 Orang</div>
          <p className="text-xs text-slate-500 mt-1">Telah tersertifikasi terakreditasi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kepatuhan Standar Mutu</span>
          </div>
          <div className="text-2xl font-black text-blue-600">100% SBM</div>
          <p className="text-xs text-slate-500 mt-1">Standar Biaya Masukan Pemprov Kaltara</p>
        </div>
      </div>

      {/* Detail Certificate Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Daftar Paket Sertifikasi & Pelatihan Outhouse
            </h3>
            <span className="text-xs text-slate-400 font-mono">RSUD dr. H. Jusuf SK - TA 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Unduh Rekap</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {certificatePackages.map((pkg, i) => (
            <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pkg.badgeColor}`}>
                    {pkg.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">&bull; {pkg.lembaga}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{pkg.nama}</h4>
                <p className="text-xs text-slate-500">Sasaran: <strong>{pkg.sasaran}</strong></p>
              </div>

              <div className="text-right sm:shrink-0">
                <div className="text-xs text-slate-400">Alokasi Anggaran</div>
                <div className="font-mono font-bold text-sm text-slate-900">{FORMAT_RUPIAH(pkg.pagu)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
