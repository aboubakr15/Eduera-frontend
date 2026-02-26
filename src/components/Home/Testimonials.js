import React from "react";
import sara from "../../assets/images/man.png";
import Chen from "../../assets/images/man.png";
import Davis from "../../assets/images/man.png";
import { FaQuoteLeft } from "react-icons/fa";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "UX Designer",
      text: "EduEra has completely transformed the way I learn. The courses are top-notch and the instructors are amazing!",
      image: sara,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      text: "I was able to switch careers thanks to the comprehensive curriculum provided here. Highly recommended!",
      image: Chen,
    },
    {
      name: "Emily Davis",
      role: "Marketing Specialist",
      text: "The community support is incredible. Whenever I had a question, there was always someone ready to help.",
      image: Davis,
    },
  ];

  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className="py-32 bg-[#1B2036] text-white overflow-hidden relative"
      id="testimonials"
    >
      <div className="absolute top-0 left-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-r from-[#010828] to-transparent"></div>
      <div className="absolute top-0 right-0 w-[200px] h-full z-10 pointer-events-none bg-gradient-to-l from-[#010828] to-transparent"></div>

      <div className="w-full">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-white mb-4 text-5xl font-tiro-devanagari">
            Voices of Our Community
          </h2>
          <p className="text-white/60">What Our Students saying About us</p>
        </div>
        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeTestimonials.map((item, index) => (
            <div
              className="bg-white/5 p-10 rounded-3xl backdrop-blur-md border border-white/5 w-[400px] shrink-0 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              key={index}
            >
              <div className="mb-8">
                <FaQuoteLeft className="text-[#D67A1E] text-2xl mb-4 opacity-80" />

                <p className="italic text-white/80 text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[60px] h-[60px] rounded-full"
                />
                <div>
                  <h4 className="mb-0.5 text-white text-lg font-bold ">
                    {item.name}
                  </h4>
                  <span className="text-sm text-[#D67A1E] font-light">
                    {item.role}
                  </span>
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
