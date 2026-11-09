import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Mail,
  Music,
  Palette,
  Camera,
  Sparkles,
  Server,
  Rocket,
  Lightbulb,
  Award,
  FolderGit2,
  Instagram,
  Linkedin,
  Phone,
} from "lucide-react";
import { MeetPalak } from "@/components/MeetPalak";
import portrait from "@/assets/palak-portrait.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { CONTACTS } from "@/lib/portfolio-experience";
import { DiaryExperience } from "@/components/diary/DiaryExperience";
import { CertificatesSection } from "@/components/certificates/CertificatesSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TechStack3D } from "@/components/TechStack3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palak Tripathi — Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Palak Tripathi, a Computer Science and Business Systems student building digital experiences with code and creativity.",
      },
      { property: "og:title", content: "Palak Tripathi — Code & Creativity" },
      {
        property: "og:description",
        content:
          "Meet Palak: CSBS student, aspiring full-stack developer and creative technologist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: portrait.url },
      { name: "twitter:image", content: portrait.url },
    ],
  }),
  component: Index,
});

const NAV = [
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Projects", "#projects"],
  ["Certificates", "#certificates"],
  ["Beyond Code", "#beyond"],
  ["Contact", "#contact"],
];

const STACK = [
  { group: "Frontend", icon: Code2, items: ["HTML", "CSS", "JavaScript", "React"] },
  { group: "Backend", icon: Server, items: ["Node.js", "Express"] },
  { group: "Languages", icon: Sparkles, items: ["Java", "JavaScript"] },
  { group: "Databases", icon: Database, items: ["SQL basics"] },
  { group: "Tools", icon: GitBranch, items: ["Git", "GitHub", "VS Code"] },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <p className="reveal text-sm font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="reveal mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Index() {
  useReveal();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-4 z-40 mx-auto flex w-[min(92%,64rem)] items-center justify-between rounded-full glass px-5 py-3 shadow-card">
        <a href="#top" className="font-display text-lg font-bold">
          <span className="text-gradient">Palak</span>.dev
        </a>
        <nav className="hidden gap-6 text-sm font-semibold text-muted-foreground md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Let's talk
        </a>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 bg-sky" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 lg:grid-cols-[1fr_1.15fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-cyan" /> Aspiring Full-Stack Developer
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Building Digital Experiences with{" "}
              <span className="text-gradient">Code & Creativity.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Computer Science and Business Systems student exploring full-stack development,
              creative technology, and meaningful software projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
              >
                Explore Portfolio <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="rounded-full border border-border bg-card px-6 py-3.5 font-semibold transition hover:bg-accent"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="animate-rise" style={{ animationDelay: ".2s" }}>
            <MeetPalak />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Press <b className="text-primary">Meet Palak</b> to hear my introduction 🔊
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        eyebrow="About me"
        title={
          <>
            More Than Code. <span className="text-gradient">A Mind That Loves to Create.</span>
          </>
        }
      >
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal relative mx-auto w-full max-w-sm">
            <div
              className="absolute -inset-2 rounded-[2.4rem] bg-brand animate-float"
              aria-hidden
            />
            <div
              className="absolute -left-8 -top-8 h-24 w-24 rounded-3xl border-2 border-cyan animate-spin-slow"
              aria-hidden
            />
            <img
              src={portrait.url}
              alt="Palak Tripathi at her desk"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-glow"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 rounded-2xl glass px-4 py-3 font-mono text-sm shadow-card animate-float">
              <span className="text-primary">const</span> passion ={" "}
              <span className="text-electric">"build"</span>;
            </div>
          </div>
          <div className="reveal space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm Palak — a student of Computer Science and Business Systems who enjoys turning
              ideas into working, beautiful software. I love learning how things are built, then
              building my own version of them.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: GraduationCap, t: "Education", d: "B.Tech in CSBS" },
                { icon: Lightbulb, t: "Interests", d: "Web dev & creative tech" },
                { icon: Rocket, t: "Direction", d: "Full-stack developer" },
              ].map(({ icon: I, t, d }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1"
                >
                  <I className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold">{t}</h3>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* STACK */}
      <div className="bg-[#0b0f19] py-6">
        <Section id="stack" eyebrow="Technology stack" title="Tools I learn and build with">
          <TechStack3D />
        </Section>
      </div>

      {/* PROJECTS */}
      <ProjectsSection />

      {/* CERTIFICATIONS & ACHIEVEMENTS */}
      <CertificatesSection />

      {/* BEYOND */}
      <section
        id="beyond"
        className="scroll-mt-24 border-y border-pink-200/60 bg-gradient-to-b from-[#fdf2f4] via-[#fcf8f2] to-[#f6f2fa] py-16"
      >
        <DiaryExperience />
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24">
        <div className="reveal relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-navy px-8 py-16 text-center text-primary-foreground shadow-glow">
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-electric opacity-40 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-cyan opacity-30 blur-3xl" />
          <h2 className="relative text-4xl font-bold md:text-5xl">
            Have an idea worth building?
            <br />
            <span className="text-cyan">Let's connect.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md opacity-80">
            Code, creativity or a new opportunity — I'd love to hear from you.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="bg-primary-foreground text-navy hover:bg-primary-foreground/90"
              size="lg"
            >
              <a href={CONTACTS.email}>
                <Mail /> Email me
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-primary-foreground/30 hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram /> Instagram
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-primary-foreground/30 hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <a href={CONTACTS.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-primary-foreground/30 hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <a href={CONTACTS.phone}>
                <Phone /> Call me
              </a>
            </Button>
          </div>
          <a
            href={CONTACTS.email}
            className="relative mt-6 inline-block break-all text-sm text-cyan underline-offset-4 hover:underline"
          >
            palak09.learner@gmail.com
          </a>
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Palak Tripathi · Built with code & creativity ·{" "}
          <a href="/travel#credits" className="text-cyan underline-offset-4 hover:underline">
            Photo credits
          </a>
        </p>
      </section>
    </div>
  );
}
