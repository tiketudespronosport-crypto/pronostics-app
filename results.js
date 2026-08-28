// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un week-end, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// L'affichage public se réinitialise chaque semaine — mais
// ARCHIVE garde ta progression complète sur l'année pour toi.
// ============================================================

// Résultats du vendredi 28 août 2026 (à remplir après les matchs)
const CURRENT_RESULTS = {
  // 1: "won",
  // 2: "lost",
  // 3: "void",
  // 4: "won",
};

// Archive complète de la saison — TOI seul y as accès
const SEASON_ARCHIVE = [
  { weekend: "22-23 août 2026", total: 8, won: 3, lost: 4, void: 1 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, SEASON_ARCHIVE };
