import React, { useState, useEffect } from 'react';

import heroImg from '../assets/images/hero_illustration.png';

const Hero = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // Max tilt 20px
        const y = (clientY / window.innerHeight - 0.5) * 20;
        setOffset({ x, y });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Parallax styles
    const imageStyle = {
        transform: `translate(${-offset.x}px, ${-offset.y}px) rotateY(${offset.x * 0.5}deg) rotateX(${-offset.y * 0.5}deg)`,
        transition: 'transform 0.1s ease-out'
    };

    const badge1Style = {
        transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)`,
        transition: 'transform 0.1s ease-out'
    };

    const badge2Style = {
        transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`,
        transition: 'transform 0.1s ease-out'
    };

    return (
        <section className="relative overflow-hidden pt-40 pb-48 bg-[#103741] bg-hero-mesh">
            {/* Grid Overlay Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_90%)] z-0 pointer-events-none"></div>

            {/* Curved bottom edge */}
            <div className="absolute -bottom-[60px] left-0 w-full h-[120px] bg-[#FFF9F0] rounded-[50%_50%_0_0/100%_100%_0_0] scale-x-150 z-20"></div>

            <div className="container mx-auto px-5 flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10 pt-16 md:pt-0">
                <div className="flex-1 relative z-20 text-center md:text-left">
                    <h1 className="text-[2.8rem] md:text-[4.5rem] text-white mb-6 leading-[1.1] -tracking-[2px] font-extrabold font-[var(--font-heading)]">
                        Improve <span className="bg-gradient-to-br from-[#F48C06] via-[#FFBA08] to-[#F48C06] bg-clip-text text-transparent bg-[length:200%_auto] animate-shine inline-block">Your Learning</span> <br /> Unlock Your Potential
                    </h1>
                    <p className="text-lg text-white/85 mb-10 max-w-[520px] leading-relaxed font-light mx-auto md:mx-0">
                        Unlock New Opportunities, Master Your Skills, and Shape Your
                        Future Through Learning and Growth.
                    </p>
                    <div className="flex gap-6 items-center justify-center md:justify-start">
                        <button className="bg-gradient-to-br from-[#F48C06] to-[#D97706] text-white px-11 py-4 text-lg rounded-full font-semibold transition-all shadow-[0_10px_25px_rgba(244,140,6,0.4)] border border-white/10 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_35px_rgba(244,140,6,0.5)]">
                            Start your journey
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-xl transition-all border border-white/20 hover:bg-white/20 hover:scale-110 cursor-pointer">
                            ▶
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end relative perspective-[1000px] mb-8 md:mb-0">
                    <img src={heroImg} alt="Learning Students" style={imageStyle} className="max-w-full h-auto relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" />

                    {/* Floating Badge 1 */}
                    <div className="absolute bg-white/70 backdrop-blur-xl saturate-[180%] px-6 py-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.4)] flex items-center gap-4 z-20 animate-float max-w-[250px] border-t border-white/80 top-[15%] -left-[40px]" style={{ ...badge1Style, animationDelay: '0s' }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-white to-[#FFF9F0] rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.05)]">🎓</div>
                        <div className="block text-xs text-[#555] font-semibold mb-0.5">
                            <span>Total Students</span>
                            <h4 className="m-0 text-lg text-[#1F1F1F] font-extrabold font-[var(--font-heading)]">10k+ Enrolled</h4>
                        </div>
                    </div>

                    {/* Floating Badge 2 */}
                    <div className="absolute bg-white/70 backdrop-blur-xl saturate-[180%] px-6 py-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.4)] flex items-center gap-4 z-20 animate-float max-w-[250px] border-t border-white/80 bottom-[15%] -right-[20px]" style={{ ...badge2Style, animationDelay: '4s' }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-white to-[#FFF9F0] rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.05)]">✅</div>
                        <div className="block text-xs text-[#555] font-semibold mb-0.5">
                            <span>Course Completed</span>
                            <h4 className="m-0 text-lg text-[#1F1F1F] font-extrabold font-[var(--font-heading)]">Success!</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
