import { projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Terminal, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Shoaib Sami`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted">{project.year}</span>
            <span className="text-xs font-mono text-muted">• {project.status}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted font-light leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
              >
                <Terminal className="w-4 h-4" />
                View Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Hero Preview */}
        <div className="relative rounded-2xl overflow-hidden bg-card border border-white/5 aspect-video mb-24 flex items-center justify-center bg-[#0a0510] shadow-2xl">
          {project.iframeUrl ? (
            <iframe 
              src={project.iframeUrl} 
              className="w-full h-full border-0" 
              title={project.title}
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A1544] to-[#0F071D] flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(168,85,247,0.4)] border border-primary/30">
                <span className="text-5xl font-mono text-primary font-light">Σ</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide opacity-90 mb-4">{project.title}</h2>
              <p className="text-primary/70 font-mono tracking-widest uppercase">{project.category}</p>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-16">
            
            {project.problem && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">The Problem</h2>
                <p className="text-muted font-light leading-relaxed text-lg">
                  {project.problem}
                </p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">The Solution</h2>
                <p className="text-muted font-light leading-relaxed text-lg">
                  {project.solution}
                </p>
              </section>
            )}

            {project.architecture && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">Architecture & Implementation</h2>
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-muted font-light leading-relaxed text-lg">
                    {project.architecture}
                  </p>
                </div>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">Key Capabilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✦</span>
                      <span className="text-muted font-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">Technical Challenges</h2>
                <p className="text-muted font-light leading-relaxed text-lg border-l-2 border-white/10 pl-6 py-2">
                  {project.challenges}
                </p>
              </section>
            )}

            {project.results && (
              <section>
                <h2 className="text-2xl font-medium mb-4 text-white">Results & Impact</h2>
                <p className="text-muted font-light leading-relaxed text-lg">
                  {project.results}
                </p>
              </section>
            )}
            
          </div>

          <aside className="space-y-8">
            <div className="p-6 rounded-2xl bg-card border border-white/5">
              <h3 className="text-sm font-mono text-muted mb-4">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-muted/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
