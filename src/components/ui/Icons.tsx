type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function Chevrons({ className = "" }: { className?: string }) {
  return (
    <span className={className} aria-hidden style={{ letterSpacing: "0.25em", fontSize: 13 }}>
      &gt;&gt;&gt;
    </span>
  );
}

export function ArrowUpRight({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRight({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronLeft({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDown({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function Check({ size = 12, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)} strokeWidth={2.2}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Home({ size = 17, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export function Grid({ size = 17, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
    </svg>
  );
}

export function User({ size = 17, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
    </svg>
  );
}

export function Briefcase({ size = 17, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </svg>
  );
}

export function Layers({ size = 17, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="m12 4 8.5 4.5L12 13 3.5 8.5Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </svg>
  );
}

export function MapPin({ size = 12, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function Workflow({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.5" />
      <path d="M9.5 6.5H15a2.5 2.5 0 0 1 2.5 2.5v5.5M6.5 9.5V15a2.5 2.5 0 0 0 2.5 2.5h5.5" />
    </svg>
  );
}

export function Target({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function Rocket({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M14 4.5c3-1 5.5-.5 5.5-.5s.5 2.5-.5 5.5c-1 3-4.5 6-7.5 7.5l-4.5-4.5C8.5 9 11 5.5 14 4.5Z" />
      <path d="M7 12.5 4 13l2.5-4H10M11.5 17l-.5 3 4-2.5V14" />
      <circle cx="15" cy="9" r="1.4" />
    </svg>
  );
}

export function Cloud({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M7 18.5a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9a4.5 4.5 0 0 1 .5 9.5Z" />
    </svg>
  );
}

export function Code({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5" />
    </svg>
  );
}

export function Sparkle({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M12 3.5c.6 4.4 2.6 6.9 8 8.5-5.4 1.6-7.4 4.1-8 8.5-.6-4.4-2.6-6.9-8-8.5 5.4-1.6 7.4-4.1 8-8.5Z" />
    </svg>
  );
}

export function Blocks({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} width={size} height={size} aria-hidden>
      <rect x="3" y="3" width="10" height="10" rx="2.5" fill="currentColor" />
      <rect x="11" y="11" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Database({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </svg>
  );
}

export function Play({ size = 10, className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} width={size} height={size} aria-hidden>
      <path d="M1 0 9 5 1 10Z" fill="currentColor" />
    </svg>
  );
}

export function Download({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
    </svg>
  );
}

export function FileText({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3.5V8h4.5M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function Github({ size = 14, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} width={size} height={size} aria-hidden fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Mail({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function Phone({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M6 3.5h3l1.8 4.6-2.2 1.4a10.5 10.5 0 0 0 5.9 5.9l1.4-2.2 4.6 1.8v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function LineChart({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <path d="M4 4v15.5a.5.5 0 0 0 .5.5H20" />
      <path d="m7.5 14.5 3.5-4 3 2.5 5-6" />
    </svg>
  );
}

export function Dashboard({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <rect x="3.5" y="3.5" width="7" height="9" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.6" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.6" />
      <rect x="3.5" y="15.5" width="7" height="5" rx="1.6" />
    </svg>
  );
}

export function Globe({ size = 15, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base(size)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 3.2 2.8 13.8 0 17M12 3.5c-2.8 3.2-2.8 13.8 0 17" />
    </svg>
  );
}
