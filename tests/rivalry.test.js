import test from "node:test";
import assert from "node:assert/strict";
import { games } from "../src/data/games.js";
import { NEXT_GAME, filterGames, getCountdown, getSeriesStats, getWinner, makeCalendarEvent } from "../src/lib.js";

test("official series matches the published 62–52–6 record, with one vacated game", () => {
  assert.deepEqual(getSeriesStats(games), { meetings: 121, michigan: 62, ohio: 52, tie: 6, vacated: 1 });
});

test("archive spans 1897–2025, with one completed meeting per season and no 2020 game", () => {
  assert.equal(games[0].date, "2025-11-29");
  assert.equal(games.at(-1).date, "1897-10-16");
  assert.equal(new Set(games.map(g => g.date.slice(0, 4))).size, 121);
  assert.equal(games.some(g => g.date.startsWith("2020")), false);
  for (const [i, game] of games.entries()) {
    assert.match(game.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!Number.isNaN(new Date(game.date).getTime()));
    assert.ok(Number.isInteger(game.michigan) && game.michigan >= 0);
    assert.ok(Number.isInteger(game.ohio) && game.ohio >= 0);
    assert.ok(["Ann Arbor, MI", "Columbus, OH"].includes(game.location));
    if (i) assert.ok(games[i - 1].date > game.date);
  }
});

test("last 10 are meetings, not calendar years, and match published recent scores", () => {
  assert.deepEqual(games.slice(0, 10).map(g => [g.date.slice(0, 4), g.michigan, g.ohio]), [
    ["2025", 9, 27], ["2024", 13, 10], ["2023", 30, 24], ["2022", 45, 23],
    ["2021", 42, 27], ["2019", 27, 56], ["2018", 39, 62], ["2017", 20, 31],
    ["2016", 27, 30], ["2015", 13, 42],
  ]);
  assert.equal(games.find(g => g.date.startsWith("2016")).overtime, "2OT");
});

test("the 1963 meeting uses the actual date after its one-week postponement", () => {
  assert.equal(games.find(g => g.date.startsWith("1963")).date, "1963-11-30");
});

test("historical anchor results match independently published accounts", () => {
  for (const [year, michigan, ohio] of [[1897, 34, 0], [1902, 86, 0], [1950, 9, 3], [1969, 24, 12], [1973, 10, 10], [1997, 20, 14], [2006, 39, 42]]) {
    const game = games.find(g => g.date.startsWith(String(year)));
    assert.equal(game.michigan, michigan);
    assert.equal(game.ohio, ohio);
  }
});

test("winner, year, sorting, and combined filters preserve the source archive", () => {
  const dates = games.map(g => g.date);
  assert.equal(filterGames(games).length, 121);
  assert.equal(filterGames(games, { winner: "michigan" }).length, 62);
  assert.equal(filterGames(games, { winner: "ohio" }).length, 52);
  assert.equal(filterGames(games, { winner: "tie" }).length, 6);
  assert.equal(filterGames(games, { year: "1997" })[0].michigan, 20);
  assert.equal(filterGames(games, { year: "1997", winner: "ohio" }).length, 0);
  assert.equal(filterGames(games, { year: "2020" }).length, 0);
  assert.equal(filterGames(games, { year: "2099" }).length, 0);
  assert.equal(filterGames(games, { year: " 2025 " }).length, 1);
  assert.equal(filterGames(games, { sort: "oldest" })[0].date, "1897-10-16");
  assert.deepEqual(games.map(g => g.date), dates);
});

test("vacated win remains visible as an on-field result without official win credit", () => {
  const game = filterGames(games, { year: "2010" })[0];
  assert.equal(game.vacated, true);
  assert.equal(getWinner(game), "ohio");
  assert.equal(game.michigan, 7);
  assert.equal(game.ohio, 37);
  assert.equal(filterGames(games, { year: "2010", winner: "ohio" }).length, 0);
});

test("countdown uses the official noon Eastern kickoff and handles its boundaries", () => {
  assert.equal(new Date(NEXT_GAME.date).toISOString(), "2026-11-28T17:00:00.000Z");
  assert.deepEqual(getCountdown(new Date("2026-11-22T17:00:00Z")), { days: 6, hours: 0, minutes: 0, state: "upcoming" });
  assert.deepEqual(getCountdown(new Date("2026-11-28T16:59:00Z")), { days: 0, hours: 0, minutes: 1, state: "upcoming" });
  assert.deepEqual(getCountdown(new Date("2026-11-28T17:00:00Z")), { days: 0, hours: 0, minutes: 0, state: "gameday" });
  assert.deepEqual(getCountdown(new Date("2026-11-28T22:00:00Z")), { days: 0, hours: 0, minutes: 0, state: "completed" });
  assert.equal(getCountdown(new Date("2027-01-01")).days, 0);
});

test("calendar is a valid CRLF-delimited event at the official kickoff", () => {
  const ics = makeCalendarEvent();
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(ics.includes("DTSTART:20261128T170000Z\r\n"));
  assert.ok(ics.includes("DTEND:20261128T210000Z\r\n"));
  assert.ok(ics.includes("LOCATION:Ohio Stadium\\, Columbus\\, Ohio\r\n"));
  assert.ok(ics.includes("SUMMARY:The Game: Michigan vs. Ohio State"));
  assert.ok(!ics.replaceAll("\r\n", "").includes("\n"));
});
