import React from "react";
import { motion, useAnimation } from "framer-motion";

const GradientCard = ({ title, subtitle, features }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-[800px] mx-auto rounded-[32px] overflow-hidden relative group"
      style={{
        padding: "40px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
      }}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) }
            50% { transform: translateY(-10px) }
            100% { transform: translateY(0px) }
          }
        `}
      </style>

      <div className="relative z-10">
        {/* Title with floating animation */}
        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text mb-6 inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.h3
            className="text-2xl bg-gradient-to-r from-blue-300 to-violet-300 text-transparent bg-clip-text mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {subtitle}
          </motion.h3>
        )}

        {/* Features List with staggered animation */}
        <motion.ul
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="text-indigo-200 text-lg flex items-start gap-3 group/item hover:text-white transition-colors duration-300"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 mt-2 flex-shrink-0 group-hover/item:scale-125"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Pure glass effect */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
    </motion.div>
  );
};

export default GradientCard;
