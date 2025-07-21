import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Folder, User, Mail, Calendar, FileText, CheckCircle, AlertCircle, Trash2, Edit } from "lucide-react";
import Silk from "../components/Silk";

const glassStyle = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
};

const ProjectForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      navigate("/signin");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Pre-fill user data
    setFormData(prev => ({
      ...prev,
      firstname: parsedUser.name.split(" ")[0] || "",
      lastname: parsedUser.name.split(" ").slice(1).join(" ") || "",
      email: parsedUser.email,
    }));

    // Fetch existing projects
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects");
      const result = await response.json();
      if (response.ok) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }
    
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
    
    if (!formData.completion.trim()) {
      newErrors.completion = "Completion date is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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
    
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const token = localStorage.getItem("token");
      const url = editingId 
        ? `http://localhost:3000/api/projects/${editingId}`
        : "http://localhost:3000/api/projects";
      
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        
        setTimeout(() => {
          setFormData({
            title: "",
            firstname: user.name.split(" ")[0] || "",
            lastname: user.name.split(" ").slice(1).join(" ") || "",
            email: user.email,
            completion: "",
            description: "",
          });
          setEditingId(null);
          fetchProjects();
          setShowSuccess(false);
        }, 1500);
      } else {
        setServerError(result.message || "Operation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion.split('T')[0], // Format date for input
      description: project.description,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      firstname: user.name.split(" ")[0] || "",
      lastname: user.name.split(" ").slice(1).join(" ") || "",
      email: user.email,
      completion: "",
      description: "",
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                {editingId ? "Edit Project" : "Add Project"}
              </h1>
              <p className="text-lg text-indigo-200">
                {editingId ? "Update your project information" : "Add your project details"}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-[32px] overflow-hidden relative p-8"
                style={glassStyle}
              >
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* Title Field */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-2 text-indigo-200"
                    >
                      Project Title
                    </label>
                    <div className="relative">
                      <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                          errors.title
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                            : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                        }`}
                        placeholder="e.g., Portfolio Website"
                      />
                    </div>
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                    )}
                  </div>

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
                          placeholder="First name"
                        />
                      </div>
                      {errors.firstname && (
                        <p className="mt-1 text-sm text-red-400">{errors.firstname}</p>
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
                        placeholder="Last name"
                      />
                      {errors.lastname && (
                        <p className="mt-1 text-sm text-red-400">{errors.lastname}</p>
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

                  {/* Completion Date */}
                  <div>
                    <label
                      htmlFor="completion"
                      className="block text-sm font-medium mb-2 text-indigo-200"
                    >
                      Completion Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="date"
                        id="completion"
                        value={formData.completion}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                          errors.completion
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                            : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                        }`}
                      />
                    </div>
                    {errors.completion && (
                      <p className="mt-1 text-sm text-red-400">{errors.completion}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2 text-indigo-200"
                    >
                      Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-indigo-400 w-5 h-5" />
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 resize-none ${
                          errors.description
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                            : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                        }`}
                        placeholder="Describe your project..."
                      />
                    </div>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                    )}
                  </div>

                  {/* Server Error */}
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-sm text-red-400">{serverError}</p>
                    </motion.div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300 relative overflow-hidden disabled:opacity-70"
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
                            <span>{editingId ? "Updated!" : "Added!"}</span>
                          </motion.div>
                        ) : isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            {editingId ? "Updating..." : "Adding..."}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            {editingId ? "Update Project" : "Add Project"}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    {editingId && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-6 py-3 rounded-full border border-indigo-400/20 text-indigo-300 hover:bg-indigo-400/10 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>

              {/* Projects List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-indigo-200 mb-4">Your Projects</h3>
                
                {projects.length === 0 ? (
                  <div className="rounded-[20px] p-6 text-center" style={glassStyle}>
                    <Folder className="mx-auto w-12 h-12 text-indigo-400 mb-3" />
                    <p className="text-indigo-200">No projects yet.</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project._id}
                      className="rounded-[20px] p-6 relative"
                      style={glassStyle}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-indigo-100">
                          {project.title}
                        </h4>
                        {user.role === "admin" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-400/10 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="p-2 text-red-400 hover:text-white hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-indigo-200 mb-2">
                        {project.firstname} {project.lastname}
                      </p>
                      <p className="text-indigo-300 text-sm mb-2">
                        Completed: {new Date(project.completion).toLocaleDateString()}
                      </p>
                      <p className="text-indigo-200 text-sm">
                        {project.description}
                      </p>
                    </div>
                  ))
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectForm;