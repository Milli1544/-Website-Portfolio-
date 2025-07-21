import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Mail, 
  GraduationCap, 
  Folder, 
  Trash2, 
  Eye,
  LogOut,
  Shield,
  BarChart3
} from "lucide-react";
import Silk from "../components/Silk";

const glassStyle = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    contacts: 0,
    projects: 0,
    educations: 0,
    users: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      navigate("/signin");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Fetch all data concurrently
      const [contactsRes, projectsRes, educationsRes, usersRes] = await Promise.all([
        fetch("http://localhost:3000/api/contacts", {
          headers: { "Authorization": `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/api/projects", {
          headers: { "Authorization": `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/api/educations", {
          headers: { "Authorization": `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/api/users", {
          headers: { "Authorization": `Bearer ${token}` },
        }),
      ]);

      const [contactsData, projectsData, educationsData, usersData] = await Promise.all([
        contactsRes.json(),
        projectsRes.json(),
        educationsRes.json(),
        usersRes.json(),
      ]);

      if (contactsData.success) setContacts(contactsData.data);
      if (projectsData.success) setProjects(projectsData.data);
      if (educationsData.success) setEducations(educationsData.data);
      if (usersData.success) setUsers(usersData.data);

      // Update stats
      setStats({
        contacts: contactsData.success ? contactsData.data.length : 0,
        projects: projectsData.success ? projectsData.data.length : 0,
        educations: educationsData.success ? educationsData.data.length : 0,
        users: usersData.success ? usersData.data.length : 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/${type}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAllData(); // Refresh data
      } else {
        alert(`Failed to delete ${type}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Error deleting ${type}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-200">Loading...</div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[20px] p-6"
      style={glassStyle}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-indigo-200 text-sm">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
    </motion.div>
  );

  const DataTable = ({ data, type, columns }) => (
    <div className="rounded-[20px] overflow-hidden" style={glassStyle}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-indigo-100 mb-4 capitalize">
          {type} ({data.length})
        </h3>
        {data.length === 0 ? (
          <p className="text-indigo-200 text-center py-8">No {type} found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-400/20">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="text-left py-3 px-2 text-indigo-200 font-medium"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="text-left py-3 px-2 text-indigo-200 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-indigo-400/10 hover:bg-indigo-400/5"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-2 text-indigo-100">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(type, item._id)}
                          className="p-1 text-red-400 hover:text-white hover:bg-red-400/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="mb-2 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                Admin Dashboard
              </h1>
              <p className="text-lg text-indigo-200">
                Welcome back, {user.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-200">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {[
              { key: "overview", label: "Overview", icon: BarChart3 },
              { key: "contacts", label: "Contacts", icon: Mail },
              { key: "projects", label: "Projects", icon: Folder },
              { key: "educations", label: "Education", icon: GraduationCap },
              { key: "users", label: "Users", icon: Users },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  activeTab === tab.key
                    ? "bg-indigo-400/20 border-indigo-400/40 text-indigo-200"
                    : "border-indigo-400/20 text-indigo-300 hover:bg-indigo-400/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            {activeTab === "overview" && (
              <>
                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <StatCard
                    icon={Mail}
                    title="Total Contacts"
                    value={stats.contacts}
                    color="text-blue-400"
                  />
                  <StatCard
                    icon={Folder}
                    title="Total Projects"
                    value={stats.projects}
                    color="text-green-400"
                  />
                  <StatCard
                    icon={GraduationCap}
                    title="Total Education"
                    value={stats.educations}
                    color="text-purple-400"
                  />
                  <StatCard
                    icon={Users}
                    title="Total Users"
                    value={stats.users}
                    color="text-orange-400"
                  />
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-[20px] p-6"
                  style={glassStyle}
                >
                  <h3 className="text-xl font-semibold text-indigo-100 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map((contact, index) => (
                      <div
                        key={contact._id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-indigo-400/5"
                      >
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-indigo-100">
                            New contact from {contact.firstname} {contact.lastname}
                          </p>
                          <p className="text-indigo-300 text-sm">{contact.email}</p>
                        </div>
                      </div>
                    ))}
                    {contacts.length === 0 && (
                      <p className="text-indigo-200 text-center py-4">
                        No recent activity
                      </p>
                    )}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === "contacts" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DataTable
                  data={contacts}
                  type="contacts"
                  columns={[
                    { key: "firstname", label: "First Name" },
                    { key: "lastname", label: "Last Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "message",
                      label: "Message",
                      render: (item) => (
                        <span className="truncate max-w-xs block">
                          {item.message}
                        </span>
                      ),
                    },
                    {
                      key: "createdAt",
                      label: "Date",
                      render: (item) =>
                        new Date(item.createdAt).toLocaleDateString(),
                    },
                  ]}
                />
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DataTable
                  data={projects}
                  type="projects"
                  columns={[
                    { key: "title", label: "Title" },
                    { key: "firstname", label: "First Name" },
                    { key: "lastname", label: "Last Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "completion",
                      label: "Completion",
                      render: (item) =>
                        new Date(item.completion).toLocaleDateString(),
                    },
                  ]}
                />
              </motion.div>
            )}

            {activeTab === "educations" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DataTable
                  data={educations}
                  type="educations"
                  columns={[
                    { key: "title", label: "Title" },
                    { key: "firstname", label: "First Name" },
                    { key: "lastname", label: "Last Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "completion",
                      label: "Completion",
                      render: (item) =>
                        new Date(item.completion).toLocaleDateString(),
                    },
                  ]}
                />
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DataTable
                  data={users}
                  type="users"
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Role" },
                    {
                      key: "created",
                      label: "Created",
                      render: (item) =>
                        new Date(item.created).toLocaleDateString(),
                    },
                  ]}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;