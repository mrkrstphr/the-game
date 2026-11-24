import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getCountdown, makeCalendarEvent } from "../lib.js";
import { ArrowUpRightIcon, TvIcon } from "./Icons.jsx";
import { MichiganLogo, OhioStateLogo } from "./Logos.jsx";

function LastChapter() {
  return (
    <div className="matchup-card last-matchup">
      <div className="card-topline"><p className="eyebrow"><span className="status-dot" /> THE LAST CHAPTER</p><span className="small-tag">FINAL</span></div>
      <div className="matchup-meta"><time dateTime="2025-11-29">NOVEMBER 29, 2025</time><span>Michigan Stadium · Ann Arbor, MI</span></div>
      <div className="last-scoreboard">
        <div className="score-team"><MichiganLogo alt="" width="64" height="64" /><span>MICHIGAN</span></div>
        <div className="final-score"><span>9</span><span className="score-dash" aria-hidden="true">–</span><strong>27</strong></div>
        <div className="score-team"><OhioStateLogo alt="" width="64" height="64" /><span>OHIO STATE</span><span className="winner-label">WINNER</span></div>
      </div>
      <div className="matchup-bottom">
        <span>Bragging rights belong to the Buckeyes.</span>
        <a href="https://www.winsipedia.com/games/michigan/vs/ohio-state/2025/96543" target="_blank" rel="noopener noreferrer" className="text-link">Game details <span aria-hidden="true"><ArrowUpRightIcon /></span></a>
      </div>
    </div>
  );
}

function useCountdown() {
  const [countdown, setCountdown] = useState(() => getCountdown());
  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 30_000);
    return () => clearInterval(interval);
  }, []);
  return countdown;
}

function NextChapter() {
  const countdown = useCountdown();
  const [toast, setToast] = useState("");
  const toastTimeout = useRef();
  useEffect(() => () => clearTimeout(toastTimeout.current), []);

  function downloadCalendar() {
    const url = URL.createObjectURL(new Blob([makeCalendarEvent()], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "the-game-2026.ics";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setToast("Calendar file downloaded. Open it to add The Game.");
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(""), 5000);
  }

  const upcoming = countdown.state === "upcoming";
  const pad = value => String(value).padStart(2, "0");
  return (
    <div className="matchup-card next-matchup">
      <span className="chapter-number" aria-hidden="true">122</span>
      <div className="card-topline"><p className="eyebrow"><span className="status-dot" /> THE NEXT CHAPTER</p><span className="next-edition">MEETING NO. 122</span></div>
      <h2>NOVEMBER 28, 2026<span className="date-period">.</span></h2>
      <p className="next-location">Ohio Stadium <span>·</span> Columbus, Ohio</p>
      {upcoming ? (
        <div className="countdown" role="group" aria-label="Countdown to the next game">
          <div><strong>{pad(countdown.days)}</strong><span>DAYS</span></div><span className="countdown-colon">:</span>
          <div><strong>{pad(countdown.hours)}</strong><span>HOURS</span></div><span className="countdown-colon">:</span>
          <div><strong>{pad(countdown.minutes)}</strong><span>MINUTES</span></div>
        </div>
      ) : (
        <p className="countdown-status">
          {countdown.state === "gameday" ? "It's game day. A new chapter is being written." : "The scheduled kickoff has passed. Results await verification."}
        </p>
      )}
      <div className="matchup-bottom">
        <span><TvIcon /> 12:00 PM ET <span className="meta-divider">/</span> FOX</span>
        {upcoming && <button type="button" className="calendar-button" onClick={downloadCalendar}>Add to calendar <span aria-hidden="true"><ArrowUpRightIcon /></span></button>}
      </div>
      {createPortal(<div className="toast" role="status" hidden={!toast}>{toast}</div>, document.body)}
    </div>
  );
}

export default function Chapters() {
  return (
    <section className="matchup-section section-shell" id="matchups" aria-label="Latest and upcoming matchups">
      <LastChapter />
      <NextChapter />
    </section>
  );
}
