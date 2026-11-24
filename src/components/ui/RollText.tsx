import styles from "./ui.module.css";

/**
 * Button label that rolls up on hover: the text slides out and an identical copy slides in from below.
 * The parent needs the global `roll-group` class so hovering anywhere on it triggers the roll.
 */
export function RollText({ children }: { children: string }) {
  return (
    <span className={styles.roll}>
      <span className={styles.rollInner}>
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}
