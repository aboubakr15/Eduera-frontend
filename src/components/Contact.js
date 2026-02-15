import React from 'react';


const Contact = () => {
    return (
        <section className="py-20 bg-white" id="contact">
            <div className="max-w-[800px] mx-auto text-center px-5">
                <div className="mb-12">
                    <h2 className="text-[#1F1F1F] mb-4 text-[2rem] font-bold font-[var(--font-heading)]">Get in Touch</h2>
                    <p className="text-[#696984]">Have questions or need help? Send us a message and we'll get back to you shortly.</p>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="w-full">
                        <input type="text" placeholder="Your Name" required className="w-full p-4 border border-[#ddd] rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]" />
                    </div>
                    <div className="w-full">
                        <input type="email" placeholder="Your Email" required className="w-full p-4 border border-[#ddd] rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]" />
                    </div>
                    <div className="w-full">
                        <textarea placeholder="Your Message" rows="5" required className="w-full p-4 border border-[#ddd] rounded-lg font-sans text-base transition-all focus:border-[#F48C06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,128,128,0.1)]"></textarea>
                    </div>
                    <button type="submit" className="self-start bg-[#F48C06] text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:bg-[#e07b00] hover:-translate-y-0.5">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
