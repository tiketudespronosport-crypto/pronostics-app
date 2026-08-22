// ============================================================
// script.js — la logique de l'appli V2
// Tu n'as normalement pas besoin de modifier ce fichier.
// ============================================================

let currentIndex = 0;
let currentView = "home";

const ICONS = { history: "🏆", form: "📈", coach: "👔", player: "⭐" };

function leagueById(id) {
  return LEAGUES.find((l) => l.id === id);
}

// -------------------- Vue Accueil : carte par carte --------------------

function renderMatchCard() {
  const match = MATCHES[currentIndex];
  const league = leagueById(match.league);
  const container = document.getElementById("match-card");

  const argsHtml = match.args
    .map(
      (a) => `
      <div class="arg-card">
        <div class="arg-icon">${ICONS[a.icon] || "⭐"}</div>
        <div class="arg-label">${a.label}</div>
        <div class="arg-text">${a.text}</div>
      </div>
    `
    )
    .join("");

  const starsHtml = [1, 2, 3, 4, 5]
    .map((i) => `<span class="star ${i <= match.conf ? "on" : ""}">★</span>`)
    .join("");

  container.innerHTML = `
    <div class="ticket-top">
      <span class="league-badge" style="background:${league.color}">${league.name}</span>
      <span class="match-time">🕐 ${match.day} ${match.date} · ${match.time}</span>
    </div>
    <div class="teams">
      <span class="team-name">${match.home}</span>
      <span class="vs">vs</span>
      <span class="team-name">${match.away}</span>
    </div>
    <div class="pick-zone">
      <div class="pick-banner">${match.type} : ${match.pick} @ ${match.cote}</div>
      <div class="stars">${starsHtml}</div>
    </div>
    <div class="args-row">${argsHtml}</div>
    ${match.tier === "premium" ? '<div class="premium-lock">🔒 Pronostic Premium</div>' : ""}
  `;

  document.getElementById("match-counter").textContent = `${currentIndex + 1} / ${MATCHES.length} · Week-end`;
  document.getElementById("btn-prev").disabled = currentIndex === 0;
  document.getElementById("btn-next").disabled = currentIndex === MATCHES.length - 1;
}

document.getElementById("btn-prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderMatchCard();
  }
});

document.getElementById("btn-next").addEventListener("click", () => {
  if (currentIndex < MATCHES.length - 1) {
    currentIndex++;
    renderMatchCard();
  }
});

// -------------------- Vue Historique --------------------

function renderHistory() {
  const container = document.getElementById("history-list");
  const entries = Object.keys(CURRENT_RESULTS);

  if (entries.length === 0) {
    container.innerHTML = `<div class="empty-state">Les résultats de ce week-end seront affichés ici une fois les matchs terminés.</div>`;
    document.getElementById("history-summary").textContent = "";
    return;
  }

  let won = 0, lost = 0, void_ = 0;

  const rows = MATCHES.map((match) => {
    const result = CURRENT_RESULTS[match.id];
    if (result === "won") won++;
    else if (result === "lost") lost++;
    else if (result === "void") void_++;

    const tag = result
      ? `<span class="result-tag ${result}">${result === "won" ? "Gagné" : result === "lost" ? "Perdu" : "Remboursé"}</span>`
      : `<span class="result-tag pending">En cours</span>`;

    return `
      <div class="history-row">
        <div class="history-info">
          <div class="history-teams">${match.home} - ${match.away}</div>
          <div class="history-pick">${match.type} : ${match.pick}</div>
        </div>
        ${tag}
      </div>
    `;
  }).join("");

  container.innerHTML = rows;
  document.getElementById("history-summary").textContent =
    `${won} gagnés · ${lost} perdus · ${void_} remboursés (sur ${MATCHES.length})`;
}

// -------------------- Vue Premium --------------------

function renderPremium() {
  const container = document.getElementById("premium-list");
  const premiumMatches = MATCHES.filter((m) => m.tier === "premium");

  container.innerHTML = premiumMatches
    .map(
      (m) => `
      <div class="mini-card">
        <div class="mini-teams">${m.home} - ${m.away}</div>
        <div class="mini-pick">🔒 ${m.type} : ${m.pick}</div>
      </div>
    `
    )
    .join("");
}

// -------------------- Navigation entre vues --------------------

function switchView(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach((v) => (v.style.display = "none"));
  document.getElementById(`view-${view}`).style.display = "flex";

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  if (view === "history") renderHistory();
  if (view === "premium") renderPremium();
}

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

// -------------------- Démarrage --------------------

renderMatchCard();
