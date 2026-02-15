---
name: equivoice-library-manager
description: Agit en "Chef d'Orchestre" pour créer des séances MyEquiVoice parfaites. Utilise INDEX_BIBLIOTHEQUE_MASTER.md pour le fond technique et coordonne avec equivoice-script-writer pour la forme éditoriale.
version: 1.0.0
category: equestrian-coaching
tags: [library, orchestration, content-creation, myequivoice]
---

# EquiVoice Library Manager (Chef d'Orchestre)

## Purpose

To act as a master librarian and orchestrator for MyEquiVoice content. This skill ensures that every new session created is technically sound (based on the exercise library) and editorially perfect (based on the charter). It knows the "Master Index" by heart and uses it to suggest original, varied, and pedagogically coherent training sessions.

## When to Use

- When the user asks: "Crée une nouvelle séance de [Thème] pour un [Niveau]".
- When the user wants a program that avoids repetition: "Fais moi quelque chose d'original".
- When an exercise needs to be selected from the library: "Propose moi un exercice de [Discipline]".
- When checking the coherence of a session title or ID against the master list.

## Instructions

1.  **Analyze the Request**: Identify Level (G-levels), Duration, Discipline (Dressage, Sol, Saut, etc.), and Theme.
2.  **Consult the Master Index**:
    -   Primary source: `05_PRODUCTION_CONTENUS/BIBLIOTHEQUE_EXERCICES/INDEX_BIBLIOTHEQUE_MASTER.md`.
    -   Find exercises that match the Theme and Level.
    -   Lookup corresponding `fiche.md` in `CATALOGUE_CONTENU/` for technical details.
3.  **Check for Duplicates**: Use `CATALOGUE_CONTENU/LISTE_COMPLETE.txt` to ensure the session doesn't already exist under the same title or ID.
4.  **Orchestrate Creation**:
    -   **The Content (Foundation)**: Select 2-3 geometric figures or specific exercises from the library.
    -   **The Form (Structure)**: Invoke `equivoice-script-writer` rules to structure the script (Timing, Tone, Silence, Feedback).
5.  **Variability Logic**:
    -   If the user has been doing Dressage, suggest a "Travail au sol" or "Bien-être" session to balance the work.
    -   Ensure symmetry and variety in tracings (don't always use circles).
6.  **Apply Standards**: 
    -   Follow the "Coach in the Arena" tone from the charter.
    -   Ensure all safety and legal checks are included.

## Reference

-   **Master Index**: [INDEX_BIBLIOTHEQUE_MASTER.md](file:///C:/Users/TTM/Desktop/PROJET_APP/05_PRODUCTION_CONTENUS/BIBLIOTHEQUE_EXERCICES/INDEX_BIBLIOTHEQUE_MASTER.md)
-   **Full List**: [LISTE_COMPLETE.txt](file:///C:/Users/TTM/Desktop/PROJET_APP/05_PRODUCTION_CONTENUS/CATALOGUE_CONTENU/LISTE_COMPLETE.txt)
-   **Editorial Logic**: [library-logic.md](references/library-logic.md)
-   **Script Writer Skill**: [equivoice-script-writer](../equivoice-script-writer/SKILL.md)
