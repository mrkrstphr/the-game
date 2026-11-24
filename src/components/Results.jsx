import { getWinner } from "../lib.js";
import { InfoIcon, MapPinIcon } from "./Icons.jsx";
import { MichiganLogo, OhioStateLogo } from "./Logos.jsx";

const teams = {
  michigan: { name: "Michigan", Logo: MichiganLogo },
  ohio: { name: "Ohio State", Logo: OhioStateLogo },
};

function ScoreRow({ game, team, winner }) {
  const { name, Logo } = teams[team];
  return (
    <div className={`game-score-row${winner === team ? " winner" : ""}`}>
      <span className="game-team"><Logo alt="" width="22" height="22" loading="lazy" /><span>{name}</span></span>
      <span className="game-score">{game[team]}</span>
    </div>
  );
}

export function GameCard({ game }) {
  const winner = getWinner(game);
  const year = game.date.slice(0, 4);
  const note = game.vacated ? "VACATED †" : game.overtime ? game.overtime : winner === "tie" ? "TIE" : "FINAL";
  const result = winner === "tie" ? "Tie" : game.vacated ? "Ohio State win, vacated" : winner === "michigan" ? "Michigan win" : "Ohio State win";
  const className = ["game-card", `${winner}-win`, winner === "tie" && "tie", game.vacated && "vacated"].filter(Boolean).join(" ");
  return (
    <article className={className} aria-label={`${year}: Michigan ${game.michigan}, Ohio State ${game.ohio}. ${result}${game.overtime ? `, ${game.overtime}` : ""}`}>
      <div className="game-card-top"><time className="game-year" dateTime={game.date}>{year}</time><span className="game-note">{note}</span></div>
      <ScoreRow game={game} team="michigan" winner={winner} />
      <ScoreRow game={game} team="ohio" winner={winner} />
      <div className="game-location"><MapPinIcon />{game.location}</div>
    </article>
  );
}

export function ResultsToolbar({ games, showTies = false }) {
  const years = games.map(game => Number(game.date.slice(0, 4)));
  return (
    <div className="results-toolbar">
      <div className="results-legend">
        <span><i className="legend-dot michigan-dot" /> Michigan win</span>
        <span><i className="legend-dot ohio-dot" /> Ohio State win</span>
        {showTies && <span><i className="legend-dot tie-dot" /> Tie</span>}
      </div>
      <span className="results-range">{years.length ? `${Math.min(...years)} — ${Math.max(...years)}` : "NO RESULTS"}</span>
    </div>
  );
}

export function ResultsGrid({ games }) {
  return (
    <div className="results-grid" role="group" aria-label="Game results">
      {games.map(game => <GameCard key={game.date} game={game} />)}
    </div>
  );
}

export function ResultsFootnote({ count, total }) {
  return (
    <div className="results-footnote">
      <span><InfoIcon /> The 2020 game was canceled. Rivalries don't take years off. Sometimes football does.</span>
      <span>{count} OF {total} MEETINGS</span>
    </div>
  );
}
