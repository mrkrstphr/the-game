import { Link } from "react-router";
import { ArrowLeftIcon } from "../components/Icons.jsx";
import { useDocumentTitle } from "../hooks.js";

export default function NotFound() {
  useDocumentTitle("Page Not Found | The Game");
  return (
    <section className="results-section not-found section-shell" aria-labelledby="not-found-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FLAG ON THE PLAY</p>
          <h1 id="not-found-title">THAT PAGE ISN'T ON THE SCHEDULE.</h1>
          <p>The page you're looking for doesn't exist or has moved.</p>
        </div>
        <Link className="outline-button" to="/"><span className="leading" aria-hidden="true"><ArrowLeftIcon /></span>Back to The Game</Link>
      </div>
    </section>
  );
}
