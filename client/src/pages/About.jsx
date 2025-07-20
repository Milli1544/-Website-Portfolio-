import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Silk from "../components/Silk";

const About = () => {
  // Skills data
  const skills = [
    { name: "HTML/CSS/JavaScript", percentage: 90 },
    { name: "C#", percentage: 85 },
    { name: "Database Management", percentage: 82 },
    { name: "Linux/Unix", percentage: 80 },
    { name: "UI/UX Design", percentage: 75 },
    { name: "Software Engineering", percentage: 85 },
  ];

  // Education data
  const education = [
    {
      period: "2024 - Present",
      degree: "Advanced Diploma in Software Engineering Technology (Co-op)",
      institution: "Centennial College",
      description:
        "Specializing in client-side web development, programming, and database concepts. Expected graduation: 2027",
    },
  ];

  // Experience data
  const experience = [
    {
      period: "2021 - Present",
      role: "Delivery Driver",
      company: "Hunger Hub",
      description:
        "Manage multiple deliveries efficiently using the Hunger Hub app, maintaining high customer satisfaction through professional communication and prompt service.",
    },
    {
      period: "June 2022 - August 2022",
      role: "Ebike Repair Technician",
      company: "DAYMARK",
      description:
        "Diagnosed and repaired electronic and mechanical issues, assembled new bikes, and maintained detailed documentation.",
    },
  ];

  const handleContactClick = () => {
    // Navigate to contact section or open contact modal
    console.log("Contact clicked");
  };

  return (
    <div className="relative w-full min-h-screen">
      <Silk />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-custom relative">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-50/50 to-primary-50/50 dark:from-dark-900/50 dark:to-dark-800/50 backdrop-blur-[2px]"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto relative"
          >
            <h1 className="mb-6 text-dark-900 dark:text-white">About Me</h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 mb-8">
              Get to know me, my background, and my journey in software
              development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-dark-900/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="w-full max-w-[400px] relative z-10">
                <ProfileCard
                  name="Milyon Kifleyesus"
                  title="Software Engineering Student"
                  handle="milyonkifle"
                  status="Available for Opportunities"
                  contactText={
                    <div className="w-full px-4 py-2 text-center bg-gradient-to-r from-indigo-400 to-violet-400 rounded-xl text-white hover:opacity-90 transition-all duration-300">
                      <Link to="/contact" className="block w-full h-full">
                        Contact Me
                      </Link>
                    </div>
                  }
                  avatarUrl="/images/milli.jpg"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={handleContactClick}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-100/20 dark:bg-primary-900/20 rounded-xl backdrop-blur-sm"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-3xl font-bold mb-6 text-dark-900 dark:text-white">
                Who I Am
              </h2>
              <p className="text-dark-600 dark:text-dark-300 mb-4">
                I'm a passionate software development student at Centennial
                College with a strong foundation in client-side web development
                and programming. I specialize in creating responsive websites
                and applications while maintaining a focus on software
                engineering principles.
              </p>
              <p className="text-dark-600 dark:text-dark-300 mb-6">
                With experience in various technologies including HTML, CSS,
                JavaScript, and C#, I'm constantly learning and adapting to new
                technologies. I have a particular interest in database
                management and UI/UX design.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-dark-500 dark:text-dark-400">Name:</p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    Milyon Kifleyesus
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400">Email:</p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    milyon.kifleyesus@email.com
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400">Phone:</p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    (647) 809-3271
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400">Location:</p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    York, ON
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="/public/Resume.pdf"
                  className="btn-primary flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <ArrowDownToLine size={18} className="ml-2" />
                </a>
                <Link to="/contact" className="btn-outline">
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-dark-50/30 dark:bg-dark-800/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-dark-900 dark:text-white">My Skills</h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Here's a breakdown of my technical expertise and skill levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-dark-800 dark:text-dark-200">
                    {skill.name}
                  </span>
                  <span className="text-primary-500 dark:text-primary-400">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-dark-900/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-dark-900 dark:text-white">
              Education & Experience
            </h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              My academic background and professional journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <div className="flex items-center mb-8">
                <GraduationCap
                  size={24}
                  className="text-primary-500 dark:text-primary-400 mr-3"
                />
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                  Education
                </h3>
              </div>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l-2 border-dark-200 dark:border-dark-700"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                    <span className="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2 block">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {item.degree}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-300 mb-2">
                      {item.institution}
                    </p>
                    <p className="text-dark-500 dark:text-dark-400 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <div className="flex items-center mb-8">
                <Briefcase
                  size={24}
                  className="text-primary-500 dark:text-primary-400 mr-3"
                />
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                  Experience
                </h3>
              </div>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l-2 border-dark-200 dark:border-dark-700"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                    <span className="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2 block">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {item.role}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-300 mb-2">
                      {item.company}
                    </p>
                    <p className="text-dark-500 dark:text-dark-400 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-dark-50/30 dark:bg-dark-800/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h2 className="mb-6 text-dark-900 dark:text-white">
              Ready to Work Together?
            </h2>
            <p className="text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center"
            >
              Get in Touch <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
