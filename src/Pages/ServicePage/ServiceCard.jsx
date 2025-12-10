import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServiceModal from "../Modals/ServiceModal";

const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
];

export default function ServiceCard({ service }) {
  const [isOpen, setIsOpen] = useState(false);

  // Destructure service data with defaults to prevent crashes
  const {
    service_name = "Untitled Service",
    image,
    description = "No description available.",
    service_category = "General",
    cost = 0,
    included_items = "", // Expecting string "item1, item2" or array
    createdByName = "Service Provider",
    createdByPhoto,
    createdAt
  } = service || {};

  // Handle included_items: Convert string (comma separated) to array if needed
  const features = typeof included_items === 'string'
    ? included_items.split(',').map(item => item.trim()).filter(item => item)
    : Array.isArray(included_items) ? included_items : [];

  // Fallback image logic
  const finalImage = image || STOCK_IMAGES[0];

  return (
    <>
      {/* Service Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-base-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 border border-base-200 dark:border-base-300 flex flex-col h-full"
      >
        {/* Image Thumbnail */}
        <div
          className="relative h-48 bg-base-200 overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={finalImage}
            alt={service_name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 text-xs font-bold bg-white/90 backdrop-blur rounded-full text-primary shadow-sm border border-primary/20 uppercase tracking-wide">
              {service_category}
            </span>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1 text-sm font-bold bg-primary/90 text-white backdrop-blur rounded-lg shadow-sm">
              ৳ {cost}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="text-xl font-bold text-base-content mb-2 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
            title={service_name}
            onClick={() => setIsOpen(true)}
          >
            {service_name}
          </h3>

          {/* Features Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-secondary/10 rounded-md text-base-content/70 font-medium"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="text-xs px-2 py-1 bg-base-200 rounded-md text-base-content/50">
                +{features.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Shared Service Details Modal */}
      <ServiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        service={service}
      />
    </>
  );
}