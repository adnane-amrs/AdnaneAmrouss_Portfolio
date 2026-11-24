/** Pixel "A" brand mark — same artwork as src/app/icon.svg (the favicon). */
export function LogoMark({ size, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect width="32" height="32" rx="6" fill="#0e0e0e" shapeRendering="geometricPrecision" />
      <g fill="#d6fa43">
        <rect x="10" y="7" width="12" height="4" />
        <rect x="7" y="11" width="4" height="14" />
        <rect x="21" y="11" width="4" height="14" />
        <rect x="11" y="16" width="10" height="4" />
      </g>
    </svg>
  );
}
