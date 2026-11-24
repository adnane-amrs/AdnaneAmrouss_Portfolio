import styles from "./ui.module.css";

// Large stroked shapes used as CSS masks over a dot grid, giving the halftone look of the reference.
const shapes = {
  waves:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300' preserveAspectRatio='none'><g fill='none' stroke='black' stroke-width='70'><path d='M-40 300 C 60 40, 220 40, 300 200 S 520 340, 560 120 S 760 -40, 860 220'/><path d='M-40 40 C 120 120, 160 260, 360 280' opacity='.55'/><circle cx='660' cy='250' r='90' opacity='.6'/></g></svg>",
  orbit:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><g fill='none' stroke='black'><circle cx='200' cy='200' r='150' stroke-width='60'/><path d='M40 360 L360 40' stroke-width='70' opacity='.6'/></g></svg>",
  blob:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><g fill='none' stroke='black' stroke-width='80'><path d='M-20 380 C 100 200, 140 60, 300 80 S 520 300, 640 120'/><circle cx='470' cy='110' r='70' opacity='.6'/></g></svg>",
} as const;

interface DotFieldProps {
  shape?: keyof typeof shapes;
  tone?: "dark" | "light";
  className?: string;
}

export function DotField({ shape = "waves", tone = "dark", className = "" }: DotFieldProps) {
  const mask = `url("data:image/svg+xml;utf8,${encodeURIComponent(shapes[shape])}")`;
  return (
    <div
      aria-hidden
      className={`${styles.dotField} ${tone === "light" ? "dots-light" : "dots"} ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}
