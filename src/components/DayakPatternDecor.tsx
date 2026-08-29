import React from 'react';
import { LOGO_KALTARA } from '../assets/logoKaltara';

/**
 * Motif Ukiran Batik Dayak Kembar Emas Kaltara (Sesuai Gambar Pengguna)
 */
export const DayakArtTwinMotif: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = '#d97706' }) => {
  return (
    <svg
      viewBox="0 0 400 320"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      style={{ color }}
    >
      {/* Left Wing */}
      <g>
        {/* Top Blossom Ring */}
        <circle cx="120" cy="65" r="14" fill="none" stroke="currentColor" strokeWidth="10" />
        <circle cx="120" cy="65" r="5" fill="currentColor" />

        {/* Top Outer Loop */}
        <path
          d="M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Top Inner Loop */}
        <path
          d="M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Main S-Stem */}
        <path
          d="M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
        />

        {/* Mid Outer Tendril */}
        <path
          d="M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Mid Inner Tendril */}
        <path
          d="M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Lower Outer Hook */}
        <path
          d="M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>

      {/* Right Wing (Mirrored) */}
      <g transform="translate(400, 0) scale(-1, 1)">
        {/* Top Blossom Ring */}
        <circle cx="120" cy="65" r="14" fill="none" stroke="currentColor" strokeWidth="10" />
        <circle cx="120" cy="65" r="5" fill="currentColor" />

        {/* Top Outer Loop */}
        <path
          d="M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Top Inner Loop */}
        <path
          d="M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Main S-Stem */}
        <path
          d="M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
        />

        {/* Mid Outer Tendril */}
        <path
          d="M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Mid Inner Tendril */}
        <path
          d="M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Lower Outer Hook */}
        <path
          d="M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

/**
 * Single Wing Tendril Silhouette
 */
export const DayakArtWing: React.FC<{
  className?: string;
  color?: string;
  flip?: boolean;
}> = ({ className = '', color = '#d97706', flip = false }) => {
  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''} ${className}`}
      style={{ color }}
    >
      <g>
        <circle cx="120" cy="65" r="14" fill="none" stroke="currentColor" strokeWidth="10" />
        <circle cx="120" cy="65" r="5" fill="currentColor" />
        <path
          d="M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

/**
 * Ornamen List Banner Ukiran Dayak Kaltara dengan Efek Gradasi Blur & Menghilang Lembut (Soft Feathered Vanishing Trim)
 */
export const DayakRibbonTrim: React.FC<{
  className?: string;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'slate' | 'gold';
  blur?: boolean;
}> = ({ className = '', colorScheme = 'gold', blur = true }) => {
  const getColors = () => {
    switch (colorScheme) {
      case 'emerald':
        return { 
          stroke: '#059669', 
          dot: '#d97706', 
          glow: 'from-transparent via-emerald-500/30 to-transparent' 
        };
      case 'amber':
        return { 
          stroke: '#d97706', 
          dot: '#dc2626', 
          glow: 'from-transparent via-amber-500/30 to-transparent' 
        };
      case 'blue':
        return { 
          stroke: '#2563eb', 
          dot: '#d97706', 
          glow: 'from-transparent via-blue-500/35 to-transparent' 
        };
      case 'slate':
        return { 
          stroke: '#64748b', 
          dot: '#0284c7', 
          glow: 'from-transparent via-slate-400/30 to-transparent' 
        };
      case 'gold':
      default:
        return { 
          stroke: '#d97706', 
          dot: '#b45309', 
          glow: 'from-transparent via-amber-500/35 to-transparent' 
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className={`w-full overflow-hidden flex flex-col items-stretch relative pointer-events-none select-none ${className}`} 
      aria-hidden="true"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 82%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 82%, transparent 100%)',
      }}
    >
      {/* Garis Cahaya Atas Menghilang Halus */}
      <div className={`h-[1.5px] w-full bg-gradient-to-r ${colors.glow} opacity-80`} />
      
      {/* Pola Ukir Gelombang Dayak dengan Efek Blur Halus & Transparansi Natural */}
      <div
        className={`h-3 w-full bg-repeat-x bg-center opacity-65 transition-all ${blur ? 'blur-[0.35px]' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='12' viewBox='0 0 120 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q15 0 30 6 T60 6 T90 6 T120 6' fill='none' stroke='${encodeURIComponent(colors.stroke)}' stroke-width='1.3' stroke-linecap='round' stroke-dasharray='1 0'/%3E%3Cpath d='M0 6 Q15 12 30 6 T60 6 T90 6 T120 6' fill='none' stroke='${encodeURIComponent(colors.stroke)}' stroke-width='1.3' stroke-linecap='round' stroke-dasharray='1 0'/%3E%3Ccircle cx='15' cy='6' r='1.8' fill='${encodeURIComponent(colors.dot)}'/%3E%3Ccircle cx='45' cy='6' r='1.8' fill='${encodeURIComponent(colors.dot)}'/%3E%3Ccircle cx='75' cy='6' r='1.8' fill='${encodeURIComponent(colors.dot)}'/%3E%3Ccircle cx='105' cy='6' r='1.8' fill='${encodeURIComponent(colors.dot)}'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 12px'
        }}
      />
      
      {/* Garis Cahaya Bawah Menghilang Halus */}
      <div className={`h-[1px] w-full bg-gradient-to-r ${colors.glow} opacity-60`} />
    </div>
  );
};

