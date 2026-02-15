import React from 'react';


const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "UX Designer",
            text: "EduEra has completely transformed the way I learn. The courses are top-notch and the instructors are amazing!",
            image: "https://via.placeholder.com/60"
        },
        {
            name: "Michael Chen",
            role: "Software Engineer",
            text: "I was able to switch careers thanks to the comprehensive curriculum provided here. Highly recommended!",
            image: "https://via.placeholder.com/60"
        },
        {
            name: "Emily Davis",
            role: "Marketing Specialist",
            text: "The community support is incredible. Whenever I had a question, there was always someone ready to help.",
            image: "https://via.placeholder.com/60"
        }
    ];

    // Duplicating for infinite loop
    const marqueeTestimonials = [...testimonials, ...testimonials];

    return (

        <section className="py-32 bg-[#103741] text-white overflow-hidden relative" id="testimonials">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-r from-[#103741] to-transparent"></div>
            <div className="absolute top-0 right-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-l from-[#103741] to-transparent"></div>

            <div className="w-full">
                <div className="text-center mb-16 relative z-20">
                    <h2 className="text-white mb-4 text-5xl font-bold font-[var(--font-heading)]">Voices of Our Community</h2>
                    <p className="text-white/60">Hear what our students have to say about their learning experience.</p>
                </div>
                <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
                    {marqueeTestimonials.map((item, index) => (
                        <div
                            className="bg-white/5 p-10 rounded-3xl backdrop-blur-md border border-white/5 w-[400px] shrink-0 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                            key={index}
                        >
                            <p className="italic mb-8 text-white/80 text-lg leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-[60px] h-[60px] rounded-full border-2 border-[#F48C06]" />
                                <div>
                                    <h4 className="mb-0.5 text-white text-lg font-bold font-[var(--font-heading)]">{item.name}</h4>
                                    <span className="text-sm text-[#F48C06] font-medium">{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
