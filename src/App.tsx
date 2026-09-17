import React, { useState, useMemo } from 'react';
import { BudgetItem, SidebarMenu, JournalTransaction } from './types';
import {
  BUDGET_DATA,
  DEFAULT_JOURNAL_DATA,
  TOTAL_PAGU_ANGGARAN
} from './data/budgetData';
import { LOGO_KALTARA } from './assets/logoKaltara';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KpiMetrics } from './components/KpiMetrics';
import { BudgetTable } from './components/BudgetTable';
import { MutasiJurnalView } from './components/MutasiJurnalView';
import { SertifikatView } from './components/SertifikatView';
import { MonthlyReportView } from './components/MonthlyReportView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { GrandBackgroundSilhouette } from './components/DayakPatternDecor';
import {
  generateBudgetSummaryHtml,
  generateTransactionsHtml,
  generateMonthlyReportHtml
} from './utils/printHelper';

export default function App() {
  const [currentMenu, setCurrentMenu] = useState<SidebarMenu>('ringkasan');
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [modalDetailItem, setModalDetailItem] = useState<BudgetItem | null>(null);
  const [isHeaderPrintOpen, setIsHeaderPrintOpen] = useState(false);

  // Journal Transactions state (can be added, edited, deleted)
  const [transactions, setTransactions] = useState<JournalTransaction[]>(() => {
    const saved = localStorage.getItem('budget_journal_transactions_2026_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_JOURNAL_DATA;
  });

  // Keep localStorage in sync
  const updateTransactions = (newTransactions: JournalTransaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('budget_journal_transactions_2026_v4', JSON.stringify(newTransactions));
  };

  const handleAddTransaction = (newTx: Omit<JournalTransaction, 'id'>) => {
    const id = `j-${newTx.itemId}-${Date.now()}`;
    const updated = [{ ...newTx, id }, ...transactions];
    updateTransactions(updated);
  };

  const handleUpdateTransaction = (updatedTx: JournalTransaction) => {
    const updated = transactions.map((t) => (t.id === updatedTx.id ? updatedTx : t));
    updateTransactions(updated);
  };

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    updateTransactions(updated);
  };

  // Compute live budget data items with updated terserap values from journal
  const liveBudgetItems = useMemo(() => {
    return BUDGET_DATA.map((item) => {
      const itemTx = transactions.filter((t) => t.itemId === item.id);
      if (itemTx.length > 0) {
        const liveTerserap = itemTx.reduce((sum, t) => sum + t.nominal, 0);
        const liveSisa = Math.max(0, item.jumlahTotal - liveTerserap);
        const livePersen = item.jumlahTotal > 0 ? (liveTerserap / item.jumlahTotal) * 100 : 0;
        return {
          ...item,
          terserap: liveTerserap,
          sisa: liveSisa,
          persenSerapan: livePersen
        };
      }
      return item;
    });
  }, [transactions]);

  // Overall totals
  const overallTerserap = useMemo(() => {
    return liveBudgetItems.reduce((sum, i) => sum + i.terserap, 0);
  }, [liveBudgetItems]);

  const overallSisa = Math.max(0, TOTAL_PAGU_ANGGARAN - overallTerserap);

  // Active selected item with updated live values
  const activeLiveSelectedItem = useMemo(() => {
    if (!selectedItem) return null;
    return liveBudgetItems.find((i) => i.id === selectedItem.id) || selectedItem;
  }, [selectedItem, liveBudgetItems]);

  // Backup & Restore
  const handleBackup = () => {
    const dataStr = JSON.stringify(
      {
        budgetItems: liveBudgetItems,
        transactions,
        timestamp: new Date().toISOString()
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backup_Anggaran_APBD_2026_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRestore = () => {
    updateTransactions(DEFAULT_JOURNAL_DATA);
  };

  const handleRestoreFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.transactions && Array.isArray(parsed.transactions)) {
          updateTransactions(parsed.transactions);
        } else if (Array.isArray(parsed)) {
          updateTransactions(parsed);
        } else {
          alert('Format file backup tidak sesuai.');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  // Dynamic Printable Document for Header Print Button
  const headerPrintData = useMemo(() => {
    if (activeLiveSelectedItem) {
      const itemTx = transactions.filter((t) => t.budgetItemId === activeLiveSelectedItem.id);
      return {
        title: `RINCIAN MUTASI BELANJA: ${activeLiveSelectedItem.uraianSpesifik}`,
        subtitle: `Kode Rekening: ${activeLiveSelectedItem.kodeRekening} - APBD TA 2026`,
        landscape: true,
        htmlContent: generateTransactionsHtml(activeLiveSelectedItem, itemTx)
      };
    }

    return {
      title: 'LAPORAN REALISASI ANGGARAN BELANJA (APBD 2026)',
      subtitle: 'Sub Kegiatan: Peningkatan Kompetensi dan Kualifikasi SDM Kesehatan',
      landscape: true,
      htmlContent: generateBudgetSummaryHtml(
        liveBudgetItems,
        TOTAL_PAGU_ANGGARAN,
        overallTerserap,
        overallSisa
      )
    };
  }, [activeLiveSelectedItem, transactions, liveBudgetItems, overallTerserap, overallSisa]);

  return (
    <div className="min-h-screen bg-slate-100/80 flex text-slate-800 antialiased font-sans relative selection:bg-blue-600 selection:text-white">
      {/* Background Silhouette Watermark (Les Siluet Motif Batik Dayak & Lambang Pemprov Kaltara) */}
      <GrandBackgroundSilhouette />

      {/* Header Print Preview Modal */}
      <PrintPreviewModal
        isOpen={isHeaderPrintOpen}
        onClose={() => setIsHeaderPrintOpen(false)}
        title={headerPrintData.title}
        subtitle={headerPrintData.subtitle}
        htmlContent={headerPrintData.htmlContent}
        defaultLandscape={headerPrintData.landscape}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        currentMenu={currentMenu}
        onSelectMenu={(menu) => {
          setCurrentMenu(menu);
          setSelectedItem(null);
        }}
        selectedItemId={selectedItem?.id}
        onSelectItem={(item) => {
          setCurrentMenu('ringkasan');
          setSelectedItem(item);
        }}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
      />

      {/* Main Content Area (offset by 64 (16rem) on desktop) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <div className="p-4 sm:p-6 lg:p-7 w-full mx-auto space-y-5">
          {/* Dynamic Header */}
          <Header
            title={
              activeLiveSelectedItem
                ? activeLiveSelectedItem.uraianSpesifik
                : currentMenu === 'sertifikat'
                ? 'Sertifikat & Akreditasi'
                : currentMenu === 'bulanan'
                ? 'Laporan Anggaran Per-Bulan'
                : 'Ringkasan Belanja'
            }
            subtitle={
              activeLiveSelectedItem
                ? 'Rincian mutasi, kuitansi, dan realisasi belanja komponen'
                : currentMenu === 'sertifikat'
                ? 'Monitoring capaian kelulusan sertifikasi pelatihan & akreditasi'
                : currentMenu === 'bulanan'
                ? 'APBD 2026 - Rekapitulasi realisasi belanja per bulan'
                : 'Laporan serapan dana dan progres anggaran keseluruhan'
            }
            onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            onBackup={handleBackup}
            onRestore={handleRestore}
            onRestoreFromFile={handleRestoreFromFile}
            onPrint={() => setIsHeaderPrintOpen(true)}
          />

          {/* 3 Executive KPI Cards - shown on Ringkasan Belanja & Detail Mutasi */}
          {currentMenu === 'ringkasan' && (
            <KpiMetrics
              totalPagu={activeLiveSelectedItem ? activeLiveSelectedItem.jumlahTotal : TOTAL_PAGU_ANGGARAN}
              totalTerserap={activeLiveSelectedItem ? activeLiveSelectedItem.terserap : overallTerserap}
              totalSisa={activeLiveSelectedItem ? activeLiveSelectedItem.sisa : overallSisa}
            />
          )}

          {/* Main Dashboard Views */}
          {currentMenu === 'ringkasan' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {activeLiveSelectedItem ? (
                /* Detail Component View: Mutasi Jurnal */
                <MutasiJurnalView
                  item={activeLiveSelectedItem}
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onBackToRingkasan={() => setSelectedItem(null)}
                />
              ) : (
                /* Master Executive Table */
                <BudgetTable
                  items={liveBudgetItems}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(item) => setSelectedItem(item)}
                />
              )}
            </div>
          )}

          {currentMenu === 'sertifikat' && (
            <div className="animate-in fade-in duration-200">
              <SertifikatView />
            </div>
          )}

          {currentMenu === 'bulanan' && (
            <div className="animate-in fade-in duration-200">
              <MonthlyReportView
                items={liveBudgetItems}
                transactions={transactions}
              />
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={modalDetailItem}
        onClose={() => setModalDetailItem(null)}
      />
    </div>
  );
}
