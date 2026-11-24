import { FootballIcon } from "./Icons.jsx";

export default function History() {
  return (
    <section className="history-section" id="history" aria-labelledby="history-title">
      <div className="history-inner section-shell">
        <div className="history-emblem" aria-hidden="true"><span>EST.</span><strong>1897</strong><FootballIcon strokeWidth={1.5} /></div>
        <div className="history-copy">
          <p className="eyebrow">BUILT ON HISTORY. FUELED BY PRIDE.</p>
          <h2 id="history-title">SOME THINGS ARE BIGGER<br />THAN FOOTBALL.</h2>
          <p>It started on an October afternoon in 1897. Since then, legends have been made, seasons have been defined, and two sides of a state line have found one thing to agree on: this one means more.</p>
        </div>
        <div className="history-facts">
          <div><strong>1897</strong><span>THE FIRST CHAPTER</span></div>
          <div><strong>2 STATES<span>.</span> 1 GAME<span>.</span></strong><span>AN UNRIVALED TRADITION</span></div>
        </div>
      </div>
    </section>
  );
}
