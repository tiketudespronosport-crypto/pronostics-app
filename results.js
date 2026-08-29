// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un week-end, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// PROOF contient les vraies données de ta mise (preuve que tu
// joues toi-même tes pronostics) — cote, mise, gains.
// ============================================================

// Résultats du vendredi 28 août 2026 — 4/4 GAGNÉS
const CURRENT_RESULTS = {
  1: "won",  // Santander-Elche — BTTS Oui (3-2)
  2: "won",  // Milan-Venezia — Handicap 1 (-1) (2-0)
  3: "won",  // Crystal Palace-Man City — Haaland buteur (1-4)
  4: "won",  // Lille-PSG — 2X + Total Équipe 2 Under 2.5 (2-2)
};

// Preuve de mise réelle pour chaque pronostic (facultatif — si absent,
// pas de reçu affiché pour ce match)
const PROOF = {
  1: { cote: 1.54, mise: 90, gains: 138.6 },
  2: { cote: 1.76, mise: 90, gains: 158.4 },
  3: { cote: 1.71, mise: 90, gains: 153.9 },
  4: { cote: 1.8,  mise: 90, gains: 162 },
};

// Archive complète de la saison — TOI seul y as accès
const SEASON_ARCHIVE = [
  { weekend: "22-23 août 2026", total: 8, won: 3, lost: 4, void: 1 },
  { weekend: "28 août 2026", total: 4, won: 4, lost: 0, void: 0 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, PROOF, SEASON_ARCHIVE };
