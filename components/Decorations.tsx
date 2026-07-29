export function Starburst({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 0 L58 35 L95 25 L65 50 L95 75 L58 65 L50 100 L42 65 L5 75 L35 50 L5 25 L42 35 Z"
        fill="#1a1a1a"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 20 C15 5, 25 35, 35 20 S55 5, 55 20"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Flower({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" fill="#F45B9E" />
      <ellipse cx="12" cy="5" rx="3" ry="5" fill="#F45B9E" />
      <ellipse cx="12" cy="19" rx="3" ry="5" fill="#F45B9E" />
      <ellipse cx="5" cy="12" rx="5" ry="3" fill="#F45B9E" />
      <ellipse cx="19" cy="12" rx="5" ry="3" fill="#F45B9E" />
    </svg>
  );
}

export function WashiTape({ className = "", id = "gingham" }: { className?: string; id?: string }) {
  return (
    <svg
      width="80"
      height="28"
      viewBox="0 0 80 28"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#F9D9DE" />
          <rect x="0" y="0" width="4" height="4" fill="#F45B9E" opacity="0.4" />
          <rect x="4" y="4" width="4" height="4" fill="#F45B9E" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="80" height="28" fill={`url(#${id})`} rx="2" />
      <rect width="80" height="28" fill="none" stroke="#1a1a1a" strokeWidth="0.5" rx="2" opacity="0.3" />
    </svg>
  );
}

export function DottedRing({ className = "" }: { className?: string }) {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="110"
        cy="110"
        r="105"
        fill="none"
        stroke="#F45B9E"
        strokeWidth="3"
        strokeDasharray="4 8"
      />
    </svg>
  );
}

export function PaginationDots({
  total = 6,
  active = 0,
  className = "",
}: {
  total?: number;
  active?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            i === active ? "scale-125 bg-hot-pink" : "bg-black/20"
          }`}
        />
      ))}
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M8 0 L9 6 L16 8 L9 10 L8 16 L7 10 L0 8 L7 6 Z"
        fill="#F45B9E"
        opacity="0.8"
      />
    </svg>
  );
}
