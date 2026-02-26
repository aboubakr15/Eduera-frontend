import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 h-16 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : "border-b border-gray-200"
      }`}
    >
      <div className="flex items-center cursor-pointer">
        {() => navigate("/#")}
        <img
          src="/logo.png"
          alt="EDUera"
          className="w-16 h-16 mr-2 object-contain cursor-pointer"
        />
        <span className="font-serif font-bold text-3xl text-gray-900 tracking-wide">
          EDUera
        </span>
      </div>

      <div className="flex items-center gap-10">
        {["Home", "About us", "Contact Us", "Community"].map((link) => (
          <a
            key={link}
            href="#"
            className="font-serif text-[18px] text-gray-700 hover:text-orange-500 transition-colors duration-200 no-underline"
          >
            {link}
          </a>
        ))}

        <div className="flex items-center gap-2">
          <span className="font-serif text-[18px] text-gray-700">English</span>
          <div className="w-6 h-4 rounded-full bg-orange-500 relative cursor-pointer">
            <div className="absolute right-1 top-1 w-3 h-2 rounded-full bg-white" />
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-[#1B2036] to-[#474F73] 
             hover:from-[#D67A1E] hover:to-[#CE904E]
             text-white font-Inter text-[15px] px-6 py-1.5 rounded-lg
             hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
