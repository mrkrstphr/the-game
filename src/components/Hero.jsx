import { games } from "../data/games.js";
import { getSeriesStats } from "../lib.js";
import { MichiganLogo, OhioStateLogo } from "./Logos.jsx";

const yardNumbers = [10, 20, 30, 40, 50, 40, 30, 20, 10];

export default function Hero() {
  const stats = getSeriesStats(games);
  return (
    <section className="hero" id="rivalry" aria-labelledby="hero-title">
      <div className="hero-heading">
        <p className="eyebrow"><span /> COLLEGE FOOTBALL'S GREATEST RIVALRY <span /></p>
        <h1 id="hero-title">NOT JUST A GAME.<br /><span>THE GAME.</span></h1>
        <p className="hero-description">Two states. Two storied programs. A whole lot of history.</p>
      </div>
      <div className="rivalry-stage">
        <div className="field-lines" aria-hidden="true" />
        <div className="yard-numbers" aria-hidden="true">
          {yardNumbers.map((number, i) => <span key={i} style={{ "--x": `${(i + 1) * 10}%` }}>{number}</span>)}
        </div>
        <div className="team team-michigan">
          <div className="logo-stage"><MichiganLogo className="hero-logo michigan-logo" alt="Michigan Wolverines block M logo" width="500" height="500" fetchPriority="high" /></div>
          <p className="team-location">ANN ARBOR, MICHIGAN</p>
          <h2>MICHIGAN</h2>
          <p className="team-nickname">WOLVERINES</p>
          <div className="team-rule" />
        </div>
        <div className="versus"><span className="versus-text">VS.</span><span className="versus-year">EST. 1897</span></div>
        <div className="team team-ohio">
          <div className="logo-stage"><OhioStateLogo className="hero-logo ohio-logo" alt="Ohio State Buckeyes logo" width="500" height="500" fetchPriority="high" /></div>
          <p className="team-location">COLUMBUS, OHIO</p>
          <h2>OHIO STATE</h2>
          <p className="team-nickname">BUCKEYES</p>
          <div className="team-rule" />
        </div>
      </div>

      <div className="series-record" role="group" aria-label="All-time series record">
        <div className="record-team michigan-record"><strong>{stats.michigan}</strong><span>MICHIGAN WINS</span></div>
        <div className="record-center">
          <p className="eyebrow">THE ALL-TIME SERIES</p>
          <div><strong>{stats.meetings}</strong><span>MEETINGS <i aria-hidden="true">·</i> <b>{stats.tie}</b> TIES</span></div>
          <p>One rivalry. No equals.</p>
        </div>
        <div className="record-team ohio-record"><strong>{stats.ohio}</strong><span>OHIO STATE WINS</span></div>
        <div className="series-bar" aria-hidden="true"><span className="bar-michigan" /><span className="bar-ties" /><span className="bar-ohio" /></div>
      </div>
      <p className="record-note">Series through 2025. Ohio State's 2010 win was vacated and is excluded from its win total.</p>
    </section>
  );
}
