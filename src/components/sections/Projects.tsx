"use client";

import Link from "next/link";
import { useState } from "react";
import { site, type Project } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight, Github } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/widgets/ProjectVisual";
import styles from "./Projects.module.css";

/**
 * Selected work, laid out like the reference: the first project as a wide, shorter
 * featured card, then the rest two per row. An odd slot is filled with a GitHub card.
 */
export function Projects() {
  const { t } = useLanguage();
  const { projects } = t;
  const [featured, ...rest] = projects.items;

  return (
    <section id="projects" className="container section">
      <Reveal className="section-head">
        <h2>{t.sections.work}</h2>
        <p>{t.sections.workIntro}</p>
      </Reveal>

      <div className={styles.list}>
        {featured && <ProjectCard project={featured} featured />}

        {rest.length > 0 && (
          <div className={styles.grid}>
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
            ))}
            {rest.length % 2 === 1 && <MoreCard delay={rest.length * 0.08} />}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Details stay hidden until the card is hovered (or focused). On touch screens, which have
 * no hover, the first tap reveals them and a second tap opens the project.
 */
function useTapToReveal() {
  const [open, setOpen] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    if (!open && window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setOpen(true);
    }
  };
  return { open, onClick };
}

function ProjectCard({ project, featured = false, delay = 0 }: { project: Project; featured?: boolean; delay?: number }) {
  const { t } = useLanguage();
  const { projects } = t;
  const { open, onClick } = useTapToReveal();

  return (
    <Reveal
      delay={delay}
      className={`card ${styles.card} ${featured ? styles.featured : styles.small}`}
      data-open={open || undefined}
    >
      {/* Overlay link keeps the whole card clickable without nesting the "View code" link inside it */}
      <Link
        href={`/projects/${project.slug}`}
        className={styles.cardLink}
        aria-label={`${projects.viewProject}: ${project.title}`}
        onClick={onClick}
      />

      <div className={styles.media}>
        <ProjectVisual variant={project.visual} className={styles.visual} />
        {featured && <span className={styles.flag}>{projects.featured}</span>}

        {/* Hidden details: slide up over the mockup on hover / focus / first tap */}
        <div className={styles.reveal}>
          <p className={styles.desc}>{project.description}</p>
          <div className={styles.revealFoot}>
            <div className={styles.chips}>
              <span className="chip">{project.category}</span>
              {project.stack.slice(0, 2).map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className={`btn btn-ghost ${styles.code}`}>
                <Github size={13} /> {projects.viewCode}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>
          {project.title}
          <span>{project.period}</span>
        </h3>
        <span className={styles.arrow} aria-hidden>
          <ArrowUpRight />
        </span>
      </div>
    </Reveal>
  );
}

function MoreCard({ delay }: { delay: number }) {
  const { t } = useLanguage();
  const { more } = t.projects;
  const { open, onClick } = useTapToReveal();

  return (
    <Reveal delay={delay} className={`card ${styles.card} ${styles.small}`} data-open={open || undefined}>
      <a
        href={site.github}
        target="_blank"
        rel="noreferrer"
        className={styles.cardLink}
        aria-label={more.title}
        onClick={onClick}
      />
      <div className={styles.media}>
        <div className={styles.moreStage} aria-hidden>
          <Github size={220} className={styles.moreMark} />
          <div className={styles.term}>
            <div className={styles.termBar}>
              <span />
              <span />
              <span />
              <p>zsh</p>
            </div>
            <p>
              <span className={styles.prompt}>$</span> git clone github.com/{site.githubHandle}
            </p>
            <p className={styles.termMuted}>Cloning into &apos;data-projects&apos;…</p>
            <p className={styles.termMuted}>remote: Enumerating objects: done.</p>
            <p>
              <span className={styles.ok}>✓</span> ready <span className={styles.cursor} />
            </p>
          </div>
        </div>

        <div className={styles.reveal}>
          <p className={styles.desc}>{more.text}</p>
          <div className={styles.revealFoot}>
            <div className={styles.chips}>
              <span className="chip">
                <Github size={11} /> {more.cta}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>
          {more.title}
          <span>@{site.githubHandle}</span>
        </h3>
        <span className={styles.arrow} aria-hidden>
          <ArrowUpRight />
        </span>
      </div>
    </Reveal>
  );
}
