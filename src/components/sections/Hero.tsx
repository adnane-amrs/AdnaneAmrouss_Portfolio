"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ArrowUpRight, MapPin } from "@/components/ui/Icons";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { FlipText } from "@/components/ui/FlipText";
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const TOOLS = [
  "Python",
  "PyTorch",
  "Apache Spark",
  "Kafka",
  "dbt",
  "TensorFlow",
  "Azure",
  "Docker",
  "MLflow",
  "Power BI",
  "OpenCV",
  "Terraform",
];

export function Hero() {
  const { t } = useLanguage();
  const { hero, stats } = t;
  const scrollTo = useScrollTo();

  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.top}>
        <motion.div className={`card ${styles.intro}`} {...enter(0)}>
          <div className={styles.introHead}>
            <div className={styles.person}>
              <span className={styles.avatar}>
                <Image src={site.avatar} alt="" fill sizes="40px" className={styles.cover} />
              </span>
              <span className={styles.personText}>
                <strong>{site.name}</strong>
                <span>{hero.role}</span>
              </span>
            </div>
            <span className="badge">
              <span className="badge-dot" aria-hidden />
              {hero.available}
            </span>
          </div>

          <div>
            {/* 3D flip: already on screen at load, so it plays once instead of following the scroll */}
            <h1 className={styles.title}>
              <FlipText segments={[{ text: hero.title }]} trigger="load" delay={0.25} duration={1.6} />
            </h1>
            <motion.p className={styles.bio} {...enter(0.45)}>
              {hero.bio}
            </motion.p>
            <motion.div className={styles.actions} {...enter(0.55)}>
              <TransitionLink href="/contact" className="btn btn-light">
                {hero.cta} <ArrowUpRight />
              </TransitionLink>
              <button type="button" className="btn btn-ghost" onClick={() => scrollTo("projects")}>
                {hero.secondary}
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className={`card ${styles.portrait}`} {...enter(0.08)}>
          <Image
            src={site.photo}
            alt={site.name}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 400px"
            className={`${styles.cover} ${styles.photo}`}
          />
          <span className={styles.locationChip}>
            <MapPin /> {hero.location}
          </span>
        </motion.div>
      </div>

      <div className={styles.stats}>
        <motion.div className={`card ${styles.stat}`} {...enter(0.18)}>
          <LocalTime label={stats.localTime} day={stats.daylight} night={stats.night} city={stats.city} />
        </motion.div>

        <motion.div className={`card ${styles.stat}`} {...enter(0.24)}>
          <span className="label">{stats.experience}</span>
          <p className={styles.statValue}>
            {stats.experienceValue}
            <span>{stats.experienceUnit}</span>
          </p>
        </motion.div>

        <motion.div className={`card card-cream ${styles.stat}`} {...enter(0.3)}>
          <span className="label">{stats.currently}</span>
          <p className={styles.currently}>{stats.currentlyValue}</p>
        </motion.div>

        <motion.div className={`card ${styles.stat}`} {...enter(0.36)}>
          <span className="label">{stats.graduated}</span>
          <p className={styles.statValue}>
            {stats.graduatedValue}
            <span>{stats.graduatedUnit}</span>
          </p>
        </motion.div>
      </div>

      <motion.div className={`card ${styles.tools}`} {...enter(0.42)}>
        <span className={`label ${styles.toolsLabel}`}>{stats.toolsLabel}</span>
        <div className={styles.toolsTrack}>
          <div className={styles.toolsInner}>
            {[0, 1].map((copy) => (
              <ul key={copy} className={styles.toolsList} aria-hidden={copy === 1}>
                {TOOLS.map((tool, i) => (
                  <li key={tool} className={styles[`tool${i % 5}`]}>
                    {tool}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Local time widget ---------- */

// Approximate sunrise / sunset in Morocco, good enough for a decorative arc.
const SUNRISE = 7 * 60;
const SUNSET = 19 * 60;

const P0 = { x: 6, y: 58 };
const P1 = { x: 100, y: -18 };
const P2 = { x: 194, y: 58 };

const lerp = (a: { x: number; y: number }, b: { x: number; y: number }, k: number) => ({
  x: a.x + (b.x - a.x) * k,
  y: a.y + (b.y - a.y) * k,
});

function LocalTime({ label, day, night, city }: { label: string; day: string; night: string; city: string }) {
  const [now, setNow] = useState<{ time: string; minutes: number } | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Casablanca",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const tick = () => {
      const time = fmt.format(new Date());
      const [h, m] = time.split(":").map(Number);
      setNow({ time, minutes: h * 60 + m });
    };
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  const minutes = now?.minutes ?? 12 * 60;
  const isDay = minutes >= SUNRISE && minutes <= SUNSET;
  const k = isDay
    ? (minutes - SUNRISE) / (SUNSET - SUNRISE)
    : ((minutes - SUNSET + 24 * 60) % (24 * 60)) / (24 * 60 - (SUNSET - SUNRISE));

  // Split the quadratic curve at k (de Casteljau) so the coloured part ends exactly at the dot.
  const q = lerp(P0, P1, k);
  const dot = lerp(q, lerp(P1, P2, k), k);
  const color = isDay ? "var(--orange)" : "#8e9ab5";

  return (
    <>
      <div className={styles.statHead}>
        <span className="label">{label}</span>
        <span className="label">{isDay ? day : night}</span>
      </div>
      <svg viewBox="0 0 200 64" className={styles.arc} aria-hidden>
        <path
          d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          strokeLinecap="round"
        />
        {now && (
          <>
            <path
              d={`M${P0.x} ${P0.y} Q${q.x} ${q.y} ${dot.x} ${dot.y}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx={dot.x} cy={dot.y} r="7" fill={color} opacity="0.18" />
            <circle cx={dot.x} cy={dot.y} r="3.6" fill={color} />
          </>
        )}
      </svg>
      <div className={styles.timeRow}>
        <span className={styles.statValue}>{now?.time ?? "--:--"}</span>
        <span className="label">{city}</span>
      </div>
    </>
  );
}
