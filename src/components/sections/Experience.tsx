"use client";

import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Education } from "./Education";
import { StoryCarousel, type Story } from "./StoryCarousel";

export function Experience() {
  const { t, locale } = useLanguage();
  const { experience } = t;

  // Main achievement as the large sentence, the other points as smaller lines.
  const stories: Story[] = experience.items.map((item) => ({
    statement: item.points[0],
    details: item.points.slice(1),
    logo: item.logo,
    title: item.role,
    subtitle: `${item.company} · ${item.location} · ${item.period}`,
    tags: item.tags,
  }));

  return (
    <>
      <section id="experience" className="container section">
        <Reveal className="section-head">
          <h2>{t.sections.experience}</h2>
          <a href={site.cv[locale]} download className="btn btn-ghost">
            {experience.cta} <ArrowUpRight />
          </a>
        </Reveal>
        <Reveal>
          <StoryCarousel label={experience.label} stories={stories} />
        </Reveal>
      </section>
      <Education />
    </>
  );
}
