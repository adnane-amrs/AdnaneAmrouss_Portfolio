"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fragment, useState } from "react";
import type { Logo } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import styles from "./StoryCarousel.module.css";

export interface Story {
  /** Large sentence, revealed character by character. */
  statement: string;
  /** Optional smaller lines under the statement. */
  details?: string[];
  logo?: Logo;
  title: string;
  subtitle: string;
  tags?: string[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * One-at-a-time story card: round arrow buttons, "1 / n · label" counter, a large statement
 * whose characters rise in on every change, and a logo + title row underneath.
 */
export function StoryCarousel({ label, stories }: { label: string; stories: Story[] }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const count = stories.length;
  const story = stories[index];

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div
      className={`card ${styles.carousel}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label={t.nav.prev}>
          <ArrowLeft size={18} />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => go(1)} aria-label={t.nav.next}>
          <ArrowRight size={18} />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.counter}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                {index + 1}
              </motion.span>
            </AnimatePresence>
            <span className={styles.counterSep}>/</span>
            {count}
          </span>
          <span className={styles.label}>{label}</span>
        </p>

        {/* Every slide is laid out invisibly in the same cell, so the card keeps the height
            of the longest one and nothing below it jumps when the slide changes. */}
        <div className={styles.stage} aria-live="polite">
          {stories.map((s, i) => (
            <div key={`sizer-${i}`} className={styles.sizer} aria-hidden>
              <Slide story={s} animate={false} />
            </div>
          ))}
          <div key={index} className={styles.active}>
            <Slide story={story} animate />
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide({ story, animate }: { story: Story; animate: boolean }) {
  const reduce = useReducedMotion();
  const play = animate && !reduce;

  return (
    <>
      <p className={styles.statement}>{play ? <RiseText text={story.statement} /> : story.statement}</p>

      {story.details && story.details.length > 0 && (
        <motion.ul
          className={styles.details}
          initial={play ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
        >
          {story.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </motion.ul>
      )}

      <motion.div
        className={styles.person}
        initial={play ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <motion.span
          className={styles.logo}
          initial={play ? { scale: 0.7, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.6, delay: 0.1 }}
        >
          {story.logo?.src ? (
            <Image src={story.logo.src} alt="" fill sizes="72px" className={styles.logoImg} />
          ) : (
            <span className={styles.initials}>{story.logo?.initials ?? story.title.slice(0, 2)}</span>
          )}
        </motion.span>
        <div className={styles.personText}>
          <strong>{story.title}</strong>
          <span>{story.subtitle}</span>
        </div>
        {story.tags && story.tags.length > 0 && (
          <div className={styles.tags}>
            {story.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

/** Characters fade and rise into place one after another (as in the reference). */
function RiseText({ text }: { text: string }) {
  let i = 0;
  return (
    <>
      {text.split(/(\s+)/).map((token, ti) =>
        /^\s+$/.test(token) || token === "" ? (
          <Fragment key={ti}>{token}</Fragment>
        ) : (
          <span key={ti} className={styles.word}>
            {Array.from(token).map((char) => {
              const delay = i++ * 0.012;
              return (
                <motion.span
                  key={delay}
                  className={styles.char}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay, ease }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ),
      )}
    </>
  );
}
