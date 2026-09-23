# fefw-planner project guide

Static Vite + TypeScript site, deployed by Netlify at `fefw.jlamb.sh`. Use `npm run lint`, `npm test`, and `npm run build`; `mise.toml` requests the current Node release. If mise is unavailable, this workspace uses Node at `/home/jlamb/dbhomes/dev/.local/share/mise/installs/node/26.8.2/bin/node`.

Code map: `data/sheet.json` is the content; `src/types.ts` is its schema; `dates.ts` and `assign.ts` are pure tested logic; `render.ts` is pure HTML rendering; `main.ts` owns DOM, storage, and events. Edit game content in `data/sheet.json`, preserving its schema and ordering. Keep `reference/fortunes-weave-part-i-cheat-sheet.original.html` unchanged for diffing.

House style: tabs, strict TypeScript, no framework or runtime dependency additions. Preserve the original localStorage keys and Data-tab behavior.
