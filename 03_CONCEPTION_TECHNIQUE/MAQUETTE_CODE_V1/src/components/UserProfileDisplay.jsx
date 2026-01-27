import React, { useState } from 'react';
import { Edit2, Award, TrendingUp, Calendar, Zap, Layout, Settings, Trophy, Activity, Star, Play, Syringe, Pill, Bone, AlertCircle, CheckCircle2, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import profileRiderImg from '../assets/images/profile_rider.png';

export default function UserProfileDisplay({ profile, activeHorse, onEdit, onSwitchHorse, onPlay }) {
    // --- DONNÉES MOCKÉES DYNAMIQUES ---
    // (Dans une vraie app, cela viendrait du backend)
    const MOCK_HISTORY = [
        { date: "16 Jan", fullDate: new Date(new Date().setDate(new Date().getDate() - 1)), title: "Mise en selle", duration: "30", type: "Plat" },
        { date: "12 Jan", fullDate: new Date(new Date().setDate(new Date().getDate() - 5)), title: "Maintien en forme", duration: "45", type: "Plat" },
        { date: "10 Jan", fullDate: new Date(new Date().setDate(new Date().getDate() - 7)), title: "Travail des transitions", duration: "30", type: "Dressage" },
        { date: "05 Jan", fullDate: new Date(new Date().setDate(new Date().getDate() - 12)), title: "Balade en forêt", duration: "60", type: "Extérieur" },
        { date: "28 Déc", fullDate: new Date(new Date().setDate(new Date().getDate() - 20)), title: "Sauts de puce", duration: "45", type: "Obstacle" },
        { date: "15 Déc", fullDate: new Date(new Date().setDate(new Date().getDate() - 32)), title: "Longe et Liberté", duration: "20", type: "TAP" },
        { date: "02 Nov", fullDate: new Date(new Date().setDate(new Date().getDate() - 75)), title: "Concours Club 2", duration: "N/A", type: "Compétition" },
    ];

    const MOCK_FAVORITES = [
        { id: 93, nom: "Exercices sans étriers", discipline: "Transversal", theme: "Équilibre", niveau: "G3-4+", duree: "20min" },
        { id: 41, nom: "Voltes et petits cercles", discipline: "Dressage", theme: "Souplesse", niveau: "G4-5", duree: "30min" },
        { id: 101, nom: "Intro galop de cross", discipline: "Cross", theme: "Galop", niveau: "G3-4", duree: "30min" },
        { id: 6, nom: "Décontraction et étirements", discipline: "Bien-être", theme: "Décontraction", niveau: "G2-3+", duree: "20min" }
    ];

    // --- STATE MANAGEMENT ---
    // 4. Gestion de la Période (Time Range) & Interface
    const [timeRange, setTimeRange] = useState('Semaine');
    const [showHealthBook, setShowHealthBook] = useState(false); // Default wider range
    const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false); // Pour le bouton "Voir tout"
    const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);

    // --- HELPERS ---
    const getTimeRangeLabel = () => {
        switch (timeRange) {
            case '7d': return '7 Derniers Jours';
            case '1m': return 'Ce Mois-ci';
            case '3m': return '3 Derniers Mois';
            case '6m': return '6 Derniers Mois';
            case '1y': return 'Cette Année';
            default: return 'Ce Mois-ci';
        }
    };

    const isDateInRange = (date, range) => {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (range) {
            case '7d': return diffDays <= 7;
            case '1m': return diffDays <= 30;
            case '3m': return diffDays <= 90;
            case '6m': return diffDays <= 180;
            case '1y': return diffDays <= 365;
            default: return true;
        }
    };

    const getMultiplier = () => {
        switch (timeRange) {
            case '7d': return 0.25;
            case '1m': return 1;
            case '3m': return 3;
            case '6m': return 6;
            case '1y': return 12;
            default: return 1;
        }
    };

    // --- CALCULATIONS ---
    // 1. Filtrer l'historique selon la période et le cheval actif
    const filteredHistoryFull = MOCK_HISTORY.filter(log => {
        return isDateInRange(log.fullDate, timeRange);
    });

    // On limite à 3 items si non-étendu
    const displayHistory = isHistoryExpanded ? filteredHistoryFull : filteredHistoryFull.slice(0, 3);

    // 2. Calculer les statistiques
    const stats = {
        count: filteredHistoryFull.length,
        hours: Math.round(filteredHistoryFull.reduce((acc, curr) => acc + (parseInt(curr.duration) || 0), 0) / 60),
        plat: filteredHistoryFull.filter(h => h.type === 'Plat').length,
        obstacle: filteredHistoryFull.filter(h => h.type === 'Obstacle').length,
        balade: filteredHistoryFull.filter(h => h.type === 'Extérieur').length
    };

    // 3. Calculer les pourcentages pour la répartition
    const totalForCalc = stats.count || 1;
    const dist = {
        plat: Math.round((stats.plat / totalForCalc) * 100),
        obstacle: Math.round((stats.obstacle / totalForCalc) * 100),
        exterieur: Math.round((stats.balade / totalForCalc) * 100)
    };

    // Stats ajustées (On utilise les vraies stats filtrées maintenant, plus de simulation de multiplier sauf si voulu pour demo)
    // NOTE: Si on veut garder la logique de multiplier pour "simuler" plus de données sur les grandes périodes même avec peu de mock data :
    // const displayStats = { count: Math.round(stats.count * getMultiplier()), ... }
    // MAIS ici on a des vraies données mockées filtrées, donc on affiche les VRAIES stats filtrées.
    const displayStats = {
        count: stats.count,
        hours: stats.hours
    };


    const weeklySessions = [true, false, true, true, false, false, false];

    return (
        <div className="min-h-screen relative font-sans text-[#8C9E79] pb-32">

            {/* BACKGROUND - Boho Sketch Pattern (Identical to Form) */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAF7F2]">
                <div
                    className="absolute inset-0 opacity-25 mix-blend-multiply bg-fixed"
                    style={{
                        backgroundImage: `url('${import.meta.env.BASE_URL}bg-pattern.png')`,
                        backgroundSize: '250px',
                        backgroundRepeat: 'repeat'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-[#FDFBF7]/80 to-[#FDFBF7]/95 backdrop-blur-[1px]"></div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 px-6 pt-12 flex flex-col gap-6 animate-in fade-in duration-300">

                {/* 1. HEADER - Identité avec Photo (Optimisé & Remonté) */}
                <div className="flex flex-col items-center pt-6">
                    <div className="relative">
                        <div className="w-36 h-36 rounded-full border-4 border-white shadow-2xl bg-[#E8DCCA] flex items-center justify-center relative z-10 overflow-hidden">
                            <img src={profileRiderImg} alt="Profil Cavalier" className="w-full h-full object-cover" />
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-[#8C9E79] text-[#E8DCCA] text-xs font-black uppercase px-3 py-1.5 rounded-full shadow-lg border-2 border-white z-20">
                            {profile.galopLevel || 'G5'}
                        </div>
                        {/* Edit Button */}
                        <button
                            onClick={onEdit}
                            className="absolute top-1 -right-1 bg-white text-[#8C9E79] p-2.5 rounded-full shadow-md border hover:bg-gray-50 transition-colors z-20"
                        >
                            <Edit2 size={16} />
                        </button>
                    </div>

                    <h1 className="font-serif text-3xl font-bold mt-3 text-[#8C9E79] drop-shadow-sm leading-none">
                        {profile.userName || 'Cavalier'}
                    </h1>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-bold mt-1 mb-3">
                        Membre depuis 2024
                    </p>

                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-5 py-2 bg-white border border-[#8C9E79]/10 rounded-full shadow-sm text-xs font-bold text-[#8C9E79] uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors"
                    >
                        <Edit2 size={12} /> Modifier mon profil
                    </button>
                </div>

                {/* 2. MAIN STATS ROW - The "Gamified" feel */}
                <div className="grid grid-cols-2 gap-4 px-4">
                    <StatCard
                        icon={<Trophy size={16} />}
                        value={profile.stats?.sessionsCompleted || 0}
                        label="Séances"
                    />
                    <StatCard
                        icon={<Activity size={16} />}
                        value={`${Math.round((profile.stats?.totalMinutes || 0) / 60)}h`}
                        label="Pratique"
                    />
                </div>

                {/* 3. CHOICE & PARTNER (Moved Up) - Editorial Style Selector */}
                {profile.horses && profile.horses.length > 1 && (
                    <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar px-4 mt-4 items-baseline">
                        {profile.horses.map(horse => (
                            <button
                                key={horse.id}
                                onClick={() => onSwitchHorse(horse.id)}
                                className={`group flex flex-col items-center gap-1 transition-all ${activeHorse?.id === horse.id
                                    ? 'opacity-100 scale-105'
                                    : 'opacity-70 hover:opacity-100 scale-95'
                                    }`}
                            >
                                <span className={`font-serif text-lg font-bold uppercase tracking-widest transition-colors ${activeHorse?.id === horse.id ? 'text-[#8C9E79]' : 'text-[#8C9E79]/50'}`}>
                                    {horse.name}
                                </span>
                                <div className={`h-0.5 rounded-full bg-[#8C9E79] transition-all duration-300 ${activeHorse?.id === horse.id ? 'opacity-100 w-full mt-1' : 'opacity-0 w-0'}`}></div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Partner Card - REFINED STYLE */}
                <div className="bg-[#8C9E79] text-[#FDF6E3] rounded-[2.5rem] p-6 shadow-[0_20px_40px_rgba(140,158,121,0.3)] relative overflow-hidden group border border-white/10 z-20">
                    <div className="absolute -right-4 -bottom-8 text-[10rem] font-serif opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity rotate-12">
                        {activeHorse?.name ? activeHorse.name.charAt(0) : 'H'}
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                        <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 rounded-full text-white/80 backdrop-blur-sm">
                                    Partenaire
                                </span>
                                <button
                                    onClick={() => setShowHealthBook(true)}
                                    className="flex items-center gap-1.5 bg-[#FDF6E3] text-[#8C9E79] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-transform"
                                >
                                    <Activity size={12} /> Carnet
                                    {/* Petit point rouge si alerte */}
                                    <span className="w-1.5 h-1.5 bg-[#C17C74] rounded-full animate-pulse"></span>
                                </button>
                            </div>
                            <h2 className="font-serif font-black text-4xl text-white leading-[0.9] tracking-tight drop-shadow-sm">
                                {activeHorse?.name || 'Votre Cheval'}
                            </h2>
                            <div className="flex gap-2 mt-4">
                                <Badge text={`${activeHorse?.age || '?'} Ans`} />
                                <Badge text={activeHorse?.color || 'Robe'} />
                            </div>
                        </div>

                        {/* PHOTO CHEVAL - CERCLE (Instagram Style) */}
                        <div className="w-28 h-28 rounded-full bg-[#5C5C5C] shadow-lg overflow-hidden relative shrink-0 -mr-2 group-hover:scale-105 transition-transform duration-500 block">
                            <img src={activeHorse?.image || '/my_horse.jpg'} alt="Cheval" className="absolute inset-0 w-full h-full object-cover object-center" />

                            {/* Edit Icon - Discreet Overlay */}
                            <div className="absolute bottom-2 right-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white/80 hover:bg-[#C17C74] hover:text-white transition-colors cursor-pointer" onClick={onEdit}>
                                <Edit2 size={10} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6 relative z-10">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1 font-sans">Tempérament</p>
                            <p className="font-serif font-bold text-xl leading-tight">
                                {Array.isArray(activeHorse?.temperament)
                                    ? activeHorse.temperament.join(' / ')
                                    : (activeHorse?.temperament || 'Non défini')}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1 font-sans">Points clés</p>
                            <div className="flex flex-wrap gap-1.5">
                                {activeHorse?.issues && activeHorse.issues.length > 0 ? (
                                    activeHorse.issues.slice(0, 2).map(issue => (
                                        <span key={issue} className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/5">{issue}</span>
                                    ))
                                ) : (
                                    <p className="text-[10px] italic text-white/50 font-serif">À compléter...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* HEALTH STATUS BANNER - RESTORED & REFINED */}
                <button
                    onClick={() => setShowHealthBook(true)}
                    className="w-[95%] mx-auto -mt-10 bg-[#FDF6E3] border-x border-b border-[#8C9E79]/20 rounded-b-[2.5rem] p-4 pt-12 flex items-center justify-between shadow-sm hover:bg-[#FDF6E3]/80 transition-all group relative z-10 animate-in slide-in-from-top-4 duration-700"
                >
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-[#C17C74] text-white p-1.5 rounded-full animate-pulse shadow-sm">
                            <AlertCircle size={14} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-[#C17C74] uppercase tracking-wide">1 Soin en retard</p>
                            <p className="text-[10px] text-[#8C9E79] font-medium leading-none mt-0.5">Maréchal-ferrant • Cliquez pour gérer</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white text-[#8C9E79] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <ChevronRight size={16} />
                    </div>
                </button>

                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl transition-all duration-500">
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-serif font-bold text-lg text-[#8C9E79] flex items-center gap-2">
                                <Activity size={18} className="text-[#8C9E79]" /> Tableau de Bord
                            </h3>
                            {/* Time Range Selector */}
                            {/* Time Range Selector - Compact Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)}
                                    className="w-8 h-8 rounded-full bg-[#EAEAE0] flex items-center justify-center text-[#8C9E79] hover:bg-[#8C9E79] hover:text-white transition-all shadow-sm"
                                >
                                    <Calendar size={14} />
                                </button>

                                {isTimeMenuOpen && (
                                    <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-[#8C9E79]/20 py-2 w-32 z-20 animate-in fade-in zoom-in-95 duration-200">
                                        {['7d', '1m', '3m', '6m', '1y'].map(range => (
                                            <button
                                                key={range}
                                                onClick={() => {
                                                    setTimeRange(range);
                                                    setIsTimeMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-[#FAF7F2] transition-colors ${timeRange === range ? 'text-[#8C9E79] bg-[#8C9E79]/5' : 'text-gray-400'
                                                    }`}
                                            >
                                                {range === '7d' ? '7 Jours' :
                                                    range === '1m' ? '1 Mois' :
                                                        range === '3m' ? '3 Mois' :
                                                            range === '6m' ? '6 Mois' : '1 An'}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-[#8C9E79]/40 tracking-wider -mt-3">
                            {getTimeRangeLabel()}
                        </p>
                    </div>

                    {/* Stats Mensuelles Dynamiques */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#FAF7F2] p-3 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#8C9E79]/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500"></div>
                            <span className="text-3xl font-serif font-black text-[#8C9E79] z-10">{displayStats.count}</span>
                            <span className="text-[9px] uppercase font-bold text-[#8C9E79]/60 z-10">Séances</span>
                        </div>
                        <div className="bg-[#FAF7F2] p-3 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#8C9E79]/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500"></div>
                            <span className="text-3xl font-serif font-black text-[#8C9E79] z-10">{displayStats.hours}h</span>
                            <span className="text-[9px] uppercase font-bold text-[#8C9E79]/60 z-10">Pratique</span>
                        </div>
                    </div>

                    {/* 3. REPARTITION DU TRAVAIL (Welfare Focus) - DYNAMIQUE */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[#8C9E79]/70 flex items-center gap-2">
                                <Layout size={14} /> Répartition
                            </h3>
                        </div>

                        {stats.count > 0 ? (
                            <>
                                {/* Distribution Bar */}
                                <div className="flex h-5 w-full rounded-full overflow-hidden shadow-sm mb-3">
                                    <div className="h-full bg-[#8C9E79] transition-all duration-1000" style={{ width: `${dist.plat}%` }}></div>
                                    <div className="h-full bg-[#C17C74] transition-all duration-1000" style={{ width: `${dist.obstacle}%` }}></div>
                                    <div className="h-full bg-[#E8DCCA] transition-all duration-1000" style={{ width: `${dist.exterieur}%` }}></div>
                                </div>

                                {/* Legend */}
                                <div className="flex justify-between px-1">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#8C9E79]"></div>
                                        <span className="text-[9px] font-bold text-equi-olive">Plat {dist.plat}%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#C17C74]"></div>
                                        <span className="text-[9px] font-bold text-equi-olive">Saut {dist.obstacle}%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#E8DCCA]"></div>
                                        <span className="text-[9px] font-bold text-equi-olive">Ext {dist.exterieur}%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-xs text-black/30 italic py-2">Pas assez de données</p>
                        )}
                    </div>
                </div>

                {/* 4.5. FAVORIS (Nouvelle Section) */}
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif font-bold text-lg text-[#8C9E79] flex items-center gap-2">
                            <Star size={18} fill="#8C9E79" className="text-[#8C9E79]" /> Mes Favoris
                        </h3>
                        <span className="text-[10px] font-black uppercase text-[#8C9E79]/40">{MOCK_FAVORITES.length} SÉANCES</span>
                    </div>

                    <div className="space-y-3">
                        {(isFavoritesExpanded ? MOCK_FAVORITES : MOCK_FAVORITES.slice(0, 3)).map((fav) => (
                            <div key={fav.id} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-[#8C9E79]/10 group">
                                <div className="w-10 h-10 rounded-xl bg-[#8C9E79]/10 flex items-center justify-center text-[#8C9E79]">
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-xs text-equi-olive leading-tight truncate">{fav.nom}</h4>
                                    <p className="text-[9px] uppercase tracking-wider text-[#8C9E79]/60 mt-0.5">
                                        {fav.discipline} • {fav.duree}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onPlay && onPlay(fav)}
                                    className="w-8 h-8 rounded-full bg-[#8C9E79] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
                                >
                                    <Play size={14} fill="currentColor" className="ml-0.5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {MOCK_FAVORITES.length > 3 && (
                        <button
                            onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
                            className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#8C9E79] hover:bg-[#8C9E79]/5 rounded-xl transition-colors flex items-center justify-center gap-1"
                        >
                            {isFavoritesExpanded ? 'Réduire' : 'Voir tous mes favoris'}
                        </button>
                    )}
                </div>

                {/* Timeline Historique Dynamique */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="font-black text-[#8C9E79] uppercase text-xs tracking-widest opacity-50">Activités ({filteredHistoryFull.length})</h4>
                        {/* Indicateur de filtre actif pour la liste */}
                        <span className="text-[9px] font-bold text-[#8C9E79]/40">{getTimeRangeLabel()}</span>
                    </div>

                    <div className="relative">
                        {displayHistory.length > 0 ? (
                            <div className="space-y-0">
                                {displayHistory.map((log, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-[#8C9E79]/10 last:border-0 animate-in slide-in-from-right-2 duration-300">
                                        <div className="text-center w-12 shrink-0">
                                            <span className="block text-[10px] font-black uppercase text-[#8C9E79]/60">{log.date}</span>
                                        </div>
                                        <div className="px-1 relative">
                                            <div className="w-2 h-2 rounded-full bg-[#8C9E79]"></div>
                                            {/* Ligne connecteur excepté pour le tout dernier si on voit tout, ou juste pour faire joli */}
                                            <div className="absolute top-3 left-0.5 w-0.5 h-full bg-[#8C9E79]/20 -z-10"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-bold text-equi-clay leading-tight">{log.title}</h5>
                                            <p className="text-[10px] font-medium text-[#8C9E79]/70 mt-0.5">
                                                {log.duration} min • {log.type}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-[#FAF7F2] rounded-2xl border border-[#8C9E79]/5">
                                <p className="text-sm font-serif italic text-[#8C9E79]/50">Aucune activité sur cette période.</p>
                            </div>
                        )}

                        {/* Bouton Voir Tout (si plus de 3 items) */}
                        {filteredHistoryFull.length > 3 && (
                            <button
                                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#8C9E79] hover:bg-[#8C9E79]/5 rounded-xl transition-colors flex items-center justify-center gap-1 group"
                            >
                                {isHistoryExpanded ? 'Réduire la liste' : `Voir l'historique complet (+${filteredHistoryFull.length - 3})`}
                                <div className={`transition-transform duration-300 ${isHistoryExpanded ? 'rotate-180' : ''}`}>▼</div>
                            </button>
                        )}
                    </div>
                </div>

                {/* 5. SUIVI QUALITATIF (Radar & Analyse) */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h3 className="font-serif font-bold text-lg text-[#8C9E79] flex items-center gap-2">
                                <Activity size={18} className="text-[#C17C74]" /> Progression
                            </h3>
                            <span className="text-[10px] uppercase font-bold text-[#8C9E79]/60">Technique</span>
                        </div>

                        {/* RADAR CHART (CSS Pur) */}
                        <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-8">
                            {/* Grille Radar Hexagonale */}
                            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#8C9E79" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="30" fill="none" stroke="#8C9E79" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="#8C9E79" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="10" fill="none" stroke="#8C9E79" strokeWidth="0.5" />
                                {/* Axes */}
                                <line x1="50" y1="50" x2="50" y2="10" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="90" y2="50" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="50" y2="90" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="10" y2="50" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="22" y2="22" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="78" y2="78" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="78" y2="22" stroke="#8C9E79" strokeWidth="0.5" />
                                <line x1="50" y1="50" x2="22" y2="78" stroke="#8C9E79" strokeWidth="0.5" />
                            </svg>

                            {/* Forme du Radar (Mock Data) */}
                            {/* Impulsion (80%), Tracé (60%), Equilibre (70%), Connexion (50%), Mental (90%) */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                                <polygon
                                    points="50,18 74,50 64,78 36,78 26,50"
                                    fill="rgba(140, 158, 121, 0.5)"
                                    stroke="#8C9E79"
                                    strokeWidth="1.5"
                                />
                                {/* Points Labels (Absolut Positioned outside SVG usually, but kept simple here) */}
                            </svg>

                            {/* Labels simples */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[8px] font-bold text-[#8C9E79] bg-white/80 px-1 rounded">Impulsion</div>
                            <div className="absolute top-1/2 right-0 translate-x-3 -translate-y-1/2 text-[8px] font-bold text-[#8C9E79] bg-white/80 px-1 rounded">Tracé</div>
                            <div className="absolute bottom-4 right-2 text-[8px] font-bold text-[#8C9E79] bg-white/80 px-1 rounded">Equilibre</div>
                            <div className="absolute bottom-4 left-2 text-[8px] font-bold text-[#8C9E79] bg-white/80 px-1 rounded">Connexion</div>
                            <div className="absolute top-1/2 left-0 -translate-x-3 -translate-y-1/2 text-[8px] font-bold text-[#8C9E79] bg-white/80 px-1 rounded">Mental</div>
                        </div>

                        {/* ANALYSE DU COACH (IA) */}
                        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#8C9E79]/10">
                            <h4 className="font-bold text-[#8C9E79] text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Zap size={12} fill="currentColor" /> Analyse du Coach
                            </h4>

                            <div className="space-y-3">
                                {/* Point Fort */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-1 h-8 bg-green-400 rounded-full shrink-0 mt-1"></div>
                                    <div>
                                        <p className="text-xs font-bold text-[#5C5C5C]">Acquis: Transitions</p>
                                        <p className="text-[10px] text-[#8C9E79] leading-relaxed">
                                            L'impulsion est constante. Excellent travail.
                                        </p>
                                    </div>
                                </div>
                                {/* Point Faible */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-1 h-8 bg-orange-400 rounded-full shrink-0 mt-1"></div>
                                    <div>
                                        <p className="text-xs font-bold text-[#5C5C5C]">À travailler : Incurvation</p>
                                        <p className="text-[10px] text-[#8C9E79] leading-relaxed">
                                            Blocage détecté à main droite sur les cercles.
                                        </p>
                                        {/* Auto-Recommandation */}
                                        <button className="mt-2 text-[9px] font-bold text-white bg-[#8C9E79] px-3 py-1 rounded-full shadow-sm hover:bg-[#7A9170] transition-colors flex items-center gap-1">
                                            ➜ Voir la séance corrective
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </div>

            {/* HEALTH BOOK MODAL OVERLAY */}
            {showHealthBook && (
                <div className="fixed inset-0 z-[200] bg-[#FAF7F2] animate-in slide-in-from-bottom duration-300 flex flex-col">

                    {/* Header */}
                    <div className="bg-[#8C9E79] text-[#FDF6E3] p-6 pb-12 rounded-b-[2.5rem] shadow-xl relative shrink-0">
                        <button
                            onClick={() => setShowHealthBook(false)}
                            className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="mt-8 text-center pt-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Suivi Vétérinaire</span>
                            <h2 className="font-serif font-black text-3xl mt-1">Santé de {activeHorse?.name}</h2>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex justify-center gap-6 mt-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-2xl bg-[#C17C74] text-white flex items-center justify-center shadow-lg mb-2">
                                    <AlertCircle size={24} />
                                </div>
                                <span className="text-xs font-bold text-white/80">1 Alerte</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-2xl bg-[#E8DCCA] text-[#8C9E79] flex items-center justify-center shadow-lg mb-2">
                                    <CheckCircle2 size={24} />
                                </div>
                                <span className="text-xs font-bold text-white/80">3 À jour</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 -mt-6">

                        {/* URGENT ALERTS */}
                        <div className="bg-white rounded-3xl p-5 shadow-lg border-l-4 border-[#C17C74] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-50 text-[#C17C74] rounded-2xl shrink-0">
                                    <div className="font-serif font-black text-xl leading-none text-center">
                                        18
                                        <span className="block text-[8px] font-sans font-bold uppercase tracking-wider">Jan</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#C17C74] uppercase text-xs tracking-wider mb-1">Maréchal-Ferrant</h4>
                                    <p className="font-serif text-lg text-gray-800 leading-tight">Renouvellement ferrure</p>
                                    <p className="text-xs text-red-500 font-bold mt-1 flex items-center gap-1">
                                        <Clock size={12} /> Retard de 2 jours
                                    </p>
                                </div>
                                <button className="p-2 bg-[#FAF7F2] rounded-full text-[#C17C74] hover:bg-[#C17C74] hover:text-white transition-colors">
                                    <CheckCircle2 size={20} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-serif font-bold text-xl text-[#8C9E79] mb-4 flex items-center gap-2">
                            <Calendar size={20} /> Prochains Soins
                        </h3>

                        {/* UPCOMING CARE LIST */}
                        <div className="space-y-3 pb-24">
                            {/* Next Vaccine */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E1DA] flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-400 flex items-center justify-center shrink-0">
                                    <Syringe size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">Rappel Vaccin Grippe</h4>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Dans 2 mois</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">Dr. Vétérinaire Martin</p>
                                </div>
                            </div>

                            {/* Next Wormer */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E1DA] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                                    <Pill size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">Vermifuge Printemps</h4>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">15 Mars</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">Duo Equine</p>
                                </div>
                            </div>

                            {/* Osteo */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E1DA] flex items-center gap-4 opacity-60 grayscale">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-400 flex items-center justify-center shrink-0">
                                    <Bone size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">Visite Ostéo</h4>
                                        <span className="text-[10px] font-bold text-gray-400">Non programmé</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">Recommandé en Juin</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button for Adding Care */}
                        <button className="fixed bottom-8 right-6 w-14 h-14 bg-[#8C9E79] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20">
                            <Plus size={28} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-components
function StatCard({ icon, value, label, highlight = false }) {
    return (
        <div className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-1 shadow-md border 
            ${highlight ? 'bg-[#8C9E79] text-[#E8DCCA] border-[#8C9E79]' : 'bg-white text-[#8C9E79] border-white/50'}`}>
            <div className={`opacity-80 mb-1 ${highlight ? 'text-[#E8DCCA]' : 'text-[#A4CFA4]'}`}>
                {icon}
            </div>
            <span className="font-black text-xl leading-none">{value}</span>
            <span className="text-[8px] uppercase tracking-wider font-bold opacity-60">{label}</span>
        </div>
    );
}

function Badge({ text }) {
    return (
        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-bold text-white/80">
            {text}
        </span>
    );
}
