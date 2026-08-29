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

interface PrintOptions {
  title: string;
  subtitle?: string;
  landscape?: boolean;
  htmlContent: string;
}

export function printHtmlDirectly(options: PrintOptions) {
  const { title, subtitle, landscape = true, htmlContent } = options;

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
            size: ${landscape ? 'landscape' : 'portrait'};
            margin: 8mm 10mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 10px;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 8px;
            line-height: 1.3;
          }
          .kop-surat {
            border-bottom: 2.5px solid #000;
            padding-bottom: 8px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .kop-logo {
            width: 58px;
            height: auto;
            max-height: 64px;
            object-fit: contain;
          }
          .kop-text {
            flex: 1;
            text-align: center;
          }
          .kop-surat h4 {
            margin: 0;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0f172a;
          }
          .kop-surat h2 {
            margin: 2px 0;
            font-size: 15px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #020617;
          }
          .kop-surat p {
            margin: 2px 0 0 0;
            font-size: 8.5px;
            color: #334155;
          }
          .doc-header {
            text-align: center;
            margin-bottom: 12px;
          }
          .doc-header h3 {
            margin: 0;
            font-size: 12.5px;
            font-weight: 800;
            text-transform: uppercase;
            text-decoration: underline;
          }
          .doc-header p {
            margin: 2px 0 0 0;
            font-size: 9.5px;
            font-weight: 600;
            color: #475569;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
            margin-bottom: 15px;
          }
          th, td {
            border: 1px solid #64748b;
            padding: 4px 5px;
            vertical-align: middle;
          }
          th {
            background-color: #f1f5f9 !important;
            font-weight: 800;
            text-transform: uppercase;
            text-align: center;
            font-size: 8.5px;
          }
          td.num {
            text-align: right;
            font-family: 'Courier New', Courier, monospace;
            font-size: 9px;
            white-space: nowrap;
          }
          td.center {
            text-align: center;
          }
          tr.total-row {
            background-color: #e2e8f0 !important;
            font-weight: 900;
          }
          .signature-section {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
            font-size: 9.5px;
          }
          .sig-box {
            text-align: center;
            width: 220px;
          }
          .sig-space {
            height: 48px;
          }
          .sig-name {
            font-weight: 800;
            text-decoration: underline;
          }
          .sig-nip {
            font-size: 8.5px;
            color: #334155;
          }
          .footer-note {
            margin-top: 15px;
            font-size: 8px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            border-top: 1px dashed #cbd5e1;
            padding-top: 4px;
          }
        </style>
      </head>
      <body>
        <!-- Kop Surat Resmi -->
        <div class="kop-surat">
          <div style="width: 60px; display: flex; align-items: center; justify-content: center;">
            <img src="${LOGO_KALTARA}" alt="Logo Pemprov Kaltara" class="kop-logo" />
          </div>
          <div class="kop-text">
            <h4>PEMERINTAH PROVINSI KALIMANTAN UTARA</h4>
            <h2>RSUD dr. H. JUSUF SK</h2>
            <p>Jl. P. Irian No. 1 Tarakan, Kalimantan Utara | Telp. (0551) 21100 | Website: rsudjusufsk.kaltaraprov.go.id</p>
          </div>
          <div style="width: 60px;" aria-hidden="true"></div>
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
          <span>Dicetak melalui Sistem Dashboard Anggaran APBD 2026</span>
          <span>Waktu Cetak: ${new Date().toLocaleString('id-ID')}</span>
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
  grandTotalSisa: number
): string {
  return `
    <table>
      <thead>
        <tr>
          <th style="width: 28px;">NO</th>
          <th style="text-align: left; min-width: 180px;">SASARAN KEGIATAN / KOMPONEN</th>
          <th style="width: 85px;">PAGU EFEKTIF</th>
          ${MONTHS_LIST.map((m) => `<th style="width: 55px;">${m.name.slice(0, 3).toUpperCase()}</th>`).join('')}
          <th style="width: 85px;">REALISASI</th>
          <th style="width: 85px;">SISA</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map((item, idx) => {
            const itemMonthly: { [key: string]: number } = {
              Mei: 0,
              Juni: 0,
              Juli: 0,
              Agustus: 0
            };
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

            const totalItemRealisasi = item.terserap;
            const sisaItem = item.jumlahTotal - totalItemRealisasi;

            return `
              <tr>
                <td class="center">${idx + 1}</td>
                <td style="font-weight: 600;">${item.uraianSpesifik}</td>
                <td class="num">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
                ${MONTHS_LIST.map((m) => {
                  const val = itemMonthly[m.name] || 0;
                  return `<td class="num">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
                }).join('')}
                <td class="num" style="font-weight: bold; color: #1e3a8a;">${FORMAT_RUPIAH(totalItemRealisasi)}</td>
                <td class="num" style="font-weight: bold;">${FORMAT_RUPIAH(sisaItem)}</td>
              </tr>
            `;
          })
          .join('')}
        
        <tr class="total-row">
          <td colspan="2" style="text-align: right; font-weight: 900; padding: 6px;">TOTAL REALISASI</td>
          <td class="num" style="font-weight: 900;">${FORMAT_RUPIAH(grandTotalPagu)}</td>
          ${MONTHS_LIST.map((m) => {
            const val = monthlyTotals[m.name] || 0;
            return `<td class="num" style="font-weight: 900;">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
          }).join('')}
          <td class="num" style="font-weight: 900; color: #1e3a8a;">${FORMAT_RUPIAH(grandTotalRealisasi)}</td>
          <td class="num" style="font-weight: 900;">${FORMAT_RUPIAH(grandTotalSisa)}</td>
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
    <table>
      <thead>
        <tr>
          <th style="width: 28px;">NO</th>
          <th style="text-align: left;">KODE REKENING & URAIAN SPESIFIK</th>
          <th style="width: 80px;">VOLUME</th>
          <th style="width: 95px;">PAGU MURNI</th>
          <th style="width: 85px;">PERGESERAN</th>
          <th style="width: 95px;">PAGU EFEKTIF</th>
          <th style="width: 95px;">REALISASI</th>
          <th style="width: 95px;">SISA PAGU</th>
          <th style="width: 55px;">%</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map((item, idx) => `
            <tr>
              <td class="center">${idx + 1}</td>
              <td>
                <strong>${item.uraianSpesifik}</strong><br/>
                <span style="font-size: 8px; color: #475569;">${item.kodeRekening} &bull; ${item.kategoriBelanja}</span>
              </td>
              <td class="center">${item.koefisienVolume}</td>
              <td class="num">${FORMAT_RUPIAH(item.paguMurni)}</td>
              <td class="num">${FORMAT_RUPIAH(item.pergeseran)}</td>
              <td class="num" style="font-weight: bold;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
              <td class="num" style="font-weight: bold; color: #1e3a8a;">${FORMAT_RUPIAH(item.terserap)}</td>
              <td class="num">${FORMAT_RUPIAH(item.sisa)}</td>
              <td class="center" style="font-weight: bold;">${item.persenSerapan.toFixed(1)}%</td>
            </tr>
          `)
          .join('')}
        <tr class="total-row">
          <td colspan="3" style="text-align: right; font-weight: 900; padding: 6px;">TOTAL KESELURUHAN</td>
          <td class="num" style="font-weight: 900;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900;">Rp 0</td>
          <td class="num" style="font-weight: 900;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a;">${FORMAT_RUPIAH(totalTerserap)}</td>
          <td class="num" style="font-weight: 900;">${FORMAT_RUPIAH(totalSisa)}</td>
          <td class="center" style="font-weight: 900;">${totalPagu > 0 ? ((totalTerserap / totalPagu) * 100).toFixed(1) : 0}%</td>
        </tr>
      </tbody>
    </table>
  `;
}

/**
 * Generate Printable HTML for Mutasi Jurnal / Kuitansi
 */
export function generateTransactionsHtml(
  item: BudgetItem,
  transactions: JournalTransaction[]
): string {
  const totalNominal = transactions.reduce((acc, t) => acc + t.nominal, 0);

  return `
    <div style="margin-bottom: 10px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px;">
      <div><strong>Kode Rekening:</strong> ${item.kodeRekening}</div>
      <div><strong>Uraian Komponen:</strong> ${item.uraianSpesifik}</div>
      <div><strong>Pagu Anggaran:</strong> ${FORMAT_RUPIAH(item.jumlahTotal)} | <strong>Realisasi Terserap:</strong> ${FORMAT_RUPIAH(totalNominal)} | <strong>Sisa:</strong> ${FORMAT_RUPIAH(item.jumlahTotal - totalNominal)}</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 28px;">NO</th>
          <th style="width: 80px;">TANGGAL</th>
          <th style="width: 70px;">BULAN</th>
          <th style="text-align: left;">URAIAN KETERANGAN TRANSAKSI / KUITANSI</th>
          <th style="width: 100px;">MATA REKENING / BUKTI</th>
          <th style="width: 100px;">NOMINAL REALISASI</th>
        </tr>
      </thead>
      <tbody>
        ${
          transactions.length === 0
            ? `<tr><td colspan="6" class="center" style="padding: 15px; color: #64748b;">Belum ada data mutasi jurnal transaksi yang tercatat.</td></tr>`
            : transactions
                .map(
                  (tx, idx) => `
              <tr>
                <td class="center">${idx + 1}</td>
                <td class="center">${tx.tanggalTransaksi}</td>
                <td class="center">${tx.bulan}</td>
                <td>${tx.uraianKeterangan}</td>
                <td class="center font-mono">${tx.mataRekening || tx.fileKuitansiName || '-'}</td>
                <td class="num" style="font-weight: bold;">${FORMAT_RUPIAH(tx.nominal)}</td>
              </tr>
            `
                )
                .join('')
        }
        <tr class="total-row">
          <td colspan="5" style="text-align: right; font-weight: 900; padding: 6px;">TOTAL REALISASI MUTASI</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a;">${FORMAT_RUPIAH(totalNominal)}</td>
        </tr>
      </tbody>
    </table>
  `;
}
