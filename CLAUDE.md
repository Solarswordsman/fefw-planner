# fefw-planner project guide

## What it is

A framework-free, mobile-first route-planning cheat sheet for *Fire Emblem: Fortune's Weave* Part I. Netlify deploys the static Vite build to `fefw.jlamb.sh`.

## Tooling

Use `npm run dev` for local development, then run `npm run lint`, `npm test`, and `npm run build` before handing off a change. `mise.toml` requests the current Node release. If mise is not available on PATH, use `/home/jlamb/dbhomes/dev/.local/share/mise/installs/node/26.8.2/bin/node` (and place that directory on PATH before invoking npm/npx).

## Code map

- `data/sheet.json` — built-in content; preserve keys and ordering when editing it.
- `src/types.ts` — typed schema and the source data-format notes.
- `src/data.ts` — typed JSON import plus route and section constants.
- `src/dates.ts` — pure M/D and chapter-window helpers; tested in `dates.test.ts`.
- `src/assign.ts` — pure greedy recruit planner and type guards; tested in `assign.test.ts`.
- `src/storage.ts` — localStorage keys and safe load/save wrappers.
- `src/render.ts` — pure `data + state → HTML` renderers; no DOM access.
- `src/main.ts` — DOM state, rendering, theme handling, and delegated events.
- `src/data.test.ts` — data-integrity checks for routes, windows, recruits, and gates.
- `src/style.css` — styling lifted from the source artifact; do not change rules for formatting-only work.

Keep `reference/fortunes-weave-part-i-cheat-sheet.original.html` unchanged: it is the original artifact used for behavior and markup diffing.

## Data schema

`src/types.ts` is the authoritative schema. The JSON has route metadata, free-time windows (`[chapter, start M/D, end M/D, optional note]`), paralogues with route-specific pickup windows and deadlines, recruits with route requirements (`[support, renown, extra]`, `"auto"`, or `null`), and chapter-keyed don't-miss entries. Edit content in `data/sheet.json`, not rendering code.

## House style

Use tabs, strict TypeScript, readable multiline control flow, and no framework or runtime dependency additions. Keep rendering functions pure and test pure logic. Preserve the original localStorage keys/shapes and Data-tab behavior so prior saved progress remains usable.

## Future ideas

- None recorded yet.
