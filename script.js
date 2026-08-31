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

let currentTab = "analyse";

function openDetail(matchId) {
  currentIndex = MATCHES.findIndex((m) => m.id === matchId);
  currentTab = "analyse";
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === "analyse");
  });
  renderDetailCard();
  showView("detail");
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTab = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderDetailCard();
  });
});

function couponNumber(matchId) {
  const n = 86453000000 + matchId * 76543 + 21;
  return String(n);
}

function renderDetailCard() {
  const match = MATCHES[currentIndex];
  const league = leagueById(match.league);
  const container = document.getElementById("match-card");

  if (currentTab === "analyse") {
    container.innerHTML = renderAnalyseTab(match, league);
  } else if (currentTab === "pari") {
    container.innerHTML = renderPariTab(match, league);
  } else {
    container.innerHTML = renderCouponTab(match, league);
  }
}

function renderAnalyseTab(match, league) {
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

  return `
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

function renderPariTab(match, league) {
  return `
    <div class="ticket-top">
      <span class="league-badge" style="background:${league.color}">${league.name}</span>
      <span class="match-time">🕐 ${match.day} ${match.date} · ${match.time}</span>
    </div>
    <div class="pari-match">
      ${teamBadgeHtml(match.home, match.homeLogo, league.color)}
      <span class="pari-team">${match.home}</span>
      <span class="pari-vs">à venir</span>
      <span class="pari-team">${match.away}</span>
      ${teamBadgeHtml(match.away, match.awayLogo, league.color)}
    </div>
    <div class="pari-detail">
      <div class="proof-row highlight"><span>Type de pari</span><span>${match.type}</span></div>
      <div class="proof-row highlight"><span>Sélection</span><span>${match.pick}</span></div>
      <div class="proof-row"><span>Cote</span><span>${match.cote}</span></div>
    </div>
  `;
}

function renderCouponTab(match, league) {
  const mise = 90;
  const gains = (match.cote * mise).toFixed(1);

  return `
    <div class="coupon-head">
      <span class="coupon-date">${match.date}.2026 (${match.time})</span>
      <span class="coupon-id">N° ${couponNumber(match.id)}</span>
    </div>
    <div class="coupon-rows">
      <div class="proof-row"><span>Cote</span><span>${match.cote}</span></div>
      <div class="proof-row"><span>Mise</span><span>${mise} F</span></div>
      <div class="proof-row highlight"><span>Gains potentiels</span><span>${gains} F</span></div>
      <div class="proof-row"><span>Statut</span><span class="status-accepted">✓ Accepté</span></div>
    </div>
    <div class="coupon-match-block">
      <span class="league-badge" style="background:${league.color}">${league.name}</span>
      <div class="pari-match">
        ${teamBadgeHtml(match.home, match.homeLogo, league.color)}
        <span class="pari-team">${match.home}</span>
        <span class="pari-vs">vs</span>
        <span class="pari-team">${match.away}</span>
        ${teamBadgeHtml(match.away, match.awayLogo, league.color)}
      </div>
      <div class="coupon-pick">${match.type} : ${match.pick}</div>
    </div>
  `;
}

document.getElementById("btn-back").addEventListener("click", () => {
  showView("home");
});

// -------------------- Vue Historique --------------------

function renderHistory() {
  const container = document.getElementById("history-list");

  if (typeof HISTORY === "undefined" || HISTORY.length === 0) {
    container.innerHTML = `<div class="empty-state">Les résultats de ce week-end seront affichés ici une fois les matchs terminés.</div>`;
    document.getElementById("history-summary").textContent = "";
    return;
  }

  let won = 0, lost = 0, void_ = 0;

  const rows = HISTORY.map((h) => {
    if (h.result === "won") won++;
    else if (h.result === "lost") lost++;
    else if (h.result === "void") void_++;

    const tag = `<span class="result-tag ${h.result}">${h.result === "won" ? "Gagné" : h.result === "lost" ? "Perdu" : "Remboursé"}</span>`;

    const league = leagueById(h.league);
    const proofHtml = `
      <div class="proof-ticket">
        <div class="proof-match">
          <span class="proof-team-name">${h.home}</span>
          ${teamBadgeHtml(h.home, h.homeLogo, league.color)}
          ${h.score ? `<span class="proof-score">${h.score.replace("-", " : ")}</span>` : ""}
          ${teamBadgeHtml(h.away, h.awayLogo, league.color)}
          <span class="proof-team-name">${h.away}</span>
        </div>
        <div class="proof-row highlight"><span>Type de pari</span><span>${h.type} : ${h.pick}</span></div>
        <div class="proof-row"><span>Cote</span><span>${h.cote.toFixed(2)}</span></div>
        <div class="proof-row"><span>Mise</span><span>${h.mise} F</span></div>
        <div class="proof-row highlight"><span>Gains</span><span>${h.gains.toFixed(1)} F</span></div>
        <div class="proof-note">${h.result === "won" ? "Ticket validé" : h.result === "void" ? "Ticket remboursé" : "Ticket perdu"}</div>
      </div>
    `;

    return `
      <div class="history-row">
        <div class="history-info">
          <div class="history-teams">${h.home} - ${h.away}</div>
          <div class="history-pick">${h.type} : ${h.pick}</div>
        </div>
        ${tag}
      </div>
      ${proofHtml}
    `;
  }).join("");

  container.innerHTML = rows;
  document.getElementById("history-summary").textContent =
    `${won} gagnés · ${lost} perdus · ${void_} remboursés (sur ${HISTORY.length})`;
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
