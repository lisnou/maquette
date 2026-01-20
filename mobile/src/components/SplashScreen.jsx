import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show for 2.5 seconds then fade out
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out transition
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-[#FAF7F2] flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
                {/* Logo Placeholder - In a real app this would be the SVG */}
                {/* For now, we simulate the "Picasso + Wave" look with text/iconography or just the strong typography */}

                <div className="relative mb-6">
                    {/* Abstract Horse-like shape simulation using CSS logic or just a placeholder circle for now until we have the SVG */}
                    {/* We rely on the Typography to carry the brand for this immediate step */}
                    <div className="w-24 h-24 rounded-full border-4 border-[#8C9E79] flex items-center justify-center opacity-90">
                        {/* We can use a Lucide icon as a temporary placeholder if we want, or just abstract */}
                        {/* Let's try to mimic the wave */}
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-4 bg-[#C17C74] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-8 bg-[#C17C74] rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
                            <div className="w-1 h-6 bg-[#C17C74] rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-1 h-10 bg-[#C17C74] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-1 h-5 bg-[#C17C74] rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                        </div>
                    </div>
                </div>

                <h1 className="font-serif text-4xl tracking-tight drop-shadow-sm">
                    <span className="font-medium text-[#8C9E79]">My</span>
                    <span className="font-black text-[#8C9E79]">Equi</span>
                    <span className="font-black text-[#C17C74]">Voice</span>
                </h1>

            </div>

            {/* Loading Indicator at bottom */}
            <div className="absolute bottom-12">
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#FDF6E3]/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-[#FDF6E3]/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#FDF6E3]/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
}
