// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// Lundi 31 août 2026 — tous en Gratuit
// Confiance calculée depuis la cote : (1/cote)/20, arrondi au 0.5 le plus proche
// ============================================================

const LEAGUES = [
  { id: "pl",     name: "Premier League", short: "PL",  color: "#37003C" },
  { id: "liga",   name: "La Liga",        short: "ESP", color: "#EE8707" },
  { id: "seriea", name: "Serie A",        short: "ITA", color: "#0C56A5" },
  { id: "bundes", name: "Bundesliga",     short: "GER", color: "#D3010C" },
  { id: "l1",     name: "Ligue 1",        short: "FRA", color: "#0A1E3C" },
];

const MATCHES = [
  {
    id: 1,
    league: "liga",
    home: "Barcelona",
    away: "Rayo Vallecano",
    day: "Lun",
    date: "31 août",
    time: "20:30",
    type: "Buteurs",
    pick: "Raphinha + Fermín López marquent",
    cote: 3.9,
    conf: 1.5,
    tier: "free",
    result: null,
    args: [
      { icon: "player", label: "Facteur individuel", text: "Raphinha a marqué lors de ses 3 derniers matchs de Liga (5 buts), pourrait marquer un 4e match de suite — une première pour lui en Liga." },
      { icon: "player", label: "Deuxième menace", text: "Fermín López a marqué lors de ses 2 derniers matchs, co-meilleur buteur du club avec Raphinha (3 buts chacun)." },
      { icon: "history", label: "Forteresse à domicile", text: "Barcelone n'a pas encaissé lors de ses 4 derniers matchs à domicile contre Rayo, sur une série de 20 victoires consécutives à domicile en Liga." },
    ],
  },
  {
    id: 2,
    league: "seriea",
    home: "Lecce",
    away: "Roma",
    day: "Lun",
    date: "31 août",
    time: "18:30",
    type: "Handicap",
    pick: "Victoire Roma (-1)",
    cote: 1.74,
    conf: 3,
    tier: "free",
    result: null,
    args: [
      { icon: "history", label: "Domination historique", text: "Roma est invaincu sur ses 10 derniers duels contre Lecce, marquant 18 buts contre 4 encaissés sur cette période." },
      { icon: "form", label: "Forme exceptionnelle", text: "Roma a gagné ses 6 derniers matchs de Serie A et a gardé sa cage inviolée lors des 3 derniers." },
      { icon: "player", label: "Facteur individuel", text: "Donyell Malen a marqué un triplé à la 1ère journée — pourrait devenir seulement le 2e joueur de Roma en 65 ans à marquer 4+ buts sur ses 2 premiers matchs." },
    ],
  },
  {
    id: 3,
    league: "pl",
    home: "Aston Villa",
    away: "Arsenal",
    day: "Lun",
    date: "31 août",
    time: "21:00",
    type: "Total",
    pick: "Over 2.5 buts",
    cote: 1.823,
    conf: 3,
    tier: "free",
    result: null,
    args: [
      { icon: "history", label: "Tendance offensive à Villa Park", text: "Au moins 3 buts lors de chacun des 8 derniers matchs à domicile d'Aston Villa, sans exception." },
      { icon: "form", label: "Nuance sur Arsenal", text: "Aston Villa a battu Man City et Liverpool à domicile ces dernières saisons — un vrai profil de \"tueur de champions\", qui nuance la domination apparente d'Arsenal." },
      { icon: "coach", label: "Méforme de Villa en août", text: "Aston Villa n'a pas marqué lors de 5 de ses 6 derniers matchs de Premier League en août — l'Over ne dépendra probablement pas d'un vrai échange offensif." },
    ],
  },
  {
    id: 4,
    league: "seriea",
    home: "Atalanta",
    away: "Bologna",
    day: "Lun",
    date: "31 août",
    time: "20:45",
    type: "Handicap",
    pick: "Bologne (+1)",
    cote: 1.47,
    conf: 3.5,
    tier: "free",
    result: null,
    args: [
      { icon: "history", label: "Retournement de tendance", text: "Bologne a gagné 4 de ses 7 derniers duels contre Atalanta, après n'avoir gagné qu'1 seule fois sur les 14 précédents." },
      { icon: "form", label: "Fragilité d'Atalanta à domicile", text: "Atalanta n'a gagné qu'1 de ses 5 derniers matchs à domicile, et a perdu 3 de ses 4 derniers face à Bologne à domicile." },
      { icon: "player", label: "Solidité de Bologne", text: "Bologne reste invaincu sur 7 de ses 13 derniers duels contre Atalanta malgré très peu de buts en 1ère mi-temps — Orsolini reste dangereux en 2e période." },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
