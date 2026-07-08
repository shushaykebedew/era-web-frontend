# ERA 2026 — Ethiopia Real Estate Awards

Next.js (App Router) + TypeScript + Tailwind CSS v4 implementation, built to absorb
ongoing design changes without major rewrites.

## Getting started

```bash
npm install
npm run dev
```

> **Fonts:** `src/app/layout.tsx` currently uses system font stacks because this
> sandbox has no network access to Google Fonts. In a normal environment, swap
> in `next/font/google` for Playfair Display (serif/display) and Inter (UI).

## Architecture overview

```
src/
  app/
    layout.tsx              # Root layout (fonts, metadata)
    globals.css              # Design tokens (Tailwind v4 @theme)
    (marketing)/              # Route group for all public marketing pages
      layout.tsx              # Header + Footer shell
      page.tsx                 # Homepage
      about/                   # "The Awards" page (mission, values, roadmap)
      awards/                  # Category index + /awards/[id] detail
      nominees/                # Nominee index + /nominees/[id] detail
      gallery/ archives/ partners/  # Placeholder pages (design pending)
  components/
    ui/         # Generic, presentation-only primitives (Button, Badge, Container...)
    layout/     # Header, Footer -- app chrome
    sections/   # Page-level composed sections (Hero, AwardCategoriesSection...)
  data/         # Fixture data standing in for a future CMS/API
  types/        # Shared domain types (AwardCategory, Nominee, ...)
  config/       # Non-visual site config (nav links, CTA copy, ceremony date)
  lib/          # Pure utilities (cn, date/countdown helpers)
```

### Why this structure

- **`ui/` vs `sections/`** -- `ui/` components know nothing about the
  business domain (a `Button` doesn't know what "Vote Now" means); `sections/`
  components compose `ui/` primitives with domain data (`Nominee`,
  `AwardCategory`) into the actual page blocks shown in the screenshots. This
  split means redesigning a single page section never risks breaking a shared
  primitive used elsewhere.
- **`data/` is the single seam for a future backend.** Every page currently
  imports fixtures from `data/*.ts`. When a real CMS/API exists, only those
  files (or the server-side fetch wrapping them) need to change -- components
  and types stay the same since they're already written against the `types/`
  contracts.
- **Design tokens, not hardcoded colors.** `globals.css` defines the palette
  once (`--primary`, `--background`, `--foreground`, etc.) and Tailwind v4's
  `@theme inline` block exposes them as utilities (`bg-primary`,
  `text-foreground-muted`, ...). Components never reference raw hex values --
  re-theming the whole site (new brand color, light mode, etc.) means editing
  `globals.css` only.
- **Route groups (`(marketing)`)** keep the shared Header/Footer chrome
  scoped to public pages, leaving room to add an `(admin)` or `(auth)` group
  later without affecting this layout.
- **Polymorphic `Button`** (`as` prop) lets the same styled component render
  as a `<button>`, a Next.js `<Link>`, or any other element/component,
  avoiding duplicate "Button vs LinkButton" components.

### Extending the design

- New award categories / nominees -> add entries to `src/data/*.ts`; pages
  driven by `generateStaticParams` pick them up automatically.
- New section layouts -> add a component to `components/sections/`, keep all
  configurable copy as props (with sensible defaults) like `Hero` and
  `MissionSection` already do.
- New color/typography -> edit tokens in `globals.css` only.
- Placeholder pages (`gallery`, `archives`, `partners`) are intentionally
  minimal -- they follow the same structural pattern as finished pages so
  they're quick to flesh out later.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```
