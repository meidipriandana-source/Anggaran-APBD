import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, RefreshCw } from 'lucide-react';
import { LOGO_KALTARA } from '../assets/logoKaltara';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;
  public setState: any;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex items-center gap-4">
              <img
                src={LOGO_KALTARA}
                alt="Logo Kaltara"
                className="w-12 h-12 object-contain filter drop-shadow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  RSUD dr. H. Jusuf SK
                </h2>
                <p className="text-xs text-slate-300">
                  Dashboard Analisis Anggaran APBD TA 2026
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Terjadi Kendala Tampilan Sistem
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Sistem mendeteksi kendala pada cache peramban atau data sementara. Anda dapat memuat ulang halaman atau membersihkan cache data untuk memulihkan tampilan dashboard.
                  </p>
                </div>
              </div>

              {this.state.error && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left overflow-x-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Detail Pesan Sistem:
                  </span>
                  <p className="text-xs font-mono text-red-600 font-semibold break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Muat Ulang Halaman</span>
                </button>
                <button
                  type="button"
                  onClick={this.handleResetCache}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Bersihkan Cache & Pulihkan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
