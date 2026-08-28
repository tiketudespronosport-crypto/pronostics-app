// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// Vendredi 28 août 2026 — tous en Gratuit (règle du vendredi)
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
    home: "Racing Santander",
    away: "Elche",
    day: "Ven",
    date: "28 août",
    time: "17:00",
    type: "Les deux équipes marquent",
    pick: "Oui",
    cote: 1.57,
    conf: 3,
    tier: "free",
    result: null,
    args: [
      { icon: "history", label: "Tendance buts à domicile", text: "Au moins 3 buts lors de chacun des 8 derniers matchs à domicile de Santander. Les deux équipes ont marqué lors des 6 derniers." },
      { icon: "form", label: "Forme des deux équipes", text: "Aucune des deux équipes n'a encore gagné cette saison (1N 1D chacune). Santander vient de perdre son 1er match, Elche a pris 5-0 contre Barcelone." },
      { icon: "coach", label: "Séries négatives à noter", text: "Santander : 11 matchs à domicile sans victoire depuis 2012. Elche : 4 matchs sans victoire à l'extérieur, dernière victoire en avril." },
    ],
  },
  {
    id: 2,
    league: "seriea",
    home: "AC Milan",
    away: "Venezia",
    day: "Ven",
    date: "28 août",
    time: "18:45",
    type: "1N2",
    pick: "Victoire Milan",
    cote: 1.51,
    conf: 3.5,
    tier: "premium",
    result: null,
    args: [
      { icon: "history", label: "Domination historique totale", text: "Milan a gagné ses 5 derniers duels contre Venezia sans encaisser lors des 4 derniers. Invaincu sur ses 10 derniers matchs à domicile contre eux (8V 2N). Venezia a perdu 18 de leurs confrontations, leur pire bilan contre un adversaire." },
      { icon: "form", label: "Dynamique d'ouverture", text: "Milan a gagné son 1er match (2-1). Venezia a perdu 0-2 sans marquer malgré un xG de 2.05 — grosses occasions ratées. Venezia n'a jamais gagné son 1er match à l'extérieur en 14 saisons d'élite." },
      { icon: "player", label: "Facteur individuel", text: "Milan a tenté 19 tirs cadrés dès la 1ère journée, le plus de toute la Serie A. Cissè pourrait devenir le plus jeune buteur sur ses 2 premiers matchs pour Milan." },
    ],
  },
  {
    id: 3,
    league: "pl",
    home: "Crystal Palace",
    away: "Manchester City",
    day: "Ven",
    date: "28 août",
    time: "19:00",
    type: "Buteur",
    pick: "Haaland marque",
    cote: 1.71,
    conf: 3,
    tier: "premium",
    result: null,
    args: [
      { icon: "player", label: "Statistique extrême", text: "Haaland a marqué lors de ses 5 confrontations en PL contre Palace (8 buts) — 100% de réussite, la meilleure série de l'histoire du championnat contre un adversaire." },
      { icon: "history", label: "Domination City en PL", text: "City invaincu sur ses 11 derniers déplacements en Premier League à Selhurst Park (8V 3N) depuis 2015. Palace n'a gagné que 2 de ses 22 derniers duels en PL contre City." },
      { icon: "coach", label: "Signaux de prudence", text: "City n'a gagné que 4 de ses 10 derniers déplacements en 2026. Le coach Maresca est en méforme contre les équipes en 3-5 défenseurs (système de Palace) : 4V/10 récemment." },
    ],
  },
  {
    id: 4,
    league: "l1",
    home: "Lille",
    away: "Paris Saint-Germain",
    day: "Ven",
    date: "28 août",
    time: "18:45",
    type: "Combiné",
    pick: "Double Chance PSG + PSG Under 2.5 buts",
    cote: 1.75,
    conf: 3,
    tier: "premium",
    result: null,
    args: [
      { icon: "history", label: "Domination historique du PSG", text: "PSG invaincu sur ses 10 derniers duels contre Lille, 33 buts marqués contre 11 encaissés sur cette période. Une victoire de Lille serait leur première contre le PSG depuis avril 2021." },
      { icon: "form", label: "Tendance défensive à Lille", text: "Moins de 3 buts au total lors de chacun des 6 derniers matchs de Lille. Lille et le PSG ont chacun encaissé seulement 17 buts en 2026, les 2 meilleures défenses du championnat." },
      { icon: "coach", label: "Signal de prudence pour le PSG", text: "Le PSG n'a gagné aucun de ses 3 derniers matchs contre des équipes françaises (1N 2D). Lille pourrait rester invaincu 2 matchs de suite à domicile contre le PSG, une première depuis 2000-2012." },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
