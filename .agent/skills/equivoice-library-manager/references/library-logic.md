# Library Mixology & Pedagogical Logic

This document defines the advanced logic used by `equivoice-library-manager` to ensure training variety and pedagogical excellence.

## 1. The "Variability" Rule
To keep the application engaging, never repeat the same primary exercise in two consecutive sessions for the same user level. 
- **Rotation**: Rotate between the 5 Pillars (Dressage, Sol, Détente, Saut, Technique).
- **Tracings**: If a session uses circles, the next one should focus on straight lines or angles (Doublés, Diagonales).

## 2. Session Balancing (The Training Week)
When proposing a "New Program", use this balance:
- **40% Technique/Position**: Improving the rider.
- **30% Muscle/Gym**: Improving the horse (Dressage/Saut).
- **20% Connection/Ground**: Improving the relationship.
- **10% Recovery/Zen**: Mental and physical rest.

## 3. Pillar-Specific Selection Logic

### Dressage (High Complexity)
- Mix 1 "Movement" figure (e.g., Cession) with 1 "Precision" figure (e.g., Serpentines).
- Ensure transitions are integrated into the figure, not just around it.

### Gymnastique de Saut / Cavalettis
- Always start with a "Rhythm" exercise (Barres au sol).
- End with an "Autonomy" exercise where the rider has less to do.

### Travail au Sol
- Alternate between "Energy" (Longe) and "Precision" (Pied/Maniabilité).

## 4. ID & Metadata Consistency
- **IDs**: Always look for the next available ID in `LISTE_COMPLETE.txt` for new creations.
- **Levels**: Strictly respect the G-levels assigned in the Master Index. A G3-4 exercise cannot be pushed to a G6-7 session without significant technical adaptation.

## 5. Metadata Triggers for the Agent
When choosing an exercise, scan for these keywords in `INDEX_BIBLIOTHEQUE_MASTER.md`:
- `Rectitude`
- `Incurvation`
- `Engagement`
- `Souplesse`
- `Cadence`
- `Précision`
