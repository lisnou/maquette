import SeancesData from './seances';

const ProgramsData = [
    {
        id: 'resume',
        title: 'Remise en forme',
        subtitle: 'Post-trêve hivernale',
        duration: '4 semaines',
        sessionsCount: 12,
        level: 'Tout niveau',
        description: `Un programme progressif pour remuscler votre cheval en douceur après une période de repos.`,
        image: '/equestrian_lifestyle_bg.png',
        progress: 33, // 33% complété
        locked: false,
        sessions: [
            SeancesData.find(s => s.id === 6), // Décontraction
            SeancesData.find(s => s.id === 19), // Longe
            SeancesData.find(s => s.id === 127) // Détente pas
        ]
    },
    {
        id: 'cso_prep',
        title: 'Saison Concours',
        subtitle: 'Objectif CSO Club 2',
        duration: '6 semaines',
        sessionsCount: 18,
        level: 'G4-5',
        description: `Préparation spécifique pour enchaîner un parcours type sans faute. Travail sur la franchise et la technique.`,
        image: '/obstacle.png',
        progress: 0,
        locked: false,
        sessions: [
            SeancesData.find(s => s.id === 27),
            SeancesData.find(s => s.id === 28),
            SeancesData.find(s => s.id === 29)
        ]
    },
    {
        id: 'dressage_finesse',
        title: 'Finesse & Légèreté',
        subtitle: 'Perfectionnement Dressage',
        duration: '8 semaines',
        sessionsCount: 24,
        level: 'G5+',
        description: `Un cycle dédié à l'amélioration du contact et de l'équilibre pour un cheval disponible et léger.`,
        image: '/dressage.png',
        progress: 0,
        locked: true, // Exemple verrouillé
        sessions: []
    }
];

export default ProgramsData;
