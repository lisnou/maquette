# Spécifications Techniques : L'Octogone de Profil (Radar V2) & Feedback

Ce document définit la logique algorithmique du profil du cavalier et la gestion dynamique de ses retours de séance.

---

## 1. La Structure du Profil : L'Octogone Universel

Afin de pouvoir cartographier l'intégralité des pratiques proposées par MyEquiVoice (Dressage, Obstacle, Travail au Sol, Cardio, etc.), le radar du cavalier ne comporte plus 5 axes changeants par discipline, mais **8 piliers uniques et universels** :

1.  **Impulsion & Rythme** (Activité, régularité, cadence)
2.  **Tracé & Précision** (Courbes, direction, pilotage précis)
3.  **Équilibre & Locomotion** (Galop, rassembler, équilibre général)
4.  **Souplesse & Gymnastique** (Stretching, incurvation, cessions, barres au sol)
5.  **Connexion & Contact** (Légèreté, liaison main-bouche, connexion en longe)
6.  **Mental & Confiance** (Désensibilisation, franchise, calme, lâcher-prise)
7.  **Physique & Cardio** (Souffle, endurance, récupération sportive)
8.  **Technique Cavalier** (Assiette, fixité, posture, indépendance des aides)

---

## 2. Le Mapping du Feedback Dynamique

L'écran de feedback de fin de séance (Tunnel frictionless) demande au cavalier d'évaluer une ou deux compétences ciblées.

### 2.1. Les Métadonnées d'une Séance
Chaque séance dans la base de données possède une *"Phrase d'accroche UI"* (ce que le cavalier lira) et un *"Mapping Radar"* avec son poids associé.

**Exemple de structure BDD pour la séance "Le parcours d'embûches au licol" (Travail au Sol) :**
```json
{
  "id_seance": "SOL_N1_AGILITY",
  "questions_UI": ["Franchise du cheval sur les embûches", "Votre précision du tracé"],
  "poids_radar": {
     "Mental & Confiance": 3,
     "Tracé & Précision": 2,
     "Impulsion & Rythme": 0,
     "Equilibre & Locomotion": 0,
     "Souplesse & Gymnastique": 0,
     "Connexion & Contact": 0,
     "Physique & Cardio": 0,
     "Technique Cavalier": 0
  }
}
```

### 2.2. Comportement
L'application affichera dynamiquement : *"Comment évaluez-vous : **Votre précision du tracé** ?"*.
Mais en arrière-plan, c'est bien la jauge **Tracé & Précision** de l'Octogone qui se mettra à jour. Ceci garantit un langage pertinent pour l'utilisateur, tout en conservant une centralisation technique stricte.

---

## 3. Le Moteur de Calcul (L'Évolution du Profil)

Une fois la note (1 à 4 étoiles) soumise, le profil évolue selon la règle du *Multiplicateur* appliquée aux poids (de 0 à 3) de la séance.

### 3.1. Les Multiplicateurs d'Évaluation
*   Note Utilisateur **4/4** (Excellent) = Multiplicateur de **1.0** (+100% du Poids)
*   Note Utilisateur **3/4** (Bon) = Multiplicateur de **0.5** (+50% du Poids)
*   Note Utilisateur **2/4** (Moyen) = Multiplicateur de **0.0** (La jauge stagne)
*   Note Utilisateur **1/4** (Insuffisant) = Multiplicateur de **-0.5** (Perte de points / Alerte)

**Exemple Mathématique :**
Le cavalier donne 4/4 à sa *Franchise*. La compétence "Mental & Confiance" (Poids=3) augmente de : `3 * 1.0` = **+3 Points** sur son profil global.

---

## 4. L'État Initial du Compte : La Règle du Socle à 50

Afin d'offrir une expérience utilisateur positive dès le premier jour de l'inscription, **aucun questionnaire initial n'est requis**.

L'application initialise la base de données du cavalier avec une règle de "Socle universel" :
*   Toutes les 8 jauges de l'Octogone débutent structurellement au score de **50** (sur une échelle maximale définie).
*   Visuellement, le graphique affiche le premier jour un bel octogone plat ancré pile au milieu de son environnement.
*   En cas de non-pratique d'une discipline (Ex: Le cavalier ne fait jamais de cardio), sa jauge "Physique & Cardio" restera indéfiniment à 50. Visuellement, comparativement à ses succès en "Tracé" (ex: Score de 80), cela creusera un "retard" naturel visible sur le graphique, signifiant que sa pratique n'est pas variée.