import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I book a decoration service?",
      answer:
        "You can book any decoration service directly from our website by clicking the Start Booking or View Details button, or by contacting us via phone, WhatsApp, or email.",
      category: "Booking",
      icon: "📅",
    },
    {
      id: 2,
      question: "Do you provide services outside Dhaka?",
      answer:
        "Yes, we mainly operate in major cities like Dhaka, but we can also arrange projects in nearby areas depending on the event size and requirements.",
      category: "Service Area",
      icon: "🗺️",
    },
    {
      id: 3,
      question: "Can you customize the decoration based on my theme?",
      answer:
        "Absolutely! All our setups, including wedding stages, birthday decor, and corporate events, can be fully customized to match your preferred theme, colors, and budget.",
      category: "Customization",
      icon: "🎨",
    },
    {
      id: 4,
      question: "What is included in your package price?",
      answer:
        "Each package clearly mentions what is included, such as flowers, lighting, backdrops, and props. Extra custom items may require additional charges after consultation.",
      category: "Pricing",
      icon: "💰",
    },
    {
      id: 5,
      question: "Do you offer on-site visits before the event?",
      answer:
        "Yes, for larger events like weddings or corporate seminars, our team can visit the venue in advance to plan measurements, layout, and installation details properly.",
      category: "Planning",
      icon: "📍",
    },
    {
      id: 6,
      question: "How early should I book my event decoration?",
      answer:
        "For weddings and big events, we recommend booking at least 2–4 weeks in advance. For small home or birthday setups, 5–7 days notice is usually enough.",
      category: "Booking",
      icon: "⏰",
    },
    {
      id: 7,
      question: "Do you handle setup and removal?",
      answer:
        "Yes, our team takes care of complete installation before the event and safely removes all decor items after the program ends, as per the agreed schedule.",
      category: "Service",
      icon: "🛠️",
    },
    {
      id: 8,
      question: "Is there any advance payment required?",
      answer:
        "We usually take a percentage of the total amount as advance to confirm your booking, and the remaining balance is paid on the event day after setup.",
      category: "Payment",
      icon: "📄",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const iconVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 180 },
  };

  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about our courses, account, and
            learning experience
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-base-300 overflow-hidden"
              >
                {/* Question Header */}
                <motion.button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className={`w-full px-6 md:px-8 py-4 md:py-5 flex items-center justify-between text-left font-semibold text-base md:text-lg transition-colors ${
                    activeIndex === index
                      ? "bg-primary/5 text-primary border-b border-primary/20"
                      : "text-base-content hover:bg-base-200"
                  }`}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                >
                  <span className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <span className="text-2xl md:text-3xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="break-words">{item.question}</span>
                  </span>

                  <motion.div
                    variants={iconVariants}
                    animate={activeIndex === index ? "visible" : "hidden"}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.button>

                {/* Answer Content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-6 md:px-8 py-4 md:py-5 text-base-content/80 text-sm md:text-base leading-relaxed border-t border-base-300"
                    >
                      <motion.div
                        className="h-1 bg-linear-to-r from-primary to-accent rounded-full mb-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{ transformOrigin: "left" }}
                      />
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
