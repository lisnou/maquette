const test_seance = {
  titre: "Booster l'impulsion",
  discipline: "Dressage",
  poids_radar: { impulsion: 3, cadence: 2, connexion: 1, rectitude: 0, rassembler: 0 }
};

let profil_cavalier = {
  Dressage: { impulsion: 10, cadence: 15, connexion: 12, rectitude: 8, rassembler: 5 }
};

function simulerFeedback(noteEtoiles) {
  let gains = {};
  let multiplicateur = 0;
  
  if (noteEtoiles === 4) multiplicateur = 1.0;
  else if (noteEtoiles === 3) multiplicateur = 0.5;
  else if (noteEtoiles === 2) multiplicateur = 0.0;
  else if (noteEtoiles === 1) multiplicateur = -0.5;

  console.log(`\n--- SÉANCE TERMINÉE : ${test_seance.titre} ---`);
  console.log(`Le cavalier evalue sa performance a : ${noteEtoiles}/4 etoiles`);
  
  for (const axe in test_seance.poids_radar) {
    let point_gagne = test_seance.poids_radar[axe] * multiplicateur;
    gains[axe] = point_gagne;
    profil_cavalier[test_seance.discipline][axe] += point_gagne;
  }
  
  console.log("==> ÉVOLUTION DU RADAR (DRESSAGE) :");
  for (const axe in gains) {
     if (gains[axe] !== 0) {
        console.log(`- ${axe.toUpperCase()} : ${gains[axe] > 0 ? '+' : ''}${gains[axe]} points (Nouveau total: ${profil_cavalier.Dressage[axe]})`);
     }
  }
}

console.log("ÉTAT INITIAL DU PROFIL :");
console.log(profil_cavalier.Dressage);

// Test 1: Séance réussie
simulerFeedback(4);

// Test 2: Séance ratée
simulerFeedback(1);
