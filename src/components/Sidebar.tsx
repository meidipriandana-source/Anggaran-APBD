import React, { useState } from 'react';
import {
  Wallet,
  Award,
  Calendar,
  Folder,
  ChevronDown,
  ChevronRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { BudgetItem, SidebarMenu } from '../types';
import { BUDGET_DATA } from '../data/budgetData';
import { LOGO_KALTARA } from '../assets/logoKaltara';

interface SidebarProps {
  currentMenu: SidebarMenu;
  onSelectMenu: (menu: SidebarMenu) => void;
  selectedItemId?: string;
  onSelectItem: (item: BudgetItem) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  onSelectMenu,
  selectedItemId,
  onSelectItem,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const [isDaftarRincianExpanded, setIsDaftarRincianExpanded] = useState(true);

  const handleItemClick = (item: BudgetItem) => {
    onSelectMenu('ringkasan');
    onSelectItem(item);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-b from-slate-50 to-white">
          <div className="w-10 h-12 flex items-center justify-center shrink-0">
            <img
              src={LOGO_KALTARA}
              alt="Logo Pemprov Kalimantan Utara"
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold text-blue-700 tracking-wider uppercase font-mono truncate">
              PEMPROV KALTARA
            </div>
            <h1 className="font-black text-sm text-slate-900 leading-tight font-display tracking-tight truncate">
              RSUD dr. H. Jusuf SK
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                TA 2026 &bull; APBD
              </span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-xs font-medium custom-scrollbar">
          {/* 1. Ringkasan Belanja */}
          <button
            onClick={() => {
              onSelectMenu('ringkasan');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all ${
              currentMenu === 'ringkasan' && !selectedItemId
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4 shrink-0" />
            <span>Ringkasan Belanja</span>
          </button>

          {/* 2. Sertifikat Outhouse */}
          <button
            onClick={() => {
              onSelectMenu('sertifikat');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all ${
              currentMenu === 'sertifikat'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Sertifikat Outhouse</span>
          </button>

          {/* 3. Laporan Anggaran Per-Bulan */}
          <button
            onClick={() => {
              onSelectMenu('bulanan');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all ${
              currentMenu === 'bulanan'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Laporan Anggaran Per-Bulan</span>
          </button>

          {/* 4. DAFTAR RINCIAN (Accordion Dropdown) */}
          <div className="pt-2">
            <button
              onClick={() => setIsDaftarRincianExpanded(!isDaftarRincianExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100/80 transition-all"
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  DAFTAR RINCIAN
                </span>
              </div>
              {isDaftarRincianExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Sub-item List */}
            {isDaftarRincianExpanded && (
              <div className="mt-1 pl-2 space-y-1">
                {BUDGET_DATA.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      title={item.uraianSpesifik}
                      className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left text-[11px] leading-tight transition-all ${
                        isSelected
                          ? 'bg-blue-50/90 text-blue-700 font-bold border border-blue-300/80 shadow-xs ring-1 ring-blue-500/20'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {/* Category Dot */}
                      <span
                        className="w-2 h-2 rounded-full shrink-0 mt-1 shadow-2xs"
                        style={{ backgroundColor: item.colorDot || '#3b82f6' }}
                      />
                      <span className="truncate">{item.uraianSpesifik}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Footer Connection Badge */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between px-3 py-2 bg-emerald-50/80 border border-emerald-200/80 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-800 text-[11px] font-bold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              TERKONEKSI GS
            </div>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>
      </aside>
    </>
  );
};
