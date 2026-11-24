"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { FlipText } from "@/components/ui/FlipText";
import { Rocket, Target, Workflow } from "@/components/ui/Icons";
import styles from "./About.module.css";

const principleIcons = [<Workflow key="w" />, <Target key="t" />, <Rocket key="r" />];

export function About() {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="container section">
      <Reveal className="section-head">
        <h2>{t.sections.about}</h2>
        <p>{t.sections.aboutIntro}</p>
      </Reveal>

      <div className={styles.grid}>
        <Reveal className={`card ${styles.main}`}>
          {/* 3D flip reveal tied to scroll; the second half keeps its muted colour */}
          <h3 className={styles.statement}>
            <FlipText
              segments={[
                { text: `${about.statement} ` },
                { text: about.statementMuted, className: styles.statementMuted },
              ]}
            />
          </h3>
          <div className={styles.paragraphs}>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08} className={`card card-cream ${styles.pipeline}`}>
          <span className="label">{about.pipeline.title}</span>
          <div className={styles.nodesWrap}>
            <div className={styles.nodes}>
              <span className={styles.rail} aria-hidden>
                <i />
              </span>
              <ol>
                {about.pipeline.steps.map((step, i) => (
                  <li key={step.label}>
                    <span className={styles.nodeIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.nodeLabel}>{step.label}</span>
                    <span className={styles.nodeTool}>{step.tool}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <span className={`chip ${styles.caption}`}>{about.pipeline.caption}</span>
        </Reveal>
      </div>

      <div className={styles.principles}>
        {about.principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className={`card ${styles.principle}`}>
            <span className="icon-dot">{principleIcons[i]}</span>
            <div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
