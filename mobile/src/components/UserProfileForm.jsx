import React, { useState } from 'react';
import { User, Award, Target, Save, CheckCircle2, Trophy, Settings, MapPin, Plus, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

export default function UserProfileForm({ profile, onSave, onReset }) {
    const [formData, setFormData] = useState({
        ...profile,
        primaryObjectives: profile.primaryObjectives || [],
        facilities: profile.facilities || [],
        equipment: profile.equipment || [], // New Category
        horses: profile.horses || (profile.horseName ? [{
            id: Date.now(),
            name: profile.horseName,
            age: profile.horseAge || '',
            color: profile.horseColor || 'Bai',
            temperament: profile.horseTemperament || 'Calme',
            issues: profile.horseIssues || []
        }] : [])
    });

    const [editingHorseId, setEditingHorseId] = useState(null);
    const [tempHorse, setTempHorse] = useState(null); // Horse being edited/added

    const [isSaved, setIsSaved] = useState(false);

    // États pour les ajouts personnalisés
    const [newObjective, setNewObjective] = useState('');
    const [newFacility, setNewFacility] = useState('');
    const [newEquipment, setNewEquipment] = useState('');
    const [isAddingObjective, setIsAddingObjective] = useState(false);
    const [isAddingFacility, setIsAddingFacility] = useState(false);
    const [isAddingEquipment, setIsAddingEquipment] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const levels = ['G1-2', 'G3-4', 'G4-5', 'G5-6', 'G6-7', 'G7+'];

    // Listes de base RESTUCTURÉES ET COMPLÈTES
    const [availableObjectives, setAvailableObjectives] = useState([
        'Progresser Techniquement', 'Sortir en Compétition', 'Plaisir & Balades',
        'Travail à Pied & Connexion', 'Éducation Jeune Cheval', 'Reprendre Confiance',
        'Soins & Bien-être'
    ]);

    const [availableFacilities, setAvailableFacilities] = useState([
        'Carrière', 'Manège', 'Rond de Longe', 'Terrain de Cross',
        'Chemins de Balade', 'Piste de Galop'
    ]);

    const [availableEquipment, setAvailableEquipment] = useState([
        'Barres & Chandeliers', 'Lettres de Dressage', 'Plots & Cônes',
        'Cubes & Cavalettis', 'Soubassements & Bidets', 'Miroirs'
    ]);

    const temperaments = [
        { id: 'Calme', label: 'Calme', bg: 'bg-[#8C9E79]', text: 'text-white' },
        { id: 'Énergique', label: 'Énergique', bg: 'bg-[#E8DCCA]', text: 'text-[#8C9E79]' },
        { id: 'Mou', label: 'Mou', bg: 'bg-white/50', text: 'text-[#8C9E79]' },
        { id: 'Chaud', label: 'Chaud', bg: 'bg-[#8C9E79]', text: 'text-white' },
        { id: 'Sensible', label: 'Sensible', bg: 'bg-[#B5C1B5]', text: 'text-[#8C9E79]' },
    ];

    const issues = ['Raideur', 'Manque d\'impulsion', 'Précipite', 'Tire sur la main', 'Déséquilibre', 'Stress', 'Moniteur de club', 'Distrait', 'Lourd'];
    const activeIssues = issues; // Alias for cleaner usage if needed

    const handleToggle = (list, item, field) => {
        const currentList = list || [];
        const newList = currentList.includes(item)
            ? currentList.filter(i => i !== item)
            : [...currentList, item];
        setFormData({ ...formData, [field]: newList });
    };

    const handleAddItem = (e, type) => {
        e.preventDefault();
        if (type === 'objective' && newObjective.trim()) {
            setAvailableObjectives([...availableObjectives, newObjective.trim()]);
            handleToggle(formData.primaryObjectives, newObjective.trim(), 'primaryObjectives');
            setNewObjective('');
            setIsAddingObjective(false);
        } else if (type === 'facility' && newFacility.trim()) {
            setAvailableFacilities([...availableFacilities, newFacility.trim()]);
            handleToggle(formData.facilities, newFacility.trim(), 'facilities');
            setNewFacility('');
            setIsAddingFacility(false);
        } else if (type === 'equipment' && newEquipment.trim()) {
            setAvailableEquipment([...availableEquipment, newEquipment.trim()]);
            handleToggle(formData.equipment, newEquipment.trim(), 'equipment');
            setNewEquipment('');
            setIsAddingEquipment(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleSaveHorse = () => {
        if (!tempHorse.name) return;

        let updatedHorses;
        if (editingHorseId === 'new') {
            updatedHorses = [...formData.horses, { ...tempHorse, id: Date.now() }];
        } else {
            updatedHorses = formData.horses.map(h => h.id === editingHorseId ? tempHorse : h);
        }

        setFormData({ ...formData, horses: updatedHorses });
        setEditingHorseId(null);
        setTempHorse(null);
    };

    const handleDeleteHorse = (id) => {
        setFormData({ ...formData, horses: formData.horses.filter(h => h.id !== id) });
    };

    const startEditHorse = (horse) => {
        setEditingHorseId(horse ? horse.id : 'new');
        setCurrentStep(1); // Reset wizard
        setTempHorse(horse ? { ...horse } : {
            name: '', age: '', color: 'Bai', temperament: 'Calme', issues: []
        });
    };

    const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : 'EC';

    return (
        <div className="min-h-screen font-sans pb-32 relative overflow-hidden">

            {/* BACKGROUND ARTISTIC - "Nature Punchy" (Gradient Mesh) */}
            {/* BACKGROUND - PAPIER PEINT "TOILE DE JOUY" */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAF7F2]">
                {/* Image Illustration répétée ou cover */}
                <div
                    className="absolute inset-0 opacity-25 mix-blend-multiply"
                    style={{
                        backgroundImage: `url('/bg-pattern.png')`,
                        backgroundSize: '250px', // Taille ajustée pour voir le motif
                        backgroundRepeat: 'repeat'
                    }}
                ></div>

                {/* Overlay Cream/Warm pour adoucir le contraste */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/20 via-[#FDFBF7]/60 to-[#FDFBF7]/90 backdrop-blur-[0px]"></div>
            </div>

            {/* Form Wrapper */}
            <form onSubmit={handleSubmit} className="relative z-10 min-h-screen">

                {/* HEADER & RIDER PASSPORT */}
                <div className="relative px-6 pt-8 pb-6 animate-in slide-in-from-top duration-500">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <span className="text-[10px] font-bold text-[#8C9E79]/60 uppercase tracking-[0.2em]">Mon Espace</span>
                            <h1 className="font-serif font-black text-4xl text-[#8C9E79] leading-none mt-1">
                                Profil <br /><span className="italic font-light opacity-80">Rider</span>
                            </h1>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[#E8DCCA] border-2 border-white shadow-xl flex items-center justify-center text-[#8C9E79] font-serif font-bold text-2xl overflow-hidden relative">
                            {/* Conceptual Avatar Placeholder */}
                            {getInitials(formData.userName)}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#8C9E79]/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* RIDER CARD */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C9E79]/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                        {/* Name Input - Signature Style */}
                        <div className="mb-8 relative">
                            <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 tracking-wider mb-2 block flex items-center gap-2">
                                <User size={12} /> Votre Prénom
                            </label>
                            <input
                                type="text"
                                value={formData.userName}
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                placeholder="Entrez votre prénom..."
                                className="w-full bg-transparent border-b border-[#8C9E79]/20 text-3xl font-serif font-bold text-[#2C3E2C] placeholder:text-[#8C9E79]/20 focus:outline-none focus:border-[#8C9E79] px-0 py-2 transition-all"
                            />
                        </div>

                        {/* Level Selection - Horizontal Scroll */}
                        <div>
                            <label className="text-[10px] uppercase font-bold text-[#C17C74] tracking-wider mb-3 block flex items-center gap-2">
                                <Award size={12} /> Niveau de pratique
                            </label>
                            <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
                                {levels.map(level => {
                                    const isSelected = formData.galopLevel === level;
                                    return (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, galopLevel: level })}
                                            className={`snap-center shrink-0 px-5 py-4 rounded-2xl text-base font-serif font-bold border transition-all duration-300 flex flex-col items-center justify-center gap-1 min-w-[80px] ${isSelected
                                                ? 'bg-[#8C9E79] text-[#FDF6E3] border-[#8C9E79] shadow-[#8C9E79]/30 shadow-lg scale-105'
                                                : 'bg-white text-[#8C9E79]/60 border-[#8C9E79]/10 hover:border-[#8C9E79]/40'
                                                }`}
                                        >
                                            <Trophy size={16} className={`mb-1 ${isSelected ? 'text-[#C17C74] animate-bounce' : 'opacity-50'}`} />
                                            {level}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-32 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500 delay-150">

                    {/* Multi-Horse Management Section (Existing, but title refined) */}
                    <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white/40 relative overflow-hidden group">
                        <h3 className="text-xl font-serif font-bold text-[#8C9E79] mb-4 flex items-center justify-between">
                            <span>L'Écurie ({formData.horses?.length || 0})</span>
                            {!editingHorseId && (
                                <button
                                    type="button"
                                    onClick={() => startEditHorse(null)}
                                    className="bg-[#8C9E79] text-white p-2 rounded-full hover:bg-[#7A9170] transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            )}
                        </h3>

                        {editingHorseId ? (
                            /* EDIT MODE FOR HORSE - WIZARD WIZARD STYLE */
                            <div className="bg-white/90 p-5 rounded-[2rem] animate-in fade-in zoom-in duration-300 border border-[#8C9E79]/20 shadow-xl relative overflow-hidden">

                                {/* WIZARD HEADER with Progress */}
                                <div className="flex flex-col gap-4 mb-6 relative z-10">
                                    <div className="flex justify-between items-center border-b border-[#8C9E79]/10 pb-2">
                                        <div className="flex items-center gap-2">
                                            {currentStep > 1 && (
                                                <button onClick={() => setCurrentStep(prev => prev - 1)} className="p-1 rounded-full hover:bg-black/5 transition-colors">
                                                    <ChevronLeft size={20} className="text-[#8C9E79]" />
                                                </button>
                                            )}
                                            <h4 className="font-serif font-bold text-[#8C9E79] text-lg">
                                                {currentStep === 1 && "Identité"}
                                                {currentStep === 2 && "Apparence"}
                                                {currentStep === 3 && "Caractère"}
                                                {currentStep === 4 && "Santé & Travail"}
                                            </h4>
                                        </div>
                                        <button type="button" onClick={() => setEditingHorseId(null)} className="p-1 bg-[#FAF7F2] rounded-full hover:bg-red-50 group transition-colors">
                                            <X size={18} className="text-[#8C9E79]/50 group-hover:text-red-400" />
                                        </button>
                                    </div>

                                    {/* PROGRESS BAR */}
                                    <div className="flex gap-2 px-1">
                                        {[1, 2, 3, 4].map(step => (
                                            <div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step <= currentStep ? 'bg-[#8C9E79]' : 'bg-[#E5E1DA]'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-h-[320px] flex flex-col justify-between relative z-10">
                                    {/* STEP CONTENT SWITCH with Animation key */}
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-300 flex-1" key={currentStep}>

                                        {/* STEP 1: IDENTITÉ */}
                                        {currentStep === 1 && (
                                            <div className="space-y-5 pt-2">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 mb-1 block tracking-wider">Nom du cheval</label>
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={tempHorse.name}
                                                        onChange={(e) => setTempHorse({ ...tempHorse, name: e.target.value })}
                                                        className="w-full bg-[#FAF7F2] border-b-2 border-[#8C9E79]/20 rounded-t-xl px-4 py-4 text-2xl font-serif font-black text-[#8C9E79] focus:outline-none focus:border-[#8C9E79] placeholder:text-[#8C9E79]/20 transition-all"
                                                        placeholder="Ex: Cirius"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 mb-1 block tracking-wider">Âge</label>
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                value={tempHorse.age}
                                                                onChange={(e) => setTempHorse({ ...tempHorse, age: e.target.value })}
                                                                className="w-full bg-white border border-[#8C9E79]/20 rounded-xl px-4 py-3 text-[#8C9E79] font-bold focus:outline-none focus:ring-2 focus:ring-[#8C9E79]/20"
                                                                placeholder="8"
                                                            />
                                                            <span className="absolute right-3 top-3.5 text-[10px] font-bold text-[#8C9E79]/40">ANS</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 mb-1 block tracking-wider">Taille</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={tempHorse.height || ''}
                                                                onChange={(e) => setTempHorse({ ...tempHorse, height: e.target.value })}
                                                                className="w-full bg-white border border-[#8C9E79]/20 rounded-xl px-4 py-3 text-[#8C9E79] font-bold focus:outline-none focus:ring-2 focus:ring-[#8C9E79]/20"
                                                                placeholder="1.65"
                                                            />
                                                            <span className="absolute right-3 top-3.5 text-[10px] font-bold text-[#8C9E79]/40">M</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 mb-1 block tracking-wider">Race / Origines</label>
                                                    <input
                                                        type="text"
                                                        value={tempHorse.race || ''}
                                                        onChange={(e) => setTempHorse({ ...tempHorse, race: e.target.value })}
                                                        className="w-full bg-white border border-[#8C9E79]/20 rounded-xl px-4 py-3 text-[#8C9E79] font-medium focus:outline-none focus:ring-2 focus:ring-[#8C9E79]/20 placeholder:text-[#8C9E79]/30"
                                                        placeholder="Ex: Selle Français, PRE..."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: PHYSIQUE (ROBE) */}
                                        {currentStep === 2 && (
                                            <div className="space-y-6 pt-4 text-center">
                                                <h5 className="font-serif text-xl font-bold text-[#8C9E79] mb-4">Quelle est sa robe ?</h5>
                                                <div className="flex flex-wrap justify-center gap-4">
                                                    {[
                                                        { id: 'Bai', color: '#5C4033' },
                                                        { id: 'Alezan', color: '#8D5524' },
                                                        { id: 'Noir', color: '#2C2C2C' },
                                                        { id: 'Gris', color: '#B0B0B0' },
                                                        { id: 'Blanc', color: '#F0F0F0' },
                                                        { id: 'Pie', color: 'bg-gradient-to-r from-white via-black to-white' },
                                                        { id: 'Isabelle', color: '#C2B280' },
                                                        { id: 'Crème', color: '#F5E6CC' }
                                                    ].map((coat) => (
                                                        <button
                                                            key={coat.id}
                                                            type="button"
                                                            onClick={() => setTempHorse({ ...tempHorse, color: coat.id })}
                                                            className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${tempHorse.color === coat.id ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                                                        >
                                                            <div
                                                                className={`w-12 h-12 rounded-full shadow-lg border-2 transition-all ${tempHorse.color === coat.id ? 'border-[#8C9E79] ring-4 ring-[#8C9E79]/20' : 'border-white'}`}
                                                                style={{ background: coat.color.includes('gradient') ? undefined : coat.color }}
                                                            >
                                                                {coat.color.includes('gradient') && <div className={`w-full h-full rounded-full ${coat.color}`}></div>}
                                                            </div>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9E79]">{coat.id}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="pt-6 border-t border-[#8C9E79]/10 w-3/4 mx-auto">
                                                    <label className="text-[10px] uppercase font-bold text-[#8C9E79]/60 mb-2 block">Autre couleur ?</label>
                                                    <input
                                                        type="text"
                                                        value={['Bai', 'Alezan', 'Noir', 'Gris', 'Blanc', 'Pie', 'Isabelle', 'Crème'].includes(tempHorse.color) ? '' : tempHorse.color}
                                                        placeholder="Taper ici..."
                                                        className="bg-transparent border-b-2 border-[#8C9E79]/30 text-center text-sm font-bold text-[#8C9E79] focus:border-[#8C9E79] outline-none py-1 w-full"
                                                        onChange={(e) => setTempHorse({ ...tempHorse, color: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: MENTAL */}
                                        {currentStep === 3 && (
                                            <div className="space-y-4 pt-2">
                                                <div className="text-center mb-4">
                                                    <h5 className="font-serif text-xl font-bold text-[#8C9E79]">Son tempérament</h5>
                                                    <p className="text-xs text-[#8C9E79]/60 mt-1">Sélectionnez tous les traits qui s'appliquent</p>
                                                </div>

                                                <div className="flex flex-wrap justify-center gap-2.5">
                                                    {[
                                                        'Calme', 'Énergique', 'Mou', 'Chaud', 'Sensible', 'Curieux', 'Peureux', 'Dominant', 'Volontaire', 'Blasé'
                                                    ].map(trait => {
                                                        const currentTraits = Array.isArray(tempHorse.temperament)
                                                            ? tempHorse.temperament
                                                            : (tempHorse.temperament ? [tempHorse.temperament] : []);
                                                        const isSelected = currentTraits.includes(trait);
                                                        return (
                                                            <button
                                                                key={trait}
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = isSelected
                                                                        ? currentTraits.filter(t => t !== trait)
                                                                        : [...currentTraits, trait];
                                                                    setTempHorse({ ...tempHorse, temperament: updated });
                                                                }}
                                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${isSelected
                                                                    ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-lg scale-105'
                                                                    : 'bg-white border-[#FDF6E3] text-[#8C9E79]/70 hover:border-[#8C9E79]/30 hover:text-[#8C9E79]'
                                                                    }`}
                                                            >
                                                                {trait}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Custom Trait */}
                                                <div className="mt-6 flex justify-center">
                                                    <div className="relative flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-[#8C9E79]/20 w-3/4">
                                                        <Plus size={14} className="text-[#8C9E79]" />
                                                        <input
                                                            type="text"
                                                            placeholder="Ajouter un trait..."
                                                            className="ml-2 w-full bg-transparent text-xs text-[#8C9E79] font-bold outline-none placeholder:text-[#8C9E79]/30"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                                    e.preventDefault();
                                                                    const currentTraits = Array.isArray(tempHorse.temperament) ? tempHorse.temperament : (tempHorse.temperament ? [tempHorse.temperament] : []);
                                                                    setTempHorse({ ...tempHorse, temperament: [...currentTraits, e.target.value.trim()] });
                                                                    e.target.value = '';
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 4: SANTÉ & FINALISATION */}
                                        {currentStep === 4 && (
                                            <div className="space-y-4 pt-2">
                                                <div className="text-center mb-4">
                                                    <h5 className="font-serif text-xl font-bold text-[#8C9E79]">Points de vigilance</h5>
                                                    <p className="text-xs text-[#8C9E79]/60 mt-1">Y a-t-il des particularités physiques ou santé ?</p>
                                                </div>

                                                <div className="bg-[#white]/40 rounded-2xl p-4 border border-[#8C9E79]/10 min-h-[150px]">
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {activeIssues.map(issue => (
                                                            <button
                                                                key={issue}
                                                                type="button"
                                                                onClick={() => {
                                                                    const current = tempHorse.issues || [];
                                                                    const updated = current.includes(issue) ? current.filter(i => i !== issue) : [...current, issue];
                                                                    setTempHorse({ ...tempHorse, issues: updated });
                                                                }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${tempHorse.issues?.includes(issue)
                                                                    ? 'bg-[#C17C74] text-white shadow-md'
                                                                    : 'bg-white text-[#8C9E79]/60 hover:bg-[#8C9E79]/10'}`}
                                                            >
                                                                {issue}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {/* Custom Issue */}
                                                    <input
                                                        type="text"
                                                        placeholder="+ Ajouter autre point..."
                                                        className="w-full bg-transparent border-b border-[#8C9E79]/20 py-2 text-xs font-bold text-[#8C9E79] placeholder:text-[#8C9E79]/40 outline-none focus:border-[#C17C74]"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                                e.preventDefault();
                                                                const currentIssues = tempHorse.issues || [];
                                                                setTempHorse({ ...tempHorse, issues: [...currentIssues, e.target.value.trim()] });
                                                                e.target.value = '';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* NAVIGATION FOOTER - REFINED */}
                                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#8C9E79]/10">
                                        <div className="text-[10px] font-bold text-[#8C9E79]/40 uppercase tracking-widest">
                                            Étape {currentStep} / 4
                                        </div>

                                        {currentStep < 4 ? (
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(prev => prev + 1)}
                                                disabled={!tempHorse.name && currentStep === 1}
                                                className="bg-[#8C9E79] text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#7A9170] hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                                            >
                                                Suivant <ChevronRight size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleSaveHorse}
                                                className="bg-[#8C9E79] text-white px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#7A9170] hover:scale-105 transition-all flex items-center gap-2 animate-pulse"
                                            >
                                                <CheckCircle2 size={16} /> Terminer
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Decorative Background Icon */}
                                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none rotate-12">
                                    <Trophy size={200} />
                                </div>
                            </div>
                        ) : (
                            /* LIST MODE */
                            <div className="space-y-3">
                                {formData.horses && formData.horses.length > 0 ? (
                                    formData.horses.map((horse, index) => {
                                        return (
                                            <div key={horse.id} className="relative group animate-in slide-in-from-right duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                                <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#8C9E79]/10 flex items-center gap-4 transition-all hover:shadow-md hover:border-[#8C9E79]/30">
                                                    {/* Avatar Cheval */}
                                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-white shadow-sm overflow-hidden flex-shrink-0 relative">
                                                        {/* Si une image existe on l'affiche, sinon initiale */}
                                                        <div className="w-full h-full flex items-center justify-center bg-[#8C9E79]/5 text-[#8C9E79] font-serif font-bold text-xl">
                                                            {horse.name.substring(0, 1)}
                                                        </div>
                                                    </div>

                                                    {/* Info Cheval */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-serif font-bold text-lg text-[#2C3E2C] truncate leading-tight">{horse.name}</h4>
                                                            <div className="flex gap-1">
                                                                <button type="button" onClick={() => startEditHorse(horse)} className="p-2 bg-white rounded-full shadow-sm text-[#8C9E79] hover:bg-[#8C9E79] hover:text-white transition-colors">
                                                                    <Settings size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold uppercase tracking-wide text-[#8C9E79]/60">
                                                            <span className="bg-white px-2 py-0.5 rounded-lg border border-[#8C9E79]/10">{horse.age ? `${horse.age} ANS` : '-'}</span>
                                                            <span className="truncate max-w-[100px]">{horse.breed || 'Cheval'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-6 opacity-50 text-[#8C9E79] text-sm italic">
                                        Aucun cheval enregistré. Ajoutez votre partenaire !
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Objectives & Facilities - REIMAGINED */}
                    <div className="space-y-6">
                        {/* AMBITION SECTION */}
                        <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 shadow-lg border border-[#8C9E79]/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#8C9E79] text-[#FAF7F2] flex items-center justify-center shadow-md">
                                    <Target size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-xl text-[#2C3E2C]">Vos Ambitions</h3>
                                    <p className="text-[10px] uppercase text-[#C17C74] font-bold tracking-wider">Pourquoi montez-vous ?</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {availableObjectives.map(obj => {
                                    const active = formData.primaryObjectives.includes(obj);
                                    return (
                                        <button
                                            key={obj}
                                            type="button"
                                            onClick={() => handleToggle(formData.primaryObjectives, obj, 'primaryObjectives')}
                                            className={`relative p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden ${active
                                                ? 'bg-[#8C9E79] text-[#FAF7F2] shadow-xl translate-y-[-2px]'
                                                : 'bg-white text-gray-500 hover:bg-white/80 shadow-sm'}`}
                                        >
                                            <div className={`text-sm font-bold font-serif mb-1 ${active ? 'text-white' : 'text-gray-700'}`}>{obj}</div>
                                            <div className={`h-1 w-8 rounded-full ${active ? 'bg-[#C17C74]' : 'bg-gray-200'}`}></div>
                                            {active && <div className="absolute top-2 right-2 text-[#C17C74]"><CheckCircle2 size={16} /></div>}
                                        </button>
                                    );
                                })}
                                {/* Add Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsAddingObjective(true)}
                                    className="border-2 border-dashed border-[#8C9E79]/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-[#8C9E79] hover:bg-[#8C9E79]/5 transition-colors"
                                >
                                    <Plus size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Autre</span>
                                </button>
                            </div>
                            {/* Input for new objective */}
                            {isAddingObjective && (
                                <form onSubmit={(e) => handleAddItem(e, 'objective')} className="mt-4 animate-in fade-in">
                                    <input
                                        autoFocus
                                        className="w-full bg-white border border-[#8C9E79] rounded-xl px-4 py-3 text-sm font-bold text-[#8C9E79] outline-none shadow-lg"
                                        placeholder="Saissisez votre objectif..."
                                        value={newObjective}
                                        onChange={(e) => setNewObjective(e.target.value)}
                                        onBlur={() => !newObjective && setIsAddingObjective(false)}
                                    />
                                </form>
                            )}
                        </div>


                        {/* FACILITIES SECTION - UPDATED TO GRID CARDS */}
                        <div className="bg-white rounded-[2.5rem] p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#E8DCCA] text-[#8C9E79] flex items-center justify-center shadow-md">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-xl text-[#2C3E2C]">L'Environnement</h3>
                                    <p className="text-[10px] uppercase text-[#C17C74] font-bold tracking-wider">Où montez-vous ?</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {availableFacilities.map(fac => {
                                    const active = (formData.facilities || []).includes(fac);
                                    return (
                                        <button
                                            key={fac}
                                            type="button"
                                            onClick={() => handleToggle(formData.facilities, fac, 'facilities')}
                                            className={`relative p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden border ${active
                                                ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-lg translate-y-[-2px]'
                                                : 'bg-white text-gray-500 border-gray-100 hover:border-[#8C9E79]/30 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="font-serif font-bold text-sm mb-1 z-10 relative">{fac}</div>
                                            {active && <div className="absolute top-2 right-2 text-[#C17C74]"><CheckCircle2 size={14} /></div>}
                                        </button>
                                    );
                                })}
                                <button
                                    type="button"
                                    onClick={() => setIsAddingFacility(true)}
                                    className="border-2 border-dashed border-[#8C9E79]/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-[#8C9E79] hover:bg-[#8C9E79]/5 transition-colors"
                                >
                                    <Plus size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Autre</span>
                                </button>
                            </div>
                            {isAddingFacility && (
                                <form onSubmit={(e) => handleAddItem(e, 'facility')} className="mt-4 animate-in fade-in">
                                    <input
                                        autoFocus
                                        className="w-full bg-[#FAF7F2] border border-[#8C9E79] rounded-xl px-4 py-3 text-sm font-bold text-[#8C9E79] outline-none shadow-lg font-serif"
                                        placeholder="Ajouter un lieu..."
                                        value={newFacility}
                                        onChange={(e) => setNewFacility(e.target.value)}
                                    // Removed onBlur for consistency
                                    />
                                </form>
                            )}
                        </div>

                        {/* EQUIPMENT SECTION (NEW) - UPDATED TO GRID CARDS */}
                        <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 shadow-lg border border-[#8C9E79]/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#E8DCCA] text-[#8C9E79] flex items-center justify-center shadow-md">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-xl text-[#2C3E2C]">Matériel Pédagogique</h3>
                                    <p className="text-[10px] uppercase text-[#C17C74] font-bold tracking-wider">Qu'avez-vous à disposition ?</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {availableEquipment.map(eq => {
                                    const active = (formData.equipment || []).includes(eq);
                                    return (
                                        <button
                                            key={eq}
                                            type="button"
                                            onClick={() => handleToggle(formData.equipment, eq, 'equipment')}
                                            className={`relative p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden border ${active
                                                ? 'bg-[#8C9E79] text-white border-[#8C9E79] shadow-lg translate-y-[-2px]'
                                                : 'bg-white text-gray-500 border-gray-100 hover:border-[#8C9E79]/30 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="font-serif font-bold text-sm mb-1 z-10 relative">{eq}</div>
                                            {active && <div className="absolute top-2 right-2 text-[#C17C74]"><CheckCircle2 size={14} /></div>}
                                        </button>
                                    );
                                })}
                                <button
                                    type="button"
                                    onClick={() => setIsAddingEquipment(true)}
                                    className="border-2 border-dashed border-[#8C9E79]/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-[#8C9E79] hover:bg-[#8C9E79]/5 transition-colors"
                                >
                                    <Plus size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Autre</span>
                                </button>
                            </div>
                            {isAddingEquipment && (
                                <form onSubmit={(e) => handleAddItem(e, 'equipment')} className="mt-4 animate-in fade-in">
                                    <input
                                        autoFocus
                                        className="w-full bg-white border border-[#8C9E79] rounded-xl px-4 py-3 text-sm font-bold text-[#8C9E79] outline-none shadow-lg font-serif"
                                        placeholder="Ajouter du matériel..."
                                        value={newEquipment}
                                        onChange={(e) => setNewEquipment(e.target.value)}
                                    // Removed onBlur for consistency
                                    />
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 mb-12">
                        <button
                            type="submit"
                            className={`w-full py-4 rounded-2xl font-serif font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 border border-white/20 relative overflow-hidden group ${isSaved
                                ? 'bg-[#2C3E2C] text-white'
                                : 'bg-[#8C9E79] text-[#FDF6E3]'
                                }`}
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl"></div>
                            <span className="relative flex items-center gap-2">
                                {isSaved ? <CheckCircle2 size={24} /> : <Save size={24} />}
                                {isSaved ? 'Profil Validé !' : 'Enregistrer mon Profil'}
                            </span>
                        </button>

                        <button type="button" onClick={onReset} className="w-full text-center mt-6 text-[#8C9E79]/50 text-xs font-bold uppercase tracking-widest hover:text-[#C17C74] transition-colors">
                            Recommencer depuis zéro
                        </button>
                    </div>
                </div>
            </form>

        </div >
    );
}
