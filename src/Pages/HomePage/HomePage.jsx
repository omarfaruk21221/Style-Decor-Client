import React from "react";
import HeroSection from "../../Component/Home/HeroSection";
import ServicesSection from "../../Component/Home/ServicesSection";
import TopDecorators from "../../Component/Home/TopDecorators";
import CoverageMap from "../../Component/Home/CoverageMap";

const HomePage = () => {
  return (
    <div className="bg-base-100 overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <TopDecorators />
      <CoverageMap />
    </div>
  );
};

export default HomePage;
