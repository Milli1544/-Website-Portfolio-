import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Globe,
  Smartphone,
  Palette,
  LineChart,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  ArrowRight,
  Layout,
  Rocket,
} from "lucide-react";
import Silk from "../components/Silk";

/**
 * @typedef {Object} ServiceProps
 * @property {React.ReactNode} icon - The service icon
 * @property {string} title - The service title
 * @property {string} description - The service description
 * @property {string[]} features - List of service features
 * @property {string} price - The service price
 * @property {boolean} [recommended=false] - Whether this service is recommended
 */

/**
 * @param {ServiceProps} props
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
      className={`glass-card overflow-hidden ${
        recommended
          ? "ring-2 ring-primary-500 dark:ring-primary-400 relative"
          : ""
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-primary-500 dark:bg-primary-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
          Recommended
        </div>
      )}

      <div className="p-8">
        <div
          className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${
            recommended
              ? "bg-primary-100/50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400"
              : "bg-dark-100/50 dark:bg-dark-700/30 text-dark-500 dark:text-dark-300"
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
              : "bg-dark-100/50 dark:bg-dark-700/30 hover:bg-dark-200/50 dark:hover:bg-dark-600/50 text-dark-800 dark:text-dark-200"
          }`}
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description:
        "Creating responsive and modern web applications using the latest technologies.",
      features: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Performance Optimization",
      ],
    },
    {
      icon: <Database size={32} />,
      title: "Database Design",
      description:
        "Designing and implementing efficient database solutions for your applications.",
      features: [
        "Database Architecture",
        "Data Modeling",
        "Query Optimization",
        "Data Migration",
      ],
    },
    {
      icon: <Layout size={32} />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and beautiful user interfaces with great user experience.",
      features: [
        "Wireframing",
        "Prototyping",
        "User Research",
        "Interface Design",
      ],
    },
    {
      icon: <Rocket size={32} />,
      title: "Project Management",
      description:
        "Managing projects from conception to delivery with agile methodologies.",
      features: [
        "Agile Development",
        "Sprint Planning",
        "Risk Management",
        "Team Leadership",
      ],
    },
  ];

  return (
    <div className="relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">My Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive solutions for your digital needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold ml-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
