# 🛠️ MyEquiVoice : SPÉCIFICATIONS TECHNIQUES (MVP)

Ce document définit la logique de fonctionnement de l'application pour le développement.

## 1. GESTION DYNAMIQUE DU TIMING (Arena-Sync)
L'application doit adapter la durée de la séance à l'espace de travail réel de l'utilisateur.

### A. Paramètres Utilisateur
- **Petit Espace (15x30m)** : Coeff 1.0 (Temps de référence)
- **Standard (20x40m)** : Coeff 1.2 (+20% de temps sur les pauses de déplacement)
- **Grand Espace (20x60m / +)** : Coeff 1.5 (+50% de temps sur les pauses de déplacement)

### B. Implémentation Audio
- Les séances ne sont pas stockées sous forme de fichiers MP3 uniques.
- Elles sont découpées en **"Chunks" (segments audio)** correspondant à chaque consigne.
- L'application injecte des **Silences Variables** entre les segments en fonction du profil utilisateur.

### C. Priorité de la Commande Vocale
- La commande vocale **"C'est fait"** doit agir comme un "Interrupt".
- Elle stoppe immédiatement le silence en cours et lance le segment audio suivant.
- Elle permet de pallier les imprécisions du coefficient automatique (cheval rapide/lent).

### D. Sélection Contextuelle (UX/UI)
- **Profil par défaut** : L'utilisateur définit son infrastructure habituelle dans ses réglages.
- **Réglage avant séance** : Sur l'écran de lancement (Play), l'utilisateur doit pouvoir modifier la taille du terrain pour la session spécifique (cas du manège partagé ou changement d'aire d'évolution).
- **Ajustement de durée** : Le calcul de la durée estimée de la séance doit s'actualiser en temps réel selon le choix fait.

---

## 2. ARCHITECTURE DES SCRIPTS
- Format unique pour tous les scripts.
- Balisage clair des pauses : `[Pause : XXs]`.
- Les pauses de "Travail" (ex: saut) sont fixes. Seules les pauses de "Déplacement/Tracé" sont variables.

---

## 3. MODE HORS-LIGNE (Offline First)
- L'utilisateur doit pouvoir télécharger une séance complète (audio + logique de pause) avant d'aller aux écuries où le réseau est souvent faible.
