import React from 'react';

/**
 * Komponen ornamen motif Dayak dinonaktifkan sesuai permintaan pengguna.
 * Menghasilkan null agar tampilan bersih dan bebas dari ornamen latar belakang.
 */
export const DayakArtTwinMotif: React.FC<{
  className?: string;
  color?: string;
}> = () => null;

export const DayakArtWing: React.FC<{
  className?: string;
  color?: string;
}> = () => null;

export const DayakRibbonTrim: React.FC<{
  className?: string;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'slate' | 'gold';
  blur?: boolean;
}> = () => null;

export const DayakTableWatermark: React.FC<{
  opacity?: number;
  className?: string;
}> = () => null;

export const DayakCornerSilhouette: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  color?: string;
  className?: string;
}> = () => null;

export const GrandBackgroundSilhouette: React.FC = () => null;
