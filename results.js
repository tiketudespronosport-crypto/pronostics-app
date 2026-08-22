// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un week-end, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// L'affichage public se réinitialise chaque semaine — mais
// ARCHIVE garde ta progression complète sur l'année pour toi.
// ============================================================

// Résultats de CE week-end (affichés publiquement, à réinitialiser
// avant le prochain week-end en vidant ce tableau)
const CURRENT_RESULTS = {
  // Exemple à remplir après les matchs :
  // 1: "won",
  // 2: "lost",
  // 3: "void",
};

// Archive complète de la saison — TOI seul y as accès (pas affiché
// publiquement dans cette V1). Ajoute une ligne par week-end passé.
const SEASON_ARCHIVE = [
  // Exemple :
  // { weekend: "22-23 août 2026", total: 8, won: 5, lost: 2, void: 1 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, SEASON_ARCHIVE };
