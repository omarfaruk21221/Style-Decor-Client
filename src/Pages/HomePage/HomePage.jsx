import React from "react";
import { FaPaintBrush, FaCouch, FaLightbulb } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { BiSolidPalette } from "react-icons/bi";
import LoaderWithLogo from "../../Component/Spiners/LoaderWithLogo";

const HomePage = () => {
  return (
    <div className=" bg-gradient-to-br from-base-100 to-base-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <IoSparkles className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Style Decor
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 mb-8">
            Transform your space with our premium interior design services
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-primary btn-lg gap-2">
              <MdDesignServices className="w-5 h-5" />
              Get Started
            </button>
            <button className="btn btn-outline btn-lg gap-2">
              <BiSolidPalette className="w-5 h-5" />
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-4">
              <FaPaintBrush className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Interior Design
            </h3>
            <p className="text-base-content/70 text-center">
              Create stunning interiors that reflect your personality and style
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-4">
              <FaCouch className="w-12 h-12 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Furniture Selection
            </h3>
            <p className="text-base-content/70 text-center">
              Choose from our curated collection of premium furniture pieces
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-4">
              <FaLightbulb className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Lighting Design
            </h3>
            <p className="text-base-content/70 text-center">
              Perfect lighting solutions to enhance your space's ambiance
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-effect p-12 rounded-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-base-content/70 mb-8">
            Let's create something beautiful together
          </p>
          <button className="btn btn-primary btn-lg gap-2">
            <IoSparkles className="w-5 h-5" />
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
