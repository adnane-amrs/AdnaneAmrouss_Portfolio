import styles from "./ui.module.css";

interface SectionBarProps {
  label: string;
  index: number;
  tone?: "dark" | "light";
}

/** The black (or cream) strip that opens every section: label on the left, 00X on the right. */
export function SectionBar({ label, index, tone = "dark" }: SectionBarProps) {
  return (
    <div className={styles.barWrap}>
      <div className={`${styles.bar} ${tone === "light" ? styles.barLight : ""}`}>
        <span>{label}</span>
        <span>{String(index).padStart(3, "0")}</span>
      </div>
      <div className={`grid-line ${styles.barLine}`} />
    </div>
  );
}
