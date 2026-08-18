# Ethiopia Real Estate Awards (ERA) 2026 — Public Web Platform

A luxury, high-performance public web portal for the **Ethiopian Real Estate Awards (ERA) 2026**. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Playwright / Vitest, this application provides an immersive experience for discovering architectural categories, browsing nominees, submitting nominations, casting public votes, accepting judge invitations, and exploring past ceremony archives.

---

## 🏛️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript (Strict ESM Mode)](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design Tokens
- **State & Data Fetching**: [@tanstack/react-query](https://tanstack.com/) & React Context
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit), [Playwright](https://playwright.dev/) (E2E)
- **Fonts**: Inter (Sans-serif) & Playfair Display / Display serif

---

## ✨ Key Features & User Journeys

### 1. Award Categories & Nominee Showcase
- **Category Explorer (`/categories`, `/awards/[id]`)**: Interactive breakdown of all architectural, residential, commercial, sustainability, and emerging excellence categories.
- **Nominee Directory (`/nominees`)**: Real-time filtered nominee grid with search, category filtering, and sorting by votes or names.
- **Nominee Detail & Voting Modal**: Detailed nominee portfolio view (contact details, phone, bio, reason) with integrated public voting.

### 2. Nomination Submission Flow
- **Multi-Step Nomination (`/nominate`)**: Public submission portal allowing individuals and firms to submit projects with logo upload, reason, contact person details, and payment slip attachments.
- **Continuation & Resume (`/nominate/continue`)**: Resume draft nominations using secure continuation tokens.

### 3. Judge Invitation Acceptance
- **Invitation Portal (`/invite/complete`)**: Secure one-time token redemption workflow for invited judges to accept assignments, complete their profile, and set secure credentials.

### 4. Partner & Sponsor Showcase
- **Partners Portal (`/partners`)**: Tiered sponsorship showcase (Gold, Silver, Bronze) with an integrated partnership inquiry form.

### 5. Media & Ceremony Archive
- **Gallery Grid (`/gallery`)**: Multi-edition photo and moment archive (2025/2026) with category filtering and infinite scroll.

### 6. Architectural UX & State Handling
- **`NoData` Component**: 5 custom architectural blueprint SVG variants (`empty`, `coming-soon`, `search`, `error`, `loading`) with ambient lighting and action triggers.
- **`NotFound` Component**: Isometric architectural drafting card with geographic coordinate watermarks (`LAT 9.0300° N / LON 38.7400° E`), dimension scale ticks, and navigation links.
- **Phone Formatting (`formatPhone`)**: Standardized formatting for Ethiopian Telecom (`+251 9...`, `09...`), Safaricom (`+251 7...`, `07...`), and international numbers.

---

## 🧪 Testing Suite & Automated Quality Control

The public web portal incorporates unit testing for core domain services and Playwright E2E workflows for production-critical user journeys.

### Test Categories
1. **Unit Tests (`src/tests/unit`)**:
   - `nominees.test.ts`: Verifies API response mapping, vote count resolution (`_count.publicVotes` vs `votes`), status mapping, and network failure resilience.
2. **End-to-End Tests (`e2e/`)**:
   - `nominate.spec.ts`: Validates nomination form rendering, client-side validation errors, and continuation token security.
   - `voting.spec.ts`: Verifies nominee gallery loading, category filter navigation, and unauthenticated voting prompt/redirect behavior.

### Running Tests
```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run Playwright E2E tests
npm run test:e2e
```

---

## 📂 Project Structure

```
era-web-frontend/
├── e2e/                    # Playwright E2E user workflow tests
├── public/                 # Static assets, logos, and illustrations
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (marketing)/    # Public pages sharing Header & Footer chrome
│   │   │   ├── awards/     # Award details & [id] pages
│   │   │   ├── categories/ # Category listings
│   │   │   ├── gallery/    # Ceremony gallery archive
│   │   │   ├── invite/     # Judge invitation onboarding
│   │   │   ├── nominate/   # Nomination submission & continuation
│   │   │   ├── nominees/   # Nominees directory & voting
│   │   │   ├── partners/   # Sponsorship & partner listings
│   │   │   └── not-found.tsx
│   │   ├── globals.css     # Global design tokens (@theme inline)
│   │   ├── layout.tsx      # Root application layout
│   │   └── not-found.tsx   # Global 404 page
│   ├── components/
│   │   ├── auth/           # Authentication modals & forms
│   │   ├── layout/         # Header, Mobile Navigation, Footer
│   │   └── ui/             # Reusable UI primitives (Button, Modal, NoData, NotFound, Badge, etc.)
│   ├── context/            # React contexts (AuthContext, ToastContext)
│   ├── data/               # Static site configuration & metadata
│   ├── features/           # Feature-level composed views & business components
│   ├── hooks/              # Custom hooks & React Query wrappers (`useNominees`, `useCategories`)
│   ├── services/           # Backend API integration clients (Axios wrappers)
│   ├── tests/              # Vitest unit test suite
│   ├── types/              # Domain models & TypeScript interfaces
│   └── utils/              # Pure utilities (formatPhone, validation, cn, date helpers)
├── package.json
├── playwright.config.ts
├── vitest.config.mts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher (Recommended `v20.x`)
- **Backend API**: `era-backend` running on `http://localhost:5000`

### Installation
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Start the production server
npm run start
```

---

## 🎨 Theme & Brand Tokens

The ERA web platform uses a curated luxury dark aesthetic tailored for Ethiopian architecture:
- **Primary Gold**: `#C9A24B` / `#EBC166` (`bg-primary`, `text-primary`)
- **Deep Obsidian / Charcoal**: `#0D0C09`, `#120F0A`, `#1A1712` (`bg-background`, `bg-background-elevated`)
- **Muted Platinum / Stone**: `#A39E93`, `#807B70` (`text-foreground-muted`)
- **Borders & Gridlines**: `border-primary/20` with drafting ticks and coordinate markings.
