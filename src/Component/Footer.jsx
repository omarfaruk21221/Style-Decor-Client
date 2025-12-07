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
    <footer className="footer sm:footer-horizontal bg-primary/80 text-neutral-content p-10">
      <aside className="flex flex-col md:flex-row items-center gap-6">
        <img src={bgLogo} className="w-60 h-50 rounded-4xl fill-current" />
        <section>
          <h1 className="text-xl">
            <span className="text-2xl text-secondary"> Style Decor Ltd.</span>
            <br />
            <span className="text-sm text-secondary-content ">
              Providing reliable design services since 2024
            </span>
          </h1>
          <span className="mt-4 ">
            <p className="text-lg text-secondary">Working Hours:</p>
            <p className="text-m text-accent">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-md text-warning">Sat - Sun: Closed</p>
          </span>
        </section>
      </aside>
      <aside className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
        <h1 className="text-xl font-bold text-secondary mb-6">
          Contact Details
        </h1>
        <div className="space-y-4">
          <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
            <FaPhone className="w-5 h-5 text-warning flex-shrink-0" />
            <div>
              <p className="text-sm text-secondary-content">Phone</p>
              <a
                href="tel:+8801768838715"
                className="text-lg font-semibold hover:text-warning transition-colors"
              >
                +880 1768-838715
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
            <FaEnvelope className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm text-secondary-content">Email</p>
              <a
                href="mailto:info@styledecor.com"
                className="text-lg font-semibold hover:text-accent transition-colors"
              >
                info@styledecor.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
            <FaMapMarkerAlt className="w-5 h-5 text-success flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-secondary-content">Address</p>
              <a
                href="#"
                className="text-lg font-semibold hover:text-success transition-colors"
              >
                Banani, Dhaka, Bangladesh
              </a>
            </div>
          </div>
        </div>
      </aside>
      <aside className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
        <h2 className="text-xl font-bold text-secondary mb-6">
          Connect With Us
        </h2>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className={`p-4 ${social.bgColor} ${social.textColor} ${social.color} hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md group flex flex-col items-center`}
              >
                <IconComponent className="text-2xl" />
              </a>
            );
          })}
        </div>
        <p className="text-sm text-secondary-content mt-4">
          Follow us on social media for updates and inspiration
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
