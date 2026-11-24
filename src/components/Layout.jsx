import { Link, Outlet, ScrollRestoration } from "react-router";
import { ArrowUpIcon, ArrowUpRightIcon, FootballIcon } from "./Icons.jsx";

function scrollToTop(event) {
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="team-stripe" aria-hidden="true"><span /><span /><span /><span /></div>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="The Game home">
          <FootballIcon className="football-mark" />
          THE GAME<span className="wordmark-period">.</span>
        </Link>
        <span className="header-established"><span className="little-star">✦</span> A TRADITION SINCE 1897</span>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-main">
          <Link className="wordmark" to="/">THE GAME<span className="wordmark-period">.</span></Link>
          <a className="back-top" href="#main" onClick={scrollToTop}>Back to the top <span aria-hidden="true"><ArrowUpIcon /></span></a>
        </div>
        <div className="footer-fineprint">
          <p>An independent tribute. Not affiliated with the University of Michigan, The Ohio State University, or the NCAA. Team marks belong to their respective owners.</p>
          <p>
            Records: <a href="https://www.winsipedia.com/games/michigan/vs/ohio-state" target="_blank" rel="noopener noreferrer">Winsipedia <ArrowUpRightIcon /></a>
            <span>·</span> Schedule: <a href="https://ohiostatebuckeyes.com/game-center/22225" target="_blank" rel="noopener noreferrer">Ohio State Athletics <ArrowUpRightIcon /></a>
          </p>
        </div>
      </footer>
      <ScrollRestoration />
    </>
  );
}
