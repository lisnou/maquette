# Lignes Directrices UX / UI Design - MyEquiVoice

Ce document vise à définir l'ergonomie, l'accessibilité visuelle et l'interface utilisateur (UI) de l'application MyEquiVoice. Il complète le Cahier des Charges (SRS) en décrivant **"comment"** l'application doit s'afficher et se comporter sous le doigt du cavalier.

## 1. Philosophie Générale (L'Équitation de Loisir)
L'application doit refléter visuellement l'esprit de **l'équitation de loisir**. Le design global doit être chaleureux, apaisant et élégant. L'approche n'est pas celle d'une application de pure "performance sportive" austère, mais celle d'un accompagnateur agréable au quotidien. L'objectif principal de l'UI est l'immédiateté et la clarté visuelle.

## 2. La Palette Visuelle et le Contraste
L'identité visuelle de **MyEquiVoice** a été définie à travers une palette distinctive (Vert Sauge, Crème, Terracotta). La règle fondatrice de l'intégration de cette palette est **le contraste fort entre chaque élément**.

Les couleurs ont été pensées pour être très différentes les unes des autres afin de guider le regard naturellement, sans que les éléments ne se fondent :
- **Vert Sauge (#8C9E79)** : L'ancrage de la marque (Header, Arrière-plans principaux, Tuiles principales).
- **Crème (#FAF7F2)** : La base neutre pour le light mode.
- **Gris Anthracite (#2D2D2D)** : Le choix obligatoire pour tous les textes par-dessus le fond Crème pour assurer un contraste de lecture parfait.
- **Terracotta (#C17C74)** : La couleur de rupture visuelle, utilisée pour isoler et mettre en évidence les éléments d'action majeurs (Jouer, Alertes).

## 3. Typographie et Ergonomie des Contrôles
L'alliance de *Libre Baskerville / Playfair Display* (Titres) et *Montserrat / Inter* (Textes et Boutons) est privilégiée. 
Au-delà des polices, les éléments interactifs doivent être structurés avec une ergonomie "Mobile-First" :
- L'utilisation de grosses tuiles et de gros boutons arrondis (Pilules) prime sur les listes déroulantes (Dropdowns) ou les petits liens.
- La "Règle du Pouce" : Tout élément cliquable doit disposer d'une zone tactile très généreuse (minimum 48x48 pixels) pour une navigation fluide et sans accroc.

## 4. Agencement Stratégique des Écrans Clés (Wireframes UX)

### 4.1. L'Onglet 1 : L'Accueil (Dashboard & Catalogue)
L'écran d'accueil est le véritable "Hub" de l'application, fusionnant astucieusement l'immédiateté d'un tableau de bord et la richesse d'un catalogue, sans effet "page vide" :
1. **Séance Suggérée (Hero Header)** : Une grande carte arrondie en haut de l'écran (ex: "Apprendre à tourner avec fluidité") pour lancer une session en 1 clic.
2. **Recherche Rapide par Tuiles Rondes** : De gros boutons circulaires illustrés pour filtrer immédiatement par discipline (Dressage, Obstacle, Travail au Sol).
3. **Le Catalogue (Scroll infini)** : La liste des fiches audios individuelles triées par algorithme, accompagnées de pilules ovales pour affiner la recherche.

### 4.2. L'Onglet 2 : Les Programmes
Un onglet prestigieux exclusivement dédié aux parcours d'entraînement sur le long terme.
* **Cartes Massives** : De grands dossiers (ex: *"Saison Concours - 6 Semaines"*) avec un effet d'assombrissement sur l'image de fond pour garantir la lisibilité du texte blanc par-dessus.
### 4.3. La Fiche de Séance (Le "Pre-Flight Check")
Écran de préparation obligatoire avant de monter en selle, listant les pré-requis fonctionnels du Cahier des Charges.
* **Hero Header Image** : Grande photo évocatrice de la séance avec bouton de "Téléchargement Hors-Ligne" (Cache) intégré en haut à droite.
* **Badges de Caractéristiques** : De petits "tags" clairs sous le titre indiquant la difficulté (G3-4) et le temps réel du chrono (⏱️ 30 MIN).
* **Tuiles Logistiques (Matériel)** : Affichage très visuel du matériel requis (ex: 2 plots, 4 barres). Pas de liste à puces, mais des mini-cartes avec icônes.
* **Bloc "Installation & Tracé" (Extensible)** : Optionnel pour le dressage, obligatoire pour l'obstacle. Un bloc extensible contenant le schéma de montage du dispositif et les recommandations (hauteurs, distances).
* **Le Sélecteur "Arena-Sync"** : Un petit menu en "pilules" cliquables (15x30, 20x40, 20x60, Extérieur) pour ajuster les pauses à la dimension du terrain de jeu avant de démarrer.
* **Le Bouton d'Action Primaire (Sticky Bottom)** : Un énorme bouton Terracotta *"Démarrer la Séance"* ancré tout en bas de l'écran. Il reste toujours visible même si le cavalier fait défiler la page pour lire la description. S'il s'agit d'une séance Premium non débloquée, ce bouton intègre une icône "Cadenas".

### 4.4. Le Lecteur Audio (Mode Pratique)
L'UI du lecteur est le cœur de l'app. Il doit être épuré, texturé et dynamique :
* **Photo Centrale & Onde Audio** : La photo de la séance est affichée au centre dans un cadre carré aux bords arrondis. **Crucial** : Une onde audio animée rouge/terracotta se superpose à la photo pendant la lecture pour confirmer l'activité vocale.
* **Double Compteur** : En plus du chronomètre (30 MIN) et de la barre de progression globale, ajout d'un indicateur précis de découpage (ex: *PHRASE 18 / 60*).
* **Contrôles Flottants** : Un îlot blanc en bas de l'écran héberge le gros fond rouge `Play/Pause` et les boutons `Suivant/Précédent`.
* **Bouton SOS (Guardian Mode) 🛡️** : Un bouton rouge discret intégré en haut de l'écran ou flottant sur le côté, nécessitant un "Slide" (Glissement) ou un appui long (3s) pour éviter les fausses manipulations à cheval.
* **Vue "Déroulé de la Séance"** : Un bouton "Consulter le Programme" ouvre une vue épurée listant visuellement l'objectif de la séance et son découpage en 3 étapes distinctes (1. Détente, 2. Travail principal, 3. Retour au calme) pour que le cavalier sache toujours à quelle phase il en est.

### 4.5. Le Tunnel de Fin de Séance (Frictionless)
Le bilan **ne doit pas être bloquant**. Il se déclenche à 85% d'écoute avec une option claire de fermeture (Croix "X"). S'il est ignoré, une alerte visuelle *"Séances en attente d'évaluation"* s'affiche sur le Dashboard.
Le formulaire lui-même est généré sur-mesure pour être rapide et ultra-pertinent :
1. **L'État Initial (Le Cheval)** : 4 énormes tuiles carrées avec Emojis pour la forme du jour (Mou 😴, Idéal 🦄, Tendu ⚡, Trop Chaud 🔥).
2. **L'Évaluation Dynamique (Sur-mesure)** : Le nom de la (ou des deux) compétence(s) ciblée(s) par cette séance (ex: *Souplesse* ou *Franchise*) s'affiche en grand Format Titre. En dessous, 4 grosses étoiles (ou smileys) pour permettre au cavalier d'évaluer son exécution sur ce point précis.
3. **Le Journal** : Un grand champ libre textuel (incitation à utiliser la dictée vocale du téléphone).

### 4.6. Le Profil et l'Écurie
* **Barre de Navigation Principale (Bottom Bar)** : Doit être flottante et non fixée au bord bas, sous forme de "pilule" contenant 3 onglets simples (Accueil, Programmes, Profil).
* **Le Radar de Compétences (L'Octogone)** : Affiché au centre d'une grande carte blanche, le graphique octogonal verdâtre donne une vision instantanée des 8 piliers du cavalier (Impulsion & Rythme, Tracé & Précision, Équilibre & Locomotion, Souplesse & Gymnastique, Connexion & Contact, Mental & Confiance, Physique & Cardio, Technique Cavalier). 
  * *Note UI Spécifique* : Visuellement, ce radar ne doit jamais apparaître vide au premier lancement. Pour un nouvel utilisateur, le polygone intérieur dessiné par les stats doit être rempli à **50% sur toutes ses branches**, formant ainsi un second petit octogone parfaitement centré à l'intérieur du grand.
* **L'Analyse du Coach** : Juste sous le radar, des indicateurs colorés (Barre Verte = Acquis, Barre Orange = À travailler) amènent vers le bouton cible "Voir la séance corrective".
* **Paramétrages (Environnement/Matériel)** : Plus aucun menu déroulant HTML classique ! Remplacés par de grosses "tuiles" rectangulaires cliquables 2 par 2 (ex: "Carrière", "Manège" / "Plots", "Barres").

### 4.7. Les Interfaces Secondaires Logistiques (Obligatoires)
Pour répondre pleinement au Cahier des Charges, les vues fonctionnelles suivantes doivent être modélisées :
1. **L'Onboarding (Tutoriel)** : Un carrousel de 3 écrans très visuels à la première ouverture pour expliquer le fonctionnement audio "Eyes-Free".
2. **L'Écran de Survie (Fallback Hors-Ligne)** : Une vue totalement épurée, fond Crème avec un léger filtre gris, s'affichant instantanément en cas de perte de réseau (Edge) avec un message "Réseau faible" et la liste des seules séances téléchargées localement. *Zéro spinner de chargement.*
3. **Le Menu Latéral (Hamburger) ou Bottom Sheet** : Accessible depuis le Profil, il liste les actions de fond en liste textuelle simple : Vider le Cache (Crucial), Gérer l'Abonnement, Signaler un Bug, et Se Déconnecter.
