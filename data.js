// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// Jeudi 3 septembre 2026 — tous en Gratuit
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
    home: "Real Sociedad",
    away: "Celta Vigo",
    day: "Jeu",
    date: "3 sept",
    time: "21:00",
    type: "Total équipe 2",
    pick: "Celta Over 1 (remb. si 1)",
    cote: 2.0,
    conf: 3.5,
    tier: "free",
    result: null,
    args: [
      { icon: "form", label: "Régularité offensive de Celta", text: "Celta a marqué lors de ses 4 derniers matchs contre la Real Sociedad sous son coach Giráldez, et a pris des points dans ses 3 derniers déplacements en marquant à chaque fois." },
      { icon: "history", label: "Fragilité défensive de la Real", text: "Parmi les équipes présentes en Liga sur les 2 dernières saisons, la Real Sociedad a le moins de clean-sheets à domicile de tout le championnat (seulement 2)." },
      { icon: "player", label: "Facteur individuel : Aspas", text: "Iago Aspas a marqué 10 buts en 22 apparitions contre la Real Sociedad — son 2e meilleur total contre un adversaire de toute sa carrière." },
    ],
  },
  {
    id: 2,
    league: "l1",
    home: "Toulouse",
    away: "Lille",
    day: "Jeu",
    date: "3 sept",
    time: "20:45",
    type: "1X2",
    pick: "Victoire Lille (V2)",
    cote: 2.123,
    conf: 2.5,
    tier: "free",
    result: null,
    args: [
      { icon: "history", label: "Domination écrasante", text: "Lille a gagné ses 4 derniers duels consécutifs contre Toulouse, marquant 10 buts contre 3 encaissés sur cette période." },
      { icon: "form", label: "Forme exceptionnelle à l'extérieur", text: "Lille est invaincu sur ses 8 derniers matchs à l'extérieur, avec 5 victoires consécutives et 4 clean-sheets de suite." },
      { icon: "coach", label: "Crise de Toulouse", text: "Toulouse n'a gagné que 2 de ses 9 derniers matchs de Ligue 1, et pourrait encaisser 2+ buts lors de ses 3 premiers matchs de saison pour la première fois depuis 1992-93." },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
