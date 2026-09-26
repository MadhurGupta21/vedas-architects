import { useEffect, useState } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/vedas-logo.webp";
import { site } from "@/data/site";

const nav = [
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const overHero = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero
          ? "border-b border-transparent bg-transparent text-ivory"
          : "border-b border-border bg-background/95 text-foreground backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between gap-6 px-6 md:px-10">
        <button
          type="button"
          className="shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src={logo}
            alt="Vedas Design and Build"
            width={220}
            height={48}
            className={`h-8 w-auto max-w-none object-contain transition-all duration-500 md:h-9 ${
              overHero ? "brightness-0 invert" : ""
            }`}
          />
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={`label rule-link py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 ${
                active === item.id
                  ? "text-accent"
                  : overHero
                    ? "text-ivory/75 hover:text-ivory"
                    : "text-foreground/65 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 transition-transform duration-300 ${overHero ? "bg-ivory" : "bg-foreground"} ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 transition-transform duration-300 ${overHero ? "bg-ivory" : "bg-foreground"} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Prominent contact nudges */}
      <div
        className={`mx-auto max-w-[1400px] items-center justify-end gap-2 px-6 pb-3 transition-all duration-500 md:px-10 ${
          overHero ? "flex opacity-100" : "hidden opacity-0"
        }`}
      >
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          aria-label="Call"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/50 text-ivory shadow-sm backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/50 text-ivory shadow-sm backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.154 3.291h-.003c-1.44-.004-2.838-.388-4.06-1.107l-.29-.17-3.003.788 1.002-2.929-.211-.334a7.585 7.585 0 0 1-1.16-4.064c.003-4.229 3.44-7.665 7.671-7.665 2.052 0 3.98.799 5.428 2.248a7.65 7.65 0 0 1 2.244 5.434c-.003 4.229-3.44 7.666-7.672 7.666" />
          </svg>
        </a>
        <a
          href={`mailto:${site.email}`}
          aria-label="Mail"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/50 text-ivory shadow-sm backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-ink/50 text-ivory shadow-sm backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </div>

      <div
        className={`overflow-hidden border-t bg-background transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-96 border-border" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="font-display border-b border-border py-4 text-left text-2xl text-foreground last:border-0"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
