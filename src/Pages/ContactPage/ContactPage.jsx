import React from "react";

import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
const ContactPage = () => {
  return (
    <section className="font-display  bg-base-100 dark:bg-base-300 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto mt-20">
        <header className="text-center mb-12 lg:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content"
          >
            GET IN <span className="text-primary">TOUCH</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
          ></motion.div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">
                SEND A MESSAGE
              </h2>
              <p className="text-base-content/70">
                Have a question or want to work together? Fill out the form
                below and I'll get back to you as soon as possible.
              </p>
            </div>
            <form
              action="https://formsubmit.co/omarfaruk.codes69@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* Hidden Inputs for FormSubmit Configuration */}
              <input
                type="hidden"
                name="_subject"
                value="New Submission from Portfolio Contact Form"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="http://localhost:3000/contact"
              />

              <div>
                <label className="sr-only" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-base-100 border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none rounded-lg text-base-content placeholder-base-content/50 transition-all duration-300"
                  id="name"
                  name="name"
                  placeholder="Your Name*"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 bg-base-100 border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none rounded-lg text-base-content placeholder-base-content/50 transition-all duration-300"
                  id="email"
                  name="email"
                  placeholder="Your Email*"
                  required
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-base-100 border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none rounded-lg text-base-content placeholder-base-content/50 transition-all duration-300 resize-none"
                  id="message"
                  name="message"
                  placeholder="Your Message*"
                  required
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300"
                  type="submit"
                >
                  Submit Message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-200 p-8 sm:p-10 rounded-2xl shadow-xl border border-base-content/10 flex flex-col justify-center h-full"
          >
            <h3 className="text-2xl font-bold text-base-content mb-8 border-b border-base-content/10 pb-4">
              Contact Info
            </h3>
            <ul className="space-y-10">
              {/* Location (Icon + Text) */}
              <li className="flex items-center space-x-6 group">
                <div className="flex-shrink-0 p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-3xl text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content text-xl mb-1">
                    Address
                  </h3>
                  <p className="text-base-content/70 text-lg">
                    Mirpur, Dhaka, Bangladesh
                  </p>
                </div>
              </li>

              {/* Social Media Icons (Only Icons) */}
              <li className="pt-4">
                <h3 className="font-bold text-base-content text-xl mb-6">
                  Connect With Me
                </h3>
                <div className="flex items-center space-x-6">
                  <a
                    href="https://github.com/omarfaruk21221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-base-100 hover:bg-gray-800 text-gray-800 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                    title="GitHub"
                  >
                    <FaGithub className="text-3xl" />
                  </a>
                  <a
                    href="https://www.facebook.com/omarfaruk21221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                    title="Facebook"
                  >
                    <FaFacebook className="text-3xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/omarfaruk21221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-3xl" />
                  </a>
                  <a
                    href="https://wa.me/8801768838715"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
                    title="WhatsApp"
                  >
                    <FaWhatsapp className="text-3xl" />
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        </main>
      </div>
    </section>
  );
};

export default ContactPage;
