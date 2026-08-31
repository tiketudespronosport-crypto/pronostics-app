// ============================================================
// archive.js — HISTORIQUE COMPLET DE TOUS LES JOURS DE MATCH
// ============================================================
// Chaque entrée = un jour de match déjà terminé, avec TOUS ses
// matchs, résultats et preuves de mise conservés en détail.
// Quand un nouveau jour de match se termine, on déplace son
// contenu de data.js/results.js vers ici (voir méthode ci-dessous).
// Le plus récent en PREMIER dans le tableau.
// ============================================================

const ARCHIVE = [
  {
    label: "Vendredi 28 août 2026",
    matches: [
      {
        id: "0828-1", league: "liga", home: "Racing Santander", away: "Elche",
        day: "Ven", date: "28 août", time: "17:00",
        type: "Les deux équipes marquent", pick: "Oui", cote: 1.54, conf: 3, tier: "free",
        result: "won", proof: { cote: 1.54, mise: 90, gains: 138.6, score: "3 - 2" },
        args: [
          { icon: "history", label: "Tendance buts à domicile", text: "Au moins 3 buts lors de chacun des 8 derniers matchs à domicile de Santander. Les deux équipes ont marqué lors des 6 derniers." },
          { icon: "form", label: "Forme des deux équipes", text: "Aucune des deux équipes n'a encore gagné cette saison. Santander vient de perdre son 1er match, Elche a pris 5-0 contre Barcelone." },
        ],
      },
      {
        id: "0828-2", league: "seriea", home: "AC Milan", away: "Venezia",
        day: "Ven", date: "28 août", time: "18:45",
        type: "1N2", pick: "Victoire Milan (Handicap -1)", cote: 1.76, conf: 3.5, tier: "free",
        result: "won", proof: { cote: 1.76, mise: 90, gains: 158.4, score: "2 - 0" },
        args: [
          { icon: "history", label: "Domination historique totale", text: "Milan a gagné ses 5 derniers duels contre Venezia sans encaisser lors des 4 derniers." },
          { icon: "form", label: "Dynamique d'ouverture", text: "Milan a gagné son 1er match. Venezia n'a jamais gagné son 1er match à l'extérieur en 14 saisons d'élite." },
        ],
      },
      {
        id: "0828-3", league: "pl", home: "Crystal Palace", away: "Manchester City",
        day: "Ven", date: "28 août", time: "19:00",
        type: "Buteur", pick: "Haaland marque", cote: 1.71, conf: 3, tier: "free",
        result: "won", proof: { cote: 1.71, mise: 90, gains: 153.9, score: "1 - 4" },
        args: [
          { icon: "player", label: "Statistique extrême", text: "Haaland a marqué lors de ses 5 confrontations en PL contre Palace (8 buts) — 100% de réussite." },
          { icon: "history", label: "Domination City en PL", text: "City invaincu sur ses 11 derniers déplacements en PL à Selhurst Park depuis 2015." },
        ],
      },
      {
        id: "0828-4", league: "l1", home: "Lille", away: "Paris Saint-Germain",
        day: "Ven", date: "28 août", time: "18:45",
        type: "Combiné", pick: "Double Chance PSG + PSG Under 2.5 buts", cote: 1.8, conf: 3, tier: "free",
        result: "won", proof: { cote: 1.8, mise: 90, gains: 162, score: "2 - 2" },
        args: [
          { icon: "history", label: "Domination historique du PSG", text: "PSG invaincu sur ses 10 derniers duels contre Lille, 33 buts marqués contre 11 encaissés." },
          { icon: "form", label: "Tendance défensive à Lille", text: "Moins de 3 buts au total lors de chacun des 6 derniers matchs de Lille." },
        ],
      },
    ],
  },
  {
    label: "22-23 août 2026",
    matches: [
      {
        id: "0822-1", league: "pl", home: "Nottingham Forest", away: "Leeds United",
        day: "Sam", date: "22 août", time: "14:00",
        type: "Double Chance", pick: "Leeds ou Nul", cote: 1.65, conf: 3, tier: "premium",
        result: "won", proof: null,
        args: [
          { icon: "history", label: "Historique direct", text: "Forest invaincu 14 matchs à domicile contre Leeds depuis 1971-72, mais Leeds a gagné le dernier duel." },
        ],
      },
      {
        id: "0822-2", league: "liga", home: "Athletic Club", away: "Sevilla",
        day: "Sam", date: "22 août", time: "15:00",
        type: "Total Sevilla", pick: "Over 0.5 but", cote: 1.71, conf: 3, tier: "premium",
        result: "won", proof: null,
        args: [
          { icon: "player", label: "Joueur clé", text: "Peque Fernández a déjà marqué à Bilbao en janvier 2026." },
        ],
      },
      {
        id: "0822-3", league: "liga", home: "Valencia", away: "Celta de Vigo",
        day: "Sam", date: "22 août", time: "17:30",
        type: "Total", pick: "Over 2 buts", cote: 1.64, conf: 2, tier: "free",
        result: "lost", proof: null,
        args: [
          { icon: "history", label: "Historique direct", text: "Au moins 3 buts lors de chacune des 6 dernières confrontations." },
        ],
      },
      {
        id: "0822-4", league: "seriea", home: "Udinese", away: "Como",
        day: "Sam", date: "22 août", time: "16:30",
        type: "Total Individuel Udinese", pick: "Under 1 but", cote: 1.45, conf: 4, tier: "free",
        result: "void", proof: null,
        args: [
          { icon: "history", label: "Historique direct", text: "Como a gardé sa cage inviolée lors des 2 derniers duels face à Udinese." },
        ],
      },
      {
        id: "0822-5", league: "seriea", home: "Genoa", away: "Napoli",
        day: "Sam", date: "22 août", time: "18:45",
        type: "1N2", pick: "Victoire Napoli", cote: 1.94, conf: 3, tier: "free",
        result: "won", proof: null,
        args: [
          { icon: "history", label: "Historique direct", text: "Napoli invaincu sur 25 de ses 26 derniers duels contre Genoa." },
        ],
      },
      {
        id: "0822-6", league: "l1", home: "Lens", away: "Auxerre",
        day: "Sam", date: "22 août", time: "15:15",
        type: "Total", pick: "Under 3 buts", cote: 1.72, conf: 4, tier: "premium",
        result: "lost", proof: { cote: 1.72, mise: null, gains: null, score: "5 - 2" },
        args: [
          { icon: "history", label: "Historique direct", text: "Lens n'a pas encaissé lors de 4 de ses 6 derniers matchs à domicile contre Auxerre." },
        ],
      },
      {
        id: "0822-7", league: "l1", home: "Nice", away: "Lorient",
        day: "Sam", date: "22 août", time: "18:45",
        type: "BTTS", pick: "Les deux équipes marquent", cote: 1.70, conf: 3, tier: "free",
        result: "lost", proof: null,
        args: [
          { icon: "history", label: "Historique direct", text: "Nice a marqué lors de chacune de ses 16 dernières réceptions de Lorient." },
        ],
      },
      {
        id: "0822-8", league: "l1", home: "Toulouse", away: "Lyon",
        day: "Sam", date: "22 août", time: "18:45",
        type: "Total", pick: "Over 2.5 buts", cote: 1.97, conf: 4, tier: "premium",
        result: "lost", proof: { cote: 1.97, mise: null, gains: null, score: "0 - 2" },
        args: [
          { icon: "history", label: "Historique direct", text: "Au moins 3 buts lors de chacun des 10 derniers duels entre Toulouse et Lyon à Toulouse." },
        ],
      },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { ARCHIVE };
