import React from "react";
import HeroSection from "../../Component/Home/HeroSection";
import ServicesSection from "../../Component/Home/ServicesSection";
import TopDecorators from "../../Component/Home/TopDecorators";
import CoverageMap from "../../Component/Home/CoverageMap";
import HowItsWork from "../../Component/Home/HowItWork";
import Statistics from "../../Component/Home/Statistics";
import FAQSection from "../../Component/Home/FAQSection";
import ContactPage from "../ContactPage/ContactPage";
import Brands from "../../Component/Home/Brands";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden space-y-20">
      <HeroSection />
      <ServicesSection />
      <TopDecorators />
      <CoverageMap />
      <HowItsWork />
      <Statistics />
      <Brands />
      <FAQSection />
      <ContactPage />
    </div>
  );
};

export default HomePage;
