import type { Metadata } from "next";
import { en } from "@/content/en";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: en.contactPage.metaTitle,
  description: en.contactPage.intro,
  openGraph: { title: en.contactPage.metaTitle, description: en.contactPage.intro, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <main>
        <ContactForm />
      </main>
      <Footer />
      <Dock current="contact" />
    </>
  );
}
