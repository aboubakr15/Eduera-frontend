import React, { useState, useEffect } from "react";
import heroImg from "../../assets/images/campus.jpg";

const Hero = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-[#1B2036]/65" />
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full px-20 max-w-2xl text-white">
        <h1 className="font-tiro-devanagari text-5xl text-white font-normal leading-tight mb-5">
          launching our students into{" "}
          <span className="text-[#D67A1E]">Bright Future</span>
        </h1>

        <p className="font-Inter text-sm leading-relaxed text-white/75 mb-9 max-w-xl">
          Unlock New Opportunities, Master Your Skills, and Shape Your Future
          Through Learning and Growth.
        </p>

        <button
          className="self-start text-white font-Inter
                    font-Inter text-[15px] px-8 py-3 rounded-xl 0 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none
                    bg-gradient-to-r from-[#D67A1E] to-[#CE904E] 
            "
        >
          Start your journey
        </button>
      </div>
    </section>
  );
};

export default Hero;
