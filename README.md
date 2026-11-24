# The Game

An independent, responsive Michigan–Ohio State rivalry site. Oversized team marks, the official series record, last and next matchups, a live kickoff countdown, a calendar download, and all 121 completed meetings with season, winner, and sort controls.

## Run

Requires Node.js 22 or later. No package installation is needed.

```sh
npm run dev
```

Open http://localhost:5173. To use a different port: `npm run dev -- --port 3000`.

```sh
npm test
npm run build
npm run preview
```

The production `dist/` directory can be deployed to any static host. Google Fonts are optional; system fallback fonts are supplied. Team logos are served locally.

## Records and maintenance

- Results verified November 22, 2026 against [Winsipedia](https://www.winsipedia.com/games/michigan/vs/ohio-state).
- All 121 scores cross-checked against [Britannica](https://www.britannica.com/sports/Michigan-Ohio-State-Football-Rivalry). For 1963, the archive uses November 30, the actual rescheduled date confirmed by [Ohio State's student newspaper](https://www.thelantern.com/2013/11/1963-ohio-state-buckeyes-reflect-hollow-victory-vs-michigan-john-f-kennedy-shot/), rather than Britannica's original November 23 date.
- Official win credit: Michigan 62, Ohio State 52, six ties, and one vacated outcome across 121 played meetings. The 2010 on-field score remains in the archive but is excluded from Ohio State's official wins and its winner filter.
- 2020 was canceled, so the last 10 **meetings** cover 2015–2025.
- Next game: November 28, 2026 at noon Eastern, Ohio Stadium, on FOX, per [Ohio State Athletics](https://ohiostatebuckeyes.com/game-center/22225).
- Update `data/games.js`, the static last/next matchup markup in `index.html`, and `NEXT_GAME` / the calendar timestamps in `lib.js` after the next meeting. This is a verified static snapshot, not a live scores feed.
- Team marks are from ESPN's public team-logo CDN and belong to their respective universities. This site is not affiliated with either university or the NCAA.
- Icons are from [Tabler Icons](https://tabler.io/icons) v3.52.0 (MIT License, Copyright (c) 2020-2026 Paweł Kuna), embedded inline as SVG.

Implementation uses native HTML, CSS, and JavaScript, with Node's built-in development server, build script, and test runner. No third-party runtime or build dependencies.
