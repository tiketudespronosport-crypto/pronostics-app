// ============================================================
// script.js — la logique de l'appli
// Tu n'as normalement pas besoin de modifier ce fichier.
// Il lit les données dans data.js et construit la page.
// ============================================================

// État de l'appli (ce qui peut changer quand on clique)
let currentTier = "free"; // "free" ou "premium"
let currentLeague = "all"; // "all" ou l'id d'une ligue

// -------------------- Petits outils --------------------

function leagueById(id) {
  return LEAGUES.find((l) => l.id === id);
}

// Construit les points de confiance (●●●○○)
function renderConfidence(level) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= level ? "on" : ""}">★</span>`;
  }
  return `<div class="confidence">${stars}</div>`;
}

// Construit un pari (une ligne à l'intérieur d'un match)
function renderBet(bet) {
  const isLocked = bet.tier === "premium" && currentTier === "free";
  return `
    <div class="bet-row ${isLocked ? "locked" : ""}">
      <div class="bet-top">
        <span class="bet-type">${bet.type}</span>
        <span class="bet-cote">${bet.cote.toFixed(2)}</span>
      </div>
      <div class="bet-pick">${bet.pick}</div>
      <div class="bet-bottom">
        <p class="bet-note">${bet.note}</p>
        ${renderConfidence(bet.conf)}
      </div>
    </div>
  `;
}

// Construit un match complet (le "ticket")
function renderMatch(match) {
  const league = leagueById(match.league);
  const hasPremium = match.bets.some((b) => b.tier === "premium");
  const showLockedBanner = currentTier === "free" && hasPremium;

  return `
    <div class="ticket">
      <div class="ticket-header">
        <span class="league-badge" style="background:${league.color}">
          ${league.name}
        </span>
        <span class="match-time">🕐 ${match.day} ${match.date} · ${match.time}</span>
      </div>
      <div class="ticket-teams">
        <span>${match.home}</span>
        <span class="vs">vs</span>
        <span>${match.away}</span>
      </div>
      <div class="bets">
        ${match.bets.map(renderBet).join("")}
      </div>
      ${
        showLockedBanner
          ? `<div class="locked-banner">🔒 Pronostic Premium verrouillé</div>`
          : ""
      }
    </div>
  `;
}

// -------------------- Rendu principal --------------------

function renderMatches() {
  const container = document.getElementById("match-list");

  const filtered =
    currentLeague === "all"
      ? MATCHES
      : MATCHES.filter((m) => m.league === currentLeague);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">Aucun match dans ce championnat pour l'instant.</div>`;
    return;
  }

  container.innerHTML = filtered.map(renderMatch).join("");
}

function renderLeagueChips() {
  const container = document.getElementById("league-chips");
  const allChip = `<button class="league-chip ${
    currentLeague === "all" ? "active" : ""
  }" data-league="all">Tous</button>`;

  const chips = LEAGUES.map(
    (l) =>
      `<button class="league-chip ${
        currentLeague === l.id ? "active" : ""
      }" data-league="${l.id}">${l.short}</button>`
  ).join("");

  container.innerHTML = allChip + chips;

  // Écouteurs de clic sur chaque chip
  container.querySelectorAll(".league-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLeague = btn.dataset.league;
      renderLeagueChips();
      renderMatches();
    });
  });
}

function renderHeaderInfo() {
  const totalBets = MATCHES.reduce((acc, m) => acc + m.bets.length, 0);
  const totalFreeMatches = MATCHES.filter((m) =>
    m.bets.some((b) => b.tier === "free")
  ).length;

  document.getElementById(
    "total-count"
  ).textContent = `${totalBets} pronostics sur les 5 grands championnats`;

  document.getElementById("free-note").textContent =
    currentTier === "free"
      ? `${totalFreeMatches} matchs en accès libre cette semaine · le reste est réservé aux abonnés`
      : "";
}

// -------------------- Écouteurs --------------------

document.querySelectorAll(".tier-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTier = btn.dataset.tier;
    document
      .querySelectorAll(".tier-btn")
      .forEach((b) => b.classList.toggle("active", b === btn));
    renderHeaderInfo();
    renderMatches();
  });
});

// -------------------- Démarrage --------------------

renderHeaderInfo();
renderLeagueChips();
renderMatches();
