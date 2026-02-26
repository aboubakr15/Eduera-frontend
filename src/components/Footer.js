import React from "react";
import { Facebook, Instagram, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = ["About Us", "Reviews", "Community", "FAQs"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
const socialLinks = [
  {
    name: "Facebook",
    icon: <Facebook size={28} className="text-blue-500" />,
    href: "#facebook",
  },
  {
    name: "Instagram",
    icon: <Instagram size={28} className="text-pink-500" />,
    href: "#instagram",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-[#1B2036] pt-24 pb-8 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-20 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 mb-16 relative z-10">
        <div>
          <div
            className="flex items-center mb-5 cursor-pointer"
            onClick={() => navigate("/#")}
          >
            <img
              src="/logo.png"
              alt="EDUera"
              className="w-16 h-16 mr-2 object-contain"
            />
            <span className="font-serif font-bold text-3xl text-[#1B2036] tracking-wide">
              EDUera
            </span>
          </div>
          <p className="text-[#1B2036]/60 leading-relaxed max-w-[300px] mb-8">
            AI-Powered University Management & Learning Platform for modern
            education.
          </p>
        </div>

        <div>
          <h4 className="mb-6 text-[#1B2036] text-lg font-semibold uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {quickLinks.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-[#1B2036]/60 hover:text-orange-400 transition-colors duration-200 relative group w-fit block"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-[#1B2036] text-lg font-semibold uppercase tracking-widest">
            Contact Us
          </h4>

          <div className="flex items-center gap-3 text-[#1B2036]/60 mb-6">
            <Mail size={18} className="text-orange-400" />
            <a
              href="mailto:support@eduai.edu"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              support@eduai.edu
            </a>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="hover:scale-110 transition-transform duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10" />

      <div className="relative z-10 flex flex-col items-center gap-4 pt-8 px-10">
        <p className="text-[#1B2036]/40 text-sm">
          © {new Date().getFullYear()} Eduera Platform. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {legalLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-[#1B2036]/40 text-sm hover:text-orange-400 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
