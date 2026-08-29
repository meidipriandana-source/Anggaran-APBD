import React, { useState, useRef } from 'react';
import { CloudUpload, CloudDownload, Printer, Menu, Check, RotateCcw } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
  onPrint?: () => void;
  onBackup?: () => void;
  onRestore?: () => void;
  onRestoreFromFile?: (file: File) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Ringkasan Eksekutif',
  subtitle = 'Laporan serapan dana dan progres anggaran keseluruhan',
  onToggleSidebar,
  onPrint,
  onBackup,
  onRestore,
  onRestoreFromFile
}) => {
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackup = () => {
    if (onBackup) onBackup();
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 2500);
  };

  const handleRestoreClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else if (onRestore) {
      onRestore();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onRestoreFromFile) {
        onRestoreFromFile(file);
      }
      setRestoreSuccess(true);
      setTimeout(() => setRestoreSuccess(false), 2500);
    }
    // reset input
    if (e.target) e.target.value = '';
  };

  const handleResetDefault = () => {
    if (onRestore) onRestore();
    setRestoreSuccess(true);
    setTimeout(() => setRestoreSuccess(false), 2500);
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
      {/* Title & Subtitle */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden border border-slate-200 cursor-pointer active:scale-95 transition-transform"
            title="Menu Sidebar"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Hidden JSON file input for Restore */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Backup Button */}
        <button
          type="button"
          onClick={handleBackup}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-emerald-300 shadow-2xs transition-all cursor-pointer active:scale-95"
          title="Unduh file backup data (JSON)"
        >
          {backupSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tersimpan!</span>
            </>
          ) : (
            <>
              <CloudUpload className="w-3.5 h-3.5 text-emerald-600" />
              <span>Backup</span>
            </>
          )}
        </button>

        {/* Restore Button (Upload JSON) */}
        <button
          type="button"
          onClick={handleRestoreClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-700 bg-white hover:bg-amber-50 active:bg-amber-100 border border-amber-300 shadow-2xs transition-all cursor-pointer active:scale-95"
          title="Pulihkan data dari file backup JSON"
        >
          {restoreSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-amber-600" />
              <span>Dipulihkan!</span>
            </>
          ) : (
            <>
              <CloudDownload className="w-3.5 h-3.5 text-amber-600" />
              <span>Restore File</span>
            </>
          )}
        </button>

        {/* Reset Default Button */}
        {onRestore && (
          <button
            type="button"
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Reset mutasi ke data awal bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Default</span>
          </button>
        )}

        {/* Cetak Laporan Button */}
        <button
          type="button"
          onClick={onPrint || (() => window.print())}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-2xs transition-all cursor-pointer active:scale-95"
          title="Cetak tampilan dokumen atau simpan sebagai PDF"
        >
          <Printer className="w-3.5 h-3.5 text-slate-700" />
          <span>Cetak Laporan</span>
        </button>
      </div>
    </header>
  );
};

