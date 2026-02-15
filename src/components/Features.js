import React from 'react';


const Features = () => {
    const features = [
        {
            title: "Software Engineering & Architecture", // Longer title for span
            description: "Master the art of building scalable, reliable, and secure software systems. Deep dive into patterns, cloud architecture, and DevOps.",
            icon: "⚙️"
        },
        {
            title: "Computer Science",
            description: "Foundational algorithms and systems.",
            icon: "💻"
        },
        {
            title: "AI & Machine Learning",
            description: "Build smart models that learn and adapt.",
            icon: "🧠"
        },
        {
            title: "Data Science",
            description: "Extract insights from complex data.",
            icon: "📊"
        }
    ];

    return (
        <section className="relative overflow-hidden pt-40 pb-32 bg-[#0d1117]" id="features">
            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(244,140,6,0.08)_0%,transparent_70%)] blur-[80px] z-0 pointer-events-none"></div>

            <div className="container mx-auto px-5 relative z-10">
                <div className="mb-12">
                    <p className="text-[#F48C06] font-bold mb-2.5">● Explore Departments</p>
                    <h2 className="text-5xl text-white mb-12 relative z-10 font-[var(--font-heading)]">Everything You Need to <br /> Learn, Teach, and Grow</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {features.map((feature, index) => (
                        <div
                            className={`group relative flex flex-col justify-start p-10 rounded-3xl border border-white/5 text-left transition-all duration-300 overflow-hidden
                                ${index === 0 ? 'md:col-span-2 bg-gradient-to-br from-[rgba(244,140,6,0.1)] to-[rgba(255,255,255,0.03)] border-[rgba(244,140,6,0.2)]' : 'bg-white/3'}
                                hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-white/5
                            `}
                            key={index}
                        >
                            {/* Holographic Hover Effect */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-0 scale-50 transition-all duration-500 pointer-events-none group-hover:opacity-100 group-hover:scale-100"></div>

                            <div className="text-5xl mb-6 bg-transparent w-auto h-auto leading-none rounded-none text-white text-left drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] select-none">
                                {feature.icon}
                            </div>
                            <h3 className="text-white text-2xl mb-4 font-[var(--font-heading)]">{feature.title}</h3>
                            <p className="text-[#696984] relative z-10">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
