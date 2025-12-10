import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../../Pages/ServicePage/ServiceCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axiosSecure.get("/services?limit=6"); // Fetch top 6
                if (res.data.data && Array.isArray(res.data.data)) {
                    setServices(res.data.data);
                } else if (Array.isArray(res.data)) {
                    setServices(res.data.slice(0, 6));
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [axiosSecure]);

    return (
        <section className="py-24 bg-base-200/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">
                        Our Premium Services
                    </h2>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        Explore our wide range of professional decoration services tailored to your unique style.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-[400px] rounded-2xl bg-base-300/50 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service._id || service.id} service={service} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link to="/services" className="btn btn-outline btn-lg px-8 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-full">
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
