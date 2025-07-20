import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AnimatedText = ({
  type: Component = "div",
  animation,
  delay = 0,
  children,
  className,
}) => {
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay },
    },
    "fade-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
    },
    "fade-down": {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
    },
  };

  const animationProps = animations[animation] || animations["fade"];

  return (
    <motion.div {...animationProps} className={className}>
      <Component>{children}</Component>
    </motion.div>
  );
};

export const TypeWriter = ({ text, speed = 50, repeat = 1, className }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (repeat === Infinity || iteration < repeat - 1) {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
        setIteration((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, repeat, iteration]);

  return <span className={className}>{displayText}</span>;
};

export const ScrollReveal = ({
  children,
  animation = "fade-up",
  className,
}) => {
  const animations = {
    "fade-up": {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 },
    },
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.6 },
    },
  };

  const animationProps = animations[animation] || animations["fade"];

  return (
    <motion.div {...animationProps} className={className}>
      {children}
    </motion.div>
  );
};

export const SplitText = ({
  text,
  animation = "chars",
  tag: Tag = "span",
  className,
}) => {
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "inline-block" }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};