/**
 * Watermark Seni Ukir & Batik Dayak Menempel Keseluruhan Tabel
 */
export const DayakTableWatermark: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = '', opacity = 0.05 }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Siluet Motif Kembar Dayak Berulang di Latar Tabel */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='160' viewBox='0 0 400 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23b45309' stroke-width='10' stroke-linecap='round'%3E%3Ccircle cx='120' cy='65' r='14' fill='none' stroke='%23b45309' stroke-width='8'/%3E%3Cpath d='M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68'/%3E%3Cpath d='M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68'/%3E%3Cpath d='M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192' stroke-width='12'/%3E%3Cpath d='M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192'/%3E%3Cpath d='M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220'/%3E%3Cpath d='M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258'/%3E%3C/g%3E%3Cg transform='translate(400, 0) scale(-1, 1)' fill='none' stroke='%23b45309' stroke-width='10' stroke-linecap='round'%3E%3Ccircle cx='120' cy='65' r='14' fill='none' stroke='%23b45309' stroke-width='8'/%3E%3Cpath d='M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68'/%3E%3Cpath d='M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68'/%3E%3Cpath d='M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192' stroke-width='12'/%3E%3Cpath d='M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192'/%3E%3Cpath d='M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 160px'
        }}
      />
    </div>
  );
};

/**
 * Ornamen Sudut Les Siluet Ukiran Dayak Sesuai Gambar
 */
export const DayakCornerSilhouette: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
  color?: string;
}> = ({ position, className = '', size = 110, color = '#d97706' }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-right':
        return 'top-0 right-0 scale-x-[-1]';
      case 'bottom-left':
        return 'bottom-0 left-0 scale-y-[-1]';
      case 'bottom-right':
        return 'bottom-0 right-0 scale-[-1]';
      case 'top-left':
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 opacity-25 ${getTransforms()} ${className}`}
      style={{ width: size, height: (size * 320) / 200, color }}
      aria-hidden="true"
    >
      <DayakArtWing color={color} />
    </div>
  );
};

/**
 * Grand Background Silhouette with High-Art Dayak Motifs & Emblem
 */
export const GrandBackgroundSilhouette: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Left Side Decorative Dayak Pillar Silhouette (Emas Oker) */}
      <div className="absolute -left-12 top-1/4 w-[280px] sm:w-[380px] h-[450px] opacity-[0.06] text-amber-600 transition-opacity">
        <DayakArtTwinMotif color="#d97706" />
      </div>

      {/* 2. Right Side Grand Dayak Silhouette Motif (Emas Oker) */}
      <div className="absolute -right-16 top-1/3 w-[320px] sm:w-[460px] h-[550px] opacity-[0.07] text-amber-500 transition-opacity">
        <DayakArtTwinMotif color="#b45309" />
      </div>

      {/* 3. Grand Center-Right Emblem Silhouette */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[480px] h-[600px] md:w-[680px] md:h-[800px] opacity-[0.038] grayscale contrast-125">
        <img
          src={LOGO_KALTARA}
          alt=""
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>

      {/* 4. Top Center Subtle Header Siluet Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] opacity-[0.04] text-amber-600">
        <DayakArtTwinMotif color="#d97706" />
      </div>

      {/* 5. Bottom Right Subtle Floral Arc */}
      <div className="absolute -bottom-10 left-1/4 w-[340px] h-[260px] opacity-[0.045] text-amber-700">
        <DayakArtTwinMotif color="#d97706" />
      </div>
    </div>
  );
};
