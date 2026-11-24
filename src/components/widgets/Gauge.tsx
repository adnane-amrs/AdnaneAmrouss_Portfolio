"use client";

import { motion } from "framer-motion";
import styles from "./widgets.module.css";

interface GaugeProps {
  header: string;
  chip: string;
  label: string;
  value: string;
  legend: string[];
  compact?: boolean;
}

const SEGMENTS = 13;
const LIT = 9;

// Trig results can differ in the last digit between Node and the browser, which breaks hydration.
const round = (n: number) => Math.round(n * 100) / 100;

/** Dark dashboard card with a segmented semicircle gauge that fills up on load. */
export function Gauge({ header, chip, label, value, legend, compact }: GaugeProps) {
  return (
    <div className={`${styles.gaugeFrame} ${compact ? styles.gaugeCompact : ""}`}>
      <div className={styles.gaugeCard}>
        <div className={styles.cardHeader}>
          <span className="mono">{header}</span>
          <span className={styles.chipLime}>
            <span className={styles.liveDot} />
            {chip}
          </span>
        </div>

        <div className={styles.gaugeBody}>
          <svg viewBox="0 0 240 130" className={styles.gaugeSvg} aria-hidden>
            {Array.from({ length: SEGMENTS }, (_, i) => {
              const angle = 180 - (i * 180) / (SEGMENTS - 1);
              const lit = i < LIT;
              return (
                <motion.rect
                  key={i}
                  x={-13}
                  y={-9}
                  width={26}
                  height={18}
                  rx={5}
                  transform={`translate(120 120) rotate(${-angle}) translate(96 0)`}
                  initial={{ fill: "#3b3d2a" }}
                  animate={{ fill: lit ? "#d6fa43" : "#3b3d2a" }}
                  transition={{ delay: 1 + i * 0.09, duration: 0.3 }}
                />
              );
            })}
            {Array.from({ length: 19 }, (_, i) => {
              const a = Math.PI - (i * Math.PI) / 18;
              return (
                <motion.circle
                  key={i}
                  cx={round(120 + Math.cos(a) * 66)}
                  cy={round(120 - Math.sin(a) * 66)}
                  r={2.2}
                  initial={{ fill: "#4a4c38" }}
                  animate={{ fill: i < 13 ? "#d6fa43" : "#4a4c38" }}
                  transition={{ delay: 1.2 + i * 0.05 }}
                />
              );
            })}
          </svg>
          <div className={styles.gaugeCenter}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        </div>

        <div className={styles.legend}>
          {legend.map((item, i) => (
            <span key={item} className={i === legend.length - 1 ? styles.legendDim : ""}>
              <span className={styles.ring} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
