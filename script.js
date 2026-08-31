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

const CODE_STOPWORDS = new Set(["de", "del", "fc", "cf", "sc", "afc", "ac", "calcio"]);

function normWords(name) {
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w && !CODE_STOPWORDS.has(w));
}

function findTeamCode(name) {
  if (typeof TEAM_CODES === "undefined") return null;
  const words = normWords(name);
  const key = words.join(" ");

  const exact = TEAM_CODES.find((t) => normWords(t.name).join(" ") === key);
  if (exact) return exact.code;

  const wordSet = new Set(words);
  const partial = TEAM_CODES.find((t) => {
    const entrySet = new Set(normWords(t.name));
    const [smaller, larger] = entrySet.size <= wordSet.size ? [entrySet, wordSet] : [wordSet, entrySet];
    if (smaller.size === 0) return false;
    for (const w of smaller) if (!larger.has(w)) return false;
    return true;
  });
  return partial ? partial.code : null;
}

function teamInitials(name) {
  const code = findTeamCode(name);
  if (code) return code;
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return (words[0].slice(0, 1) + words[1].slice(0, 2)).toUpperCase();
}

function teamBadgeHtml(name, logoPath, color) {
  if (logoPath) {
    return `<img class="team-badge" src="${logoPath}" alt="${name}" />`;
  }
  return `<span class="team-badge team-badge-initials" style="background:${color}1a; color:${color};">${teamInitials(name)}</span>`;
}

// -------------------- Vue Accueil : liste groupée par ligue --------------------

function renderHomeList() {
  document.getElementById("match-total").textContent = MATCHES.length;

  const container = document.getElementById("home-list");

  const groupsHtml = LEAGUES.map((league) => {
    const matches = MATCHES.filter((m) => m.league === league.id);
    if (matches.length === 0) return "";

    const rowsHtml = matches
      .map((m) => {
        const locked = m.tier === "premium" && !isPremiumUnlocked();
        const wasPremium = m.tier === "premium";
        return `
          <button class="match-row ${locked ? "locked" : ""}" data-match-id="${m.id}">
            <div class="match-row-info">
              <span class="match-row-time">${m.day} ${m.time}</span>
              <span class="match-row-teams">${m.home} - ${m.away}</span>
            </div>
            <span class="tier-badge ${locked ? "premium" : "free"}">
              ${locked ? "🔒 Premium" : wasPremium ? "🔓 Débloqué" : "Gratuit"}
            </span>
          </button>
        `;
      })
      .join("");

    return `
      <div class="league-group">
        <div class="league-header" style="border-color:${league.color}">${league.name}</div>
        <div class="league-matches">${rowsHtml}</div>
      </div>
    `;
  }).join("");

  container.innerHTML = groupsHtml;

  container.querySelectorAll(".match-row").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.matchId);
      const match = MATCHES.find((m) => m.id === id);
      if (match.tier === "premium" && !isPremiumUnlocked()) {
        pendingMatchId = id;
        showToast("🔒 Ce pronostic est réservé aux abonnés Premium. Entre ton code d'accès si tu es déjà abonné, ou clique sur \"S'abonner\".");
      } else {
        openDetail(id);
      }
    });
  });
}

// -------------------- Déverrouillage par code d'accès --------------------

let pendingMatchId = null;

function isPremiumUnlocked() {
  return localStorage.getItem("premium_unlocked_code") === WEEKLY_ACCESS_CODE;
}

document.getElementById("toast-unlock").addEventListener("click", () => {
  const input = document.getElementById("code-input");
  const errorEl = document.getElementById("code-error");
  const entered = input.value.trim();

  if (entered === WEEKLY_ACCESS_CODE) {
    localStorage.setItem("premium_unlocked_code", entered);
    errorEl.textContent = "";
    hideToast();
    if (pendingMatchId !== null) openDetail(pendingMatchId);
    renderHomeList(); // rafraîchit les badges premium -> déverrouillé
  } else {
    errorEl.textContent = "Code incorrect.";
  }
});

function showToast(message) {
  document.getElementById("toast-message").textContent = message;
  document.getElementById("toast").classList.add("show");
  document.getElementById("toast-backdrop").classList.add("show");
}

function hideToast() {
  document.getElementById("toast").classList.remove("show");
  document.getElementById("toast-backdrop").classList.remove("show");
  document.getElementById("code-input").value = "";
  document.getElementById("code-error").textContent = "";
}

document.getElementById("toast-close").addEventListener("click", hideToast);
document.getElementById("toast-backdrop").addEventListener("click", hideToast);

document.getElementById("toast-subscribe").addEventListener("click", () => {
  hideToast();
  showView("premium");
});

// -------------------- Vue Détail : carte plein écran d'un pronostic --------------------

function openDetail(matchId) {
  currentIndex = MATCHES.findIndex((m) => m.id === matchId);
  renderDetailCard();
  showView("detail");
}

