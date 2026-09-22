import React, { useState, useMemo } from 'react';
import { BudgetItem, SidebarMenu, JournalTransaction, PergeseranRecord } from './types';
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
import { PergeseranModal } from './components/PergeseranModal';
import {
  generateBudgetSummaryHtml,
  generateTransactionsHtml,
  generateMonthlyReportHtml
} from './utils/printHelper';
import { safeStorage } from './utils/safeStorage';

export default function App() {
  const [currentMenu, setCurrentMenu] = useState<SidebarMenu>('ringkasan');
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [modalDetailItem, setModalDetailItem] = useState<BudgetItem | null>(null);
  const [isHeaderPrintOpen, setIsHeaderPrintOpen] = useState(false);

  // Pergeseran / Perubahan Anggaran Map (keyed by BudgetItem id)
  const [pergeseranMap, setPergeseranMap] = useState<Record<string, PergeseranRecord>>(() => {
    try {
      const saved = safeStorage.getItem('budget_pergeseran_map_2026_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading pergeseran map:', e);
    }
    return {};
  });

  const updatePergeseranMap = (newMap: Record<string, PergeseranRecord>) => {
    setPergeseranMap(newMap);
    safeStorage.setItem('budget_pergeseran_map_2026_v1', JSON.stringify(newMap));
  };

  const handleSavePergeseran = (record: PergeseranRecord) => {
    const updated = {
      ...pergeseranMap,
      [record.itemId]: record
    };
    updatePergeseranMap(updated);
  };

  const handleResetPergeseran = (itemId: string) => {
    const updated = { ...pergeseranMap };
    delete updated[itemId];
    updatePergeseranMap(updated);
  };

  // Modal Pergeseran control
  const [isPergeseranModalOpen, setIsPergeseranModalOpen] = useState(false);
  const [pergeseranTargetItemId, setPergeseranTargetItemId] = useState<string | undefined>(undefined);

  const handleOpenPergeseranModal = (itemId?: string) => {
    setPergeseranTargetItemId(itemId);
    setIsPergeseranModalOpen(true);
  };

  // Journal Transactions state (can be added, edited, deleted)
  const [transactions, setTransactions] = useState<JournalTransaction[]>(() => {
    try {
      const saved = safeStorage.getItem('budget_journal_transactions_2026_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading journal transactions:', e);
    }
    return DEFAULT_JOURNAL_DATA;
  });

  // Keep localStorage in sync
  const updateTransactions = (newTransactions: JournalTransaction[]) => {
    setTransactions(newTransactions);
    safeStorage.setItem('budget_journal_transactions_2026_v4', JSON.stringify(newTransactions));
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

  // Compute live budget data items with updated pergeseran (penambahan/pengurangan) and realisasi terserap
  const liveBudgetItems = useMemo(() => {
    const rawItems = BUDGET_DATA.map((item) => {
      const shiftRecord = pergeseranMap[item.id];
      const shiftValue = shiftRecord !== undefined ? shiftRecord.pergeseran : (item.pergeseran || 0);
      const liveJumlahTotal = Math.max(0, item.paguMurni + shiftValue);

      const itemTx = transactions.filter((t) => t.itemId === item.id);
      const liveTerserap = itemTx.reduce((sum, t) => sum + t.nominal, 0);
      const liveSisa = liveJumlahTotal - liveTerserap;
      const livePersen = liveJumlahTotal > 0 ? (liveTerserap / liveJumlahTotal) * 100 : 0;

      return {
        ...item,
        pergeseran: shiftValue,
        jumlahTotal: liveJumlahTotal,
        terserap: liveTerserap,
        sisa: liveSisa,
        persenSerapan: livePersen,
        dasarHukumPergeseran: shiftRecord?.dasarHukum || item.dasarHukumPergeseran,
        keteranganPergeseran: shiftRecord?.keterangan || item.keteranganPergeseran,
        tanggalPergeseran: shiftRecord?.tanggalPerubahan || item.tanggalPergeseran
      };
    });

    const totalPaguNow = rawItems.reduce((sum, i) => sum + i.jumlahTotal, 0);

    return rawItems.map((item) => ({
      ...item,
      persentaseTotal: totalPaguNow > 0 ? (item.jumlahTotal / totalPaguNow) * 100 : 0
    }));
  }, [transactions, pergeseranMap]);

  // Overall totals
  const overallPagu = useMemo(() => {
    return liveBudgetItems.reduce((sum, i) => sum + i.jumlahTotal, 0);
  }, [liveBudgetItems]);

  const overallTerserap = useMemo(() => {
    return liveBudgetItems.reduce((sum, i) => sum + i.terserap, 0);
  }, [liveBudgetItems]);

  const overallSisa = overallPagu - overallTerserap;

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
        pergeseranMap,
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
    updatePergeseranMap({});
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
        }

        if (parsed.pergeseranMap && typeof parsed.pergeseranMap === 'object') {
          updatePergeseranMap(parsed.pergeseranMap);
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
      const itemTx = transactions.filter((t) => t.itemId === activeLiveSelectedItem.id);
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
        overallPagu,
        overallTerserap,
        overallSisa
      )
    };
  }, [activeLiveSelectedItem, transactions, liveBudgetItems, overallPagu, overallTerserap, overallSisa]);

  return (
    <div className="min-h-screen bg-slate-100/80 flex text-slate-800 antialiased font-sans relative selection:bg-blue-600 selection:text-white">
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
              totalPagu={activeLiveSelectedItem ? activeLiveSelectedItem.jumlahTotal : overallPagu}
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
                  onOpenPergeseran={handleOpenPergeseranModal}
                />
              ) : (
                /* Master Executive Table */
                <BudgetTable
                  items={liveBudgetItems}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(item) => setSelectedItem(item)}
                  onOpenPergeseran={handleOpenPergeseranModal}
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
      {modalDetailItem && (
        <ItemDetailModal
          item={modalDetailItem}
          onClose={() => setModalDetailItem(null)}
          onOpenPergeseran={handleOpenPergeseranModal}
        />
      )}

      {/* Modal Kelola Pergeseran / Perubahan Anggaran */}
      {isPergeseranModalOpen && (
        <PergeseranModal
          isOpen={isPergeseranModalOpen}
          onClose={() => {
            setIsPergeseranModalOpen(false);
            setPergeseranTargetItemId(undefined);
          }}
          items={liveBudgetItems}
          initialItemId={pergeseranTargetItemId}
          onSavePergeseran={handleSavePergeseran}
          onResetPergeseran={handleResetPergeseran}
        />
      )}
    </div>
  );
}
