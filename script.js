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

function pseudoCouponNumber(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const n = 86450000000 + (hash % 900000);
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
    <div class="analyse-header">
      <span class="league-pill" style="background:${league.color}">${league.name}</span>
      <span class="match-time-sub">🕐 ${match.day} ${match.date} · ${match.time}</span>
    </div>
    <div class="pari-match">
      <span class="team-pair"><span class="pari-team">${match.home}</span>
      ${teamBadgeHtml(match.home, match.homeLogo, league.color)}</span>
      <span class="pari-vs">vs</span>
      <span class="team-pair">${teamBadgeHtml(match.away, match.awayLogo, league.color)}
      <span class="pari-team">${match.away}</span></span>
    </div>
    <div class="stars standalone">${starsHtml}</div>
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
      <span class="team-pair"><span class="pari-team">${match.home}</span>
      ${teamBadgeHtml(match.home, match.homeLogo, league.color)}</span>
      <span class="pari-vs">à venir</span>
      <span class="team-pair">${teamBadgeHtml(match.away, match.awayLogo, league.color)}
      <span class="pari-team">${match.away}</span></span>
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
        <span class="team-pair"><span class="pari-team">${match.home}</span>
        ${teamBadgeHtml(match.home, match.homeLogo, league.color)}</span>
        <span class="pari-vs">vs</span>
        <span class="team-pair">${teamBadgeHtml(match.away, match.awayLogo, league.color)}
        <span class="pari-team">${match.away}</span></span>
      </div>
      <div class="coupon-pick">${match.type} : ${match.pick}</div>
    </div>
  `;
}

document.getElementById("btn-back").addEventListener("click", () => {
  showView("home");
});

// -------------------- Vue Historique --------------------

function groupHistoryByDate(history) {
  const map = new Map();
  history.forEach((h) => {
    if (!map.has(h.date)) map.set(h.date, []);
    map.get(h.date).push(h);
  });
  return Array.from(map.entries()).reverse(); // date la plus récente en premier
}

function renderHistory() {
  const container = document.getElementById("history-list");

  if (typeof HISTORY === "undefined" || HISTORY.length === 0) {
    container.innerHTML = `<div class="empty-state">Les résultats de ce week-end seront affichés ici une fois les matchs terminés.</div>`;
    document.getElementById("history-summary").textContent = "";
    return;
  }

  let won = 0, lost = 0, void_ = 0;
  HISTORY.forEach((h) => {
    if (h.result === "won") won++;
    else if (h.result === "lost") lost++;
    else if (h.result === "void") void_++;
  });

  const groups = groupHistoryByDate(HISTORY);

  const groupsHtml = groups
    .map(([date, entries], idx) => {
      let gWon = 0, gLost = 0, gVoid = 0;

      const rowsHtml = entries
        .map((h) => {
          if (h.result === "won") gWon++;
          else if (h.result === "lost") gLost++;
          else if (h.result === "void") gVoid++;

          const statusColor = h.result === "won" ? "var(--win)" : h.result === "lost" ? "var(--lose)" : "var(--void)";
          const statusIcon = h.result === "won" ? "✓" : h.result === "lost" ? "✕" : "↩";
          const statusLabel = h.result === "won" ? "Gagné" : h.result === "void" ? "Remboursé" : "Perdu";
          const league = leagueById(h.league);
          const couponNb = pseudoCouponNumber(h.home + h.away + h.date);
          const proofHtml = `
            <div class="proof-ticket coupon-style">
              <div class="coupon-head">
                <span class="coupon-date">${h.date}.2026 (${h.time})</span>
                <span class="coupon-id">N° ${couponNb}</span>
              </div>
              <div class="coupon-rows">
                <div class="proof-row"><span>Cote</span><span>${h.cote.toFixed(2)}</span></div>
                <div class="proof-row"><span>Mise</span><span>${h.mise} F</span></div>
                <div class="proof-row highlight"><span>Gains</span><span>${h.gains.toFixed(1)} F</span></div>
                <div class="proof-row"><span>Statut</span><span style="color:${statusColor}; font-weight:700;">${statusIcon} ${statusLabel}</span></div>
              </div>
              <div class="coupon-match-block">
                <span class="league-pill" style="background:${league.color}">${league.name}</span>
                <div class="pari-match">
                  <span class="team-pair"><span class="pari-team">${h.home}</span>
                  ${teamBadgeHtml(h.home, h.homeLogo, league.color)}</span>
                  ${h.score ? `<span class="proof-score">${h.score.replace("-", " : ")}</span>` : `<span class="pari-vs">vs</span>`}
                  <span class="team-pair">${teamBadgeHtml(h.away, h.awayLogo, league.color)}
                  <span class="pari-team">${h.away}</span></span>
                </div>
                <div class="coupon-pick">${h.type} : ${h.pick}</div>
              </div>
            </div>
          `;

          return proofHtml;
        })
        .join("");

      const groupId = `hist-group-${idx}`;
      return `
        <div class="history-group">
          <button class="history-date-header" data-group="${groupId}">
            <span class="history-date-label">${date} 2026</span>
            <span class="history-date-summary">${gWon}G · ${gLost}P · ${gVoid}R</span>
            <span class="history-chevron">⌄</span>
          </button>
          <div class="history-date-body" id="${groupId}">${rowsHtml}</div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = groupsHtml;
  document.getElementById("history-summary").textContent =
    `${won} gagnés · ${lost} perdus · ${void_} remboursés (sur ${HISTORY.length})`;

  container.querySelectorAll(".history-date-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = document.getElementById(btn.dataset.group);
      const isOpen = body.classList.contains("open");
      body.classList.toggle("open", !isOpen);
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
