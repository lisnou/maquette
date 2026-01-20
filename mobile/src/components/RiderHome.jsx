import React, { useState, useMemo } from 'react';
import { Play, TrendingUp, Star, Clock, Target, ChevronRight, Filter } from 'lucide-react';
import SeancesData from '../data/seances';

export default function RiderHome({ onExplore, onPlay, profile, activeHorse, searchQuery }) {
    const [activeCategory, setActiveCategory] = useState('Dressage');
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [filterLevel, setFilterLevel] = useState('all');
    const [filterDuration, setFilterDuration] = useState('all');
    const [includeLowerLevels, setIncludeLowerLevels] = useState(true);

    // Définition des sous-catégories
    const subcategories = {
        'Cross & Extérieur sportif': [
            { id: 'all', label: 'Tout', themes: null },
            { id: 'galop-cross', label: 'Galop & Condition physique', themes: ['Galop de cross', 'Condition physique', 'Endurance', 'Compétition'] },
            { id: 'gymnastique', label: 'Gymnastique & Technique', themes: ['Gymnastique', 'Technique'] },
            { id: 'obstacles-naturels', label: 'Obstacles spécifiques', themes: ['Obstacles naturels'] },
            { id: 'parcours', label: 'Parcours & Situations', themes: ['Parcours', 'Stratégie', 'Mental'] },
            { id: 'recuperation', label: 'Récupération & Soins', themes: ['Récupération'] }
        ],
        'Travail au sol': [
            { id: 'all', label: 'Tout', themes: null },
            { id: 'longe', label: 'Longe & Enrênements', themes: ['Longe'] },
            { id: 'liberte', label: 'Travail à pied & Liberté', themes: ['Liberté', 'Longues rênes', 'Technique'] },
            { id: 'gymnastique-sol', label: 'Gymnastique au sol', themes: ['Gymnastique', 'Muscu'] },
            { id: 'education', label: 'Éducation & Confiance', themes: ['Confiance', 'Éducation', 'Bien-être'] }
        ]
    };

    // Recommendation personnalisée selon le niveau du cavalier
    const recommendedSeance = useMemo(() => {
        // FOR MOCKUP DEMO: Force ID 67 (Engagement des postérieurs) if available
        const forcedSeance = SeancesData.find(s => s.id === 67);
        if (forcedSeance) return forcedSeance;

        if (!SeancesData || SeancesData.length === 0) return null;
        const userLevel = profile?.galopLevel || 'G4-5';
        const levelMatches = SeancesData.filter(s => s.niveau === userLevel);
        const source = levelMatches.length > 0 ? levelMatches : SeancesData;

        // Seed based on date to keep recommendation stable for "Today"
        const today = new Date().toDateString();
        let seed = 0;
        for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);

        return source[seed % source.length];
    }, [profile?.galopLevel]);

    const categories = [
        { id: 'Dressage', label: 'Dressage', image: '/dressage.png' },
        { id: 'Obstacle', label: 'Obstacle', image: '/obstacle.png' },
        { id: 'Cross & Extérieur sportif', label: 'Cross &\nExtérieur', image: '/trail.png' },
        { id: 'Travail au sol', label: 'Travail\nau Sol', image: '/groundwork.png' },
        { id: 'Détente & Bien-être', label: 'Détente &\nBien-être', image: '/equestrian_lifestyle_bg.png' },
        { id: 'specifique', label: 'Travail\nSpécifique', image: '/equestrian_premium.png' },
        { id: 'corrections', label: 'Corrections\nCiblées', image: '/corrections.png' },
    ];

    // Fonction pour vérifier si un niveau est inférieur ou égal au niveau sélectionné
    // Fonction pour vérifier si un niveau est inférieur ou égal au niveau sélectionné
    const isLevelIncluded = (seanceLevel, selectedLevel) => {
        if (selectedLevel === 'all') return true;

        // Normalisation stricte : retire '+' et espaces
        const normalize = (val) => (val || '').toString().replace(/\+/g, '').replace(/\s/g, '');

        const cleanSeance = normalize(seanceLevel); // ex: "G3-4+" -> "G3-4"
        const cleanSelected = normalize(selectedLevel); // ex: "G4-5" -> "G4-5"

        if (!includeLowerLevels) {
            return cleanSeance === cleanSelected;
        }

        // Liste de référence "propre" (sans +)
        const levelOrder = ['G1', 'G2-3', 'G3-4', 'G4-5', 'G5-6', 'G6-7', 'G7'];

        const seanceIndex = levelOrder.indexOf(cleanSeance);
        const selectedIndex = levelOrder.indexOf(cleanSelected);

        // Si niveau inconnu, on inclut par sécurité
        if (seanceIndex === -1 && seanceLevel && seanceLevel.includes('G')) return true;

        // Logique "G4-5" voit "G3-4" (index 3 vs 2 => true)
        return seanceIndex <= selectedIndex;
    };

    const filteredSeances = useMemo(() => {
        let currentSeances = SeancesData;

        // 1. Filtrage par Recherche (Prioritaire) OU par Catégorie
        if (searchQuery && searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase();
            currentSeances = currentSeances.filter(s =>
                s.nom.toLowerCase().includes(query) ||
                s.discipline.toLowerCase().includes(query) ||
                (s.theme && s.theme.toLowerCase().includes(query))
            );
        } else {
            // Filtrage Classique par Catégorie
            currentSeances = currentSeances.filter(s => {
                const matchesCategory = activeCategory === 'all' ||
                    (activeCategory === 'Travail au sol' && s.discipline === 'Travail au sol') ||
                    (activeCategory === 'Cross & Extérieur sportif' && s.discipline === 'Cross & Extérieur sportif') ||
                    (activeCategory === 'Détente & Bien-être' && s.discipline === 'Détente & Bien-être') ||
                    (activeCategory === 'specifique' && s.type === 'Thématique spécifique') ||
                    (activeCategory === 'corrections' && s.type === 'Résolution de problème') ||
                    (activeCategory !== 'all' && activeCategory !== 'Travail au sol' && activeCategory !== 'Cross & Extérieur sportif' && activeCategory !== 'Détente & Bien-être' && activeCategory !== 'specifique' && activeCategory !== 'corrections' && s.discipline === activeCategory);
                return matchesCategory;
            });

            // Filtrage par Sous-catégorie (Seulement si pas de recherche)
            if (activeSubcategory && activeSubcategory !== 'all' && subcategories[activeCategory]) {
                const subcat = subcategories[activeCategory].find(sc => sc.id === activeSubcategory);
                if (subcat && subcat.themes) {
                    currentSeances = currentSeances.filter(s => subcat.themes.includes(s.theme));
                }
            }
        }

        // 2. Application des Filtres Transversaux (Niveau & Durée) - TOUJOURS ACTIFS
        // Cela permet de filtrer les résultats de recherche aussi !
        return currentSeances.filter(s => {
            const matchesLevel = filterLevel === 'all' || isLevelIncluded(s.niveau, filterLevel);
            const matchesDuration = filterDuration === 'all' || s.duree === filterDuration;
            return matchesLevel && matchesDuration;
        });

    }, [activeCategory, activeSubcategory, filterLevel, filterDuration, includeLowerLevels, searchQuery]);

    const getHeroImage = (discipline) => {
        if (!discipline) return '/dressage.png'; // Fallback plus vivant
        switch (discipline) {
            case 'Dressage': return '/dressage.png';
            case 'Obstacle': return '/obstacle.png';
            case 'Cross & Extérieur sportif': return '/trail.png';
            case 'Travail au sol': return '/groundwork.png';
            case 'Détente & Bien-être': return '/equestrian_lifestyle_bg.png';
            case 'Transversal': return '/equestrian_premium.png';
            default: return '/dressage.png';
        }
    };

    return (
        <div className="relative min-h-[800px] rounded-[2rem] overflow-hidden animate-in fade-in duration-300">
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0 bg-[#FAF7F2]">
                <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-fixed" style={{ backgroundImage: `url('/bg-pattern.png')`, backgroundSize: '250px', backgroundRepeat: 'repeat' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-[#FDFBF7]/80 to-[#FDFBF7]/95 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-8 py-6">

                {/* 0. HEADER USER - SIMPLE ET EFFICACE (Masqué si recherche) */}
                {!searchQuery && (
                    <div className="px-8 mt-1 mb-1 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                        <p className="text-[#8C9E79] text-3xl font-serif font-bold mb-0.5">Bonjour</p>
                        <h1 className="text-xl font-serif text-[#8C9E79] font-bold leading-tight">
                            {profile?.userName || 'Cavalier'} <span className="text-[#C17C74] font-light italic">&</span> {activeHorse?.name || 'votre cheval'}
                        </h1>
                    </div>
                )}

                {/* 1. MAGAZINE HERO - PREMIUM & IMMERSIF (Masqué si recherche) */}
                {!searchQuery && (
                    <section className="px-5 mb-4">
                        {recommendedSeance ? (
                            <div className="relative h-[300px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(74,93,74,0.2)] group border-[4px] border-[#8C9E79] animate-in fade-in zoom-in duration-1000">
                                <img
                                    src={getHeroImage(recommendedSeance.discipline)}
                                    alt="Recommandation"
                                    className="w-full h-full object-cover object-top transition-transform duration-[5s] group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                {/* Badge Top-Left: Sélection du Jour */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-[#8C9E79] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/20 backdrop-blur-md">
                                        Sélection du Jour
                                    </span>
                                </div>

                                {/* Carte Titre Compacte en bas */}
                                <div className="absolute inset-x-4 bottom-4">
                                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                {/* Recommandation Header */}
                                                <p className="text-[#E8DCCA] text-[9px] uppercase font-bold tracking-widest mb-1 font-sans flex items-center gap-1">
                                                    <Star size={8} className="fill-[#E8DCCA]" /> Votre Recommandation
                                                </p>

                                                <h3 className="text-white text-base font-bold tracking-wide leading-tight mb-1.5 drop-shadow-md line-clamp-2 font-serif">
                                                    {recommendedSeance.nom}
                                                </h3>

                                                <div className="flex items-center gap-1.5 opacity-90 flex-wrap">
                                                    {/* Niveau */}
                                                    <span className="text-white text-[9px] uppercase font-black tracking-widest bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                                                        {recommendedSeance.niveau}
                                                    </span>

                                                    {/* Discipline */}
                                                    <span className="text-white text-[9px] uppercase font-black tracking-widest bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                                                        {recommendedSeance.discipline === 'Transversal' ? recommendedSeance.theme : recommendedSeance.discipline}
                                                    </span>

                                                    {/* Durée */}
                                                    <div className="flex items-center gap-1 text-white text-[9px] uppercase font-black tracking-widest ml-1">
                                                        <Clock size={10} /> {recommendedSeance.duree}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onPlay(recommendedSeance)}
                                                className="w-11 h-11 rounded-full bg-[#8C9E79] text-white flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-white hover:text-[#8C9E79] hover:scale-110 active:scale-95 transition-all duration-300 group/btn shrink-0 border border-white/20"
                                            >
                                                <Play size={20} fill="currentColor" className="ml-0.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[340px] rounded-[2rem] bg-equi-cream flex items-center justify-center border-[6px] border-[#8C9E79]">
                                <p className="text-equi-olive font-serif italic text-xl">Aucune séance disponible pour le moment.</p>
                            </div>
                        )
                        }
                    </section>
                )}

                {/* 2. NAVIGATION STORIES - SÉLECTEUR DE CATÉGORIES (Masqué si recherche) */}
                {!searchQuery && (
                    <section>
                        <div className="px-10 mb-2 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-equi-clay/60 block mb-1">Explorer</span>
                            <h3 className="text-2xl font-serif italic text-equi-olive font-black tracking-tight">Nos Disciplines</h3>
                        </div>

                        <div className="flex gap-6 px-10 py-2 overflow-x-auto no-scrollbar scroll-smooth">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setActiveSubcategory(null); // Reset subcategory when changing category
                                        setFilterLevel('all');
                                        setFilterDuration('all');
                                    }}
                                    className="flex flex-col items-center gap-4 shrink-0 group min-w-[100px]"
                                >
                                    <div className={`w-24 h-24 rounded-full p-1.5 border-[4px] transition-all duration-700 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_8px_16px_rgba(140,158,121,0.2)]
                                    ${activeCategory === cat.id ? 'border-[#8C9E79] scale-110 bg-white ring-4 ring-[#8C9E79]/10' : 'border-white group-hover:border-[#8C9E79]/30'}`}>
                                        <img src={cat.image} className={`w-full h-full object-cover rounded-full transition-all duration-1000 ${activeCategory === cat.id ? 'grayscale-0 scale-105' : 'grayscale-[60%] group-hover:grayscale-0'}`} alt={cat.label} />
                                    </div>
                                    <span className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 text-center leading-tight whitespace-pre-line
                                    ${activeCategory === cat.id ? 'text-equi-olive scale-105' : 'text-equi-clay/60 group-hover:text-equi-olive'}`}>
                                        {cat.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. SESSION LIST & FILTERS */}
                <section className="px-6 mb-12">
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-2xl relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-equi-sage/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>



                        {/* Header & Filtres */}
                        <div className="flex flex-col gap-5 mb-0 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-10 bg-[#8C9E79] rounded-full shadow-[0_0_15px_rgba(148,172,136,0.4)]"></div>
                                    <h3 className="text-2xl font-serif italic font-black text-equi-olive">
                                        {searchQuery ? `Résultats (${filteredSeances.length})` : categories.find(c => c.id === activeCategory)?.label}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-black text-equi-clay uppercase tracking-[0.3em]">
                                    {filteredSeances.length} Séances
                                </span>
                            </div>

                            {/* Filtre Sous-catégories (Dressage, Obstacle, etc.) - CHIPS */}
                            {subcategories[activeCategory] && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-1">
                                        <TrendingUp size={12} className="text-equi-olive/50" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-equi-olive/50">Thématique</span>
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
                                        {subcategories[activeCategory].map((subcat) => (
                                            <button
                                                key={subcat.id}
                                                onClick={() => setActiveSubcategory(subcat.id)}
                                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0 ${activeSubcategory === subcat.id
                                                    ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-md scale-105'
                                                    : 'bg-white text-equi-olive border-equi-border/50 hover:border-[#8C9E79]/50'
                                                    }`}
                                            >
                                                {subcat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Barre de Filtres - Design Minimaliste */}
                            {/* Masquer le filtre de niveau pour "Corrections Ciblées" car séances universelles (G3+) */}
                            {/* Barre de Filtres - Chips Horizonaux Premium */}
                            <div className="flex flex-col gap-3">
                                {/* Filtre Niveau */}
                                {activeCategory !== 'corrections' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 px-1">
                                            <Filter size={12} className="text-equi-olive/50" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-equi-olive/50">Niveau</span>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
                                            {[
                                                { id: 'all', label: 'Tous' },
                                                { id: 'G2-3', label: 'G2-3' },
                                                { id: 'G3-4', label: 'G3-4' },
                                                { id: 'G4-5', label: 'G4-5' },
                                                { id: 'G5-6', label: 'G5-6' },
                                                { id: 'G6-7', label: 'G6-7' },
                                                { id: 'G7+', label: 'G7+' }
                                            ].map((lvl) => (
                                                <button
                                                    key={lvl.id}
                                                    onClick={() => setFilterLevel(lvl.id)}
                                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0 ${filterLevel === lvl.id
                                                        ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-md scale-105'
                                                        : 'bg-white text-equi-olive border-equi-border/50 hover:border-[#8C9E79]/50'
                                                        }`}
                                                >
                                                    {lvl.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Filtre Durée */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-1">
                                        <Clock size={12} className="text-equi-olive/50" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-equi-olive/50">Durée</span>
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
                                        {[
                                            { id: 'all', label: 'Toutes' },
                                            { id: '15min', label: '15 min' },
                                            { id: '20min', label: '20 min' },
                                            { id: '30min', label: '30 min' },
                                            { id: '45min', label: '45+ min' }
                                        ].map((dur) => (
                                            <button
                                                key={dur.id}
                                                onClick={() => setFilterDuration(dur.id)}
                                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0 ${filterDuration === dur.id
                                                    ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-md scale-105'
                                                    : 'bg-white text-equi-olive border-equi-border/50 hover:border-[#8C9E79]/50'
                                                    }`}
                                            >
                                                {dur.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Toggle "Inclure niveaux inférieurs" - Visible uniquement si un niveau spécifique est sélectionné */}
                            {activeCategory !== 'corrections' && filterLevel !== 'all' && (
                                <label className="flex items-center gap-3 px-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={includeLowerLevels}
                                        onChange={(e) => setIncludeLowerLevels(e.target.checked)}
                                        className="w-5 h-5 rounded border-2 border-equi-border text-[#8C9E79] focus:ring-4 focus:ring-[#8C9E79]/10 cursor-pointer transition-all"
                                    />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-equi-olive/70 group-hover:text-equi-olive transition-colors">
                                        Inclure les niveaux inférieurs
                                    </span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* SÉPARATEUR VISUEL */}
                    <div className="h-px bg-[#8C9E79]/10 w-full my-6"></div>

                    {/* Liste des séances */}
                    <div className="flex flex-col gap-4 relative z-10">
                        {filteredSeances.length > 0 ? filteredSeances.map((seance) => (
                            <button
                                key={seance.id}
                                onClick={() => onPlay(seance)}
                                className="flex items-center gap-3 p-4 rounded-[2.5rem] bg-white border border-equi-border/50 hover:border-[#8C9E79] hover:shadow-[0_20px_40px_rgba(74,93,74,0.08)] hover:-translate-y-1 transition-all duration-500 text-left active:scale-[0.98] group"
                            >
                                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-inner border-2 border-white shrink-0 group-hover:scale-110 transition-transform bg-equi-cream">
                                    <img
                                        src={getSeanceVisual(seance)}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        style={{
                                            filter: `grayscale(20%) brightness(1.05)`
                                        }}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-equi-olive text-base mb-1.5 leading-snug group-hover:text-[#8C9E79] transition-colors">
                                        {seance.nom}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-equi-olive/10 text-[#4A5D4A] opacity-90 whitespace-nowrap">
                                            {seance.niveau}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-equi-clay uppercase tracking-widest opacity-60 whitespace-nowrap">
                                            <Clock size={12} /> {seance.duree}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-equi-olive/5 flex items-center justify-center text-equi-olive opacity-20 group-hover:opacity-100 group-hover:bg-[#8C9E79]/10 group-hover:text-[#8C9E79] transition-all duration-500 shrink-0">
                                    <ChevronRight size={18} />
                                </div>
                            </button>
                        )) : (
                            <div className="py-16 text-center flex flex-col items-center gap-6 opacity-30">
                                <div className="w-20 h-20 rounded-full bg-equi-olive/5 flex items-center justify-center">
                                    <Target size={32} className="text-equi-olive" />
                                </div>
                                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-equi-olive">À la recherche de nouvelles pépites...</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

function getSeanceVisual(seance) {
    // Priorité absolue aux types spéciaux
    if (seance.type === 'Résolution de problème') return '/corrections.png';
    if (seance.type === 'Thématique spécifique') return '/equestrian_premium.png';

    // Ensuite, mappage strict par discipline
    switch (seance.discipline) {
        case 'Dressage': return '/dressage.png';
        case 'Obstacle': return '/obstacle.png';
        case 'Cross & Extérieur sportif': return '/trail.png';
        case 'Travail au sol': return '/groundwork.png';
        case 'Détente & Bien-être': return '/equestrian_lifestyle_bg.png';
        default: return '/equestrian_lifestyle_bg.png';
    }
}
