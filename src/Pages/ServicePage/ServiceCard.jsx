import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";

// Fallback stock images
const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop",
];

export default function ServiceCard({ service = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  // Improved data structure with defaults
  const {
    id = Date.now(),
    title = "Untitled Service",
    image = null,
    description = "No description available.",
    fullDescription = null,
    features = [],
    technologies = [],
    category = "Service",
    status = "Active",
    date = new Date().getFullYear().toString(),
    links = {
      demo: "#",
      code: "#",
    },
    rating = null,
    testimonial = null,
  } = service;

  // Helper to convert Google Drive links
  const getGoogleDriveImage = (url) => {
    if (!url) return null;
    if (url.includes("drive.google.com") && url.includes("/view")) {
      const idMatch = url.match(/\/d\/(.+?)\//);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
      }
    }
    return url;
  };

  // Determine image
  const stockImageIndex =
    (title.length + (technologies.length || 0)) % STOCK_IMAGES.length;
  const finalImage =
    getGoogleDriveImage(image) || STOCK_IMAGES[stockImageIndex];

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 border border-slate-200 dark:border-slate-700 flex flex-col h-full"
      >
        {/* Image Thumbnail */}
        <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
          <img
            src={finalImage}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 text-xs font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-primary shadow-sm border border-primary/20">
              {category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-1"
            title={title}
          >
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400">
                +{technologies.length - 3}
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
            {links.demo !== "#" && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                title="Live Demo"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header with Background Image */}
              <div className="relative h-40 sm:h-56 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={finalImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
                >
                  <FaTimes className="text-xl" />
                </button>
                {/* Title Section */}
                <div className="relative z-10 text-center px-6">
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 shadow-sm">
                    {title}
                  </h2>
                  <p className="text-slate-100 font-medium">{category}</p>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-8 overflow-y-auto">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                  {/* Left Column: Description & Features */}
                  <div className="md:col-span-2 space-y-8">
                    {/* Overview Section */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Overview
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {fullDescription || description}
                      </p>
                    </div>

                    {/* Features Section */}
                    {features.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 bg-secondary rounded-full" />
                          Key Features
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                            >
                              <span className="text-primary mt-1">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Meta Information & Links */}
                  <div className="space-y-8">
                    {/* Service Info Box */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-4">
                        Service Info
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                          <FaLayerGroup className="text-primary" />
                          <span className="font-medium">{status}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                          <FaCalendarAlt className="text-primary" />
                          <span className="font-medium">{date}</span>
                        </div>
                        {rating && (
                          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <span className="text-yellow-500 text-lg">★</span>
                            <span className="font-medium">{rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technologies Section */}
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white mb-4">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {links.demo !== "#" && (
                        <a
                          href={links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-primary hover:bg-primary-focus text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {links.code !== "#" && (
                        <a
                          href={links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
                        >
                          <FaGithub /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
