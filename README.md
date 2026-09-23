# Fortune's Weave — Part I Cheat Sheet

## About

A mobile-first route-planning cheat sheet for *Fire Emblem: Fortune's Weave* Part I. The live site is [fefw.jlamb.sh](https://fefw.jlamb.sh).

## Develop

Run locally with `npm run dev`. Use `npm test` for the pure logic and data-integrity checks, `npm run lint` for style checks, and `npm run build` to type-check and produce `dist/`.

## Data

All built-in content lives in `data/sheet.json`; `src/types.ts` documents the full schema. Free-time windows are `[chapter, start M/D, end M/D, optional note]`. A paralogue and recruit use the following shapes:

```json
{
	"id": "leda",
	"name": "Diversionary Tactics",
	"routes": {
		"die": { "windows": [["9/2", "9/8"]], "deadline": "9/8" }
	}
}
```

```json
{
	"n": "Tialla",
	"cai": "auto",
	"die": [3, 9, "Cai's Paralogue, 3000G"],
	"the": [3, 10, "Cai's Paralogue, 3000G"],
	"leda": [3, 8, "Cai's Paralogue, 3000G"],
	"gate": "cai"
}
```

Recruit requirements are `[support, renown, extra]`, `"auto"`, or `null`. The data also contains route metadata, paralogue deadlines, and chapter-keyed don't-miss entries.

## Progress & storage

Progress is browser-local: `fw_state` stores route/tab/tolerance/theme, `fw_done` paralogue checkmarks, `fw_got` recruit checkmarks, and `fw_data` an optional Data-tab override. Those keys deliberately retain the original single-file artifact's shapes so existing progress keeps working.

## Deploy

Netlify runs linting, tests, and the Vite build from `netlify.toml`, then publishes `dist/`. The site has no client-side router, so it needs no SPA redirect rule.

## Credits

Sources are RPG Site's paralogue/recruitment guides and Part I walkthroughs, KeenGamer's recruitment/paralogue tables, and Game8 walkthrough snippets. The Data tab links the exact source pages. The unmodified Claude.ai artifact this site was split from is in `reference/`.
