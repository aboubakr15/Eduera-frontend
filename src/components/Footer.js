import React from 'react';


const Footer = () => {
    return (
        <footer className="bg-[#103741] text-white pt-24 pb-8 relative overflow-hidden border-t border-white/5">
            {/* Massive Background Typography using pseudo-element equivalent in React if simpler, or sticking to class approach. 
                Tailwind arbitrary values for content property are tricky with spaces. 
                Alternatively, use a span.
             */}
            <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/2 z-0 pointer-events-none -tracking-[10px] select-none whitespace-nowrap opacity-[0.02]">
                EDUERA
            </div>

            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-20 relative z-10">
                <div className="footer-section">
                    <h3 className="mb-6 text-[#F48C06] text-3xl -tracking-[1px] font-bold font-[var(--font-heading)]">EduEra</h3>
                    <p className="text-white/60 leading-loose max-w-[300px]">Empowering learners worldwide.</p>
                </div>
                <div className="footer-section">
                    <h4 className="mb-6 text-white text-lg font-semibold uppercase tracking-widest font-[var(--font-heading)]">Quick Links</h4>
                    <ul>
                        {['Home', 'Courses', 'About Us', 'Contact'].map((item, index) => (
                            <li key={index} className="mb-4">
                                <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/60 transition-all relative no-underline hover:text-[#F48C06] group">
                                    {item}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#F48C06] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="mb-6 text-white text-lg font-semibold uppercase tracking-widest font-[var(--font-heading)]">Legal</h4>
                    <ul>
                        {['Privacy Policy', 'Terms of Service'].map((item, index) => (
                            <li key={index} className="mb-4">
                                <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/60 transition-all relative no-underline hover:text-[#F48C06] group">
                                    {item}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#F48C06] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="mb-6 text-white text-lg font-semibold uppercase tracking-widest font-[var(--font-heading)]">Follow Us</h4>
                    <div className="flex flex-col gap-4">
                        {['Facebook', 'Twitter', 'Instagram'].map((item, index) => (
                            <a key={index} href={`#${item.toLowerCase()}`} className="text-white/60 transition-all relative no-underline hover:text-[#F48C06] group w-fit">
                                {item}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#F48C06] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-white/5 relative z-10 flex justify-center text-white/40 text-sm bg-[#103741]">
                <p>&copy; {new Date().getFullYear()} EduEra. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
