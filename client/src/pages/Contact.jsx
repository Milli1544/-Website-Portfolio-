import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Silk from "../components/Silk";
import { Mail, MapPin, Linkedin, CheckCircle, User, MessageCircle } from "lucide-react";

const glassStyle = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
};

const ContactInfoCard = ({ icon: Icon, title, children }) => (
  <motion.div
    className="rounded-[32px] overflow-hidden relative p-6"
    style={glassStyle}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-start relative z-10">
      <div className="p-3 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-lg border border-indigo-400/20">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold mb-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
          {title}
        </h3>
        {children}
      </div>
    </div>
  </motion.div>
);

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ 
          firstname: "", 
          lastname: "", 
          email: "",
          message: "" 
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        // Handle validation errors from server
        if (result.message) {
          alert(result.message);
        } else {
          alert("Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      <section className="pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
              Get in Touch
            </h1>
            <p className="text-lg text-indigo-200 mb-12">
              Have a question or want to work together? I'd love to hear from
              you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[32px] overflow-hidden relative p-8"
              style={glassStyle}
            >
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium mb-2 text-indigo-200"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="text"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                          errors.firstname
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                            : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                        }`}
                        placeholder="Your first name"
                      />
                    </div>
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.firstname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium mb-2 text-indigo-200"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                        errors.lastname
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                          : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      }`}
                      placeholder="Your last name"
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-indigo-200"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                          : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-indigo-200"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-indigo-400 w-5 h-5" />
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 resize-none ${
                        errors.message
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                          : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      }`}
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300 relative overflow-hidden disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        Sending...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <ContactInfoCard icon={Mail} title="Email">
                <a
                  href="mailto:mili.kifleyesus@gmail.com"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  mili.kifleyesus@gmail.com
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={Linkedin} title="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/milyon-kifleyesus-9170b1364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Milyon Kifleyesus
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={MapPin} title="Location">
                <p className="text-indigo-200">
                  Toronto, ON
                  <br />
                  Canada
                </p>
              </ContactInfoCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;