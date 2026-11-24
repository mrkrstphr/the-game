import { games } from "./data/games.js";
import { filterGames, getCountdown, getSeriesStats, getWinner, makeCalendarEvent } from "./lib.js";

const $ = selector => document.querySelector(selector);
const stats = getSeriesStats(games);
$("#michigan-wins").textContent = stats.michigan;
$("#ohio-wins").textContent = stats.ohio;
$("#meeting-count").textContent = stats.meetings;
$("#tie-count").textContent = stats.tie;

let expanded = false;
const locationIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"/></svg>';
const arrowUpRight = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 7l-10 10M8 7l9 0l0 9"/></svg>';
const arrowUp = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5l0 14M18 11l-6 -6M6 11l6 -6"/></svg>';

function gameCard(game) {
  const winner = getWinner(game);
  const year = game.date.slice(0, 4);
  const note = game.vacated ? "VACATED †" : game.overtime ? game.overtime : winner === "tie" ? "TIE" : "FINAL";
  const scoreRow = (team, name, asset) => `<div class="game-score-row ${winner === team ? "winner" : ""}"><span class="game-team"><picture>${asset === "ohio-state" ? '<source srcset="/assets/ohio-state-dark.png" media="(prefers-color-scheme: dark)" />' : ""}<img src="/assets/${asset}.png" alt="" width="22" height="22" loading="lazy" /></picture><span>${name}</span></span><span class="game-score">${game[team]}</span></div>`;
  const result = winner === "tie" ? "Tie" : game.vacated ? "Ohio State win, vacated" : winner === "michigan" ? "Michigan win" : "Ohio State win";
  return `<article class="game-card ${winner}-win ${winner === "tie" ? "tie" : ""} ${game.vacated ? "vacated" : ""}" aria-label="${year}: Michigan ${game.michigan}, Ohio State ${game.ohio}. ${result}${game.overtime ? `, ${game.overtime}` : ""}"><div class="game-card-top"><time class="game-year" datetime="${game.date}">${year}</time><span class="game-note">${note}</span></div>${scoreRow("michigan", "Michigan", "michigan")}${scoreRow("ohio", "Ohio State", "ohio-state")}<div class="game-location">${locationIcon}${game.location}</div></article>`;
}

function renderResults() {
  const visible = expanded
    ? filterGames(games, { year: $("#year-search").value, winner: $("#winner-filter").value, sort: $("#sort-order").value })
    : games.slice(0, 10);
  $("#results-grid").innerHTML = visible.map(gameCard).join("");
  $("#empty-state").hidden = visible.length > 0;
  $("#archive-count").textContent = `${visible.length} ${visible.length === 1 ? "matchup" : "matchups"}`;
  $("#visible-count").textContent = `${visible.length} OF ${stats.meetings} MEETINGS`;
  $("#results-range").textContent = visible.length ? `${Math.min(...visible.map(g => Number(g.date.slice(0, 4))))} — ${Math.max(...visible.map(g => Number(g.date.slice(0, 4))))}` : "NO RESULTS";
}

$("#view-all").addEventListener("click", () => {
  expanded = !expanded;
  $("#view-all").setAttribute("aria-expanded", String(expanded));
  $("#view-all").innerHTML = `${expanded ? "Show last 10" : "View all matchups"} <span aria-hidden="true">${expanded ? arrowUp : arrowUpRight}</span>`;
  $("#archive-controls").hidden = !expanded;
  $("#archive-note").hidden = !expanded;
  $("#tie-legend").hidden = !expanded;
  $("#results-description").textContent = expanded ? "Every meeting since 1897. Every score. Every chapter." : "The last 10 meetings. A century of unfinished business.";
  if (!expanded) {
    $("#year-search").value = "";
    $("#winner-filter").value = "all";
    $("#sort-order").value = "newest";
  }
  renderResults();
});
$("#year-search").addEventListener("input", renderResults);
$("#winner-filter").addEventListener("change", renderResults);
$("#sort-order").addEventListener("change", renderResults);
renderResults();

function updateCountdown() {
  const countdown = getCountdown();
  for (const part of ["days", "hours", "minutes"]) {
    $(`#count-${part}`).textContent = String(countdown[part]).padStart(2, "0");
  }
  $("#countdown").hidden = countdown.state !== "upcoming";
  $("#countdown-status").hidden = countdown.state === "upcoming";
  $("#countdown-status").textContent = countdown.state === "gameday"
    ? "It's game day. A new chapter is being written."
    : "The scheduled kickoff has passed. Results await verification.";
  $("#calendar-button").hidden = countdown.state !== "upcoming";
}
updateCountdown();
setInterval(updateCountdown, 30_000);

let toastTimeout;
$("#calendar-button").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([makeCalendarEvent()], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "the-game-2026.ics";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#toast").textContent = "Calendar file downloaded. Open it to add The Game.";
  $("#toast").hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { $("#toast").hidden = true; }, 5000);
});
