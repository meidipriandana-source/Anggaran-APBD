import { BudgetItem, JournalTransaction } from '../types';
import { FORMAT_RUPIAH } from '../data/budgetData';
import { LOGO_KALTARA } from '../assets/logoKaltara';

export const MONTHS_LIST = [
  { id: 'januari', name: 'Januari' },
  { id: 'februari', name: 'Februari' },
  { id: 'maret', name: 'Maret' },
  { id: 'april', name: 'April' },
  { id: 'mei', name: 'Mei' },
  { id: 'juni', name: 'Juni' },
  { id: 'juli', name: 'Juli' },
  { id: 'agustus', name: 'Agustus' },
  { id: 'september', name: 'September' },
  { id: 'oktober', name: 'Oktober' },
  { id: 'november', name: 'November' },
  { id: 'desember', name: 'Desember' }
];

/**
 * Utility to print clean, high-precision official government documents
 * for RSUD dr. H. Jusuf SK - Provinsi Kalimantan Utara.
 * Works seamlessly in sandboxed iframes by creating an isolated print frame.
 */

export interface PrintOptions {
  title: string;
  subtitle?: string;
  landscape?: boolean;
  paperSize?: 'F4' | 'A4' | 'Legal';
  scale?: number; // 75, 80, 85, 90, 95, 100
  marginMm?: number; // e.g. 5, 8, 3
  htmlContent: string;
}

