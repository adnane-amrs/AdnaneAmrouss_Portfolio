"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowLeft, ArrowUpRight, Check, Github } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ProjectVisual } from "@/components/widgets/ProjectVisual";
import styles from "./ProjectDetail.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease },
});

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { page, items } = t.projects;
  const index = items.findIndex((p) => p.slug === slug);
  const project = items[index];
  const nextIndex = (index + 1) % items.length;
  const next = items[nextIndex];

  useEffect(() => {
    if (project) document.title = `${project.title} — ${site.name}`;
  }, [project]);

  if (!project) return null;
  const { details } = project;

  const meta = [
    { label: page.type, value: details.type },
    { label: page.period, value: project.period },
    { label: page.category, value: project.category },
    { label: page.stack, value: project.stack.slice(0, 3).join(" · ") },
  ];

  return (
    <div className={`container ${styles.page}`}>
      {/* ---------- Intro ---------- */}
      <motion.div className={styles.topRow} {...enter(0)}>
        <Link href="/#projects" className="btn btn-ghost">
          <ArrowLeft /> {page.back}
        </Link>
        <span className="label">
          {page.project} {pad(index + 1)} / {pad(items.length)}
        </span>
      </motion.div>

      <motion.section className={`card ${styles.hero}`} {...enter(0.05)}>
        <div className={styles.heroChips}>
          <span className="chip">{project.category}</span>
          <span className="chip">{details.type}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lead}>{project.description}</p>
        <div className={styles.actions}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-light">
              <Github size={13} /> {t.projects.viewCode}
            </a>
          )}
          <TransitionLink href={`/contact?project=${project.slug}`} className="btn btn-ghost">
            {page.contact} <ArrowUpRight />
          </TransitionLink>
        </div>
      </motion.section>

      <motion.div className={`card ${styles.visualCard}`} {...enter(0.12)}>
        <ProjectVisual variant={project.visual} />
      </motion.div>

      <div className={styles.meta}>
        {meta.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className={`card ${styles.metaItem}`}>
            <span className="label">{item.label}</span>
            <strong>{item.value}</strong>
          </Reveal>
        ))}
      </div>

      {/* ---------- Overview ---------- */}
      <section className="section">
        <Reveal className="section-head">
          <h2>{page.overview}</h2>
        </Reveal>
        <div className={styles.overview}>
          <Reveal className={`card ${styles.context}`}>
            <p>{details.context}</p>
          </Reveal>
          <Reveal delay={0.08} className={`card card-cream ${styles.objectives}`}>
            <span className="label">{page.objectives}</span>
            <ol>
              {details.objectives.map((objective, i) => (
                <li key={objective}>
                  <span className="mono">{pad(i + 1)}</span>
                  <p>{objective}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- Pipeline ---------- */}
      <section className="section">
        <Reveal className="section-head">
          <h2>{page.pipeline}</h2>
        </Reveal>
        <div className={styles.steps}>
          {details.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07} className={`card ${styles.step}`}>
              <span className={styles.stepNum}>{pad(i + 1)}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Highlights & stack ---------- */}
      <section className="section">
        <Reveal className="section-head">
          <h2>{page.highlights}</h2>
        </Reveal>
        <div className={styles.split}>
          <Reveal className={`card ${styles.highlights}`}>
            <ul>
              {details.highlights.map((h) => (
                <li key={h}>
                  <span className={styles.checkDot}>
                    <Check />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className={`card ${styles.stack}`}>
            <span className="label">{page.stack}</span>
            <ul>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- Next project ---------- */}
      {next && next.slug !== project.slug && (
        <section className="section">
          <Reveal>
            <Link href={`/projects/${next.slug}`} className={`card ${styles.next}`}>
              <div className={styles.nextVisual}>
                <ProjectVisual variant={next.visual} />
              </div>
              <div className={styles.nextText}>
                <span className="label">
                  {page.next} · {pad(nextIndex + 1)}
                </span>
                <span className={styles.nextTitle}>{next.title}</span>
                <span className={styles.nextDesc}>{next.description}</span>
              </div>
              <span className={styles.nextArrow} aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </Reveal>
        </section>
      )}
    </div>
  );
}
