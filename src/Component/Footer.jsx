import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import bgLogo from "../../public/assets/logo3.png";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebook,
      url: "https://www.facebook.com/omarfaruk21221",
      label: "Facebook",
      color: "hover:bg-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/omarfaruk21221",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/8801768838715",
      label: "WhatsApp",
      color: "hover:bg-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      icon: FaGithub,
      url: "https://github.com/omarfaruk21221",
      label: "GitHub",
      color: "hover:bg-gray-800",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-base-300 to-base-200 text-base-content">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img src={bgLogo} alt="Logo" className="w-16 h-16 rounded-xl" />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Style Decor
                </h3>
                <p className="text-sm text-base-content/70">Since 2024</p>
              </div>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Professional interior design services to transform your space into
              a beautiful and functional environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold text-primary mb-4">
              Working Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-start gap-3">
                <span className="text-base-content/70">Mon - Fri:</span>
                <span className="font-semibold text-accent">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex items-center justify-start gap-3">
                <span className="text-base-content/70">Saturday:</span>
                <span className="font-semibold text-warning">
                  10:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex items-center justify-start gap-3">
                <span className="text-base-content/70">Sunday:</span>
                <span className="font-semibold text-error">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm px-5 rounded-xl border border-white/20">
            <h4 className="text-lg font-bold text-primary mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+8801768838715"
                className="flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors group"
              >
                <FaPhone className="text-warning group-hover:scale-110 transition-transform" />
                <span className="text-sm">+880 1768-838715</span>
              </a>
              <a
                href="mailto:info@styledecor.com"
                className="flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors group"
              >
                <FaEnvelope className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@styledecor.com</span>
              </a>
              <div className="flex items-start gap-3 text-base-content/80 group">
                <FaMapMarkerAlt className="text-success mt-1" />
                <span className="text-sm">Banani, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t border-base-content/20 pt-6 mb-4">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className={`p-3 ${social.bgColor} ${social.textColor} ${social.color} hover:text-white rounded-full transition-all duration-300 transform hover:scale-120 shadow-lg hover:shadow-xl`}
                >
                  <IconComponent className="text-2xl" />
                </a>
              );
            })}
          </div>
          <p className="text-center text-sm text-base-content/60 mt-6">
            Follow us on social media for latest updates and design inspiration
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-base-100/50 border-t border-base-content/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} Style Decor Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-base-content/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-base-content/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
