# Fortune's Weave — Part I Cheat Sheet

A mobile-first route-planning cheat sheet for *Fire Emblem: Fortune's Weave* Part I. The live site is [fefw.jlamb.sh](https://fefw.jlamb.sh).

Run it locally with `npm run dev`. `npm test` runs the pure logic and data-integrity checks; `npm run lint` checks style; `npm run build` type-checks and produces `dist/`.

All built-in content lives in `data/sheet.json`. It contains route metadata; free-time windows as `[chapter, start M/D, end M/D, optional note]`; paralogues with route windows/deadlines; recruits whose per-route requirement is `[support, renown, extra]`, `"auto"`, or `null`; and chapter-keyed don't-miss entries.

Progress is browser-local: `fw_state` stores route/tab/tolerance/theme, `fw_done` paralogue checkmarks, `fw_got` recruit checkmarks, and `fw_data` an optional Data-tab override. Those keys deliberately retain the original single-file artifact's shapes.

Sources are RPG Site's paralogue/recruitment guides and Part I walkthroughs, KeenGamer's recruitment/paralogue tables, and Game8 walkthrough snippets; the Data tab links the exact source pages. The unmodified Claude.ai artifact this site was split from is in `reference/`.
