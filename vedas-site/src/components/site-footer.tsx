import { site } from "@/data/site";
import logo from "@/assets/vedas-logo.webp";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <img
              src={logo}
              alt="Vedas Design and Build"
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Architecture, interiors and turnkey builds, led by {site.principal} from Faridabad and
              delivered across India.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label text-primary-foreground/40">Studio</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-primary-foreground/75">
              {site.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>

          <div className="md:col-span-3">
            <p className="label text-primary-foreground/40">Contact</p>
            <div className="mt-5 space-y-2 text-sm text-primary-foreground/75">
              <p>
                <a href={`mailto:${site.email}`} className="rule-link">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="rule-link">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="label mt-16 flex flex-col justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-primary-foreground/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Architecture · Interiors · Builds</span>
        </div>
      </div>
    </footer>
  );
}
