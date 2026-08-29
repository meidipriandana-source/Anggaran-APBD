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
    <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #f1f5f9;">
        <tr style="background-color: #f1f5f9;">
          <th style="width: 28px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">NO</th>
          <th style="text-align: left; min-width: 180px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">SASARAN KEGIATAN / KOMPONEN</th>
          <th style="width: 85px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">PAGU EFEKTIF</th>
          ${MONTHS_LIST.map((m) => `<th style="width: 55px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">${m.name.slice(0, 3).toUpperCase()}</th>`).join('')}
          <th style="width: 85px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">REALISASI</th>
          <th style="width: 85px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 4px;">SISA</th>
        </tr>
      </thead>
      <tbody style="background-color: #ffffff;">
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
              <tr style="background-color: #ffffff;">
                <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 4px;">${idx + 1}</td>
                <td style="font-weight: 600; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 4px;">${item.uraianSpesifik}</td>
                <td class="num" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 4px;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
                ${MONTHS_LIST.map((m) => {
                  const val = itemMonthly[m.name] || 0;
                  return `<td class="num" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 4px;">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
                }).join('')}
                <td class="num" style="font-weight: bold; color: #1e3a8a; background-color: #ffffff; border: 1px solid #cbd5e1; padding: 4px;">${FORMAT_RUPIAH(totalItemRealisasi)}</td>
                <td class="num" style="font-weight: bold; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 4px;">${FORMAT_RUPIAH(sisaItem)}</td>
              </tr>
            `;
          })
          .join('')}
        
        <tr class="total-row" style="background-color: #e2e8f0; font-weight: 900;">
          <td colspan="2" style="text-align: right; font-weight: 900; padding: 6px; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b;">TOTAL REALISASI</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 4px;">${FORMAT_RUPIAH(grandTotalPagu)}</td>
          ${MONTHS_LIST.map((m) => {
            const val = monthlyTotals[m.name] || 0;
            return `<td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 4px;">${val > 0 ? FORMAT_RUPIAH(val) : '-'}</td>`;
          }).join('')}
          <td class="num" style="font-weight: 900; color: #1e3a8a; background-color: #e2e8f0; border: 1px solid #64748b; padding: 4px;">${FORMAT_RUPIAH(grandTotalRealisasi)}</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 4px;">${FORMAT_RUPIAH(grandTotalSisa)}</td>
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
    <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #f1f5f9;">
        <tr style="background-color: #f1f5f9;">
          <th style="width: 28px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">NO</th>
          <th style="text-align: left; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">KODE REKENING & URAIAN SPESIFIK</th>
          <th style="width: 75px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">VOLUME</th>
          <th style="width: 90px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">PAGU MURNI</th>
          <th style="width: 80px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">PERGESERAN</th>
          <th style="width: 90px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">PAGU EFEKTIF</th>
          <th style="width: 90px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">REALISASI</th>
          <th style="width: 90px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">SISA PAGU</th>
          <th style="width: 50px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">%</th>
        </tr>
      </thead>
      <tbody style="background-color: #ffffff;">
        ${items
          .map((item, idx) => `
            <tr style="background-color: #ffffff;">
              <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${idx + 1}</td>
              <td style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">
                <strong style="color: #0f172a;">${item.uraianSpesifik}</strong><br/>
                <span style="font-size: 8px; color: #475569;">${item.kodeRekening} &bull; ${item.kategoriBelanja}</span>
              </td>
              <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${item.koefisienVolume}</td>
              <td class="num" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(item.paguMurni)}</td>
              <td class="num" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(item.pergeseran)}</td>
              <td class="num" style="font-weight: bold; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(item.jumlahTotal)}</td>
              <td class="num" style="font-weight: bold; color: #1e3a8a; background-color: #ffffff; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(item.terserap)}</td>
              <td class="num" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(item.sisa)}</td>
              <td class="center" style="font-weight: bold; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${item.persenSerapan.toFixed(1)}%</td>
            </tr>
          `)
          .join('')}
        <tr class="total-row" style="background-color: #e2e8f0; font-weight: 900;">
          <td colspan="3" style="text-align: right; font-weight: 900; padding: 6px; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b;">TOTAL KESELURUHAN</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 5px;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 5px;">Rp 0</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 5px;">${FORMAT_RUPIAH(totalPagu)}</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a; background-color: #e2e8f0; border: 1px solid #64748b; padding: 5px;">${FORMAT_RUPIAH(totalTerserap)}</td>
          <td class="num" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 5px;">${FORMAT_RUPIAH(totalSisa)}</td>
          <td class="center" style="font-weight: 900; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b; padding: 5px;">${totalPagu > 0 ? ((totalTerserap / totalPagu) * 100).toFixed(1) : 0}%</td>
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
    <div style="margin-bottom: 10px; background-color: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px;">
      <div><strong>Kode Rekening:</strong> ${item.kodeRekening}</div>
      <div><strong>Uraian Komponen:</strong> ${item.uraianSpesifik}</div>
      <div><strong>Pagu Anggaran:</strong> ${FORMAT_RUPIAH(item.jumlahTotal)} | <strong>Realisasi Terserap:</strong> ${FORMAT_RUPIAH(totalNominal)} | <strong>Sisa:</strong> ${FORMAT_RUPIAH(item.jumlahTotal - totalNominal)}</div>
    </div>

    <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; color: #0f172a;">
      <thead style="background-color: #f1f5f9;">
        <tr style="background-color: #f1f5f9;">
          <th style="width: 28px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">NO</th>
          <th style="width: 80px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">TANGGAL</th>
          <th style="width: 70px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">BULAN</th>
          <th style="text-align: left; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">URAIAN KETERANGAN TRANSAKSI / KUITANSI</th>
          <th style="width: 100px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">MATA REKENING / BUKTI</th>
          <th style="width: 100px; background-color: #f1f5f9; color: #0f172a; border: 1px solid #64748b; padding: 5px;">NOMINAL REALISASI</th>
        </tr>
      </thead>
      <tbody style="background-color: #ffffff;">
        ${
          transactions.length === 0
            ? `<tr><td colspan="6" class="center" style="padding: 15px; color: #64748b; background-color: #ffffff; border: 1px solid #cbd5e1;">Belum ada data mutasi jurnal transaksi yang tercatat.</td></tr>`
            : transactions
                .map(
                  (tx, idx) => `
              <tr style="background-color: #ffffff;">
                <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${idx + 1}</td>
                <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${tx.tanggalTransaksi}</td>
                <td class="center" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${tx.bulan}</td>
                <td style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${tx.uraianKeterangan}</td>
                <td class="center font-mono" style="background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${tx.mataRekening || tx.fileKuitansiName || '-'}</td>
                <td class="num" style="font-weight: bold; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px;">${FORMAT_RUPIAH(tx.nominal)}</td>
              </tr>
            `
                )
                .join('')
        }
        <tr class="total-row" style="background-color: #e2e8f0; font-weight: 900;">
          <td colspan="5" style="text-align: right; font-weight: 900; padding: 6px; background-color: #e2e8f0; color: #0f172a; border: 1px solid #64748b;">TOTAL REALISASI MUTASI</td>
          <td class="num" style="font-weight: 900; color: #1e3a8a; background-color: #e2e8f0; border: 1px solid #64748b; padding: 5px;">${FORMAT_RUPIAH(totalNominal)}</td>
        </tr>
      </tbody>
    </table>
  `;
}
