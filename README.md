# Expert Match

Expert Match connects people with experienced industry professionals for paid
consultations. Rates follow the individual expert's seniority and background —
roughly $800/hour for an industry professional up to $1,600/hour for a founder
or CEO.

## Running locally

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000 and redirects to
`/expert-match/requests`.

| Script              | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm run build`     | Production build               |
| `npm run typecheck` | TypeScript, no emit            |

## Structure

```
src/
  app/                       Routes (Next.js App Router)
    expert-match/            Expert Match area — tabs live in its layout
      requests/              Past Requests (built)
      experts/               Placeholder
      calls-and-notes/       Placeholder
  components/
    layout/                  Global navigation
    ui/                      Design-system primitives
    expert-match/            Request history feature components
  data/requests.ts           Mock request history
  lib/                       Types, filtering, formatting, data hook
```

## Design system

Tokens live in `src/app/globals.css` under `@theme` — colours, radii, shadows,
and the type family. Components reference the token names (`text-ink-secondary`,
`border-line`, `bg-accent`) rather than raw hex values, so the palette can be
changed in one place.

The visual language is deliberately quiet: a warm paper background, white
surfaces, 1px borders, 8–10px radii, and a deep forest accent used only for
primary actions and active states.

## Data

`src/data/requests.ts` holds mock request history and every expert is a
fictional composite — the product must not imply a named public figure is
bookable.

`src/lib/useRequests.ts` is the single seam between the UI and its data source.
It currently resolves the mock data asynchronously; connecting a real API means
changing that hook only. Filtering, grouping, and sorting are pure functions in
`src/lib/filters.ts` and can move server-side unchanged.
