import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import founderPhoto from "@/assets/mayank-gupta.jpeg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import { about, site } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vedas Design and Build — Architecture & Design-Build Studio, Faridabad" },
      {
        name: "description",
        content:
          "VEDAS Design & Build is an architecture, interiors and design-build practice in Faridabad, led by Mayank Gupta, B.Arch and COA Registered, serving clients across the NCR.",
      },
      {
        property: "og:title",
        content: "Vedas Design and Build — Architecture & Design-Build, Faridabad",
      },
      {
        property: "og:description",
        content:
          "Architecture, interiors, turnkey construction and approvals support across the NCR, led by Mayank Gupta, B.Arch and COA Registered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const portfolio = [
  { image: work1, title: "Corporate Workspace", location: "Office Interiors" },
  { image: work2, title: "Breakout Lounge", location: "Office Interiors" },
  { image: work3, title: "Green Welcome Wall", location: "Commercial Interiors" },
  { image: work4, title: "Terrace Café", location: "Hospitality" },
  { image: work5, title: "Skydeck Lounge", location: "Hospitality" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

function Home() {
  useReveal("home");
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + portfolio.length) % portfolio.length;
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setSlide(clamped);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const kids = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft - track.offsetLeft - left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setSlide(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[94svh] overflow-hidden">
        <img
          src={heroImage}
          alt="Concrete and timber house at golden hour with deep overhangs and a reflecting pool"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/92 via-ink/45 to-ink/70" />
        <div
          className="light-drift absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 55% at 50% 45%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[94svh] max-w-[1400px] flex-col justify-end px-6 pt-32 pb-8 md:px-10 md:pb-10">
          <p className="rise flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:150ms]">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent md:w-16" />
            <span className="font-mono text-[0.8rem] uppercase leading-snug tracking-[0.26em] text-ivory md:text-[1rem] md:tracking-[0.3em]">Architecture <span className="text-accent">·</span> Interiors <span className="text-accent">·</span> Design <span className="text-accent">&amp;</span> Build</span>
          </p>

          <h1 className="display mt-6 text-ivory text-[clamp(2.75rem,9vw,8rem)]">
            <span className="block overflow-hidden pb-[0.15em]">
              <span className="mask-up block">Designing Spaces.</span>
            </span>
            <span className="block overflow-hidden pb-[0.15em]">
              <span className="mask-up block italic text-accent [animation-delay:150ms]">Building Trust.</span>
            </span>
          </h1>

          <div className="rise mt-10 border-t border-ivory/20 pt-6 [animation-delay:600ms]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-ivory/80">
                VEDAS creates timeless spaces where thoughtful design, material and craftsmanship come together.
                From the first idea to the final detail, we design with purpose and build with trust.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("portfolio")}
                className="label rule-link shrink-0 py-2 text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
              >
                View portfolio ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-secondary py-5 md:py-6">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                "ARCHITECTURE",
                "INTERIORS",
                "DESIGN & BUILD",
                "VASTU",
                "CONSTRUCTION",
                "TURNKEY",
                "RESIDENTIAL",
                "COMMERCIAL",
              ].map((word) => (
                <span key={word} className="font-display flex items-center gap-16 text-3xl tracking-wide md:text-4xl">
                  {word}
                  <span className="text-accent text-xs">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio — carousel */}
      <section id="portfolio" className="scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-12">
          <div className="mb-6 flex items-end justify-between gap-6 border-b border-border pb-5">
            <div>
              <p className="label reveal mb-2 text-accent">Selected Work</p>
              <h2 className="display reveal text-[clamp(2rem,5vw,3.5rem)]">Portfolio</h2>
            </div>
            <div className="reveal flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => goTo(slide - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => goTo(slide + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth bg-secondary/40 px-10 py-8 md:gap-8 md:px-24 md:py-10 lg:px-32"
        >
          {portfolio.map((p) => (
            <figure key={p.title} className="group w-[76vw] shrink-0 snap-start first:ml-6 last:mr-6 sm:w-[54vw] lg:w-[38vw]">
              <div className="overflow-hidden rounded-sm bg-concrete">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.location}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-4/3 w-full scale-105 object-cover transition-transform duration-[1200ms] ease-arc group-hover:scale-100"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
                <span className="display text-xl">{p.title}</span>
                <span className="label shrink-0">{p.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-[1400px] items-center gap-2 px-6 md:px-10">
          {portfolio.map((p, i) => (
            <button
              key={p.title}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 ${
                i === slide ? "w-10 bg-accent" : "w-4 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
          <div className="border-b border-border pb-5">
            <p className="label reveal mb-2 text-accent">{about.eyebrow}</p>
            <h2 className="display reveal max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)]">{about.title}</h2>
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-4">
              <div className="overflow-hidden rounded-sm bg-concrete">
                <img
                  src={founderPhoto}
                  alt={`${site.principal}, ${site.principalRole} at VEDAS`}
                  width={800}
                  height={1024}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover object-top"
                />
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="display text-2xl">{site.principal}</p>
                <p className="label mt-2">{site.principalRole}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.principalCredential}</p>
              </div>
            </div>

            <div className="reveal md:col-span-8">
              <p className="display whitespace-normal text-[clamp(1.35rem,3vw,2.5rem)] leading-[1.16] sm:whitespace-nowrap">
                {about.lead} <span className="italic text-accent">{about.leadAccent}</span>
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">{about.intro}</p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {about.paragraphs.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
                {about.facts.map((fact) => (
                  <div key={fact.k}>
                    <p className="font-display text-xl leading-snug">{fact.v}</p>
                    <p className="label mt-2">{fact.k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="mt-16">
            <div className="border-b border-border pb-5">
              <p className="label reveal mb-2 text-accent">{about.servicesEyebrow}</p>
              <h3 className="display reveal text-[clamp(1.5rem,3.5vw,2.25rem)]">{about.servicesTitle}</h3>
            </div>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {about.services.map((service) => (
                <div
                  key={service.n}
                  className="reveal h-full bg-background p-6 transition-colors duration-300 hover:bg-secondary/60"
                >
                  <p className="label text-accent">{service.n}</p>
                  <p className="display mt-4 text-xl leading-snug">{service.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="border-t border-border bg-concrete/40">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
          <p className="label reveal text-center text-accent">{about.approach.eyebrow}</p>
          <blockquote className="display reveal mx-auto mt-6 max-w-[22ch] text-center text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.14]">
            {about.approach.line} <span className="italic text-accent">{about.approach.lineAccent}</span>
          </blockquote>
          <p className="reveal mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {about.approach.body}
          </p>
          <p className="reveal mx-auto mt-10 max-w-xl text-center">
            <span className="label block">{about.approach.objectiveLead}</span>
            <span className="display mt-3 inline-block text-xl italic leading-snug md:text-2xl">
              {about.approach.objective}
            </span>
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
          <div className="border-b border-border pb-5">
            <p className="label reveal mb-2 text-accent">Get in Touch</p>
            <h2 className="display reveal max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)]">
              Contact Us <span className="text-accent italic">Within Seconds.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-5">
              <div className="space-y-8">
                <div>
                  <p className="label">Email</p>
                  <a href={`mailto:${site.email}`} className="rule-link font-display mt-3 inline-block break-all text-xl sm:text-2xl">
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="label">Telephone</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="rule-link font-display mt-3 inline-block text-2xl"
                  >
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="label">Studio</p>
                  <address className="mt-3 space-y-1 text-base not-italic">
                    {site.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
                <div>
                  <p className="label">Hours</p>
                  <p className="mt-3 text-base">Monday to Sunday, 9AM To 7PM</p>
                </div>
              </div>
            </div>

            <div className="reveal md:col-span-7">
              <EnquiryFormMailto />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition placeholder:text-muted-foreground/70 hover:border-muted-foreground/50 focus:border-accent focus:ring-1 focus:ring-accent";

function EnquiryFormMailto() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Location: ${data.get("location")}`,
      `Project type: ${data.get("type")}`,
      "",
      String(data.get("brief") ?? ""),
    ];
    const subject = encodeURIComponent(`Project enquiry — ${data.get("name")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required className={inputClass} placeholder="Full name" />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Site location">
          <input name="location" className={inputClass} placeholder="City / area" />
        </Field>
        <Field label="Project type">
          <select name="type" className={inputClass} defaultValue="Residence">
            {["Residence", "Office / Workplace", "Commercial", "Interiors only", "Turnkey build", "Other"].map(
              (t) => (
                <option key={t}>{t}</option>
              ),
            )}
          </select>
        </Field>
      </div>
      <Field label="Tell us about the project">
        <textarea
          name="brief"
          rows={5}
          className={inputClass}
          placeholder="Plot size, rooms, timing, budget range — anything you know so far."
        />
      </Field>
      <button
        type="submit"
        className="label inline-flex items-center gap-3 rounded-sm border border-foreground px-8 py-4 transition hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Send enquiry <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-sm text-muted-foreground">
        This opens your email app with the details pre-filled — just press send.
      </p>
    </form>
  );
}

