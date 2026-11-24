export type Locale = "en" | "fr";

export interface NavLink {
  id: string;
  label: string;
}

export interface SkillGroup {
  title: string;
  tags: string[];
}

export type SkillIcon = "pipeline" | "chart" | "spark" | "code" | "cloud" | "dashboard";

/** One row of the Skills accordion. */
export interface SkillItem {
  name: string;
  summary: string;
  /** Filter category; rows with the same text share a filter pill. */
  category: string;
  icon: SkillIcon;
  /** Slug of a related project, shown as a card when the row is open. */
  project: string;
  /** Opening sentence of the "What I do" panel. */
  intro: string;
  does: string[];
  focus: string[];
  stack: string[];
}

/** A company or school logo; `src` stays empty until the image is added (initials show instead). */
export interface Logo {
  src: string;
  initials: string;
  /** "cover" fills the circle (round logos); default "contain" keeps the whole logo with padding. */
  fit?: "contain" | "cover";
}

export interface Experience {
  role: string;
  logo?: Logo;
  company: string;
  period: string;
  location: string;
  tags: string[];
  points: string[];
}

/** Which illustrated mockup a project card shows. */
export type ProjectVisualKind =
  | "mobile"
  | "detection"
  | "classification"
  | "lineage"
  | "airflow"
  | "sql"
  | "chart"
  | "predictor";

export interface Project {
  /** URL segment of the detail page: /projects/<slug>. Must be identical in every language. */
  slug: string;
  visual: ProjectVisualKind;
  period: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  link?: string;
  /** Long-form content shown on the project detail page. */
  details: {
    type: string;
    context: string;
    objectives: string[];
    steps: { title: string; text: string }[];
    highlights: string[];
  };
}

export interface ProjectPageLabels {
  back: string;
  project: string;
  type: string;
  period: string;
  category: string;
  stack: string;
  overview: string;
  objectives: string;
  pipeline: string;
  highlights: string;
  next: string;
  contact: string;
}

export interface Degree {
  title: string;
  logo?: Logo;
  school: string;
  period: string;
  location: string;
  level: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    home: string;
    links: NavLink[];
    cta: string;
    menu: string;
    close: string;
    language: string;
    prev: string;
    next: string;
  };
  hero: {
    role: string;
    available: string;
    title: string;
    bio: string;
    cta: string;
    secondary: string;
    location: string;
  };
  stats: {
    localTime: string;
    daylight: string;
    night: string;
    city: string;
    experience: string;
    experienceValue: string;
    experienceUnit: string;
    currently: string;
    currentlyValue: string;
    graduated: string;
    graduatedValue: string;
    graduatedUnit: string;
    toolsLabel: string;
  };
  sections: {
    work: string;
    workIntro: string;
    about: string;
    aboutIntro: string;
    experience: string;
    skills: string;
    skillsIntro: string;
    contact: string;
  };
  about: {
    statement: string;
    statementMuted: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    pipeline: { title: string; steps: { label: string; tool: string }[]; caption: string };
    principles: { title: string; text: string }[];
  };
  experience: {
    cta: string;
    label: string;
    columns: [string, string, string];
    latest: string;
    items: Experience[];
  };
  skills: {
    eyebrow: string;
    /** Word after the count, e.g. "09 skills". */
    countLabel: string;
    all: string;
    related: string;
    labels: { does: string; focus: string; stack: string; viewProject: string };
    items: SkillItem[];
  };
  projects: {
    viewCode: string;
    viewProject: string;
    featured: string;
    /** Card that fills an empty slot in the two-column grid. */
    more: { title: string; text: string; cta: string };
    page: ProjectPageLabels;
    items: Project[];
  };
  education: { title: string; label: string; items: Degree[]; languagesTitle: string; languages: { name: string; level: string; /** Filled bars out of 5 */ score: number }[] };
  contact: {
    note: string;
    available: string;
    title: string;
    text: string;
    cta: string;
    channels: { email: string; phone: string; github: string; cv: string };
  };
  contactPage: {
    metaTitle: string;
    title: string;
    intro: string;
    direct: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    submit: string;
    sending: string;
    sent: string;
    mailOpened: string;
    failed: string;
    subject: string;
    aboutProject: string;
  };
  footer: {
    tagline: string;
    work: string;
    about: string;
    contact: string;
    rights: string;
  };
}
