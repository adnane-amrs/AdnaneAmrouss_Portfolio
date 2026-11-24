import styles from "./ui.module.css";
import { Chevrons } from "./Icons";

interface StickerProps {
  lines: string[];
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  layout?: "top" | "bottom";
  download?: boolean;
  className?: string;
}

/** Lime "post-it" with a clipped corner, a square bullet and >>> chevrons. */
export function Sticker({ lines, href, onClick, size = "sm", layout = "bottom", download, className = "" }: StickerProps) {
  const classes = `${styles.sticker} ${styles[`sticker_${size}`]} ${styles[`sticker_${layout}`]} ${className}`;
  const text = (
    <span className={styles.stickerText}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  );
  const content = (
    <>
      <span className={styles.stickerHead}>
        <span className={styles.square} />
        {layout === "bottom" ? <Chevrons /> : text}
      </span>
      {layout === "bottom" && text}
      {layout === "top" && (
        <span className={styles.stickerFoot}>
          <Chevrons />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={download ? undefined : href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
