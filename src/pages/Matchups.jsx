import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeftIcon } from "../components/Icons.jsx";
import { ResultsFootnote, ResultsGrid, ResultsToolbar } from "../components/Results.jsx";
import { games } from "../data/games.js";
import { useDocumentTitle } from "../hooks.js";
import { filterGames } from "../lib.js";

const results = ["all", "michigan", "ohio", "tie"];

export default function Matchups() {
  useDocumentTitle("All Matchups | The Game");
  const [params, setParams] = useSearchParams();
  // Filters live in local state so typing isn't tied to router updates; the URL mirrors them for sharing.
  const [year, setYear] = useState(() => params.get("year") ?? "");
  const [winner, setWinner] = useState(() => results.includes(params.get("result")) ? params.get("result") : "all");
  const [sort, setSort] = useState(() => params.get("sort") === "oldest" ? "oldest" : "newest");

  useEffect(() => {
    const next = new URLSearchParams();
    if (year) next.set("year", year);
    if (winner !== "all") next.set("result", winner);
    if (sort !== "newest") next.set("sort", sort);
    if (next.toString() !== params.toString()) setParams(next, { replace: true, preventScrollReset: true });
  }, [year, winner, sort]);

  const visible = filterGames(games, { year, winner, sort });
  return (
    <section className="results-section archive-page section-shell" aria-labelledby="archive-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE RECORD BOOK</p>
          <h1 id="archive-title">EVERY GAME HAS A STORY.</h1>
          <p>Every meeting since 1897. Every score. Every chapter.</p>
        </div>
        <Link className="outline-button" to="/"><span className="leading" aria-hidden="true"><ArrowLeftIcon /></span>Back to The Game</Link>
      </div>
      <ResultsToolbar games={visible} showTies />
      <div className="archive-controls">
        <label>Find a season<input type="search" value={year} onChange={event => setYear(event.target.value)} placeholder="e.g. 1997" inputMode="numeric" maxLength={4} /></label>
        <label>Result
          <select value={winner} onChange={event => setWinner(event.target.value)}>
            <option value="all">All results</option>
            <option value="michigan">Michigan wins</option>
            <option value="ohio">Ohio State wins</option>
            <option value="tie">Ties</option>
          </select>
        </label>
        <label>Order
          <select value={sort} onChange={event => setSort(event.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
        <span id="archive-count" role="status">{visible.length} {visible.length === 1 ? "matchup" : "matchups"}</span>
      </div>
      {visible.length ? <ResultsGrid games={visible} /> : <p className="empty-state">No matchups found. Try another season or result.</p>}
      <p className="archive-note">† Ohio State's 2010 win was vacated. The on-field score is preserved in this archive. The 2020 game was canceled due to COVID-19 and is not counted as a meeting.</p>
      <ResultsFootnote count={visible.length} total={games.length} />
    </section>
  );
}
