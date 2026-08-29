// Ornamen Motif Seni Ukir & Batik Dayak Khas Kalimantan Utara (Dayak Kenyah / Bulungan / Tidung)
// Desain vektor SVG yang memadukan sulur tanaman, lengkungan aso, perisai talawang, dan motif geometris Dayak khas.

export const DAYAK_BATIK_SVG_PATTERN = `
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .dayak-stroke { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
      .dayak-fill { fill: currentColor; }
      .dayak-thick { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    </style>
  </defs>
  <!-- Spiral Sulur Dayak Corner TL -->
  <path class="dayak-stroke" d="M 0,30 C 15,30 25,20 25,5 C 25,-5 15,-10 5,-10 C -5,-10 -15,0 -15,15 C -15,35 5,55 30,55 C 45,55 55,45 55,30 C 55,15 45,5 30,5" />
  <circle class="dayak-fill" cx="30" cy="5" r="2.5" />
  <circle class="dayak-fill" cx="5" cy="20" r="2" />
  
  <!-- Spiral Sulur Dayak Corner BR -->
  <path class="dayak-stroke" d="M 120,90 C 105,90 95,100 95,115 C 95,125 105,130 115,130 C 125,130 135,120 135,105 C 135,85 115,65 90,65 C 75,65 65,75 65,90 C 65,105 75,115 90,115" />
  <circle class="dayak-fill" cx="90" cy="115" r="2.5" />
  <circle class="dayak-fill" cx="115" cy="100" r="2" />

  <!-- Center Dayak Motif (Belanga & Matamata) -->
  <path class="dayak-thick" d="M 60,35 C 75,45 85,55 85,60 C 85,65 75,75 60,85 C 45,75 35,65 35,60 C 35,55 45,45 60,35 Z" />
  <circle class="dayak-fill" cx="60" cy="60" r="4.5" />
  <circle class="dayak-stroke" cx="60" cy="60" r="9" />
  <path class="dayak-stroke" d="M 60,25 L 60,35 M 60,85 L 60,95 M 25,60 L 35,60 M 85,60 L 95,60" />

  <!-- Dayak Hornbill / Burung Enggang Beak Arcs -->
  <path class="dayak-stroke" d="M 60,35 C 50,15 35,10 15,20 C 5,25 0,40 10,50 C 20,60 40,55 45,45" />
  <path class="dayak-stroke" d="M 60,85 C 70,105 85,110 105,100 C 115,95 120,80 110,70 C 100,60 80,65 75,75" />

  <!-- Corner TR Motif -->
  <path class="dayak-stroke" d="M 120,30 C 105,30 95,20 95,5 C 95,-5 105,-10 115,-10 C 125,-10 135,0 135,15 C 135,35 115,55 90,55 C 75,55 65,45 65,30" />
  <circle class="dayak-fill" cx="90" cy="5" r="2.5" />

  <!-- Corner BL Motif -->
  <path class="dayak-stroke" d="M 0,90 C 15,90 25,100 25,115 C 25,125 15,130 5,130 C -5,130 -15,120 -15,105 C -15,85 5,65 30,65 C 45,65 55,75 55,90" />
  <circle class="dayak-fill" cx="30" cy="115" r="2.5" />
  
  <!-- Diamond Accents -->
  <polygon class="dayak-fill" points="60,18 64,22 60,26 56,22" />
  <polygon class="dayak-fill" points="60,94 64,98 60,102 56,98" />
  <polygon class="dayak-fill" points="18,60 22,64 26,60 22,56" />
  <polygon class="dayak-fill" points="94,60 98,64 102,60 98,56" />
</svg>
`;

// Base64 Data URI for CSS background-image
export const DAYAK_BATIK_BG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(DAYAK_BATIK_SVG_PATTERN)}`;

// Dayak Border Ribbon Trim SVG (Ukiran Lis Pinggir Dayak)
export const DAYAK_BORDER_TRIM_SVG = `
<svg width="240" height="24" viewBox="0 0 240 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <defs>
    <style>
      .trim-stroke { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
      .trim-fill { fill: currentColor; }
    </style>
  </defs>
  <!-- Repeating Motif 1 (0-60) -->
  <path class="trim-stroke" d="M 0,12 Q 15,2 30,12 T 60,12" />
  <path class="trim-stroke" d="M 0,12 Q 15,22 30,12 T 60,12" />
  <circle class="trim-fill" cx="15" cy="12" r="2.5" />
  <circle class="trim-fill" cx="45" cy="12" r="2.5" />
  <path class="trim-stroke" d="M 30,5 L 30,19" />
  <polygon class="trim-fill" points="30,2 34,7 26,7" />
  <polygon class="trim-fill" points="30,22 34,17 26,17" />

  <!-- Repeating Motif 2 (60-120) -->
  <path class="trim-stroke" d="M 60,12 Q 75,2 90,12 T 120,12" />
  <path class="trim-stroke" d="M 60,12 Q 75,22 90,12 T 120,12" />
  <circle class="trim-fill" cx="75" cy="12" r="2.5" />
  <circle class="trim-fill" cx="105" cy="12" r="2.5" />
  <path class="trim-stroke" d="M 90,5 L 90,19" />
  <polygon class="trim-fill" points="90,2 94,7 86,7" />
  <polygon class="trim-fill" points="90,22 94,17 86,17" />

  <!-- Repeating Motif 3 (120-180) -->
  <path class="trim-stroke" d="M 120,12 Q 135,2 150,12 T 180,12" />
  <path class="trim-stroke" d="M 120,12 Q 135,22 150,12 T 180,12" />
  <circle class="trim-fill" cx="135" cy="12" r="2.5" />
  <circle class="trim-fill" cx="165" cy="12" r="2.5" />
  <path class="trim-stroke" d="M 150,5 L 150,19" />
  <polygon class="trim-fill" points="150,2 154,7 146,7" />
  <polygon class="trim-fill" points="150,22 154,17 146,17" />

  <!-- Repeating Motif 4 (180-240) -->
  <path class="trim-stroke" d="M 180,12 Q 195,2 210,12 T 240,12" />
  <path class="trim-stroke" d="M 180,12 Q 195,22 210,12 T 240,12" />
  <circle class="trim-fill" cx="195" cy="12" r="2.5" />
  <circle class="trim-fill" cx="225" cy="12" r="2.5" />
  <path class="trim-stroke" d="M 210,5 L 210,19" />
  <polygon class="trim-fill" points="210,2 214,7 206,7" />
  <polygon class="trim-fill" points="210,22 214,17 206,17" />
</svg>
`;

export const DAYAK_BORDER_TRIM_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(DAYAK_BORDER_TRIM_SVG)}`;
