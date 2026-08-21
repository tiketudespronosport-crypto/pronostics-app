// ============================================================
// data.js — TES PRONOSTICS DE LA SEMAINE
// ============================================================
// C'est LE SEUL fichier que tu dois modifier chaque week-end.
// Tu ajoutes / modifies les matchs et pronostics ici.
// Pas besoin de toucher à index.html, style.css ou script.js.
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
    time: "15:00",
    bets: [
      {
        type: "Double Chance",
        pick: "Leeds ou Nul",
        cote: 1.65,
        conf: 3,
        tier: "premium",
        note: "<strong>Leeds n'a perdu son ouverture que 2 fois en 18 saisons.</strong><br>• Forme forte : Calvert-Lewin (14 buts la saison passée), nouvelle recrue Harry Wilson impliquée sur 17 buts<br>• Signal négatif pour Forest : ses 6 derniers entraîneurs permanents ont tous perdu leur tout premier match, malgré leur solide historique à domicile contre Leeds",
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
    time: "17:00",
    bets: [
      {
        type: "Total Sevilla",
        pick: "Over 0.5 but Sevilla",
        cote: 1.71,
        conf: 3,
        tier: "premium",
        note: "<strong>Sevilla a bien démarré la saison</strong> (victoire 2-1), porté par un buteur en forme.<br>• Peque Fernández, décisif au dernier match, a déjà marqué à Bilbao en janvier 2026<br>• Athletic traverse une période fragile : aucune victoire en 4 matchs, Iñaki Williams muet depuis 8 matchs face à Sevilla<br>• Historiquement, les duels entre ces deux équipes sont souvent disputés — favorable aux buts des deux côtés",
      },
    ],
  },
  // 👉 Ajoute tes prochains matchs ici en copiant le modèle ci-dessus.
];

if (typeof module !== "undefined") module.exports = { LEAGUES, MATCHES };
