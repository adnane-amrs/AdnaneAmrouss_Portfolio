"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { StoryCarousel, type Story } from "./StoryCarousel";
import styles from "./Experience.module.css";

/** Degrees as a story carousel (school logo underneath), then spoken languages. */
export function Education() {
  const { t } = useLanguage();
  const { education } = t;

  const stories: Story[] = education.items.map((degree) => ({
    statement: degree.title,
    logo: degree.logo,
    title: degree.school,
    subtitle: `${degree.location} · ${degree.period}`,
    tags: [degree.level],
  }));

  return (
    <section id="education" className="container section">
      <Reveal className="section-head">
        <h2>{education.title}</h2>
      </Reveal>
      <Reveal>
        <StoryCarousel label={education.label} stories={stories} />
      </Reveal>

      <Reveal delay={0.08} className={`card ${styles.languages}`}>
        <span className="label">{education.languagesTitle}</span>
        <ul>
          {education.languages.map((lang) => {
            const level = Math.max(0, Math.min(5, lang.score));
            return (
              <li key={lang.name}>
                <div>
                  <h4>{lang.name}</h4>
                  <p>{lang.level}</p>
                </div>
                <span className={styles.meter} aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={i < level ? styles.on : ""} />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
