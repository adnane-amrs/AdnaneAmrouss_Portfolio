"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight, Github, Mail, Phone } from "@/components/ui/Icons";
import styles from "./ContactForm.module.css";

// Optional: a Formspree-compatible endpoint that accepts a JSON POST. Without it, the form opens a pre-filled email.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "mail" | "failed";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export function ContactForm() {
  const { t } = useLanguage();
  const c = t.contactPage;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // "Discuss this project" links here with ?project=<slug>: start the message with the project name.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("project");
    const project = t.projects.items.find((p) => p.slug === slug);
    if (project) setMessage((m) => m || `${c.aboutProject}: ${project.title}\n\n`);
  }, [t, c.aboutProject]);

  // Grow the message box with its content.
  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 140)}px`;
  }, [message]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ENDPOINT) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${c.subject} — ${name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("mail");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: `${c.subject} — ${name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("failed");
    }
  };

  const feedback = { sent: c.sent, mail: c.mailOpened, failed: c.failed }[status as "sent" | "mail" | "failed"];

  const channels = [
    { href: `mailto:${site.email}`, label: t.contact.channels.email, value: site.email, icon: <Mail /> },
    { href: site.phoneHref, label: t.contact.channels.phone, value: site.phone, icon: <Phone /> },
    { href: site.github, label: t.contact.channels.github, value: site.githubHandle, icon: <Github />, external: true },
  ];

  return (
    <section className={`container ${styles.page}`}>
      <motion.div className={`card ${styles.aside}`} {...fadeUp(0)}>
        <div className={styles.head}>
          <div className={styles.person}>
            <span className={styles.avatar}>
              <Image src={site.avatar} alt="" fill sizes="38px" className={styles.cover} />
            </span>
            <span className={styles.personText}>
              <strong>{site.name}</strong>
              <span>{t.hero.role}</span>
            </span>
          </div>
          <span className="badge">
            <span className="badge-dot" aria-hidden />
            {t.hero.available}
          </span>
        </div>

        <div className={styles.intro}>
          <h1 className={styles.title}>{c.title}</h1>
          <p>{c.intro}</p>
        </div>

        <div>
          <span className="label">{c.direct}</span>
          <ul className={styles.channels}>
            {channels.map((ch) => (
              <li key={ch.label}>
                <a href={ch.href} target={ch.external ? "_blank" : undefined} rel={ch.external ? "noreferrer" : undefined}>
                  <span className="icon-dot">{ch.icon}</span>
                  <span className={styles.channelText}>
                    <span className="label">{ch.label}</span>
                    <span>{ch.value}</span>
                  </span>
                  <ArrowUpRight className={styles.channelArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.form className={`card ${styles.form}`} onSubmit={submit} {...fadeUp(0.1)}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className="label">{c.fields.name.label}</span>
            <input
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={c.fields.name.placeholder}
            />
          </label>
          <label className={styles.field}>
            <span className="label">{c.fields.email.label}</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.fields.email.placeholder}
            />
          </label>
        </div>
        <label className={`${styles.field} ${styles.fieldMessage}`}>
          <span className="label">{c.fields.message.label}</span>
          <textarea
            ref={messageRef}
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={c.fields.message.placeholder}
          />
        </label>

        <div className={styles.submitRow}>
          {feedback ? (
            <motion.p
              className={`${styles.feedback} ${status === "failed" ? styles.feedbackError : ""}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
            >
              {feedback}
            </motion.p>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn-light btn-lg" disabled={status === "sending"}>
            {status === "sending" ? c.sending : c.submit} <ArrowUpRight />
          </button>
        </div>
      </motion.form>
    </section>
  );
}
