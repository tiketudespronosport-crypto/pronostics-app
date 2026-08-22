// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// C'est LE SEUL fichier que tu dois modifier chaque week-end.
// Toutes les heures et cotes correspondent à ton ticket 1xBet.
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
    league: "pl",
    home: "Nottingham Forest",
    away: "Leeds United",
    day: "Sam",
    date: "22 août",
    time: "14:00",
    bets: [
      {
        type: "Double Chance",
        pick: "Leeds ou Nul",
        cote: 1.636,
        conf: 3,
        tier: "premium",
        note: "<strong>Attention : l'historique favorise nettement Forest.</strong> Invaincu en 14 matchs à domicile contre Leeds depuis 1971-72, vainqueur des 4 dernières confrontations à la maison.<br>• Argument pour Leeds : vainqueur du tout dernier duel entre les deux équipes (3-1)<br>• Forest a connu la 2e plus grosse chute de points de PL entre les deux dernières saisons (-21), signe de fragilité<br>• Nouveau coach Forest (Glasner) : incertitude, ses prédécesseurs ont tous perdu leurs débuts, mais lui-même réussit généralement ses débuts ailleurs",
      },
    ],
  },
  {
    id: 2,
    league: "liga",
    home: "Athletic Club",
    away: "Sevilla",
    day: "Sam",
    date: "22 août",
    time: "15:00",
    bets: [
      {
        type: "Total Individuel Sevilla",
        pick: "Over 0.5 but",
        cote: 1.70,
        conf: 3,
        tier: "premium",
        note: "<strong>Pari plus risqué qu'il n'y paraît : Sevilla ne gagne qu'1 de ses 7 derniers déplacements en Liga</strong> (1N 5D), signe d'une attaque peu tranchante à l'extérieur.<br>• Argument concret en faveur du pari : Peque Fernández, décisif au dernier match, a déjà marqué précisément à Bilbao (janvier 2026)<br>• La méforme d'Athletic (Iñaki Williams muet, aucune victoire en 4 matchs) concerne surtout leur attaque, pas leur défense<br>• Solidité défensive d'Athletic à domicile cette saison : donnée non disponible, incertitude à noter",
      },
    ],
  },
  {
    id: 3,
    league: "liga",
    home: "Valencia",
    away: "Celta de Vigo",
    day: "Sam",
    date: "22 août",
    time: "17:30",
    bets: [
      {
        type: "Total",
        pick: "Over 2 buts (remboursé si exactement 2)",
        cote: 1.65,
        conf: 2,
        tier: "free",
        note: "<strong>Au moins 3 buts lors de chacune des 6 dernières confrontations entre ces deux équipes.</strong><br>• Les deux équipes ont marqué lors de leurs 6 derniers duels<br>• Aspas (Celta) est impliqué sur 8 buts en 10 matchs à Mestalla contre Valence<br>• Valencia est invaincu sur ses 4 derniers matchs et sur une bonne dynamique offensive sous Corberán",
      },
    ],
  },
  {
    id: 4,
    league: "seriea",
    home: "Udinese",
    away: "Como",
    day: "Sam",
    date: "22 août",
    time: "16:30",
    bets: [
      {
        type: "Total Individuel Udinese",
        pick: "Under 1 (remboursé si Udinese marque exactement 1)",
        cote: 1.49,
        conf: 4,
        tier: "free",
        note: "<strong>Como a gardé sa cage inviolée lors des 2 derniers duels face à Udinese</strong> (victoire 1-0, puis 0-0) et vise un 3e clean-sheet consécutif.<br>• Como = meilleure défense d'Europe avec Arsenal la saison passée (19 clean-sheets, seulement 29 buts encaissés)<br>• Zaniolo, attaquant principal d'Udinese, n'a plus marqué depuis 15 matchs<br>• Moins de 3 buts au total lors de chacun des 6 derniers matchs d'Udinese à domicile",
      },
    ],
  },
  {
    id: 5,
    league: "seriea",
    home: "Genoa",
    away: "Napoli",
    day: "Sam",
    date: "22 août",
    time: "18:45",
    bets: [
      {
        type: "1N2",
        pick: "Victoire Napoli",
        cote: 2.076,
        conf: 3,
        tier: "free",
        note: "<strong>Napoli est invaincu sur 25 de ses 26 derniers duels contre Genoa</strong> (17V 8N), sans défaite à Gênes depuis février 2021.<br>• Napoli a gagné 8 de ses 9 dernières entrées en championnat, marquant 23 buts au passage<br>• Højlund, leur attaquant, a déjà marqué 3 buts contre Genoa (son adversaire favori) et enchaîne 2 matchs de suite avec un but<br>• Nuance : les deux équipes ont marqué lors de leurs 6 derniers duels",
      },
    ],
  },
  {
    id: 6,
    league: "l1",
    home: "Lens",
    away: "Auxerre",
    day: "Sam",
    date: "22 août",
    time: "15:15",
    bets: [
      {
        type: "Total",
        pick: "Under 3 buts (remboursé si exactement 3)",
        cote: 1.81,
        conf: 4,
        tier: "premium",
        note: "<strong>Lens n'a pas encaissé lors de 4 de ses 6 derniers matchs à domicile contre Auxerre</strong>, un duel où leur défense est historiquement solide.<br>• Lens a gagné 13 de ses 20 derniers matchs à domicile face à Auxerre au 21e siècle<br>• Point de vigilance : le nouveau coach de Lens (Toppmöller) vient de Francfort, une équipe portée sur les buts des deux côtés<br>• Match d'ouverture de saison, souvent plus prudent tactiquement",
      },
    ],
  },
  {
    id: 7,
    league: "l1",
    home: "Nice",
    away: "Lorient",
    day: "Sam",
    date: "22 août",
    time: "18:45",
    bets: [
      {
        type: "Les deux équipes marquent",
        pick: "Oui",
        cote: 1.80,
        conf: 3,
        tier: "free",
        note: "<strong>Nice a marqué lors de chacune de ses 16 dernières réceptions de Lorient</strong> (100% de réussite, 31 buts au total) — son meilleur terrain de chasse offensif.<br>• Nice traverse une méforme sévère (aucune victoire en 8 matchs), mais reste l'une des pires défenses d'Europe, donc Lorient a de bonnes chances de marquer aussi<br>• Lorient encaisse deux fois plus en 2e mi-temps qu'en 1ère la saison passée",
      },
    ],
  },
  {
    id: 8,
    league: "l1",
    home: "Toulouse",
    away: "Lyon",
    day: "Sam",
    date: "22 août",
    time: "18:45",
    bets: [
      {
        type: "Total",
        pick: "Over 2.5 buts",
        cote: 1.929,
        conf: 4,
        tier: "premium",
        note: "<strong>Au moins 3 buts lors de chacun des 10 derniers duels entre Toulouse et Lyon à Toulouse</strong> — la tendance la plus fiable qu'on ait trouvée ce week-end.<br>• Toulouse marque beaucoup en fin de match (34% de ses buts dans les 15 dernières minutes)<br>• Lyon encaisse énormément en fin de match (38% de ses buts encaissés dans les 15 dernières minutes, pire ratio de Ligue 1)",
      },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
