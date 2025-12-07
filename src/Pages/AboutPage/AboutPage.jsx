import React from 'react';
import { FaAward, FaUsers, FaHeart, FaCheckCircle } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { icon: <FaUsers />, number: "500+", label: "Happy Clients" },
        { icon: <MdDesignServices />, number: "1000+", label: "Projects Completed" },
        { icon: <FaAward />, number: "50+", label: "Awards Won" },
        { icon: <FaHeart />, number: "100%", label: "Satisfaction Rate" }
    ];

    const values = [
        {
            icon: <FaCheckCircle className="w-8 h-8" />,
            title: "Quality First",
            description: "We never compromise on quality and always deliver excellence in every project."
        },
        {
            icon: <FaHeart className="w-8 h-8" />,
            title: "Client Focused",
            description: "Your satisfaction is our priority. We listen, understand, and deliver beyond expectations."
        },
        {
            icon: <FaAward className="w-8 h-8" />,
            title: "Award Winning",
            description: "Recognized for our innovative designs and exceptional service in the industry."
        }
    ];

    return (
        <div className="py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    About Style Decor
                </h1>
                <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                    We are passionate about creating beautiful, functional spaces that reflect your unique style and personality.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-bl from-secondary/80 to-primary/90 p-6 text-base-100 rounded-2xl text-center hover:scale-105 transition-all duration-300"
                    >
                        <div className="flex justify-center text-primary text-4xl mb-4">
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-bold mb-2">{stat.number}</div>
                        <div className="text-shadow-primary">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Our Story */}
            <div className="shadow-2xl border border-accent/20 p-12 rounded-3xl mb-16">
                <h2 className="text-4xl font-bold mb-6 text-center text-accent">Our Story</h2>
                <div className="max-w-3xl mx-auto space-y-4 text-accent-content/50 text-lg">
                    <p>
                        Founded in 2024, Style Decor has been transforming spaces and exceeding client expectations with our innovative interior design solutions. Our journey began with a simple mission: to make beautiful, functional design accessible to everyone.
                    </p>
                    <p>
                        Today, we're proud to be one of the leading interior design firms, known for our attention to detail, creative vision, and commitment to excellence. Our team of experienced designers works closely with each client to bring their dream spaces to life.
                    </p>
                    <p>
                        We believe that great design is not just about aesthetics—it's about creating spaces that enhance your lifestyle, reflect your personality, and stand the test of time.
                    </p>
                </div>
            </div>

            {/* Our Values */}
            <div className="mb-16 ">
                <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className=" backdrop-blur-2xl bg-base-100 shadow-2xl border border-primary/30 p-8 rounded-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex justify-center text-primary mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4">{value.title}</h3>
                            <p className="text-base-content/70 text-center">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-tr from-secondary/80 to-primary/90 p-12 rounded-3xl text-center">
                <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-xl text-base-content/70 mb-8">
                    Ready to transform your space? Get in touch with us today!
                </p>
                <Link to={'/contact'} className="btn btn-primary btn-lg">
                    Contact Us
                </Link>
            </div>
        </div>
    );
};

export default About;
