const encodeSvg = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const getFallbackCarImage = (carName = "GoRide Car") =>
  encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="55%" stop-color="#0f766e" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="url(#bg)" rx="36" />
      <circle cx="260" cy="560" r="64" fill="#e2e8f0" opacity="0.95" />
      <circle cx="890" cy="560" r="64" fill="#e2e8f0" opacity="0.95" />
      <path d="M250 500h680c18 0 33-15 33-33v-42c0-16-11-29-27-32l-73-13-91-112c-16-19-39-30-64-30H472c-26 0-50 12-66 33l-80 109-91 13c-16 3-27 16-27 32v42c0 18 15 33 33 33z" fill="#f8fafc" opacity="0.96"/>
      <path d="M427 283h268c16 0 31 7 42 20l57 71H364l52-71c11-13 27-20 44-20z" fill="#cbd5e1"/>
      <text x="600" y="150" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="700">
        ${carName}
      </text>
      <text x="600" y="205" text-anchor="middle" fill="#dbeafe" font-family="Segoe UI, Arial, sans-serif" font-size="24">
        Image unavailable, showing GoRide placeholder
      </text>
    </svg>
  `);

export const attachFallbackImage = (event, carName) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = getFallbackCarImage(carName);
};
