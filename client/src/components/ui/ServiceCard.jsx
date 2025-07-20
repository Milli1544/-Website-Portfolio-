import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.icon - The icon component to display
 * @param {string} props.title - The service title
 * @param {string} props.description - The service description
 * @param {string[]} props.features - List of service features
 * @param {string} props.price - The service price
 * @param {boolean} [props.recommended=false] - Whether this service is recommended
 */
const ServiceCard = ({
  icon,
  title,
  description,
  features,
  price,
  recommended = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`rounded-xl overflow-hidden shadow-lg ${
        recommended
          ? "border-2 border-primary-500 dark:border-primary-400 relative"
          : "border border-dark-200 dark:border-dark-700"
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-primary-500 dark:bg-primary-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
          Recommended
        </div>
      )}

      <div className="bg-white dark:bg-dark-800 p-8">
        <div
          className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${
            recommended
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400"
              : "bg-dark-100 dark:bg-dark-700 text-dark-500 dark:text-dark-300"
          }`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">
          {title}
        </h3>
        <p className="text-dark-600 dark:text-dark-300 mb-6">{description}</p>

        <div className="mb-8">
          <div className="mb-4 text-xl font-bold text-dark-900 dark:text-white">
            {price}
          </div>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 dark:text-primary-400 mr-2 mt-1">
                  <CheckCircle2 size={16} />
                </span>
                <span className="text-dark-600 dark:text-dark-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/contact"
          className={`w-full block text-center py-3 px-6 rounded-lg transition-colors ${
            recommended
              ? "bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white"
              : "bg-dark-100 dark:bg-dark-700 hover:bg-dark-200 dark:hover:bg-dark-600 text-dark-800 dark:text-dark-200"
          }`}
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
