# The Game

An independent, responsive Michigan–Ohio State rivalry site. Oversized team marks, the official series record, last and next matchups, a live kickoff countdown, a calendar download, and all 121 completed meetings with season, winner, and sort controls.

## Run

Requires Node.js 22 or later and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:5177.

```sh
pnpm test
pnpm build
pnpm preview
```

`pnpm build` writes the production site to `dist/`. Any static host works as long as unknown paths fall back to `index.html` so client-side routes like `/matchups` load; `netlify.toml` already does this for Netlify. Google Fonts are optional; system fallback fonts are supplied. Team logos are served locally.

## Pages

- `/`: hero, all-time record, last and next matchups with countdown and calendar download, the last 10 meetings, and history.
- `/matchups`: all 121 meetings with season search, result filter, and sort. Filters are mirrored in the URL (`?year=1997&result=michigan&sort=oldest`) so a filtered view can be shared.

Routes are defined in `src/router.jsx`. Add a page component under `src/pages/` and register it as a child of the layout route.
## Records and maintenance

- Results verified November 22, 2026 against [Winsipedia](https://www.winsipedia.com/games/michigan/vs/ohio-state).
- All 121 scores cross-checked against [Britannica](https://www.britannica.com/sports/Michigan-Ohio-State-Football-Rivalry). For 1963, the archive uses November 30, the actual rescheduled date confirmed by [Ohio State's student newspaper](https://www.thelantern.com/2013/11/1963-ohio-state-buckeyes-reflect-hollow-victory-vs-michigan-john-f-kennedy-shot/), rather than Britannica's original November 23 date.
- Official win credit: Michigan 62, Ohio State 52, six ties, and one vacated outcome across 121 played meetings. The 2010 on-field score remains in the archive but is excluded from Ohio State's official wins and its winner filter.
- 2020 was canceled, so the last 10 **meetings** cover 2015–2025.
- Next game: November 28, 2026 at noon Eastern, Ohio Stadium, on FOX, per [Ohio State Athletics](https://ohiostatebuckeyes.com/game-center/22225).
- Update `src/data/games.js`, the last/next matchup markup in `src/components/Chapters.jsx`, and `NEXT_GAME` / the calendar timestamps in `src/lib.js` after the next meeting. This is a verified static snapshot, not a live scores feed.
- Team marks are from ESPN's public team-logo CDN and belong to their respective universities. This site is not affiliated with either university or the NCAA.
- Icons are from [Tabler Icons](https://tabler.io/icons) v3.52.0 (MIT License, Copyright (c) 2020-2026 Paweł Kuna), embedded inline as SVG.

Built with React, React Router, and Vite. Tests use Node's built-in test runner.
