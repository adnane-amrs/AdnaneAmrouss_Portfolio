"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { SkillIcon } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight, ChevronDown, Cloud, Code, Dashboard, LineChart, Sparkle, Workflow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/widgets/ProjectVisual";
import styles from "./Skills.module.css";

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<SkillIcon, React.ReactNode> = {
  pipeline: <Workflow size={20} />,
  chart: <LineChart size={20} />,
  spark: <Sparkle size={20} />,
  code: <Code size={20} />,
  cloud: <Cloud size={20} />,
  dashboard: <Dashboard size={20} />,
};

/**
 * Skills as an accordion (tech-stack style): numbered rows with an icon, name and category;
 * opening a row reveals what I do in that field, focus areas, the tools I use and a related project.
 */
export function Skills() {
  const { t } = useLanguage();
  const { skills, projects } = t;
  const [filter, setFilter] = useState<string | null>(null);
  // Name of the open row (first one open by default so the feature is discoverable).
  const [open, setOpen] = useState<string | null>(skills.items[0]?.name ?? null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of skills.items) counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
    return [...counts.entries()];
  }, [skills.items]);

  const rows = skills.items
    .map((item, i) => ({ item, number: i + 1, project: projects.items.find((p) => p.slug === item.project) }))
    .filter((r) => !filter || r.item.category === filter);
  const total = skills.items.length;

  return (
    <section id="skills" className="container section">
      <Reveal className={styles.head}>
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden />
            {skills.eyebrow}
          </p>
          <h2 className={styles.title}>{t.sections.skills}</h2>
        </div>
        <p className={styles.intro}>{t.sections.skillsIntro}</p>
      </Reveal>

      <Reveal delay={0.05} className={styles.toolbar}>
        <div className={styles.filters} role="tablist" aria-label={t.sections.skills}>
          {[[null, total] as const, ...categories].map(([cat, n]) => {
            const active = filter === cat;
            return (
              <button
                key={cat ?? "all"}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.pill} ${active ? styles.pillActive : ""}`}
                onClick={() => setFilter(cat)}
              >
                {active && (
                  <motion.span layoutId="skills-filter" className={styles.pillBg} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                <span className={styles.pillText}>{cat ?? skills.all}</span>
                <span className={styles.pillCount}>{n}</span>
              </button>
            );
          })}
        </div>
        <p className={styles.count}>
          <strong>{pad(rows.length)}</strong>
          {filter ? ` / ${pad(total)}` : ""} {skills.countLabel}
        </p>
      </Reveal>

      <ul className={styles.list}>
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map(({ item, number, project }) => {
            const isOpen = open === item.name;
            const panelId = `skill-panel-${number}`;
            return (
              <motion.li
                key={item.name}
                layout
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                <button
                  type="button"
                  className={styles.row}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : item.name)}
                >
                  <span className={styles.index}>{pad(number)}</span>
                  <span className={styles.icon}>{icons[item.icon]}</span>
                  <span className={styles.nameBlock}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.category}>{item.category}</span>
                  </span>
                  <span className={styles.summary}>{item.summary}</span>
                  <span className={styles.toggle} aria-hidden>
                    <ChevronDown size={18} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-label={item.name}
                      className={styles.panelWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <div className={styles.panel}>
                        <motion.div
                          className={styles.does}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.1, ease }}
                        >
                          <p className={styles.panelLabel}>{skills.labels.does}</p>
                          <p className={styles.panelIntro}>{item.intro}</p>
                          <ul className={styles.doesList}>
                            {item.does.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </motion.div>

                        <motion.div
                          className={styles.tech}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.18, ease }}
                        >
                          <p className={styles.panelLabel}>{skills.labels.focus}</p>
                          <div className={styles.focus}>
                            {item.focus.map((f) => (
                              <span key={f} className={styles.focusChip}>
                                {f}
                              </span>
                            ))}
                          </div>
                          <p className={`${styles.panelLabel} ${styles.panelLabelGap}`}>{skills.labels.stack}</p>
                          <div className={styles.stack}>
                            {item.stack.map((tool, i) => (
                              <motion.span
                                key={tool}
                                className={styles.tool}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.22 + i * 0.025 }}
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>

                        {project && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.26, ease }}
                          >
                            <p className={styles.panelLabel}>{skills.related}</p>
                            <Link href={`/projects/${project.slug}`} className={styles.projectCard}>
                              <ProjectVisual variant={project.visual} className={styles.projectVisual} />
                              <span className={styles.projectTitle}>{project.title}</span>
                              <span className={styles.projectLink}>
                                {skills.labels.viewProject} <ArrowUpRight size={12} />
                              </span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
}
