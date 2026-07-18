# AGENTS.md — Total Herbal Care Frontend

Guidelines for AI coding agents working in this repo.

## Non-negotiables

- **Next.js 16 only.** `proxy.ts` not `middleware.ts`. `params`/`searchParams` are always Promises — always `await`.
- **TypeScript strict.** No `any`, no non-null `!` abuse. Use generated `PageProps`, `LayoutProps`, `RouteContext` types.
- **Tailwind v4 CSS-first.** Design tokens live in `src/app/globals.css` `@theme {}`. Do NOT create `tailwind.config.js`.
- **Motion from `motion/react`.** Never import from `framer-motion`.
- **Decimal strings.** Money from API is `string`. Use `Number()` before math. Format via `lib/utils/format.ts`.
- **Credentials always included.** Every fetch must pass `credentials: 'include'`.
- **Refresh token dedup.** Only one refresh in-flight at a time. See `lib/api/client.ts`.

## File placement rules

| Type | Where |
|---|---|
| Route files | `src/app/` |
| Domain API calls | `src/features/<domain>/api.ts` |
| TanStack Query hooks | `src/features/<domain>/queries.ts` |
| Zod schemas | `src/features/<domain>/schemas.ts` |
| TypeScript types | `src/features/<domain>/types.ts` |
| Reusable domain components | `src/features/<domain>/components/` |
| Presentational components | `src/components/` |
| Shared infrastructure | `src/lib/` |
| Zustand stores | `src/stores/` |

## Error handling

- `422` → map Zod field errors onto RHF fields via `setError`
- `409` → show specific recovery UX (duplicate review, out-of-stock at checkout)
- `401` → trigger refresh flow, then retry; on second 401 redirect to sign-in
- `429` → surface rate limit message, do not auto-retry
- `503` → backend service not configured (Stripe/Cloudinary)

## Do not

- Don't add dependencies not listed in the stack without asking first.
- Don't use `useMemo`/`useCallback` manually — React Compiler handles this.
- Don't import server-only code in client components.
- Don't render Decimal strings raw to the user.
- Don't write `TODO` comments without a GitHub issue reference.
- Don't skip `loading.tsx` — every route needs a skeleton layout.
- Don't skip `default.tsx` in parallel route slots — Next 16 build will fail.
