import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Silk from "../components/Silk";
import GradientCard from "../components/GradientCard";
import {
  ArrowRight,
  Code,
  Globe,
  Palette,
  Cpu,
  CheckCircle2,
  ArrowDownToLine,
  BrainCircuit,
  Rocket,
} from "lucide-react";
import {
  AnimatedText,
  TypeWriter,
  ScrollReveal,
  SplitText,
} from "../components/animations";

const Home = () => {
  const featuredProjectFeatures = [
    "HTML & Accessibility: Semantic structure, forms, links & media",
    "CSS3 Styling & Layout: Box Model, Flexbox, Grid, hover effects & transitions",
    "JavaScript Fundamentals: Variables, control flow, functions (including arrow & scope), arrays & objects",
    "DOM & Events: Dynamic content updates, event handling, form validation",
    "Interactive Features & Modularity: Image sliders, calculators, basic games, modular scripts & code reuse",
  ];

  return (
    <div className="min-h-screen relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              type="h1"
              animation="fade-down"
              className="mb-6"
              delay={0.2}
            >
              <span>Hi, I'm </span>
              <SplitText
                text="Milyon Kifleyesus"
                animation="chars"
                className="text-primary-500 dark:text-primary-400 inline-block"
              />
            </AnimatedText>
/*
            <AnimatedText
              type="div"
              animation="fade-up"
              delay={0.4}
              className="h-12 mb-8 text-2xl md:text-3xl lg:text-4xl text-dark-800 dark:text-dark-100"
            >
              <TypeWriter
                text="Software Developer"
                speed={50}
                className="font-heading"
                repeat={Infinity}
              />
            </AnimatedText>

            <AnimatedText
              type="p"
              animation="fade"
              delay={0.6}
              className="mb-10 text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto"
            >
              A passionate software engineering student specializing in web
              development, database management, and creating user-friendly
              applications.
            </AnimatedText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/projects" className="btn-primary">
                View My Work <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <ScrollReveal animation="fade-up" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <SplitText
              text="My Skills"
              animation="chars"
              tag="h2"
              className="mb-4"
            />
            <AnimatedText
              type="p"
              animation="fade-up"
              delay={0.2}
              className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto"
            >
              Here are some of the key technologies and tools I work with
            </AnimatedText>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Code size={36} />,
                title: "Web Development",
                desc: "HTML, CSS, JavaScript, Responsive Design",
              },
              {
                icon: <Palette size={36} />,
                title: "Software Engineering",
                desc: "C#, Object-Oriented Programming",
              },
              {
                icon: <Globe size={36} />,
                title: "Database Management",
                desc: "SQL, Database Design",
              },
              {
                icon: <BrainCircuit size={36} />,
                title: "System Administration",
                desc: "Linux/Unix, Operating Systems",
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="mb-4 text-primary-500 dark:text-primary-400 flex justify-center"
                >
                  {skill.icon}
                </motion.div>
                <AnimatedText
                  type="h3"
                  animation="fade-up"
                  delay={index * 0.1 + 0.3}
                  className="text-xl font-semibold mb-3"
                >
                  {skill.title}
                </AnimatedText>
                <AnimatedText
                  type="p"
                  animation="fade"
                  delay={index * 0.1 + 0.4}
                  className="text-dark-600 dark:text-dark-300"
                >
                  {skill.desc}
                </AnimatedText>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4">What I Do</h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Specialized skills and areas of expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe size={32} />,
                title: "Web Development",
                desc: "Creating responsive and user-friendly websites using modern technologies.",
              },
              {
                icon: <Cpu size={32} />,
                title: "Software Development",
                desc: "Building robust applications with focus on clean, maintainable code.",
              },
              {
                icon: <Rocket size={32} />,
                title: "Database Design",
                desc: "Designing and implementing efficient database solutions.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="mb-4 p-3 bg-primary-50/30 dark:bg-dark-800/50 rounded-full w-fit text-primary-500 dark:text-primary-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-6">
                  {service.desc}
                </p>
                <Link
                  to="/services"
                  className="text-primary-500 dark:text-primary-400 font-medium inline-flex items-center hover:underline"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4">Featured Project</h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Check out one of my recent projects
            </p>
          </motion.div>

          <GradientCard
            title="Web Application Development"
            subtitle="with JavaScript"
            features={featuredProjectFeatures}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
