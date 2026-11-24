import { Link } from "react-router";
import Chapters from "../components/Chapters.jsx";
import Hero from "../components/Hero.jsx";
import History from "../components/History.jsx";
import { ArrowRightIcon } from "../components/Icons.jsx";
import { ResultsFootnote, ResultsGrid, ResultsToolbar } from "../components/Results.jsx";
import { games } from "../data/games.js";
import { useDocumentTitle } from "../hooks.js";

const recent = games.slice(0, 10);

export default function Home() {
  useDocumentTitle("The Game | Michigan vs. Ohio State");
  return (
    <>
      <Hero />
      <Chapters />
      <section className="results-section section-shell" id="results" aria-labelledby="results-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE RECORD BOOK</p>
            <h2 id="results-title">EVERY GAME HAS A STORY.</h2>
            <p>The last 10 meetings. A century of unfinished business.</p>
          </div>
          <Link className="outline-button" to="/matchups">View all matchups <span aria-hidden="true"><ArrowRightIcon /></span></Link>
        </div>
        <ResultsToolbar games={recent} />
        <ResultsGrid games={recent} />
        <ResultsFootnote count={recent.length} total={games.length} />
      </section>
      <History />
    </>
  );
}
