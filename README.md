# Total Herbal Care — Frontend

Premium cannabis dispensary e-commerce frontend built with Next.js 16 App Router.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animations | Motion (`motion/react`) |
| Server state | TanStack Query v5 |
| Client state | Zustand |
| Forms | React Hook Form + Zod |
| UI Primitives | shadcn/ui (customised) |
| Icons | lucide-react |
| Toasts | sonner |
| Theme | next-themes (dark default) |
| Charts | recharts (admin) |
| Package manager | pnpm |

## Setup

```bash
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_API_URL

pnpm install --ignore-scripts   # skip sharp postinstall in dev
pnpm dev                        # Turbopack default in Next 16
```

## Env vars

| Variable | Default | Required |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api/v1` | ✅ |

## Architecture

```
src/
├── app/           # Routing only — thin shell pages
├── features/      # Domain logic: api, queries, types, schemas, components
├── components/    # Presentational: ui/, layout/, motion/, shared/
├── lib/           # Infrastructure: api client, config, utils
├── stores/        # Zustand slices (ui, age-gate, cart)
├── providers/     # React context (QueryProvider, ThemeProvider, AuthProvider)
├── hooks/         # Reusable hooks
└── types/         # Shared TypeScript types
```

### Key decisions

- **Server Components by default.** `'use client'` only at interactive leaves.
- **Token refresh dedup.** Single in-flight promise in `lib/api/client.ts` prevents parallel refresh calls (which would invalidate the rotating refresh token).
- **URL-first filters.** All shop filters live in `searchParams` — shareable, back-button-correct.
- **Decimal strings.** Money values from the backend are strings. Always `Number()` before math; format through `lib/utils/format.ts`.
- **Age gate.** Full-screen modal on first visit, persisted in localStorage via Zustand. Legally required.
- **proxy.ts** (not middleware.ts) is the Next 16 route guard. Re-check roles server-side in admin layout — proxy is not the security boundary.

## Seeded test accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@totalherbalcare.com | Admin@12345 |
| Customer | demo@customer.com | Demo@12345 |

Test coupons: `WELCOME10`, `FLAT20`

## Scripts

```bash
pnpm dev        # dev server (Turbopack)
pnpm build      # production build
pnpm start      # production server
pnpm lint       # eslint with flat config
pnpm typecheck  # tsc --noEmit
```
