# Cahier des Charges Fonctionnel (SRS) - MyEquiVoice

## 1. Introduction et Stratégie Produit
**Objectif de l'application** : MyEquiVoice est le guide vocal virtuel indispensable pour les cavaliers en autonomie. Il offre des séances structurées audio pour libérer le cavalier de la charge mentale de préparation.
**Piliers de l'addiction positive** : Zéro préparation, Cohérence pédagogique, Sensation de progrès (Gamification), Plaisir/Variété, Facilité.
**Public Cible** : Cavaliers à partir du niveau Galop 3/4 (G3+).
**Contraintes Majeures UI/UX** : 
- "Mobile-First" avec l'objectif de "zéro interaction manuelle" à cheval (le téléphone reste dans la poche).
- Utilisation hors-ligne obligatoire, mais **sécurisée** (les audios téléchargés ne doivent pas être récupérables si l'abonnement expire).
- Lecteur en tâche de fond (background audio) et écran verrouillé.
- Séparation stricte de l'audio : Aucune intégration ni mixage avec de la musique musicale externe (ex: Spotify). On monte avec le guide, ou en musique, mais pas les deux.

---

## 2. Parcours Utilisateur et Fonctionnalités par Écran (MVP - Phase 1)

### 2.1. Onboarding & Authentification
- **Inscription "Frictionless" (Social Login)** : Pour éviter l'abandon à l'ouverture, l'application doit impérativement proposer l'inscription en 1 clic via **"Continuer avec Apple"** et **"Continuer avec Google"** (en plus de l'email classique).
- **Création du profil initial** : Paramétrage du 1er profil (Niveau G3+ minimum, Nom du cheval, Disciplines préférées).
- **Tutoriel Interactif (Nouveau)** : À la première ouverture de l'application, un carrousel très rapide de 3 ou 4 écrans expliquant comment suivre une séance, comment utiliser les commandes vocales basiques ("Pause", "C'est fait"), et les règles de sécurité.

### 2.2. L'Onglet "Accueil" (Le Hub & Catalogue)
L'Accueil est le point d'entrée central de l'application, conçu pour la mise en selle immédiate et l'exploration de toutes les séances à l'unité.
- **En-tête "Où et avec qui ?"** : Message dynamique type *"Bonjour Elisa & Tornade"*. Un petit sélecteur rapide permet de changer de cheval en un clic.
- **La Séance ciblée du Jour (Recommandation Unique)** : Mise en avant d'une seule grande fiche de séance, parfaitement ciblée selon l'algorithme.
- **Les Bulles de Filtres Rapides (Disciplines)** : De gros boutons ronds illustrés (Dressage, Obstacle, Travail au sol) pour filtrer immédiatement la liste des séances en dessous.
- **Le Catalogue de Séances (À la carte)** : La liste infinie des fiches audios individuelles, avec possibilité d'appliquer d'autres filtres. Chaque miniature affiche son niveau, sa durée, et son exigence matérielle (ex: ⏱️ 30m | 🎓 G5 | 🚧 4 Barres).
- **L'Écran de Survie (Mode "Sans Réseau" / Edge)** : Grosse contrainte équestre. L'application doit détecter si la connexion est trop lente à l'ouverture. Si tel est le cas, elle bascule instantanément sur un affichage "Mode Hors-Ligne" ne montant que les séances téléchargées.

### 2.3. L'Onglet "Programmes" (Les Parcours Guidés)
Cet onglet est exclusivement dédié aux dossiers d'entraînements sur plusieurs semaines, sans se mélanger avec les séances "à la carte".
- **Les Cartes de Programmes** : De grands dossiers massifs et prestigieux (ex: *"Saison Concours - 6 Semaines"*).
- **Le Suivi de Progression** : Affichage clair de l'avancement du cavalier dans le parcours (ex: "33% Complété" ou "Séance 2/18").

### 2.4. La Fiche Séance & Le "Pre-Flight Check" (Nouveau)
Avant de lancer l'audio, il faut préparer le terrain (surtout pour l'obstacle) :
- **Pop-up "Installation Requise"** : Affichage clair du matériel nécessaire (ex: "5 obstacles : 2 verticaux, 1 oxer"), des hauteurs recommandées (FFE), et d'un schéma/tracé du dispositif.
- **Sélecteur de Terrain (Arena-Sync)** : Le cavalier indique la taille de sa carrière (15x30, 20x40, 20x60). L'application ajuste dynamiquement le coefficient des temps de pauses de la séance ($T \times 1.2$, $T \times 1.5$) pour correspondre à la distance réelle à parcourir.
- **Téléchargement Hors-Ligne & Gestion des Droits (DRM)** : Le bouton de téléchargement permet d'enregistrer l'audio sur le téléphone. Le comportement difère selon le modèle économique :
  - *Cas 1 : Achat à la séance (Paiement unique).* Le fichier téléchargé appartient "à vie" à l'utilisateur. Il est rattaché à son profil de manière permanente.
  - *Cas 2 : Modèle par Abonnement.* Les fichiers audios téléchargés doivent être **chiffrés ou cachés dans le cache de l'application (Offline DRM)**. Si l'abonnement expire, l'application doit bloquer l'accès à ces téléchargements. Le développeur ne doit surtout pas déposer un simple fichier `.mp3` dans le dossier "Mes Documents" du téléphone de l'utilisateur.

### 2.5. L'Écran "Lecteur Audio" & Sécurité (Le mode "En selle")
- **Bouton Play/Pause Géant** : Zone de clic centrale maximisée au centre d'un cercle de progression.
- **Commandes Vocales Hyrbides (Micro en fond)** : 
  - *"C'est fait"* : Coupe le minuteur de pause et lance l'instruction suivante.
  - *"Stop / Pause / Continue"* : Mise en pause classique pour gérer un imprévu sans les mains.
  - *"Répète"* : Relance la dernière consigne en cas de doute.
  - *"Rallonge l'échauffement"* (ou équivalent) : Ajoute un temps de silence (pas/trot autonome) supplémentaire si le cheval est raide, sans avoir à sortir le téléphone.
- **Contrôle via Montre Connectée (Apple Watch / Garmin)** : L'application doit exposer ses contrôles médias au système d'exploitation du téléphone. Ainsi, un cavalier peut faire "Pause" depuis le cadran de sa montre sans sortir son téléphone. 
  - *Note sur le "Standalone"* : Pour la V1, le téléphone DOIT être présent (dans la poche) car coder une application Apple Watch indépendante (qui stocke les MP3 en local sur la montre) est extrêmement complexe techniquement et coûteux. La montre sert uniquement de télécommande pour le téléphone.
- **Gestion des Interruptions Systèmes (Crucial)** :
  - *Appel Entrant* : Si le cavalier reçoit un appel (ou une alarme), l'audio du guide doit se mettre en **Pause Automatique** (perte du focus audio). À la fin de l'appel, l'application reprend exactement là où le chronomètre s'était arrêté.
- **SÉCURITÉ ACTIVE (Guardian Mode / Bouton SOS) 🛡️** :
  - **Bouton d'Urgence Rouge** : Placé sur le lecteur. Activation par appui long (3s) ou "Slide to SOS" pour éviter les déclenchements accidentels.
  - **Commande Vocale SOS** : Si le cavalier crie *"URGENCE"* ou *"AU SECOURS"*, le déclenchement est activé.
  - **Fonctionnement** : Compte à rebours de 5 secondes (pour annuler si erreur), puis appel automatique du Numéro d'Urgence défini dans le profil via le mode Haut-Parleur.

### 2.6. L'Onglet "Profil" et Gamification (Le Carnet de Bord)
Cet onglet est le véritable "Journal de Bord Intégré" du cavalier. Outre le bouton d'édition (Mon Espace), il doit afficher de manière limpide toute la progression :

**A. Tableau de Bord de Progression (L'Affichage Principal)**
- **Header Visuel** : Prénom, icône de niveau de Galop, et Photo de profil (ou avatar du cheval).
- **Statistiques Globales Quantitatives** : 
  - *Temps de Selle* : « Tu as monté 45h ce mois-ci ! »
  - *Nombre de séances accomplies* (ex: 12 séances en janvier).
- **Répartition Graphique (Camembert)** : Un graphique circulaire montrant le % de pratique par discipline (ex: 60% Dressage, 30% TAP, 10% Balade).
- **Timeline / Historique Chronologique** : 
  - Une liste déroulante type "Feed" affichant les séances passées.
  - Possibilité de filtrer l'historique et de "refaire" une ancienne séance d'un simple clic.
  - Affichage des alertes de progression (ex: "Serpentines : Difficile -> Bien (+2 niveaux) !").
- **Le Radar de Compétences (Hexagone de Progression)** :
  - Un graphique hexagonal interactif alimenté par l'auto-évaluation de fin de séance.
  - Il repose sur **6 Piliers Fondamentaux** applicables à toutes les disciplines :
    1. **Impulsion** (Énergie, maintien de l'allure, transitions).
    2. **Tracé** (Direction, rectitude, précision des figures).
    3. **Connexion** (Contact moelleux, cheval sur la main).
    4. **Équilibre** (Assiette du cavalier, équilibre du cheval).
    5. **Franchise** (Mental, courage face à l'obstacle ou l'inconnu).
    6. **Souplesse** (Gymnastique, étirement, croisement des membres).
- **L'Analyse du Guide Vocal (Directement sous le radar)** :
  - En fonction des faiblesses détectées par le radar, l'assistant propose une analyse texte. Exemple : *"Excellente progression sur l'Impulsion (+5%). Cependant la Rectitude stagne sur les 3 dernières séances."*
  - **Recommandations Actionnables** : 3 fiches de séances cliquables sont poussées automatiquement en dessous pour corriger la faiblesse identifiée.

**B. Paramétrage "Mon Espace" (Le moteur de l'algorithme sous-jacent)**
La page de modification du profil est découpée en 5 onglets d'informations :
1. **L'Espace Rider** : Prénom et Niveau (Galop 3/4 à Galop 7+).
2. **L'Écurie et le Carnet de Santé (Multi-Chevaux & Cloud)** : Ajouter/Modifier les fiches des chevaux (Nom, Âge, Niveau du cheval, Disciplines). 
   - **Partage de Profil Cheval (Base de Données Cloud)** : Un cheval (ex: Tornade) existe en tant qu'entité unique sur les serveurs de l'app. Sa propriétaire peut partager le profil de Tornade à sa demi-pensionnaire via un simple code. 
   - **Règle de synchronisation vitale** : Seules les données objectives du **Carnet de Santé** (vaccins, chaleurs, ferrure) sont partagées et mises à jour en commun. Les notes de fin de séance et l'impact sur le Radar de compétences restent **strictement personnels à chaque compte cavalier**. Le ressenti d'un cavalier G4 ne doit pas polluer le radar de la propriétaire G7.
   - **Carnet de Santé Intégré** : Permet de noter les dates de vaccins/vermifuges, les sensibilités vétérinaires passées (ex: tendinite), l'état de ferrure. C'est ce qui permettra d'exclure les séances inadaptées ou de générer des alertes santé.
3. **Vos Ambitions** : Sélection d'objectifs personnels sous forme de tags (Améliorer ma position, Gymnastique, Plaisir, Préparer un concours).
4. **L'Environnement de Travail** : Quel terrain utilise le cavalier (Manège, Carrière, Extérieur). Permet à l'application de ne pas proposer des séances "Lignes de cavaletti" à quelqu'un qui n'a qu'un rond de longe.
5. **Le Matériel à Disposition** : Cases à cocher (Barres, Plots, Chandeliers, Sous-bassements) pour filtrer les séances d'obstacles ou de PTV selon ce qui est matériellement possible.

---

## 3. Architecture de Navigation détaillée (Le chemin vers la mise en selle)

Il est crucial de bien définir le parcours de l'utilisateur entre le catalogue et le lancement de l'audio.

### Flux Recommandé :
1. **Clic dans la Bibliothèque/Accueil** : L'utilisateur appuie sur la carte d'une séance (ex: "Travail sur le cercle").
2. **Ouverture de la Fiche Séance** : Il atterrit obligatoirement sur la page de détail de la séance (et non directement sur le lecteur). Cette fiche est un récapitulatif clair et concis :
   * **En-tête rapide** : Durée totale et Niveau requis.
   * **Installation / Matériel Requis** : Rappel clair et immédiat du dispositif à monter (ex: 4 barres, 6 plots) pour que l'utilisateur valide la faisabilité avant de lire la suite.
   * **Objectif de la séance** : Le but pédagogique central.
   * **Exercices Principaux & Schémas** : Liste des exercices majeurs abordés avec des croquis visuels associés (ex : tracés des courbes) et **hauteurs recommandées** pour l'obstacle.
   * **Erreurs à éviter** : Les 2 ou 3 pièges classiques à surveiller selon la séance.
   * **Bouton "Signaler une erreur" (Nouveau)** : Un petit lien discret (ex: "Le schéma est flou", "Temps de pause trop court") pour permettre aux utilisateurs de remonter des corrections ultra-ciblées directement à la créatrice, sans chercher dans les paramètres.
   * C'est sur cette page qu'il peut télécharger l'audio pour le hors-ligne.
   * **Le Mur de Paiement (Paywall)** : Dans un modèle Freemium, 2 ou 3 séances d'essai sont jouables à 100%. Pour toutes les autres séances du catalogue, l'utilisateur voit cette belle Fiche Séance (le "Teasing"), mais s'il clique sur Démarrer, il est bloqué par la page d'Abonnement.
3. **Clic sur "Démarrer"** : Ce bouton flottant ("Sticky") doit rester **fixé en bas de l'écran par-dessus le contenu**, toujours visible et accessible sous le pouce, même sans scroller la page.
4. **Ouverture du Lecteur Audio** : Ce n'est qu'à cet instant que l'interface de "Pratique à cheval" s'ouvre, prenant tout l'écran, avec le gros bouton Play, le chronomètre, et l'activation en tâche de fond du Guardian Mode (Bouton SOS).
   * **Bouton "Voir le dispositif"** : Le lecteur héberge un bouton d'accès rapide permettant de consulter les schémas et exercices de la Fiche Séance à n'importe quel moment de l'écoute.
5. **Fin de séance & Système de Notation (Le Bilan "Frictionless") ⭐** : 
   * **Déclenchement Intelligent** : Le formulaire de Bilan ne doit pas être un mur bloquant. Il se déclenche automatiquement sous forme de pop-up si le cavalier a écouté au moins **85%** de l'audio (et non 100%).
   * **Bouton "Ignorer"** : Le pop-up intègre obligatoirement une croix (X) ou un bouton "Ignorer pour l'instant". Si le cavalier est occupé (descendre, doucher), il ferme la fenêtre.
   * **Rappels Différés (L'Incitation Douce)** :
     * *Dashboard* : Les bilans ignorés se transforment en petites alertes visuelles sur l'écran d'Accueil (ex: *"🎯 2 Séances en attente d'évaluation"*).
     * *Notification Push* : Quelques heures après (ou le lendemain), une brève notification (ex: *"Comment s'est passée votre séance d'hier avec Tornade ?"*) ramène directement au formulaire.
   * **Contenu du Formulaire (Généré Dynamiquement)** :
     * **Étape 1 (Input Somatique - Le Cheval)** : "Comment était Tornade aujourd'hui ?" -> Sélection rapide via tuiles (Lourd / Idéal / Tendu / Énergique). Cette question est fixe et sert à contextualiser la performance.
     * **Étape 2 (L'Évaluation Dynamique sur-mesure)** : C'est le cœur de l'intelligence de l'app. Au lieu de questions génériques, l'application affiche uniquement 2 questions basées sur les **Tags de Compétence** associés à la séance écoutée (ex: "Comment évaluez-vous votre *Impulsion* ?" et "Et votre *Rectitude* ?"). Le cavalier note via des étoiles (1 à 4).
     * **Étape 3 (Le Journal Vocal)** : Ajout d'un bouton "Dicter mon ressenti". Le cavalier clique, parle, et l'appli retranscrit sa phrase en texte (Speech-to-Text). Très ergonomique avec des gants.
   * **Le Partage Social (La Viralité)** : Sur l'écran de succès final, un gros bouton "Partager ma réussite". L'application génère automatiquement une belle image prête à être publiée en Story Instagram/Facebook avec un lien textuel vers MyEquiVoice.

### 4. Le Menu Latéral, Paramètres et Rétention
Bien que l'UI soit orientée "Bottom Bar", un menu "Hamburger" (ou accessible depuis le profil) est indispensable pour ranger toutes les fonctions secondaires :
- **Paramètres Locaux** : Choix du Mode Sombre / Mode Clair (le design spécifique "Plein Soleil" fera l'objet d'un autre document UI/UX). Gestion du volume de la voix.
- **Gestion du Stockage "Hors-Ligne"** : Affichage de l'espace disque occupé par les séances téléchargées et un **gros bouton "Vider le cache hors-ligne"** pour éviter que l'application ne sature le téléphone du cavalier au fil des mois.
- **Rétention & Notifications Push (Optionnel V1)** : Le cœur de métier de l'application est de faire monter à cheval. L'envoi ponctuel de notifications ("Il fait soleil, Tornade vous attend pour une balade !" ou "Relevez le défi de la semaine") est le meilleur levier d'engagement pour inciter le cavalier à ouvrir l'application le weekend.
- **Aide et Assistance** : Bouton de "Signaler un Bug", lien vers une FAQ ("Je n'entends pas la voix", "Comment marche le téléchargement").
- **Légal & Abonnement** : 
  - Liens vers les **CGU / CGV / Politique de Confidentialité** (Pages statiques web intégrées dans l'app).
  - Gestion de la souscription (Bouton "Gérer mon abonnement Premium", "Restaurer mes achats").
  - *📝 Note Stratégique (Choix du Business Model)* : L'architecture de paiement reste à trancher. Soit **In-App Purchase** (parcours utilisateur ultra fluide d'un clic, mais commission Apple/Google de 15% à 30% sur les revenus), soit **Paiement Web Externe via Stripe** (0% de commission Apple mais obligation de s'abonner depuis un site web myequivoice.com avant de se connecter à l'app).
- **Déconnexion** et suppression de compte.


## 4. Dashboard Admin et "Back-Office Créateur" (Côté Serveur)
Un panneau de contrôle (CMS) web, réservé aux administrateurs (MyEquiVoice), permettant de maintenir l'application en vie sans avoir à coder.

**A. Le Studio de Création de Séances (Indispensable)**
Interface simple permettant à la créatrice de :
- Uploader le fichier MP3 maître.
- Taper les textes de la fiche (Titre, Objectifs, Erreurs).
- Uploader l'image du schéma de la carrière.
- Assigner les tags de filtrage (Galop cible, Matériel requis, Discipline).
- **Assigner les Tags de Compétences (Nouveau)** : La créatrice définit 1 à 3 compétences majeures ciblées par la séance (ex: *Souplesse*, *Franchise*, *Tracé*). C'est ce paramètre technique qui dictera au système de notation quelles questions poser à la fin de la séance pour nourrir le *Radar de Compétences* de l'utilisateur.
- Publier la séance (qui apparaîtra instantanément dans le catalogue des utilisateurs).

**B. Le Suivi des Utilisateurs (Analytics)**
- Les séances les plus/moins écoutées.
- Les notes moyennes des exercices (pour identifier si une séance est décrite comme "Trop difficile" par 80% des utilisateurs).
- Les remontées de "Bugs sur la séance" signalées par les cavaliers depuis la Fiche Séance.
- La gestion financière (Résiliation des abonnements, Suivi des nouveaux utilisateurs Freemium).
