// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// C'est LE SEUL fichier que tu dois modifier chaque week-end.
// Tu ajoutes / modifies les matchs et pronostics ici.
// Pas besoin de toucher à index.html, style.css ou script.js.
// ============================================================

// Les 5 championnats couverts (ne pas toucher, sauf si tu veux
// en ajouter un nouveau plus tard)
const LEAGUES = [
  { id: "pl",     name: "Premier League", short: "PL",  color: "#38003c" },
  { id: "liga",   name: "La Liga",        short: "ESP", color: "#EE8707" },
  { id: "seriea", name: "Serie A",        short: "ITA", color: "#0C56A5" },
  { id: "bundes", name: "Bundesliga",     short: "GER", color: "#D3010C" },
  { id: "l1",     name: "Ligue 1",        short: "FRA", color: "#0A1E3C" },
];

// Chaque match a : une ligue, deux équipes, une date/heure,
// et une liste de "bets" (paris) — un match peut avoir
// plusieurs paris (ex: 1N2 ET plus/moins de buts).
//
// Champs d'un pari :
//   type   -> "1N2", "Double Chance", "Plus/Moins", "BTTS", "Score exact"...
//   pick   -> ton pronostic en clair
//   cote   -> la cote que TU as observée chez ton bookmaker
//   conf   -> ton niveau de confiance de 1 à 5
//   tier   -> "free" (accessible à tous) ou "premium" (abonnés uniquement)
//   note   -> ta petite analyse/justification

const MATCHES = [
  {
    id: 1,
    league: "pl",
    home: "Arsenal",
    away: "Coventry City",
    day: "Ven",
    date: "21 août",
    time: "20:00",
    bets: [
      {
        type: "1N2",
        pick: "Victoire Arsenal",
        cote: 1.35,
        conf: 5,
        tier: "free",
        note: "Champion en titre à domicile face à un promu. Écart de niveau net.",
      },
    ],
  },
  {
    id: 2,
    league: "liga",
    home: "Elche",
    away: "Barcelona",
    day: "Dim",
    date: "23 août",
    time: "20:30",
    bets: [
      {
        type: "1N2",
        pick: "Victoire Barcelone",
        cote: 1.28,
        conf: 5,
        tier: "free",
        note: "Barça large favori face à un promu.",
      },
      {
        type: "Plus/Moins",
        pick: "+2.5 buts",
        cote: 1.55,
        conf: 4,
        tier: "premium",
        note: "L'attaque du Barça ne fait généralement qu'une bouchée des promus.",
      },
    ],
  },
  // 👉 Ajoute tes propres matchs ici en copiant le modèle ci-dessus.
  // N'oublie pas la virgule entre chaque match !
];

// Ne rien changer en dessous de cette ligne :
if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