function renderDetailCard() {
  const match = MATCHES[currentIndex];
  const league = leagueById(match.league);
  const container = document.getElementById("match-card");

  const argsHtml = match.args
    .map(
      (a) => `
      <div class="arg-card">
        <div class="arg-icon">${ICONS[a.icon] || "⭐"}</div>
        <div class="arg-body">
          <div class="arg-label">${a.label}</div>
          <div class="arg-text">${a.text}</div>
        </div>
      </div>
    `
    )
    .join("");

  const starsHtml = [1, 2, 3, 4, 5]
    .map((i) => {
      if (i <= match.conf) return `<span class="star on">★</span>`;
      if (i - 0.5 === match.conf) return `<span class="star half">★</span>`;
      return `<span class="star">★</span>`;
    })
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
  `;
}

document.getElementById("btn-back").addEventListener("click", () => {
  showView("home");
});

// -------------------- Vue Historique --------------------

function renderMatchProofCard(match, result, proof) {
  const tag = result
    ? `<span class="result-tag ${result}">${result === "won" ? "Gagné" : result === "lost" ? "Perdu" : "Remboursé"}</span>`
    : `<span class="result-tag pending">En cours</span>`;

  const league = leagueById(match.league);
  const proofHtml = proof
    ? `
      <div class="proof-ticket">
        <div class="proof-match">
          <span class="proof-team-name">${match.home}</span>
          ${teamBadgeHtml(match.home, match.homeLogo, league.color)}
          ${proof.score ? `<span class="proof-score">${proof.score.replace("-", " : ")}</span>` : ""}
          ${teamBadgeHtml(match.away, match.awayLogo, league.color)}
          <span class="proof-team-name">${match.away}</span>
        </div>
        <div class="proof-row highlight"><span>Type de pari</span><span>${match.type} : ${match.pick}</span></div>
        <div class="proof-row"><span>Cote</span><span>${proof.cote.toFixed(2)}</span></div>
        ${proof.mise != null ? `<div class="proof-row"><span>Mise</span><span>${proof.mise} F</span></div>` : ""}
        ${proof.gains != null ? `<div class="proof-row highlight"><span>Gains</span><span>${proof.gains.toFixed(1)} F</span></div>` : ""}
        <div class="proof-note ${result}">${result === "won" ? "Ticket validé" : result === "lost" ? "Ticket perdu" : "Ticket remboursé"}</div>
      </div>
    `
    : "";

  return `
    <div class="history-row">
      <div class="history-info">
        <div class="history-teams">${match.home} - ${match.away}</div>
        <div class="history-pick">${match.type} : ${match.pick}</div>
      </div>
      ${tag}
    </div>
    ${proofHtml}
  `;
}

// -------------------- Vue Historique --------------------

function renderHistory() {
  const container = document.getElementById("history-list");
  const entries = Object.keys(CURRENT_RESULTS);

  let html = "";

  // --- Jour de match en cours ---
  if (entries.length === 0) {
    html += `<div class="history-day-header">Aujourd'hui</div>`;
    html += `<div class="empty-state">Les résultats de ce jour de match seront affichés ici une fois les matchs terminés.</div>`;
  } else {
    let won = 0, lost = 0, void_ = 0;
    const rows = MATCHES.map((match) => {
      const result = CURRENT_RESULTS[match.id];
      if (result === "won") won++;
      else if (result === "lost") lost++;
      else if (result === "void") void_++;
      const proof = typeof PROOF !== "undefined" ? PROOF[match.id] : null;
      return renderMatchProofCard(match, result, proof);
    }).join("");

    html += `<div class="history-day-header">Aujourd'hui</div>`;
    html += `<div class="history-day-summary">${won} gagnés · ${lost} perdus · ${void_} remboursés (sur ${MATCHES.length})</div>`;
    html += rows;
  }

  // --- Archive des jours précédents (sections dépliables) ---
  if (typeof ARCHIVE !== "undefined") {
    ARCHIVE.forEach((day, index) => {
      let won = 0, lost = 0, void_ = 0;
      day.matches.forEach((m) => {
        if (m.result === "won") won++;
        else if (m.result === "lost") lost++;
        else if (m.result === "void") void_++;
      });

      const cardsHtml = day.matches
        .map((m) => renderMatchProofCard(m, m.result, m.proof))
        .join("");

      html += `
        <button class="archive-toggle" data-archive-index="${index}">
          <span>${day.label}</span>
          <span class="archive-summary">${won}✅ ${lost}❌ ${void_}↩️ <span class="archive-chevron">▾</span></span>
        </button>
        <div class="archive-body" id="archive-body-${index}" style="display:none;">
          ${cardsHtml}
        </div>
      `;
    });
  }

  container.innerHTML = html;
  document.getElementById("history-summary").textContent = "Historique complet, jour après jour";

  container.querySelectorAll(".archive-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = document.getElementById(`archive-body-${btn.dataset.archiveIndex}`);
      const isOpen = body.style.display !== "none";
      body.style.display = isOpen ? "none" : "block";
      btn.classList.toggle("open", !isOpen);
    });
  });
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

function showView(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach((v) => (v.style.display = "none"));
  document.getElementById(`view-${view}`).style.display = "flex";

  // "detail" est une sous-vue d'Accueil : le bouton du bas reste sur "Accueil"
  const navKey = view === "detail" ? "home" : view;
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === navKey);
  });

  if (view === "history") renderHistory();
  if (view === "premium") renderPremium();
}

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

// -------------------- Démarrage --------------------

renderHomeList();
