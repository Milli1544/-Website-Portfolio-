import React from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {string} props.title - The project title
 * @param {string} props.description - The project description
 * @param {string} props.image - URL of the project image
 * @param {string[]} props.technologies - List of technologies used
 * @param {string} props.githubUrl - GitHub repository URL
 * @param {string} props.liveUrl - Live demo URL
 * @param {boolean} [props.featured=false] - Whether this is a featured project
 */
const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  featured = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Project Image */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/40 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} className="text-white" />
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/40 transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {featured && (
          <span className="inline-block px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-3">
            Featured
          </span>
        )}
        <h3 className="text-xl font-bold mb-3 text-dark-900 dark:text-white">
          {title}
        </h3>
        <p className="text-dark-600 dark:text-dark-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
