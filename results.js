// ============================================================
// results.js — L'HISTORIQUE DE TES RÉSULTATS
// ============================================================
// Après un week-end, mets ici le résultat de chaque pronostic :
// "won" (gagné), "lost" (perdu), ou "void" (remboursé/annulé).
// L'affichage public se réinitialise chaque semaine — mais
// ARCHIVE garde ta progression complète sur l'année pour toi.
// ============================================================

// Résultats du week-end du 22-23 août 2026
const CURRENT_RESULTS = {
  1: "won",   // Forest-Leeds — Double Chance Leeds/Nul (0-1)
  2: "won",   // Athletic-Sevilla — Sevilla marque +0.5 (1-3)
  3: "lost",  // Valencia-Celta — Over 2 (0-0)
  4: "void",  // Udinese-Como — Udinese Under 1 (1-1, remboursé)
  5: "won",   // Genoa-Napoli — Victoire Napoli (0-2)
  6: "lost",  // Lens-Auxerre — Under 3 (5-2)
  7: "lost",  // Nice-Lorient — BTTS Oui (0-0)
  8: "lost",  // Toulouse-Lyon — Over 2.5 (0-2, raté d'un but)
};

// Archive complète de la saison — TOI seul y as accès (pas affiché
// publiquement dans cette V1). Ajoute une ligne par week-end passé.
const SEASON_ARCHIVE = [
  { weekend: "22-23 août 2026", total: 8, won: 3, lost: 4, void: 1 },
];

if (typeof module !== "undefined") module.exports = { CURRENT_RESULTS, SEASON_ARCHIVE };
