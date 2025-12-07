import React, { useEffect, useState } from "react";
import {
  FaPaintBrush,
  FaCouch,
  FaLightbulb,
  FaRulerCombined,
  FaPalette,
  FaHome,
} from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services from JSON
    fetch("/Data/Services.json")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <MdDesignServices className="w-16 h-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
          Professional interior design services to transform your space into a
          beautiful and functional environment
        </p>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 glass-effect p-12 rounded-3xl text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-base-content/70 mb-8">
          Contact us today for a free consultation
        </p>
        <button className="btn btn-primary btn-lg">Request a Quote</button>
      </div>
    </div>
  );
};

export default Services;
