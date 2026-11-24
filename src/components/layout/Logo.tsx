import { LogoMark } from "./LogoMark";
import styles from "./layout.module.css";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <LogoMark size={30} className={styles.logoMark} />
      AMROUSS
    </span>
  );
}
