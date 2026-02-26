import React from "react";
import community from "../../assets/images/community.png";

const Contact = () => {
  return (
    <section className="pt-20 bg-[#fffdfc]" id="contact">
      <div className="max-w-[800px] mx-auto text-center px-5">
        <div className="mb-12">
          <h2 className="text-[#1F1F1F] mb-4 text-[2rem] font-tiro-devanagari">
            Get in Touch
          </h2>
          <p className="text-[#696984]">
            Have questions or need help? Send us a message and we'll get back to
            you shortly.
          </p>
        </div>
        <form className="flex flex-col gap-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 border rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]"
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-4 border  rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]"
            />
          </div>
          <div className="w-full">
            <textarea
              placeholder="Your Message"
              rows="5"
              required
              className="w-full p-4 border rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="self-start text-white font-Inter
                    font-Inter text-[15px] px-8 py-3 rounded-xl 0 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none
                    bg-gradient-to-r from-[#D67A1E] to-[#CE904E] "
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="relative w-full h-screen overflow-hidden mt-20">
        <img
          src={community}
          alt="Community"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#180E03]/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-serif text-6xl font-normal text-white leading-tight mb-10">
            Join Our Growing <br /> Community
          </h2>

          <div className="flex items-center bg-white rounded-full px-3 py-2 w-full max-w-lg shadow-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent outline-none text-gray-600 text-base px-4"
            />
            <button className="bg-[#D67A1E] hover:bg-[#be6d1c] text-white font-semibold text-base px-7 py-2 rounded-full transition-all duration-200 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
