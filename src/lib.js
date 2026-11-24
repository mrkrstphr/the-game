export const NEXT_GAME = {
  date: "2026-11-28T12:00:00-05:00",
  end: "2026-11-28T17:00:00-05:00",
  location: "Ohio Stadium, Columbus, Ohio",
  source: "https://ohiostatebuckeyes.com/game-center/22225",
};

export function getWinner(game) {
  if (game.michigan === game.ohio) return "tie";
  return game.michigan > game.ohio ? "michigan" : "ohio";
}

export function getSeriesStats(games) {
  return games.reduce((stats, game) => {
    stats.meetings++;
    if (game.vacated) stats.vacated++;
    else stats[getWinner(game)]++;
    return stats;
  }, { meetings: 0, michigan: 0, ohio: 0, tie: 0, vacated: 0 });
}

export function filterGames(games, { year = "", winner = "all", sort = "newest" } = {}) {
  return games
    .filter(game => game.date.slice(0, 4).includes(year.trim()))
    .filter(game => winner === "all" || (getWinner(game) === winner && !game.vacated))
    .sort((a, b) => sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
}

export function getCountdown(now = new Date()) {
  const remaining = Math.max(0, new Date(NEXT_GAME.date).getTime() - now.getTime());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor(remaining / 3_600_000) % 24,
    minutes: Math.floor(remaining / 60_000) % 60,
    state: now < new Date(NEXT_GAME.date) ? "upcoming" : now < new Date(NEXT_GAME.end) ? "gameday" : "completed",
  };
}

export function makeCalendarEvent() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Game//Michigan vs Ohio State//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:the-game-2026@the-game.local",
    "DTSTAMP:20261122T000000Z",
    "DTSTART:20261128T170000Z",
    "DTEND:20261128T210000Z",
    "SUMMARY:The Game: Michigan vs. Ohio State",
    "LOCATION:Ohio Stadium\\, Columbus\\, Ohio",
    "DESCRIPTION:Michigan Wolverines vs. Ohio State Buckeyes.\\n12:00 PM ET on FOX.\\nSchedule subject to change.",
    `URL:${NEXT_GAME.source}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
