// Vektor Ornamen Seni Ukir Batik Dayak Kaltara Presisi Tinggi (Sesuai Motif Referensi Pengguna)
// Motif: Sulur Bunga Melengkung Ganda Khas Kalimantan (Twin Golden Floral Dayak Tendril Silhouette)

export const DAYAK_GOLDEN_TENDRIL_LEFT_SVG_PATH = `
  M 75,55 
  C 75,45 85,35 95,30
  C 105,25 110,15 105,8
  C 100,2 88,2 80,10
  C 72,18 72,30 65,38
  C 58,45 45,45 35,35
  C 25,25 22,12 10,15
  C 2,18 2,30 8,38
  C 15,48 28,50 38,48
  C 45,46 52,50 55,58
  C 58,68 50,78 40,82
  C 28,86 15,80 8,90
  C 2,98 8,110 18,112
  C 28,114 38,105 45,95
  C 50,88 56,86 62,90
  L 62,90
`;

// Single Left Tendril Wing SVG
export const DAYAK_TENDRIL_WING_SVG = `
<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <!-- Top Floral Blossom Ring Motif -->
  <circle cx="110" cy="70" r="14" fill="none" stroke="currentColor" stroke-width="9" />
  <circle cx="110" cy="70" r="4.5" fill="currentColor" />

  <!-- Top-Left Curl Loop -->
  <path d="M 100,60 C 90,40 60,35 45,50 C 32,62 38,82 52,85 C 65,88 80,78 95,72" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- Top-Right Crest Curl -->
  <path d="M 120,60 C 135,40 160,35 175,50 C 188,62 182,82 168,85 C 155,88 140,78 125,72" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- Main Graceful S-Stem Arch -->
  <path d="M 110,85 C 105,120 70,145 60,180 C 50,215 65,245 75,275 C 80,290 75,305 60,305 C 45,305 42,285 50,265 C 60,240 50,210 38,190" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" />

  <!-- Outer Mid Tendril Branch -->
  <path d="M 68,170 C 45,160 25,175 22,195 C 18,218 35,232 50,225 C 62,220 68,202 65,188" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" />

  <!-- Inner Mid Tendril Branch -->
  <path d="M 66,195 C 85,200 105,190 115,205 C 122,216 118,230 105,235 C 92,240 80,228 72,215" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" />

  <!-- Lower Outer Spiral -->
  <path d="M 72,235 C 55,245 35,245 28,260 C 20,275 32,295 48,290 C 60,285 68,268 62,252" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
</svg>
`;

// Symmetrical Twin Motif (Seperti di Gambar Pengguna)
export const DAYAK_TWIN_ART_SVG = `
<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <!-- Left Wing -->
  <g transform="translate(0, 0)">
    <!-- Top Blossom Ring -->
    <circle cx="120" cy="65" r="14" fill="none" stroke="currentColor" stroke-width="10" />
    <circle cx="120" cy="65" r="5" fill="currentColor" />
    
    <!-- Top Outer Loop -->
    <path d="M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
    
    <!-- Top Inner Loop -->
    <path d="M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
    
    <!-- Main S-Stem -->
    <path d="M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round" />
    
    <!-- Mid Outer Tendril -->
    <path d="M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
    
    <!-- Mid Inner Tendril -->
    <path d="M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
    
    <!-- Lower Outer Hook -->
    <path d="M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
  </g>

  <!-- Right Wing (Mirrored) -->
  <g transform="translate(400, 0) scale(-1, 1)">
    <!-- Top Blossom Ring -->
    <circle cx="120" cy="65" r="14" fill="none" stroke="currentColor" stroke-width="10" />
    <circle cx="120" cy="65" r="5" fill="currentColor" />
    
    <!-- Top Outer Loop -->
    <path d="M 110,55 C 95,30 55,30 40,50 C 25,68 35,90 55,90 C 75,90 92,75 106,68" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
    
    <!-- Top Inner Loop -->
    <path d="M 130,55 C 145,30 175,30 188,48 C 200,65 190,85 172,88 C 155,90 140,75 132,68" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
    
    <!-- Main S-Stem -->
    <path d="M 120,80 C 115,120 72,145 62,185 C 52,225 72,255 80,285 C 84,300 76,312 60,312 C 44,312 40,292 48,272 C 58,245 46,215 32,192" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round" />
    
    <!-- Mid Outer Tendril -->
    <path d="M 70,175 C 45,165 24,180 20,202 C 16,225 35,240 52,232 C 65,225 70,206 66,192" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
    
    <!-- Mid Inner Tendril -->
    <path d="M 68,202 C 90,208 112,196 122,212 C 130,224 125,240 110,244 C 95,248 82,234 74,220" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
    
    <!-- Lower Outer Hook -->
    <path d="M 74,242 C 55,252 32,252 26,270 C 18,288 32,308 50,302 C 64,296 72,276 64,258" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
  </g>
</svg>
`;
