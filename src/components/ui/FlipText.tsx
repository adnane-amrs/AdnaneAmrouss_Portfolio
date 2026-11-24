"use client";

import { animate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import styles from "./FlipText.module.css";

type Segment = { text: string; className?: string };

// "3D Flip" preset from the reveal-text-on-scroll component: characters, left to right.
const STAGGER = 0.15;
const ROTATE_X = 45;
const PERSPECTIVE = 800;
const BLUR = 2;
const SPAN = 0.7; // share of the timeline each character takes to flip upright

/**
 * Reveals text character by character: each letter starts tilted back in 3D, blurred and dim,
 * and flips upright into its colour. `trigger="scroll"` ties the reveal to the scroll position;
 * `trigger="load"` plays it once on mount (for text that is already on screen).
 */
export function FlipText({
  segments,
  trigger = "scroll",
  delay = 0,
  duration = 1.5,
  from,
  range,
}: {
  segments: Segment[];
  trigger?: "scroll" | "load";
  delay?: number;
  duration?: number;
  /** Colour letters start from before flipping (defaults to a dim grey for dark backgrounds). */
  from?: string;
  /** Scroll reveal range: [start, end] screen-height fractions reached by the text's top. */
  range?: [number, number];
}) {
  const reduce = useReducedMotion();
  const fullText = segments.map((s) => s.text).join("");

  if (reduce) {
    return (
      <>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      <span className={styles.srOnly}>{fullText}</span>
      <Flip key={fullText} segments={segments} trigger={trigger} delay={delay} duration={duration} from={from} range={range} />
    </>
  );
}

function Flip({
  segments,
  trigger,
  delay,
  duration,
  from,
  range = [0.9, 0.4],
}: {
  segments: Segment[];
  trigger: "scroll" | "load";
  delay: number;
  duration: number;
  from?: string;
  range?: [number, number];
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);
  chars.current = [];

  // Split into words (kept unbroken) made of characters; spaces stay plain so lines can wrap.
  let unit = 0;
  const parts = segments.map((seg) =>
    seg.text.split(/(\s+)/).map((token) => {
      if (token === "" || /^\s+$/.test(token)) return { space: token };
      return { word: Array.from(token).map((char) => ({ char, unit: unit++ })) };
    }),
  );
  const total = unit;

  const apply = (p: number) => {
    const timeline = SPAN + Math.max(0, total - 1) * STAGGER;
    const t = p * timeline;
    for (const el of chars.current) {
      const k = Number(el.dataset.unit);
      const s = Math.min(1, Math.max(0, (t - k * STAGGER) / SPAN));
      el.style.opacity = String(0.3 + s * 0.7);
      el.style.transform = s >= 1 ? "none" : `perspective(${PERSPECTIVE}px) rotateX(${(ROTATE_X * (1 - s)).toFixed(1)}deg)`;
      el.style.filter = s >= 1 ? "none" : `blur(${(BLUR * (1 - s)).toFixed(2)}px)`;
      el.style.setProperty("--p", s.toFixed(3));
    }
  };

  // Scroll: 0 when the text's top is at range[0] of the screen height, 1 once it reaches range[1]
  // (default: from near the bottom of the screen to 40% from the top).
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: [`start ${range[0]}`, `start ${range[1]}`],
  });
  const loadProgress = useMotionValue(0);
  const source: MotionValue<number> = trigger === "scroll" ? scrollYProgress : loadProgress;

  useMotionValueEvent(source, "change", apply);

  useEffect(() => {
    apply(source.get());
    if (trigger !== "load") return;
    loadProgress.set(0);
    const controls = animate(loadProgress, 1, { duration, delay, ease: [0.25, 0.1, 0.25, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, duration, delay]);

  return (
    <span
      ref={rootRef}
      className={styles.root}
      style={from ? ({ "--flip-from": from } as React.CSSProperties) : undefined}
      aria-hidden
    >
      {parts.map((tokens, si) => (
        <span key={si} className={segments[si].className}>
          {tokens.map((tok, ti) =>
            "space" in tok ? (
              <Fragment key={ti}>{tok.space}</Fragment>
            ) : (
              <span key={ti} className={styles.word}>
                {tok.word!.map(({ char, unit: k }) => (
                  <span
                    key={k}
                    ref={(el) => {
                      if (el) chars.current.push(el);
                    }}
                    data-unit={k}
                    className={styles.char}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      ))}
    </span>
  );
}
