import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { en } from "@/content/en";
import { site } from "@/content/site";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { Contact } from "@/components/sections/Contact";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return en.projects.items.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = en.projects.items.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ${site.name}`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, url: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!en.projects.items.some((p) => p.slug === slug)) notFound();

  return (
    <>
      <main>
        <ProjectDetail slug={slug} />
        <Contact />
      </main>
      <Footer />
      <Dock current="projects" />
    </>
  );
}
