"use client";

import Image from "next/image";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { FlipText } from "@/components/ui/FlipText";
import styles from "./Contact.module.css";

export function Contact() {
  const { t, locale } = useLanguage();
  const { contact } = t;

  const links = [
    { href: site.github, label: contact.channels.github, external: true },
    { href: site.cv[locale], label: contact.channels.cv, download: true },
    { href: site.phoneHref, label: contact.channels.phone },
  ];

  return (
    <section id="contact" className="container section">
      <Reveal className={`card card-cream ${styles.card}`}>
        <div className={styles.top}>
          <div className={styles.note}>
            <span className={styles.avatar}>
              <Image src={site.avatar} alt="" fill sizes="28px" className={styles.cover} />
            </span>
            <span>{contact.note}</span>
          </div>
          <span className="badge">
            <span className="badge-dot" aria-hidden />
            {contact.available}
          </span>
        </div>

        {/* 3D flip reveal on scroll; letters start light so they read on the cream card */}
        <h2 className={styles.title}>
          {/* Finishes higher than the default: at the page bottom this title can't scroll above ~55% */}
          <FlipText segments={[{ text: contact.title }]} from="#cfccc3" range={[0.95, 0.62]} />
        </h2>
        <p className={styles.text}>{contact.text}</p>

        <div className={styles.bottom}>
          <div className={styles.actions}>
            <TransitionLink href="/contact" className="btn btn-dark btn-lg">
              {contact.cta} <ArrowUpRight />
            </TransitionLink>
            <a href={`mailto:${site.email}`} className="btn btn-outline btn-lg">
              {site.email}
            </a>
          </div>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  download={link.download || undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
