# 📋 MyEquiVoice : SPÉCIFICATIONS FONCTIONNELLES (MVP)

Ce document définit les règles de gestion et le comportement attendu de l'application pour le développement.

---

## 1. LOGIQUE DE FILTRAGE DU CATALOGUE
L'application doit filtrer les séances selon le profil de l'utilisateur.

### A. Filtres de Niveau (Galops)
- **Point de départ** : Le catalogue commence au niveau **Galop 3 / G3+**. Les niveaux inférieurs (G1-G2) ont été exclus pour garantir la sécurité des utilisateurs montant en autonomie.
- **Comportement standard** : Si l'utilisateur sélectionne son niveau (ex: G5), l'app affiche uniquement les séances G5.
- **Toggle "Inclure niveaux inférieurs"** : Si coché, l'app affiche G5 + tous les niveaux en dessous (G4, G3+).
- **Exception "Correction de Problèmes"** : Cette catégorie doit être **codée pour rester visible en permanence**, quel que soit le niveau ou le filtre sélectionné par l'utilisateur.

### B. Recommandations via Profil Cheval
- **Filtrage par exclusion** : Sur l'écran d'accueil, l'app ne doit jamais recommander une séance dont les pré-requis (ex: "Saut d'obstacles" ou "Carrière nécessaire") ne correspondent pas au profil du cheval sélectionné ou aux infrastructures déclarées.

---

## 2. COMPORTEMENT DU LECTEUR AUDIO (CHEF D'ORCHESTRE)
Le lecteur ne lit pas un fichier unique, mais assemble des séquences.

### A. Gestion du Rhythm Dynamique (Arena-Sync)
L'app doit ajuster les temps de pause selon la taille du terrain déclaré par l'utilisateur :
- **Petit (15x30m)** : Pause standard ($T$).
- **Standard (20x40m)** : Pause $T \times 1.2$.
- **Grand (20x60m)** : Pause $T \times 1.5$.
*Note : Le moteur doit pouvoir lire le temps de pause inscrit dans les métadonnées de la séance.*

### B. Commandes Vocales (Micro en tâche de fond)
Trois commandes prioritaires doivent interrompre le cycle en cours :
- **"C'est fait"** : Coupe le silence/chronomètre immédiatement et force la lecture du segment audio suivant.
- **"Stop" / "Pause" / "Continue"** : Gestion classique de l'état du lecteur.
- **"Répète"** : Relance le dernier segment audio.

---

## 3. PARCOURS UTILISATEUR & ÉCRANS SPÉCIFIQUES

### A. Profil Multi-Chevaux (Base de données)
L'utilisateur peut créer plusieurs entités "Cheval". Le choix du cheval actif en début de session modifie les recommandations du catalogue.

### B. Écran "Pre-Flight Check" (Avant de monter)
Écran obligatoire s'affichant après avoir cliqué sur une séance, mais AVANT le bouton Play :
1. **Sélecteur de Cheval** : Pour confirmer qui on monte.
2. **Sélecteur de Terrain** : Pour ajuster le coefficient de pause (Arena-Sync) selon le lieu du jour (Manège, Carrière, etc.).
3. **Récapitulatif Matériel** : Affichage d'une image (schéma) et d'une liste texte du matériel nécessaire.

---

## 4. ALGORITHME DU RADAR DE PROGRESSION
Après chaque séance, le système met à jour un graphique en radar (RadarChart) basé sur la "Note Ressenti" de l'utilisateur :
- **Incrémentation** : Chaque séance rapporte des points dans 5 axes (ex: Équilibre, Impulsion...). 
- **Calcul** : Le score final de la séance est multiplié par la note de l'utilisateur (4/4 = 100% des points, 1/4 = 0 points).

---

## 5. CONTRAINTES LÉGALES & SYSTÈME
- **Pop-up de lancement** : Message obligatoire au premier démarrage de l'app (Avertissement sur la responsabilité et le coaching autonome).
- **Mode hors-ligne** : Les segments audios et les images de schémas doivent être téléchargeables pour fonctionner sans réseau aux écuries.
- **Micro en tâche de fond** : Le micro doit rester actif pour les commandes vocales même si le téléphone est dans la poche avec l'écran éteint.

---

## 6. SÉCURITÉ ACTIVE (GUARDIAN MODE) 🛡️
Cette fonctionnalité transforme l'app en dispositif de sécurité pour le cavalier isolé.

### A. Configuration (Profil)
- **Contact d'Urgence** : Possibilité d'enregistrer un nom et un numéro de téléphone dédié (proche).
- **Permissions** : L'app doit demander l'autorisation d'accéder au composeur d'appels.

### B. Déclenchement Manuel & Vocal
- **Bouton SOS Sécurisé** : Un bouton rouge haute visibilité sur le lecteur audio. Pour éviter les déclenchements accidentels (frottements dans la poche), l'activation nécessite soit un **appui long (3 secondes)**, soit un **système de glissière (Slide to SOS)**.
- **Compte à rebours de sécurité** : Une fois activé, un compte à rebours sonore de 5 secondes se lance ("Appel dans 5 secondes...") permettant une annulation immédiate en cas d'erreur.
- **Commande Vocale SOS** : En cas de détresse, le mot-clé **"URGENCE"** ou **"AU SECOURS"** déclenche automatiquement le processus d'appel.
- **Priorité Absolue** : Cette fonction coupe tout autre flux audio et passe en mode haut-parleur par défaut.
