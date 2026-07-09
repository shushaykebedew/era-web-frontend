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
      page.tsx                 # Homepage (redirects to /awards)
      awards/                  # Award categories index + /awards/[id] detail
      categories/              # Award categories listing page
      nominees/                # Nominees index + /nominees/[id] detail
      gallery/                 # Gallery page with hero, grid, and CTA
      partners/                # Partners page with sponsorship tiers
  components/
    ui/         # Generic, presentation-only primitives (Button, Badge, Container...)
    layout/     # Header, Footer -- app chrome
  features/     # Page-level composed sections and domain-specific components
    awards/     # Award categories and nominees sections
    categories/ # Categories page content
    gallery/    # Gallery components (Hero, Grid, CTA)
    home/       # Home page sections
    nominees/   # Nominee cards, filters, and voting
    partners/   # Partner tiers, sponsorship form
  data/         # Fixture data standing in for a future CMS/API
  types/        # Shared domain types (AwardCategory, Nominee, Gallery, Partners, ...)
  utils/        # Pure utilities (cn, date/countdown helpers)
  fonts/        # Font files
```

### Why this structure

- **`ui/` vs `features/`** -- `ui/` components know nothing about the
  business domain (a `Button` doesn't know what "Vote Now" means); `features/`
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
- New section layouts -> add a component to `features/`, keep all
  configurable copy as props (with sensible defaults) like sections in
  `features/home/` and `features/gallery/` already do.
- New color/typography -> edit tokens in `globals.css` only.
- All public pages (`awards`, `categories`, `nominees`, `gallery`, `partners`)
  follow a consistent structural pattern for maintainability and extensibility.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```
