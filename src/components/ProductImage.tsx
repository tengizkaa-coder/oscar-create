"use client";

import React from "react";

/* Detailed bottle silhouettes for each category */
const WINE_BOTTLE = (
  <svg viewBox="0 0 80 200" fill="none" className="h-[60%] max-h-[140px] opacity-25">
    <path d="M35 8h10v28l8 16v8c0 4-2 8-2 12v108c0 8-4 12-11 12h-2c-7 0-11-4-11-12V72c0-4-2-8-2-12v-8l8-16V8z" stroke="currentColor" strokeWidth="1.5" />
    <rect x="33" y="2" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1" />
    <rect x="30" y="100" width="20" height="40" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <text x="40" y="124" textAnchor="middle" fill="currentColor" fontSize="6" opacity="0.25" fontFamily="serif">WINE</text>
  </svg>
);

const CHAMPAGNE_BOTTLE = (
  <svg viewBox="0 0 80 200" fill="none" className="h-[60%] max-h-[140px] opacity-25">
    <path d="M34 20h12v18l6 14v6c0 3-1 6-2 10v112c0 8-3 12-10 12h-2c-7 0-10-4-10-12V68c-1-4-2-7-2-10v-6l6-14V20z" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="40" cy="16" rx="5" ry="6" stroke="currentColor" strokeWidth="1" />
    <path d="M35 10h10" stroke="currentColor" strokeWidth="1" />
    <circle cx="36" cy="80" r="1" fill="currentColor" opacity="0.15" />
    <circle cx="42" cy="90" r="0.8" fill="currentColor" opacity="0.12" />
    <circle cx="38" cy="100" r="1" fill="currentColor" opacity="0.1" />
    <circle cx="44" cy="75" r="0.6" fill="currentColor" opacity="0.1" />
    <rect x="31" y="110" width="18" height="30" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const SPIRITS_BOTTLE = (
  <svg viewBox="0 0 80 200" fill="none" className="h-[60%] max-h-[140px] opacity-25">
    <rect x="26" y="56" width="28" height="124" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M36 16h8v12l4 8v20H32V36l4-8V16z" stroke="currentColor" strokeWidth="1.5" />
    <rect x="34" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1" />
    <rect x="28" y="90" width="24" height="50" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <text x="40" y="118" textAnchor="middle" fill="currentColor" fontSize="5" opacity="0.2" fontFamily="serif" letterSpacing="1">SPIRITS</text>
  </svg>
);

const BEER_BOTTLE = (
  <svg viewBox="0 0 80 200" fill="none" className="h-[60%] max-h-[140px] opacity-25">
    <path d="M35 30h10v16l4 10v124c0 6-3 10-9 10h-2c-6 0-9-4-9-10V56l4-10V30z" stroke="currentColor" strokeWidth="1.5" />
    <rect x="34" y="18" width="12" height="14" rx="3" stroke="currentColor" strokeWidth="1" />
    <path d="M33 18h14" stroke="currentColor" strokeWidth="1.5" />
    <rect x="30" y="100" width="20" height="36" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const GIFT_BOX = (
  <svg viewBox="0 0 80 80" fill="none" className="h-[40%] max-h-[100px] opacity-25">
    <rect x="10" y="28" width="60" height="46" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <rect x="6" y="18" width="68" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <line x1="40" y1="18" x2="40" y2="74" stroke="currentColor" strokeWidth="1.5" />
    <path d="M40 18c0-10-6-14-12-10s-4 10 12 10m0 0c0-10 6-14 12-10s4 10-12 10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SNACK_BOX = (
  <svg viewBox="0 0 80 80" fill="none" className="h-[40%] max-h-[100px] opacity-25">
    <rect x="12" y="20" width="56" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 36h56" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <path d="M20 14c4-6 10-8 20-8s16 2 20 8" stroke="currentColor" strokeWidth="1" />
    <rect x="20" y="44" width="40" height="16" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const STYLES: Record<string, { gradient: string; icon: React.ReactNode; label: string }> = {
  wine: {
    gradient: "from-[#2a0810] via-[#3d0c14] to-[#1a0608]",
    label: "Вино",
    icon: WINE_BOTTLE,
  },
  champagne: {
    gradient: "from-[#1a1508] via-[#2a2210] to-[#141008]",
    label: "Игристое",
    icon: CHAMPAGNE_BOTTLE,
  },
  spirits: {
    gradient: "from-[#18100a] via-[#2a1a0e] to-[#100a06]",
    label: "Крепкое",
    icon: SPIRITS_BOTTLE,
  },
  beer: {
    gradient: "from-[#14100a] via-[#221a0e] to-[#0e0a06]",
    label: "Пиво",
    icon: BEER_BOTTLE,
  },
  snacks: {
    gradient: "from-[#1a0e14] via-[#241218] to-[#10080c]",
    label: "Подарки",
    icon: SNACK_BOX,
  },
  vodka: {
    gradient: "from-[#0e1018] via-[#141822] to-[#080c10]",
    label: "Водка",
    icon: SPIRITS_BOTTLE,
  },
  whiskey: {
    gradient: "from-[#18100a] via-[#2a1a0e] to-[#100a06]",
    label: "Виски",
    icon: SPIRITS_BOTTLE,
  },
  cognac: {
    gradient: "from-[#1a120a] via-[#2a1c10] to-[#100c06]",
    label: "Коньяк",
    icon: SPIRITS_BOTTLE,
  },
  gin: {
    gradient: "from-[#0a1410] via-[#102018] to-[#060e0a]",
    label: "Джин",
    icon: SPIRITS_BOTTLE,
  },
  rum: {
    gradient: "from-[#1a100a] via-[#261810] to-[#0e0806]",
    label: "Ром",
    icon: SPIRITS_BOTTLE,
  },
  extras: {
    gradient: "from-[#10101a] via-[#181824] to-[#0a0a12]",
    label: "К заказу",
    icon: SNACK_BOX,
  },
  set: {
    gradient: "from-[#1a0a08] via-[#3d0c14] to-[#1a0a08]",
    label: "Набор",
    icon: GIFT_BOX,
  },
  default: {
    gradient: "from-[#141010] via-[#1a1414] to-[#0e0a0a]",
    label: "",
    icon: WINE_BOTTLE,
  },
};

type Props = {
  category?: string;
  name: string;
  image?: string;
  imageLight?: string;
  type?: "product" | "set";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function ProductImage({
  category,
  name,
  image,
  imageLight,
  type = "product",
  size = "md",
  className = "",
}: Props) {
  const key = type === "set" ? "set" : category || "default";
  const style = STYLES[key] || STYLES.default;

  // If real image exists, show it with light on hover/active
  if (image) {
    const lightSrc = imageLight || image.replace(/\.(png|webp)$/, "-light.$1");
    const fit = "object-cover";
    return (
      <div className={`relative w-full h-full overflow-hidden bg-noir-card product-img-hover ${className}`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`product-img-dark absolute inset-0 w-full h-full ${fit} transition-opacity duration-500`}
        />
        <img
          src={lightSrc}
          alt={name}
          loading="lazy"
          className={`product-img-light absolute inset-0 w-full h-full ${fit} opacity-0 transition-opacity duration-500`}
        />
      </div>
    );
  }

  const labelClass = size === "lg" ? "text-[13px]" : "text-[10px]";
  const categoryClass = size === "lg" ? "text-[11px] mb-3" : "text-[9px] mb-1";

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-b ${style.gradient} flex flex-col items-center justify-center overflow-hidden text-gold/80 ${className}`}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-gold/[0.03] rounded-full blur-3xl" />

      {/* Category label */}
      {style.label && (
        <span className={`relative ${categoryClass} uppercase tracking-[0.3em] text-ivory-muted/30`}>
          {style.label}
        </span>
      )}

      {/* Bottle silhouette */}
      <div className="relative">{style.icon}</div>

      {/* Product name */}
      <span
        className={`relative mt-2 ${labelClass} text-center px-6 max-w-[85%] text-ivory-muted/50 leading-tight font-light line-clamp-2`}
      >
        {name}
      </span>

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
    </div>
  );
}
