import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Testimonials from "../components/Home/Testimonials";
import Contact from "../components/Home/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
