import React from 'react';


const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#103741]/85 backdrop-blur-xl border-b border-white/5 transition-all duration-300 py-4">
            <div className="container mx-auto px-5 flex justify-between items-center">
                <div className="logo">
                    <h2 className="text-white text-3xl font-bold cursor-pointer font-[var(--font-heading)]">EduEra</h2>
                </div>
                <ul className="flex gap-12 font-medium">
                    {['Home', 'About us', 'Contact Us', 'Community'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase().replace(' ', '')}`}
                                className="text-white/80 transition-all hover:text-white"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4 items-center">
                    <span className="text-white mr-4 cursor-pointer font-medium">English ▾</span>
                    <button className="bg-[#F48C06] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-[0_4px_15px_rgba(244,140,6,0.3)] hover:bg-[#e07b00] hover:-translate-y-0.5">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
