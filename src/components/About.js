import React from 'react';


const About = () => {
    return (
        <section className="py-20 bg-[#FFF9F0]" id="about">
            <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <img src="https://via.placeholder.com/500x500?text=About+Us" alt="About Us" className="w-full rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]" />
                </div>
                <div className="flex-1">
                    <h4 className="text-[#F48C06] uppercase tracking-[1px] mb-4 text-sm font-bold">About Us</h4>
                    <h2 className="text-[2.5rem] text-[#1F1F1F] mb-6 font-bold font-[var(--font-heading)]">Who We Are</h2>
                    <p className="mb-8 text-[#696984] leading-relaxed">
                        We are a passionate community of learners and educators dedicated to making education accessible to everyone.
                        Our platform provides the tools and resources you need to succeed in your learning journey.
                    </p>
                    <ul className="mb-8">
                        {['Expert-led courses', 'Flexible learning schedules', 'Community support', 'Certified programs'].map((item, index) => (
                            <li key={index} className="mb-3 text-lg text-[#1F1F1F] flex items-center gap-2.5">
                                ✅ {item}
                            </li>
                        ))}
                    </ul>
                    <button className="bg-[#F48C06] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:bg-[#e07b00] hover:-translate-y-0.5">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