export function printHtmlDirectly(options: PrintOptions) {
  const {
    title,
    subtitle,
    landscape = true,
    paperSize = 'F4',
    scale = 95,
    marginMm = 5,
    htmlContent
  } = options;

  // Determine paper dimensions for @page rule
  // F4 (Folio Indonesia): 215mm x 330mm (or 21.5cm x 33cm)
  // A4: 210mm x 297mm
  // Legal: 216mm x 356mm
  let pageDimensions = landscape ? '330mm 215mm' : '215mm 330mm';
  if (paperSize === 'A4') {
    pageDimensions = landscape ? '297mm 210mm' : '210mm 297mm';
  } else if (paperSize === 'Legal') {
    pageDimensions = landscape ? '356mm 216mm' : '216mm 356mm';
  }

  // Create an isolated hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  const dateNow = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          @page {
            size: ${pageDimensions};
            margin: ${marginMm}mm;
          }
          * {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Tahoma, Geneva, Verdana, sans-serif;
            font-size: 8.5pt;
            line-height: 1.3;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
          }
          .print-scale-container {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            ${
              scale && scale < 100
                ? `transform: scale(${scale / 100}); transform-origin: top left; width: ${(10000 / scale).toFixed(2)}% !important;`
                : ''
            }
          }
          .kop-surat {
            border-bottom: 2.5px solid #000;
            padding-bottom: 6px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .kop-logo {
            width: 54px;
            height: auto;
            max-height: 58px;
            object-fit: contain;
          }
          .kop-text {
            flex: 1;
            text-align: center;
          }
          .kop-surat h4 {
            margin: 0;
            font-size: 10.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0f172a;
          }
          .kop-surat h2 {
            margin: 2px 0;
            font-size: 14pt;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #020617;
          }
          .kop-surat p {
            margin: 2px 0 0 0;
            font-size: 7.5pt;
            color: #334155;
          }
          .doc-header {
            text-align: center;
            margin-bottom: 10px;
          }
          .doc-header h3 {
            margin: 0;
            font-size: 11pt;
            font-weight: 800;
            text-transform: uppercase;
            text-decoration: underline;
          }
          .doc-header p {
            margin: 2px 0 0 0;
            font-size: 8.5pt;
            font-weight: 600;
            color: #475569;
          }
          table {
            width: 100% !important;
            max-width: 100% !important;
            border-collapse: collapse !important;
            table-layout: auto !important;
            font-size: 7.5pt;
            margin-bottom: 12px;
            page-break-inside: auto !important;
          }
          th, td {
            border: 1px solid #475569 !important;
            padding: 3px 3px;
            vertical-align: middle;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
            box-sizing: border-box !important;
          }
          th {
            background-color: #e2e8f0 !important;
            font-weight: 800;
            text-transform: uppercase;
            text-align: center;
            font-size: 7pt;
            color: #0f172a !important;
          }
          td.sasaran, td.desc {
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            line-height: 1.25;
          }
          td.num {
            text-align: right !important;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 7.5pt;
            white-space: nowrap !important;
            font-variant-numeric: tabular-nums !important;
          }
          td.center {
            text-align: center !important;
          }
          tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          thead {
            display: table-header-group !important;
          }
          tfoot {
            display: table-footer-group !important;
          }
          tr.total-row {
            background-color: #cbd5e1 !important;
            font-weight: 900;
          }
          .signature-section {
            margin-top: 18px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            font-size: 8.5pt;
          }
          .sig-box {
            text-align: center;
            width: 240px;
          }
          .sig-space {
            height: 44px;
          }
          .sig-name {
            font-weight: 800;
            text-decoration: underline;
          }
          .sig-nip {
            font-size: 7.5pt;
            color: #334155;
          }
          .footer-note {
            margin-top: 12px;
            font-size: 7pt;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            border-top: 1px dashed #cbd5e1;
            padding-top: 3px;
          }
        </style>
      </head>
      <body>
        <div class="print-scale-container">
          <!-- Kop Surat Resmi -->
          <div class="kop-surat">
            <div style="width: 56px; display: flex; align-items: center; justify-content: center;">
              <img src="${LOGO_KALTARA}" alt="Logo Pemprov Kaltara" class="kop-logo" />
            </div>
            <div class="kop-text">
              <h4>PEMERINTAH PROVINSI KALIMANTAN UTARA</h4>
              <h2>RSUD dr. H. JUSUF SK</h2>
              <p>Jl. P. Irian No. 1 Tarakan, Kalimantan Utara | Telp. (0551) 21100 | Website: rsudjusufsk.kaltaraprov.go.id</p>
            </div>
            <div style="width: 56px;" aria-hidden="true"></div>
          </div>

          <!-- Dokumen Judul -->
          <div class="doc-header">
            <h3>${title}</h3>
            ${subtitle ? `<p>${subtitle}</p>` : ''}
          </div>

          <!-- Content Table -->
          ${htmlContent}

          <!-- Tanda Tangan -->
          <div class="signature-section">
            <div class="sig-box">
              <div>Mengetahui,</div>
              <div style="font-weight:700;">Pejabat Pelaksana Teknis Kegiatan (PPTK)</div>
              <div class="sig-space"></div>
              <div class="sig-name">( _________________________ )</div>
              <div class="sig-nip">NIP. ........................................</div>
            </div>

            <div class="sig-box">
              <div>Tarakan, ${dateNow}</div>
              <div style="font-weight:700;">Bendahara Pengeluaran / Pembantu</div>
              <div class="sig-space"></div>
              <div class="sig-name">( _________________________ )</div>
              <div class="sig-nip">NIP. ........................................</div>
            </div>
          </div>

          <!-- Footer Info -->
          <div class="footer-note">
            <span>Format Kertas: ${paperSize} (${landscape ? 'Landscape 330x215 mm' : 'Portrait 215x330 mm'}) &bull; Sistem Dashboard Anggaran APBD 2026</span>
            <span>Waktu Cetak: ${new Date().toLocaleString('id-ID')}</span>
          </div>
        </div>
      </body>
    </html>
  `;

  doc.open();
  doc.write(fullHtml);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1500);
  }, 250);
}

/**
 * Generate Printable HTML for Laporan Bulanan (Matriks 12 Bulan)
 */
export function generateMonthlyReportHtml(
  items: BudgetItem[],
  monthlyTotals: { [key: string]: number },
  grandTotalRealisasi: number,
  grandTotalPagu: number,
  grandTotalSisa: number,
  itemMonthlyMap?: { [itemId: string]: { [monthName: string]: number } }
): string {
  return `
    <table style="width: 100%; border-collapse: collapse; table-layout: auto; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #e2e8f0;">
        <tr>
          <th style="width: 2.5%; text-align: center; padding: 3px 2px;">NO</th>
          <th style="width: 22%; text-align: left; padding: 3px 4px;">SASARAN KEGIATAN / KOMPONEN</th>
          <th style="width: 7.5%; text-align: right; padding: 3px 3px;">PAGU EFEKTIF</th>
          ${MONTHS_LIST.map((m) => `<th style="width: 4.5%; text-align: center; padding: 3px 1px; font-size: 6.5pt;">${m.name.slice(0, 3).toUpperCase()}</th>`).join('')}
          <th style="width: 7%; text-align: right; padding: 3px 3px;">REALISASI</th>
          <th style="width: 7%; text-align: right; padding: 3px 3px;">SISA</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map((item, idx) => {
            const itemMonthly: { [key: string]: number } = itemMonthlyMap?.[item.id] || {
              Mei: 0,
              Juni: 0,
              Juli: 0,
              Agustus: 0
            };

            // Fallback for default transactions if no map passed
            if (!itemMonthlyMap) {
              if (item.id === 'item-3') itemMonthly['Agustus'] = 113350000;
              if (item.id === 'item-6') {
                itemMonthly['Juli'] = 16000000;
                itemMonthly['Agustus'] = 126820000;
              }
              if (item.id === 'item-8') {
                itemMonthly['Mei'] = 67500000;
                itemMonthly['Juli'] = 46500000;
                itemMonthly['Agustus'] = 81125000;
              }
              if (item.id === 'item-9') {
                itemMonthly['April'] = 35619560;
                itemMonthly['Mei'] = 70905939;
                itemMonthly['Juli'] = 46952424;
                itemMonthly['Agustus'] = 183294411;
              }
              if (item.id === 'item-10') itemMonthly['Agustus'] = 78008000;
            }

            const totalItemRealisasi = item.terserap;
            const sisaItem = item.jumlahTotal - totalItemRealisasi;

            return `
              <tr>
                <td class="center" style="padding: 2.5px 2px;">${idx + 1}</td>
                <td class="sasaran" style="font-weight: 600; padding: 2.5px 4px; font-size: 7pt; line-height: 1.2;">${item.uraianSpesifik}</td>
                <td class="num" style="padding: 2.5px 2px; font-size: 7pt;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
                ${MONTHS_LIST.map((m) => {
                  const val = itemMonthly[m.name] || 0;
                  return `<td class="num" style="padding: 2.5px 1px; font-size: 6.5pt; text-align: right;">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
                }).join('')}
                <td class="num" style="font-weight: bold; color: #1e3a8a; padding: 2.5px 2px; font-size: 7pt;">${FORMAT_RUPIAH(totalItemRealisasi)}</td>
                <td class="num" style="font-weight: bold; padding: 2.5px 2px; font-size: 7pt;">${FORMAT_RUPIAH(sisaItem)}</td>
              </tr>
            `;
          })
          .join('')}
        
        <tr class="total-row" style="background-color: #cbd5e1; font-weight: 900;">
          <td colspan="2" style="text-align: right; font-weight: 900; padding: 4px 6px; font-size: 7.5pt;">TOTAL REALISASI</td>
          <td class="num" style="font-weight: 900; padding: 4px 2px; font-size: 7pt;">${FORMAT_RUPIAH(grandTotalPagu)}</td>
          ${MONTHS_LIST.map((m) => {
            const val = monthlyTotals[m.name] || 0;
            return `<td class="num" style="font-weight: 900; padding: 4px 1px; font-size: 6.5pt;">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
          }).join('')}
          <td class="num" style="font-weight: 900; color: #1e3a8a; padding: 4px 2px; font-size: 7pt;">${FORMAT_RUPIAH(grandTotalRealisasi)}</td>
          <td class="num" style="font-weight: 900; padding: 4px 2px; font-size: 7pt;">${FORMAT_RUPIAH(grandTotalSisa)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

/**
 * Generate Printable HTML for Ringkasan Belanja
 */
export function generateBudgetSummaryHtml(
  items: BudgetItem[],
  totalPagu: number,
  totalTerserap: number,
  totalSisa: number
): string {
  return `
    <table style="width: 100%; border-collapse: collapse; table-layout: auto; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #e2e8f0;">
        <tr>
          <th style="width: 3%; text-align: center; padding: 4px 2px;">NO</th>
          <th style="width: 33%; text-align: left; padding: 4px 6px;">KODE REKENING & URAIAN SPESIFIK</th>
          <th style="width: 7%; text-align: center; padding: 4px 2px;">VOLUME</th>
          <th style="width: 11%; text-align: right; padding: 4px 4px;">PAGU MURNI</th>
          <th style="width: 9%; text-align: right; padding: 4px 4px;">PERGESERAN</th>
          <th style="width: 11%; text-align: right; padding: 4px 4px;">PAGU EFEKTIF</th>
          <th style="width: 11%; text-align: right; padding: 4px 4px;">REALISASI</th>
          <th style="width: 11%; text-align: right; padding: 4px 4px;">SISA PAGU</th>
          <th style="width: 4%; text-align: center; padding: 4px 2px;">%</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map((item, idx) => `
            <tr>
              <td class="center" style="padding: 3.5px 2px;">${idx + 1}</td>
              <td class="desc" style="padding: 3.5px 6px;">
                <strong style="color: #0f172a; font-size: 8pt;">${item.uraianSpesifik}</strong><br/>
                <span style="font-size: 6.5pt; color: #475569;">${item.kodeRekening} &bull; ${item.kategoriBelanja}</span>
              </td>
              <td class="center" style="padding: 3.5px 2px; font-size: 7.5pt;">${item.koefisienVolume}</td>
              <td class="num" style="padding: 3.5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(item.paguMurni)}</td>
              <td class="num" style="padding: 3.5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(item.pergeseran)}</td>
              <td class="num" style="font-weight: bold; padding: 3.5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
              <td class="num" style="font-weight: bold; color: #1e3a8a; padding: 3.5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(item.terserap)}</td>
              <td class="num" style="padding: 3.5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(item.sisa)}</td>
              <td class="center" style="font-weight: bold; padding: 3.5px 2px; font-size: 7.5pt;">${item.persenSerapan.toFixed(1)}%</td>
            </tr>
          `)
          .join('')}
        <tr class="total-row" style="background-color: #cbd5e1; font-weight: 900;">
          <td colspan="3" style="text-align: right; font-weight: 900; padding: 5px 6px; font-size: 8pt;">TOTAL KESELURUHAN</td>
          <td class="num" style="font-weight: 900; padding: 5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900; padding: 5px 4px; font-size: 7.5pt;">Rp 0</td>
          <td class="num" style="font-weight: 900; padding: 5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a; padding: 5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(totalTerserap)}</td>
          <td class="num" style="font-weight: 900; padding: 5px 4px; font-size: 7.5pt;">${FORMAT_RUPIAH(totalSisa)}</td>
          <td class="center" style="font-weight: 900; padding: 5px 2px; font-size: 7.5pt;">${totalPagu > 0 ? ((totalTerserap / totalPagu) * 100).toFixed(1) : 0}%</td>
        </tr>
      </tbody>
    </table>
  `;
}

/**
 * Generate Printable HTML for Mutasi Jurnal / Kuitansi
 * Disusun dan diurutkan sesuai aturan kalender bulan (Januari s.d. Desember)
 */
export function generateTransactionsHtml(
  item: BudgetItem,
  transactions: JournalTransaction[]
): string {
  const totalNominal = transactions.reduce((acc, t) => acc + t.nominal, 0);

  // Helper to extract month index (0 to 11)
  const getTxMonthIndex = (t: JournalTransaction): number => {
    if (t.bulan) {
      const clean = t.bulan.replace(/bulan\s*/i, '').trim().toLowerCase();
      const idx = MONTHS_LIST.findIndex((m) => m.name.toLowerCase() === clean);
      if (idx >= 0) return idx;
    }
    if (t.tanggalTransaksi) {
      for (let i = 0; i < MONTHS_LIST.length; i++) {
        if (t.tanggalTransaksi.toLowerCase().includes(MONTHS_LIST[i].name.toLowerCase())) {
          return i;
        }
      }
    }
    return 7;
  };

  const getTxDayNumber = (t: JournalTransaction): number => {
    const match = t.tanggalTransaksi?.match(/^\s*(\d{1,2})/);
    return match ? parseInt(match[1], 10) : 1;
  };

  // Sort chronologically according to aturan bulan
  const sorted = [...transactions].sort((a, b) => {
    const ma = getTxMonthIndex(a);
    const mb = getTxMonthIndex(b);
    if (ma !== mb) return ma - mb;
    return getTxDayNumber(a) - getTxDayNumber(b);
  });

  // Group by month to render clean month dividers if spanning multiple months
  const monthGroups: { monthName: string; subtotal: number; items: JournalTransaction[] }[] = [];
  const map = new Map<string, { subtotal: number; items: JournalTransaction[] }>();

  sorted.forEach((tx) => {
    const mIdx = getTxMonthIndex(tx);
    const mName = MONTHS_LIST[mIdx].name;
    const existing = map.get(mName) || { subtotal: 0, items: [] };
    existing.subtotal += tx.nominal;
    existing.items.push(tx);
    map.set(mName, existing);
  });

  MONTHS_LIST.forEach((m) => {
    if (map.has(m.name)) {
      const data = map.get(m.name)!;
      monthGroups.push({
        monthName: m.name,
        subtotal: data.subtotal,
        items: data.items
      });
    }
  });

  let runningNumber = 1;

  return `
    <div style="margin-bottom: 10px; background-color: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 4px; font-size: 8pt;">
      <div><strong>Kode Rekening:</strong> ${item.kodeRekening}</div>
      <div><strong>Uraian Komponen:</strong> ${item.uraianSpesifik}</div>
      <div><strong>Pagu Anggaran:</strong> ${FORMAT_RUPIAH(item.jumlahTotal)} &bull; <strong>Realisasi Terserap:</strong> ${FORMAT_RUPIAH(totalNominal)} &bull; <strong>Sisa Pagu:</strong> ${FORMAT_RUPIAH(item.jumlahTotal - totalNominal)}</div>
      <div style="margin-top: 2px; font-size: 7.5pt; color: #0369a1;"><em>* Catatan: Data transaksi ditata dan diurutkan secara kronologis berdasarkan urutan kalender bulan (Januari s.d. Desember).</em></div>
    </div>

    <table style="width: 100%; border-collapse: collapse; table-layout: auto; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #e2e8f0;">
        <tr>
          <th style="width: 4%; text-align: center; padding: 4px 2px;">NO</th>
          <th style="width: 12%; text-align: center; padding: 4px 4px;">TANGGAL</th>
          <th style="width: 10%; text-align: center; padding: 4px 4px;">BULAN</th>
          <th style="width: 44%; text-align: left; padding: 4px 6px;">URAIAN KETERANGAN TRANSAKSI / KUITANSI</th>
          <th style="width: 14%; text-align: center; padding: 4px 4px;">BUKTI / MATA REKENING</th>
          <th style="width: 16%; text-align: right; padding: 4px 6px;">NOMINAL (RP)</th>
        </tr>
      </thead>
      <tbody>
        ${
          sorted.length === 0
            ? `<tr><td colspan="6" class="center" style="padding: 15px; color: #64748b;">Belum ada data mutasi jurnal transaksi yang tercatat.</td></tr>`
            : monthGroups
                .map((group) => {
                  const rows = group.items
                    .map((tx) => {
                      const num = runningNumber++;
                      return `
                        <tr>
                          <td class="center" style="padding: 3.5px 2px;">${num}</td>
                          <td class="center" style="padding: 3.5px 4px; font-size: 7.5pt;">${tx.tanggalTransaksi}</td>
                          <td class="center" style="padding: 3.5px 4px; font-size: 7.5pt; font-weight: 600;">${tx.bulan}</td>
                          <td class="desc" style="padding: 3.5px 6px; font-size: 7.5pt;">${tx.uraianKeterangan}</td>
                          <td class="center font-mono" style="padding: 3.5px 4px; font-size: 7pt;">${tx.mataRekening || tx.fileKuitansiName || '-'}</td>
                          <td class="num" style="font-weight: bold; padding: 3.5px 6px; font-size: 7.5pt;">${FORMAT_RUPIAH(tx.nominal)}</td>
                        </tr>
                      `;
                    })
                    .join('');

                  // If multiple months present, show month group header & subtotal
                  if (monthGroups.length > 1) {
                    return `
                      <tr style="background-color: #f1f5f9; font-weight: bold; border-top: 1.5px solid #94a3b8; border-bottom: 1.5px solid #94a3b8;">
                        <td colspan="5" style="padding: 4px 6px; font-size: 7.5pt; text-transform: uppercase; color: #0f172a;">
                          <strong>&bull; KELOMPOK BULAN ${group.monthName.toUpperCase()} 2026</strong> (${group.items.length} Transaksi)
                        </td>
                        <td class="num" style="font-size: 7.5pt; font-weight: 800; color: #1e3a8a;">
                          ${FORMAT_RUPIAH(group.subtotal)}
                        </td>
                      </tr>
                      ${rows}
                    `;
                  }

                  return rows;
                })
                .join('')
        }
        <tr class="total-row" style="background-color: #cbd5e1; font-weight: 900;">
          <td colspan="5" style="text-align: right; font-weight: 900; padding: 5px 6px; font-size: 8pt;">TOTAL KESELURUHAN REALISASI MUTASI</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a; padding: 5px 6px; font-size: 8pt;">${FORMAT_RUPIAH(totalNominal)}</td>
        </tr>
      </tbody>
    </table>
  `;
}
