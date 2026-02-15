import React, { useEffect, useState, useRef } from 'react';


const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    const Counter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isVisible) return;

            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);

                // Ease out quart
                const ease = 1 - Math.pow(1 - percentage, 4);

                setCount(Math.floor(end * ease));

                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }, [isVisible, end, duration]);

        return <span>{count.toLocaleString()}</span>;
    };

    const statsData = [
        { icon: "👥", number: 500, label: "Professors and TA", suffix: "+" },
        { icon: "👨‍🎓", number: 10000, label: "Students", suffix: "+" },
        { icon: "📚", number: 120, label: "Courses", suffix: "+" },
        { icon: "⏳", number: 24, label: "Access", suffix: "/7" } // Static number for 24/7 is fine or animate 24
    ];

    return (
        <section className="relative pb-8 -mt-[50px] z-10 pt-8 md:pt-0" ref={statsRef}>
            <div className="container mx-auto px-5 flex flex-wrap justify-center gap-8">
                {statsData.map((stat, index) => (
                    <div
                        className="flex-1 min-w-[220px] bg-[#103741]/60 backdrop-blur-[20px] saturate-[180%] py-10 px-8 rounded-3xl text-center shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5 flex flex-col items-center gap-4 transition-all duration-300 relative overflow-hidden group hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-[#103741]/80"
                        key={index}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"></div>

                        <div className="text-5xl mb-2 drop-shadow-[0_0_15px_rgba(244,140,6,0.4)] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[5deg]">{stat.icon}</div>
                        <div className="text-left">
                            {stat.label === "Access" ? (
                                <h3 className="text-5xl font-extrabold m-0 bg-gradient-to-r from-white to-[#bbb] bg-clip-text text-transparent leading-none">24/7</h3>
                            ) : (
                                <h3 className="text-5xl font-extrabold m-0 bg-gradient-to-r from-white to-[#bbb] bg-clip-text text-transparent leading-none">
                                    {isVisible ? <Counter end={stat.number} /> : 0}
                                    {stat.suffix}
                                </h3>
                            )}
                            <p className="text-base text-white/70 m-0">{stat.label === "Access" ? "Available" : stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;

