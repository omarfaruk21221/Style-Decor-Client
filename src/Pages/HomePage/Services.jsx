import React from 'react';
import { FaPaintBrush, FaCouch, FaLightbulb, FaRulerCombined, FaPalette, FaHome } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';

const Services = () => {
    const services = [
        {
            icon: <FaPaintBrush className="w-12 h-12" />,
            title: "Interior Design",
            description: "Transform your space with our expert interior design services tailored to your style and needs.",
            features: ["Space Planning", "Color Consultation", "3D Visualization"]
        },
        {
            icon: <FaCouch className="w-12 h-12" />,
            title: "Furniture Selection",
            description: "Curated furniture pieces that perfectly complement your interior design vision.",
            features: ["Custom Furniture", "Premium Brands", "Budget Options"]
        },
        {
            icon: <FaLightbulb className="w-12 h-12" />,
            title: "Lighting Design",
            description: "Create the perfect ambiance with our professional lighting design solutions.",
            features: ["LED Solutions", "Smart Lighting", "Mood Lighting"]
        },
        {
            icon: <FaRulerCombined className="w-12 h-12" />,
            title: "Space Planning",
            description: "Maximize your space efficiency with our expert planning and layout services.",
            features: ["Floor Plans", "Layout Design", "Optimization"]
        },
        {
            icon: <FaPalette className="w-12 h-12" />,
            title: "Color Consultation",
            description: "Professional color schemes that bring harmony and style to your space.",
            features: ["Color Theory", "Mood Boards", "Paint Selection"]
        },
        {
            icon: <FaHome className="w-12 h-12" />,
            title: "Home Staging",
            description: "Prepare your property for sale with our professional home staging services.",
            features: ["Staging Design", "Furniture Rental", "Quick Turnaround"]
        }
    ];

    return (
        <div className="min-h-screen py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                    <MdDesignServices className="w-16 h-16 text-primary animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Our Services
                </h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    Professional interior design services to transform your space into a beautiful and functional environment
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-4">{service.title}</h3>
                        <p className="text-base-content/70 text-center mb-6">
                            {service.description}
                        </p>
                        <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-base-content/60">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 glass-effect p-12 rounded-3xl text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-base-content/70 mb-8">
                    Contact us today for a free consultation
                </p>
                <button className="btn btn-primary btn-lg">
                    Request a Quote
                </button>
            </div>
        </div>
    );
};

export default Services;
