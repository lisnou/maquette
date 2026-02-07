# Stratégie Technique et Maintenance - MyEquiVoice

Ce document définit les choix techniques et l'organisation de la maintenance pour assurer la pérennité de l'application tout en préservant le temps personnel des fondateurs.

---

## 1. Choix de l'Infrastructure (Le "Moteur")

Pour minimiser le travail quotidien, l'application reposera sur des services d'infrastructure managés (type **Firebase** ou **Supabase**).

*   **Zéro Maintenance Serveur :** Google/Amazon gère la sécurité, la rapidité et la sauvegarde des données 24h/24. 
*   **Scalabilité Automatique :** Le système supporte 10 ou 10 000 utilisateurs sans que le développeur n'ait à intervenir sur la puissance des machines.
*   **Sécurité Native :** Cryptage des données et gestion des accès aux fichiers audio inclus.

---

## 2. Autonomie de Publication (Interface Administrateur)

L'application sera conçue pour que la fondatrice soit 100% autonome dans la gestion du contenu.

*   **L'Outil d'Administration :** Un accès réservé permettra d'importer les fichiers audio, de saisir les titres, descriptions et catégories.
*   **Zéro Code pour les Séances :** L'ajout d'une nouvelle séance tous les 15 jours ne demandera aucune ligne de code et aucune intervention du développeur. La mise à jour est instantanée dans l'application des utilisateurs.

---

## 3. Plan de Maintenance Réaliste

Une application mobile n'est pas "figée", elle vit dans un environnement qui évolue. Voici l'estimation de la charge de travail technique après le lancement :

### A. Phase de Lancement (Les 2 premiers mois)
*   **Objectif :** Corriger les bogues de jeunesse (compatibilité avec certains téléphones).
*   **Charge estimée :** ~ 2h à 4h par week-end.

### B. Phase de Croisière (Régime normal)
*   **Objectif :** Surveillance légère et corrections mineures.
*   **Charge estimée :** ~ 1h à 2h par mois.
*   **Note :** Le code ne s'use pas. Si l'appli fonctionne bien un mois donné, elle fonctionnera le mois suivant si rien ne change.

### C. Mises à jour Réglementaires (1 à 2 fois par an)
*   **Objectif :** Adaptation aux nouvelles versions d'iOS (Apple) et Android (Google).
*   **Charge estimée :** ~ 1 après-midi tous les 6 mois.

---

## 4. Vision à Long Terme

*   **Indépendance du Développeur :** En utilisant des langages standards (ex: Flutter, React Native), le code est lisible par n'importe quel développeur freelance.
*   **Externalisation :** À partir du palier des 300 abonnés, les revenus permettront si besoin de payer un prestataire pour les mises à jour annuelles, libérant totalement le conjoint de toute contrainte technique.

---
*Dernière mise à jour : 06/02/2026*
