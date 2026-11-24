"use client";

import Link from "next/link";
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
        {featured && <ProjectCard project={featured} index={0} featured />}

        {rest.length > 0 && (
          <div className={styles.grid}>
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i + 1} delay={i * 0.08} />
            ))}
            {rest.length % 2 === 1 && <MoreCard delay={rest.length * 0.08} />}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  featured = false,
  delay = 0,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  delay?: number;
}) {
  const { t } = useLanguage();
  const { projects } = t;

  return (
    <Reveal delay={delay} className={`card ${styles.card} ${featured ? styles.featured : styles.small}`}>
      {/* Overlay link keeps the whole card clickable without nesting the "View code" link inside it */}
      <Link
        href={`/projects/${project.slug}`}
        className={styles.cardLink}
        aria-label={`${projects.viewProject}: ${project.title}`}
      />
      <div className={styles.media}>
        <ProjectVisual variant={project.visual} className={styles.visual} />
        {featured && <span className={styles.flag}>{projects.featured}</span>}
      </div>

      <div className={styles.meta}>
        <div className={styles.text}>
          <h3>
            {project.title}
            <span>{project.period}</span>
          </h3>
          <p>{project.description}</p>
        </div>

        <div className={styles.side}>
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
          <span className={styles.arrow} aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function MoreCard({ delay }: { delay: number }) {
  const { t } = useLanguage();
  const { more } = t.projects;

  return (
    <Reveal delay={delay} className={`card ${styles.card} ${styles.small}`}>
      <a href={site.github} target="_blank" rel="noreferrer" className={styles.cardLink} aria-label={more.title} />
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
      </div>

      <div className={styles.meta}>
        <div className={styles.text}>
          <h3>
            {more.title}
            <span>@{site.githubHandle}</span>
          </h3>
          <p>{more.text}</p>
        </div>
        <div className={styles.side}>
          <div className={styles.chips}>
            <span className="chip">
              <Github size={11} /> {more.cta}
            </span>
          </div>
          <span className={styles.arrow} aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Reveal>
  );
}
