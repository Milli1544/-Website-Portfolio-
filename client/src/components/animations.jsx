import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Optimized animation variants
const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  "fade-up": {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  "fade-down": {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const AnimatedText = ({
  type: Component = "div",
  animation,
  delay = 0,
  children,
  className,
}) => {
  const animationProps =
    animationVariants[animation] || animationVariants["fade"];

  // Add delay to transition
  const transition = {
    ...animationProps.transition,
    delay: delay * 0.1, // Reduced delay multiplier
  };

  return (
    <motion.div
      {...animationProps}
      transition={transition}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};

export const TypeWriter = ({ text, speed = 50, repeat = 1, className }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iteration, setIteration] = useState(0);

  const resetAnimation = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIteration((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (repeat === Infinity || iteration < repeat - 1) {
      const timeout = setTimeout(resetAnimation, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, repeat, iteration, resetAnimation]);

  return <span className={className}>{displayText}</span>;
};

export const ScrollReveal = ({
  children,
  animation = "fade-up",
  className,
}) => {
  const animationProps = {
    initial: animationVariants[animation].initial,
    whileInView: animationVariants[animation].animate,
    viewport: { once: true, margin: "-50px" }, // Reduced margin for better performance
    transition: { ...animationVariants[animation].transition, duration: 0.3 }, // Faster animation
  };

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
        staggerChildren: 0.02, // Reduced stagger for better performance
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 10, // Reduced movement
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
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
