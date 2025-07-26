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
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Silk from "../components/Silk";

const glassStyle = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();
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
    if (!user) {
      navigate("/signin");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchAllData();
  }, [user, navigate]);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [contactsRes, projectsRes, educationsRes, usersRes] =
        await Promise.all([
          fetch("http://localhost:5000/api/contacts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/projects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/educations", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      const [contactsData, projectsData, educationsData, usersData] =
        await Promise.all([
          contactsRes.json(),
          projectsRes.json(),
          educationsRes.json(),
          usersRes.json(),
        ]);

      setContacts(contactsData.data || []);
      setProjects(projectsData.data || []);
      setEducations(educationsData.data || []);
      setUsers(usersData.data || []);

      setStats({
        contacts: contactsData.data?.length || 0,
        projects: projectsData.data?.length || 0,
        educations: educationsData.data?.length || 0,
        users: usersData.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, navigate to signin
      navigate("/signin");
    }
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[20px] p-6"
      style={glassStyle}
    >
      <h3 className="text-xl font-semibold text-indigo-200 mb-4 capitalize">
        {type} ({data.length})
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-indigo-400/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-3 px-4 text-indigo-300 font-medium"
                >
                  {column.label}
                </th>
              ))}
              <th className="py-3 px-4 text-indigo-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-indigo-400/10">
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4 text-indigo-200">
                    {column.render
                      ? column.render(item[column.key])
                      : item[column.key]}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(type, item._id)}
                      className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Mail}
              title="Contacts"
              value={stats.contacts}
              color="text-blue-400"
            />
            <StatCard
              icon={Folder}
              title="Projects"
              value={stats.projects}
              color="text-green-400"
            />
            <StatCard
              icon={GraduationCap}
              title="Education"
              value={stats.educations}
              color="text-purple-400"
            />
            <StatCard
              icon={Users}
              title="Users"
              value={stats.users}
              color="text-orange-400"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "contacts", label: "Contacts", icon: Mail },
              { id: "projects", label: "Projects", icon: Folder },
              { id: "educations", label: "Education", icon: GraduationCap },
              { id: "users", label: "Users", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-400/20 text-indigo-300 border border-indigo-400/30"
                    : "text-indigo-200 hover:bg-indigo-400/10"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <DataTable
                data={contacts.slice(0, 5)}
                type="contacts"
                columns={[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  {
                    key: "message",
                    label: "Message",
                    render: (text) => text?.substring(0, 50) + "...",
                  },
                ]}
              />
              <DataTable
                data={projects.slice(0, 5)}
                type="projects"
                columns={[
                  { key: "title", label: "Title" },
                  {
                    key: "description",
                    label: "Description",
                    render: (text) => text?.substring(0, 50) + "...",
                  },
                  { key: "technologies", label: "Technologies" },
                ]}
              />
            </div>
          )}

          {activeTab === "contacts" && (
            <DataTable
              data={contacts}
              type="contacts"
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "message", label: "Message" },
                {
                  key: "createdAt",
                  label: "Date",
                  render: (date) => new Date(date).toLocaleDateString(),
                },
              ]}
            />
          )}

          {activeTab === "projects" && (
            <DataTable
              data={projects}
              type="projects"
              columns={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description" },
                { key: "technologies", label: "Technologies" },
                { key: "githubUrl", label: "GitHub" },
                { key: "liveUrl", label: "Live URL" },
              ]}
            />
          )}

          {activeTab === "educations" && (
            <DataTable
              data={educations}
              type="educations"
              columns={[
                { key: "degree", label: "Degree" },
                { key: "institution", label: "Institution" },
                { key: "year", label: "Year" },
                { key: "description", label: "Description" },
              ]}
            />
          )}

          {activeTab === "users" && (
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
                  render: (date) => new Date(date).toLocaleDateString(),
                },
              ]}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
