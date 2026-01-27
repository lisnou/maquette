import React, { useState, useEffect } from 'react';
import { Home, Book, User, Play, Menu, X, Bell, Search } from 'lucide-react';
import myHorseImg from '../assets/images/my_horse.jpg';
import RiderHome from './RiderHome';
import RiderPrograms from './RiderPrograms';
import RiderPlayer from './RiderPlayer';
import UserProfileDisplay from './UserProfileDisplay';
import UserProfileForm from './UserProfileForm';
import SplashScreen from './SplashScreen';

export default function RiderApp({ onExit }) {
    const [showSplash, setShowSplash] = useState(true);
    const [activeTab, setActiveTab] = useState('home');
    const [currentSession, setCurrentSession] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Initial Profile State (simulated backend)
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('equicoach_profile');
        return saved ? JSON.parse(saved) : {
            userName: 'Sophie',
            galopLevel: 'G4-5',
            horses: [
                { id: 1, name: 'Cirius', age: '8', color: 'Bai', temperament: 'Calme', image: myHorseImg }
            ],
            stats: { sessionsCompleted: 14, totalMinutes: 420 },
            primaryObjectives: ['Dressage', 'Confiance']
        };
    });

    const [activeHorseId, setActiveHorseId] = useState(() => {
        return profile.horses && profile.horses.length > 0 ? profile.horses[0].id : null;
    });

    // Save profile on change
    useEffect(() => {
        localStorage.setItem('equicoach_profile', JSON.stringify(profile));
    }, [profile]);

    // Update active horse if horses change and current active is invalid
    useEffect(() => {
        if (profile.horses && profile.horses.length > 0) {
            if (!activeHorseId || !profile.horses.find(h => h.id === activeHorseId)) {
                setActiveHorseId(profile.horses[0].id);
            }
        }
    }, [profile.horses, activeHorseId]);

    const activeHorse = profile.horses?.find(h => h.id === activeHorseId) ||
        (profile.horses?.length > 0 ? profile.horses[0] : { name: 'Mon Cheval' });

    const handlePlaySession = (session) => {
        setCurrentSession(session);
    };

    const handleSaveProfile = (newProfile) => {
        setProfile(newProfile);
        // Ensure active horse remains valid
        setIsEditingProfile(false);
    };

    if (currentSession) {
        return <RiderPlayer session={currentSession} onClose={() => setCurrentSession(null)} />;
    }

    return (
        /* Mobile: Full Screen, White Bg | Desktop: Gray Bg, Centered Flex */
        <div className="fixed inset-0 bg-[#FAF7F2] sm:bg-gray-100 sm:flex sm:justify-center sm:items-center sm:py-8 z-50">
            {/* Mobile: Full Size, No Border | Desktop: Max Width, Rounded, Bordered Phone Look */}
            <div className="w-full h-full sm:h-[85vh] sm:max-w-[400px] bg-[#FAF7F2] relative font-sans text-[#5C5C5C] sm:shadow-2xl overflow-hidden sm:rounded-[2.5rem] sm:border-[8px] sm:border-white flex flex-col">

                {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

                {/* Version Check Banner */}
                {/* <div className="bg-red-500 text-white text-xs text-center p-1 absolute top-0 w-full z-[60]">DEBUG: Phone Layout V3</div> */}

                {/* TOP HEADER (Fixed inside phone) */}
                {/* TOP HEADER (Fixed inside phone) */}
                <div className="absolute top-0 inset-x-0 z-50 h-20 bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#8C9E79]/10 flex items-center justify-between px-6 transition-all duration-300">
                    {!isSearchOpen ? (
                        <>
                            {/* Left: Menu/Drawer */}
                            <button className="p-3 -ml-3 text-[#8C9E79]/50 hover:text-[#8C9E79] transition-colors active:scale-95 rounded-full">
                                <Menu size={24} strokeWidth={2} />
                            </button>

                            {/* Center: Brand */}
                            <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-700">
                                <span className="font-serif text-2xl tracking-tight drop-shadow-sm">
                                    <span className="font-medium text-[#8C9E79]">My</span>
                                    <span className="font-black text-[#8C9E79]">Equi</span>
                                    <span className="font-black text-[#C17C74]">Voice</span>
                                </span>
                            </div>

                            {/* Right: Search & Notifications */}
                            <div className="flex items-center gap-1 -mr-3">
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                        setActiveTab('home'); // Switch to home to see results
                                    }}
                                    className="p-3 text-[#8C9E79]/50 hover:text-[#8C9E79] transition-colors active:scale-95 rounded-full"
                                >
                                    <Search size={24} strokeWidth={2} />
                                </button>
                                <button className="p-3 text-[#8C9E79]/50 hover:text-[#8C9E79] transition-colors relative active:scale-95 rounded-full">
                                    <Bell size={24} strokeWidth={2} />
                                    <span className="absolute top-3 right-3.5 w-2 h-2 bg-[#C17C74] rounded-full border-2 border-[#FAF7F2]"></span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex-1 relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C9E79]/50" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Rechercher une séance..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-[#8C9E79]/20 rounded-full pl-11 pr-4 py-3 text-sm text-[#8C9E79] placeholder:text-[#8C9E79]/30 focus:outline-none focus:border-[#8C9E79] focus:ring-4 focus:ring-[#8C9E79]/5 shadow-sm font-bold"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                                className="p-2 bg-[#8C9E79]/10 text-[#8C9E79] rounded-full hover:bg-[#8C9E79]/20 transition-colors"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    )}
                </div>

                {/* MAIN SCROLLABLE CONTENT AREA */}
                <main className="flex-1 overflow-y-scroll no-scrollbar pb-24 pt-20">
                    {activeTab === 'home' && (
                        <RiderHome
                            profile={profile}
                            activeHorse={activeHorse}
                            onExplore={() => setActiveTab('catalog')}
                            onPlay={handlePlaySession}
                            searchQuery={searchQuery}
                        />
                    )}
                    {activeTab === 'programs' && (
                        <RiderPrograms
                            profile={profile}
                            activeHorse={activeHorse}
                            onPlay={handlePlaySession}
                        />
                    )}
                    {activeTab === 'profile' && (
                        isEditingProfile ? (
                            <UserProfileForm
                                profile={profile}
                                onSave={handleSaveProfile}
                                onReset={() => setIsEditingProfile(false)}
                            />
                        ) : (
                            <UserProfileDisplay
                                profile={profile}
                                activeHorse={activeHorse}
                                onEdit={() => setIsEditingProfile(true)}
                                onSwitchHorse={setActiveHorseId}
                            />
                        )
                    )}
                </main>

                {/* BOTTOM NAVIGATION BAR (Fixed inside phone) */}
                <div className="absolute bottom-6 inset-x-6 z-50">
                    <div className="bg-[#8C9E79] text-white backdrop-blur-xl rounded-[2.5rem] p-2 shadow-2xl flex items-center justify-between px-6 border border-white/20">
                        <NavButton
                            icon={<Home size={24} strokeWidth={2} />}
                            label="Accueil"
                            isActive={activeTab === 'home'}
                            onClick={() => setActiveTab('home')}
                        />
                        <NavButton
                            icon={<Book size={24} strokeWidth={2} />}
                            label="Programmes"
                            isActive={activeTab === 'programs'}
                            onClick={() => setActiveTab('programs')}
                        />
                        <NavButton
                            icon={<User size={24} strokeWidth={2} />}
                            label="Profil"
                            isActive={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                        />
                    </div>
                </div>

                {/* EXIT BUTTON REMOVED */}
            </div>
        </div>
    );
}


function NavButton({ icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl transition-all duration-300 w-20 active:scale-95 group`}
        >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white text-[#8C9E79] shadow-lg' : 'text-white/70 group-hover:text-white'}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {label}
            </span>
        </button>
    );
}
