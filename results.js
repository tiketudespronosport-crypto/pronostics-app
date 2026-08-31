// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un jour de match, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// PROOF contient les vraies données de ta mise (preuve que tu
// joues toi-même tes pronostics) — cote, mise, gains, score final.
// ============================================================

// Résultats du dimanche 30 août 2026 (à remplir après les matchs)
const CURRENT_RESULTS = {
  // 1: "won",
  // 2: "lost",
  // 3: "void",
};

// Preuve de mise réelle pour chaque pronostic (facultatif)
const PROOF = {
  // 1: { cote: 3.5, mise: 90, gains: 315, score: "" },
};

// Archive complète de la saison — TOI seul y as accès
const SEASON_ARCHIVE = [
  { weekend: "22-23 août 2026", total: 8, won: 3, lost: 4, void: 1 },
  { weekend: "28 août 2026", total: 4, won: 4, lost: 0, void: 0 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, PROOF, SEASON_ARCHIVE };
