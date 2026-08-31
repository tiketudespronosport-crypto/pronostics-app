// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un week-end, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// PROOF contient les vraies données de ta mise (preuve que tu
// joues toi-même tes pronostics) — cote, mise, gains.
// ============================================================

// Résultats du lundi 31 août 2026 — en attente (matchs pas encore joués)
const CURRENT_RESULTS = {};

// Preuve de mise réelle (remplie une fois les matchs terminés)
const PROOF = {};

// Archive complète de la saison — TOI seul y as accès
const SEASON_ARCHIVE = [
  { weekend: "22-23 août 2026", total: 8, won: 3, lost: 4, void: 1 },
  { weekend: "28 août 2026", total: 4, won: 4, lost: 0, void: 0 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, PROOF, SEASON_ARCHIVE };
