import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import "./ProfileCard.css";

const ProfileCard = ({
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  onContactClick,
}) => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableTilt || !cardRef.current || !containerRef.current) return;

      const card = cardRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (mouseY - centerY) / 20;
      const rotateY = (centerX - mouseX) / 20;

      // Update CSS variables for glow effect
      container.style.setProperty(
        "--mouse-x",
        `${(mouseX / rect.width) * 100}%`
      );
      container.style.setProperty(
        "--mouse-y",
        `${(mouseY / rect.height) * 100}%`
      );

      card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    },
    [enableTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !containerRef.current) return;

    const container = containerRef.current;
    container.style.setProperty("--mouse-x", "50%");
    container.style.setProperty("--mouse-y", "50%");

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableTilt) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, enableTilt]);

  // Default avatar if none provided
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  return (
    <div ref={containerRef} className="profile-card-container">
      <motion.div
        ref={cardRef}
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-content">
          <motion.h1
            className="name"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {name}
          </motion.h1>

          <motion.h2
            className="title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.div
            className="avatar-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={avatarUrl || defaultAvatar}
              alt={name}
              className="avatar"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
          </motion.div>

          {showUserInfo && (
            <motion.div
              className="user-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="user-details">
                <div className="mini-avatar">
                  <img
                    src={avatarUrl || defaultAvatar}
                    alt={name}
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div className="user-text">
                  <span className="handle">@{handle}</span>
                  <span className="status">{status}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                {contactText}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Card effects */}
        <div className="card-background">
          <div className="gradient-bg"></div>
          <div className="noise-overlay"></div>
          <div className="glow-effect"></div>
          <div className="border-effect"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
