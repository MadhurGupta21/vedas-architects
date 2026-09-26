# Vedas Design and Build — studio website

Static marketing site for the architecture practice of Mayank Gupta. One
long page, built with React 19 + TanStack Start (Vite) and Tailwind CSS v4.

## Where things live

| Path                        | What it holds                                                            |
| --------------------------- | ------------------------------------------------------------------------ |
| `src/routes/index.tsx`      | The page itself — hero, marquee, Portfolio, About, and Contact            |
| `src/routes/__root.tsx`     | Sticky header, footer, search-engine metadata                             |
| `src/components/`           | Header, footer, and shared interface elements                             |
| `src/data/site.ts`          | **All wording, contact details and project entries — edit this one file** |
| `src/assets/`               | Logo and project photographs                                              |
| `src/styles.css`            | Colours, fonts, motion                                                    |

## Run locally

```bash
bun install     # or: npm install
bun run dev     # http://localhost:8080
bun run build   # production build
```

## Enquiry form

The contact form opens the visitor's email app with their answers pre-filled
and addressed to the studio — no backend or paid service needed.

## 1. Put the code on GitHub

Create an **empty** repository on GitHub (no README, no .gitignore, no
licence) called `vedas-site`, then from the project folder:

```bash
git init -b main
git add -A
git commit -m "Vedas Design and Build website"
git remote add origin https://github.com/<your-username>/vedas-site.git
git push -u origin main
```

If the website is edited in Lovable again, use **Project Settings → GitHub** to
connect the same repository and push the changes from there, or pull the
updated code and repeat the `git add / commit / push` above.

## 2. Connect Vercel

1. Sign in at [vercel.com](https://vercel.com) with the same GitHub account.
2. **Add New → Project → Import Git Repository** → choose `vedas-site`.
3. Keep **Framework Preset: Other**, build command `npm run build`, output
   directory empty — the build writes its own Vercel output.
4. Under **Environment Variables**, add exactly one:

   ```
   NITRO_PRESET = vercel
   ```

   (Production, Preview and Development.) Without it the server build targets
   the wrong host and the deploy will not start.
5. **Deploy**. You get a free `vedas-site.vercel.app` address that works while
   the domain is being pointed.

From now on every `git push` to `main` redeploys automatically; pull requests
get their own preview URL.

## 3. Point the GoDaddy domain at Vercel

First tell Vercel the domain: **Project → Settings → Domains → Add** →
`yourdomain.com`. It will list the DNS records it expects.

Then in GoDaddy: **My Products → your domain → DNS → Edit**, and make these
changes (names stay as GoDaddy shows them — `@` means the bare domain):

| Type   | Name  | Value                |
| ------ | ----- | -------------------- |
| A      | `@`   | `76.76.21.21`        |
| CNAME  | `www` | `cname.vercel-dns.com` |

- Delete GoDaddy's own `A` record for `@` (it points at their parking page),
  any `AAAA` record for `@`, any `www` CNAME that points elsewhere, and turn
  off **Forwarding** if it is on — those are what block the new records.
- Leave every `MX` and email-related `TXT` record (SPF/DKIM/DMARC) untouched so
  the studio's email keeps working. There is no need to change nameservers.
- Add both `yourdomain.com` **and** `www.yourdomain.com` in Vercel so one
  redirects to the other.

Vercel checks the records itself, shows **Valid**, and issues the HTTPS
certificate automatically — usually within minutes, occasionally up to a few
hours. No other setting is needed for `https://`.

## Troubleshooting

- **Build fails with a Node or Vite engine error** — add a file named `.nvmrc`
  containing `22` to the repository root, or set **Node.js Version** in
  Vercel → Settings → General → Build & Development.
- **Deploy builds but the page is blank or 500s** — the `NITRO_PRESET = vercel`
  environment variable is missing or misspelled; add it and redeploy.
- **Domain stays "Pending"** — open the DNS page in GoDaddy and confirm the old
  parking `A` record is really gone and the new one is exactly `76.76.21.21`;
  check propagation at <https://dnschecker.org>.
- **Photos missing on Vercel but fine in the preview** — an image was added
  through Lovable's asset storage and left as a `.asset.json` pointer. Put the
  actual `.jpg`/`.webp` file in `src/assets/` and import that instead.
