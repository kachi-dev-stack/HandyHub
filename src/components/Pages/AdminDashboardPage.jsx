import { useState, useEffect } from "react";
import {
  FiBarChart2,
  FiTool,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiX,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiMenu,
  FiMinusCircle,
  FiSlash,
  FiUser,
  FiAlertTriangle,
  FiShield,
} from "react-icons/fi";
import {
  addTechnician,
  deleteTechnician,
  getTechnicians,
  updateTechnician,
} from "../../technicianService";
import { getUsers } from "../../userService";
import Spinner from "../UIS/Spinner";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import {
  reload,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
// ===== SIDEBAR =====
function Sidebar({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { id: "technicians", label: "Technicians", icon: <FiTool /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col shadow-2xl transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}
        style={{ backgroundColor: "#1E3A8A" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: "#F97316" }}
            >
              H
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                HandyHub
              </h1>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                ${
                  activeSection === item.id
                    ? "text-white font-semibold shadow-lg"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white"
                }`}
              style={
                activeSection === item.id ? { backgroundColor: "#F97316" } : {}
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-blue-700 hover:text-white transition-all duration-200"
          >
            <FiLogOut className="text-lg" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ===== NAVBAR =====
function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>
        <div>
          <h2 className="font-bold text-gray-800 text-lg">HandyHub Admin</h2>
          <p className="text-xs text-gray-400 hidden sm:block">
            Service Marketplace Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <span className="text-sm text-gray-600">{user?.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-xl text-md font-medium text-white transition-colors"
          style={{ backgroundColor: "#F97316" }}
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}

// ===== STAT CARD =====
function StatCard({ title, value, icon, color, bgColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1" style={{ color }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ===== TECHNICIAN FORM (Modal) =====
function TechnicianForm({ tech, onClose, onSave }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    tech || {
      name: "",
      skill: "",
      location: "",
      status: "Active",
      email: "",
      phone: "",
      bio: "",
      image: "",
      portfolio: [{ url: "", title: "" }],
    },
  );

  useEffect(() => {
    if (tech) {
      setForm(tech);
    }
  }, [tech]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePortfolioChange = (index, field, value) => {
    setForm((prev) => {
      const updatedPortfolio = [...prev.portfolio];

      updatedPortfolio[index] = {
        ...updatedPortfolio[index],
        [field]: value,
      };

      return {
        ...prev,
        portfolio: updatedPortfolio,
      };
    });
  };

  const addPortfolioInput = () => {
    setForm((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, { url: "", title: "" }],
    }));
  };

  const removePortfolioInput = (index) => {
    setForm((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await onSave(form);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving technician");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">
            {tech ? "Edit Technician" : "Add New Technician"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="John Doe"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                style={{ "--tw-ring-color": "#F97316" }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            {/* Skill / Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill / Specialty *
              </label>
              <input
                name="skill"
                value={form.skill}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="e.g. Plumber, Electrician"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>
            {/* LOCATION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="City, State"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>
            {/* STATUS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={loading}
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              >
                <option>Active</option>
                <option>Busy</option>
              </select>
            </div>
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                placeholder="email@example.com"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>
            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                placeholder="+1 (555) 000-0000"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #F97316")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image *
            </label>

            <input
              name="image"
              value={form.image || ""}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://example.com/photo.jpg"
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              disabled={loading}
              rows={3}
              placeholder="Brief description of experience and specializations..."
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm resize-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #F97316")}
              onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>

          {/* PORTFOLIO IMAGES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Portfolio Images *
              </label>

              <button
                type="button"
                onClick={addPortfolioInput}
                disabled={loading}
                className="disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 py-1 rounded-lg font-medium text-white bg-orange-500"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2">
              {form.portfolio.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  {/* URL INPUT ONLY */}
                  <input
                    value={item.url || ""}
                    disabled={loading}
                    onChange={(e) =>
                      handlePortfolioChange(index, "url", e.target.value)
                    }
                    placeholder={`Portfolio image ${index + 1} URL`}
                    className="disabled:opacity-50 disabled:cursor-not-allowed flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                  />

                  {/* TITLE INPUT */}
                  <input
                    value={item.title || ""}
                    disabled={loading}
                    onChange={(e) =>
                      handlePortfolioChange(index, "title", e.target.value)
                    }
                    placeholder="Image Title"
                    className="disabled:opacity-50 disabled:cursor-not-allowed flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
                    required
                  />

                  {/* REMOVE BUTTON */}
                  {form.portfolio.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePortfolioInput(index)}
                      disabled={loading}
                      className="disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit / Cancel */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="disabled:opacity-50 disabled:cursor-not-allowed flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="disabled:cursor-not-allowed flex-1 px-6 py-3 rounded-xl text-white font-medium text-sm transition-colors"
              style={{ backgroundColor: "#F97316" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea6c0a")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#F97316")}
            >
              {loading ? "Saving..." : tech ? "Save Changes" : "Add Technician"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== TECHNICIAN PROFILE PREVIEW =====
function TechnicianProfile({ tech, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">
            Technician Profile
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <img
              src={
                tech.image || "https://randomuser.me/api/portraits/lego/1.jpg"
              }
              alt={tech.name}
              className="w-24 h-24 rounded-2xl object-cover shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-800">{tech.name}</h2>
              <p className="text-orange-500 font-semibold mt-0.5">
                {tech.skill}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {" "}
                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {tech.location}
                </span>
              </p>
              <span
                className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  tech.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {tech.status === "Active" ? (
                  <span className="flex items-center gap-2">
                    <FiCheckCircle /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FiClock /> Busy
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <FiMail />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-700">
                  {tech.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <FiPhone />
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-700">
                  {tech.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {tech.bio && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                About
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {tech.bio}
              </p>
            </div>
          )}

          {/* Portfolio */}
          {tech.portfolio && tech.portfolio.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Portfolio
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tech.portfolio.filter(Boolean).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Portfolio ${i + 1}`}
                    className="w-full h-28 object-cover rounded-xl shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onDelete(tech.id);
                onClose();
              }}
              className="flex-1 px-6 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onEdit(tech);
                onClose();
              }}
              className="flex-1 px-6 py-3 rounded-xl text-white font-medium text-sm transition-colors"
              style={{ backgroundColor: "#1E3A8A" }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== TECHNICIAN TABLE =====
function TechnicianTable({ technicians, refreshTechnicians, loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [viewingTech, setViewingTech] = useState(null);

  const filtered = technicians.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.skill.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = async (form) => {
    try {
      if (editingTech && editingTech.id) {
        await updateTechnician(editingTech.id, form);
      } else {
        await addTechnician(form);
      }

      await refreshTechnicians();
      setEditingTech(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("deleting: ", id);
    if (!confirm("Delete this technician?")) return;

    try {
      await deleteTechnician(id);
      await refreshTechnicians();
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (tech) => {
    setEditingTech(tech);
    setShowForm(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Technicians</h2>
          <p className="text-sm text-gray-500 mt-1">
            {technicians.length} registered technicians
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTech(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md transition-colors"
          style={{ backgroundColor: "#F97316" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea6c0a")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#F97316")}
        >
          + Add Technician
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search by name, skill, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #F97316")}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #F97316")}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        >
          <option>All</option>
          <option>Active</option>
          <option>Busy</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Technician
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Skill
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Location
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Contact
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Spinner fullScreen={false} text="Loading technicians..." />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-400 text-sm"
                >
                  No technicians found
                </td>
              </tr>
            ) : (
              filtered.map((tech, index) => (
                <tr
                  key={tech.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          tech.image ||
                          "https://randomuser.me/api/portraits/lego/1.jpg"
                        }
                        alt={tech.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <span className="font-semibold text-gray-800 text-sm">
                        {tech.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tech.skill}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <FiMapPin /> {tech.location}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        tech.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {tech.status === "Active" ? (
                        <span className="flex items-center gap-2">
                          <FiCheckCircle /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <FiClock /> Busy
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500">
                      <div>{tech.email}</div>
                      <div>{tech.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingTech(tech)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => openEdit(tech)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-50 hover:bg-orange-100 transition-colors"
                        style={{ color: "#F97316" }}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        onClick={() => handleDelete(tech.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm shadow-sm border border-gray-100">
            No technicians found
          </div>
        ) : (
          filtered.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={
                    tech.image ||
                    "https://randomuser.me/api/portraits/lego/1.jpg"
                  }
                  alt={tech.name}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800">{tech.name}</h4>
                  <p className="text-sm text-gray-500">{tech.skill}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <FiMapPin /> {tech.location}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    tech.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {tech.status === "Active" ? (
                    <span className="flex items-center gap-2">
                      <FiCheckCircle /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiClock /> Busy
                    </span>
                  )}
                </span>
              </div>
              <div className="text-xs text-gray-500 space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  <FiMail /> {tech.email}
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone /> {tech.phone}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewingTech(tech)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium bg-blue-50 text-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => openEdit(tech)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium bg-orange-50"
                  style={{ color: "#F97316" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tech.id)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium bg-red-50 text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <TechnicianForm
          tech={editingTech}
          onClose={() => {
            setShowForm(false);
            setEditingTech(null);
          }}
          onSave={handleSave}
        />
      )}
      {viewingTech && (
        <TechnicianProfile
          tech={viewingTech}
          onClose={() => setViewingTech(null)}
          onEdit={(tech) => {
            setViewingTech(null);
            openEdit(tech);
          }}
          onDelete={(id) => {
            handleDelete(id);
          }}
        />
      )}
    </div>
  );
}

// ===== USER TABLE =====
function UserTable({ users, setUsers, refreshUsers, loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await updateDoc(doc(db, "users", id), {
        status: newStatus,
      });

      // Update UI
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await deleteDoc(doc(db, "users", id));

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Format Date
  const formateDate = (date) => {
    if (!date) return "N/A";

    // Firestore Timestamp
    if (typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <p className="text-sm text-gray-500 mt-1">
          {users.length} registered users
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm"
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #F97316")}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm bg-white"
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #F97316")}
          onBlur={(e) => (e.target.style.boxShadow = "")}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date Joined
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Spinner fullScreen={false} text="Loading Users..." />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-400 text-sm"
                >
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: "#1E3A8A" }}
                      >
                        {user.email[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <span className="flex items-center gap-2">
                          <FiCheckCircle /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <FiMinusCircle /> Inactive
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formateDate(user.dateJoined)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(user.id, user.status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          user.status === "Active"
                            ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {user.status === "Active" ? (
                          <span className="flex items-center gap-2">
                            <FiSlash /> Deactivate
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <FiCheckCircle /> Activate
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {" "}
                          <FiTrash2 /> Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm shadow-sm border border-gray-100">
            No users found
          </div>
        ) : (
          filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: "#1E3A8A" }}
                  >
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 break-all">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      Joined:{formateDate(user.dateJoined)}
                    </p>
                  </div>
                </div>
                <span
                  className={`ml-2 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {user.status === "Active" ? (
                    <span className="flex items-center gap-2">
                      <FiCheckCircle /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiMinusCircle /> Inactive
                    </span>
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(user.id, user.status)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium bg-red-50 text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ===== DASHBOARD OVERVIEW =====
function DashboardOverview({ technicians, users, loadingTechs, loadingUsers }) {
  const totalTechs = technicians.length;
  const activeTechs = technicians.filter((t) => t.status === "Active").length;
  const busyTechs = technicians.filter((t) => t.status === "Busy").length;
  const totalUsers = users.length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Technicians"
          value={loadingTechs ? "..." : totalTechs}
          icon={<FiTool className="text-[#1E3A8A]" />}
          color="#1E3A8A"
          bgColor="#EFF6FF"
        />
        <StatCard
          title="Active Technicians"
          value={loadingTechs ? "..." : activeTechs}
          icon={<FiCheckCircle className="text-[#16a34a]" />}
          color="#16a34a"
          bgColor="#f0fdf4"
        />
        <StatCard
          title="Busy Technicians"
          value={loadingTechs ? "..." : busyTechs}
          icon={<FiClock className="text-[#d97706]" />}
          color="#d97706"
          bgColor="#fffbeb"
        />
        <StatCard
          title="Total Users"
          value={loadingUsers ? "..." : totalUsers}
          icon={<FiUsers className="text-[#F97316]" />}
          color="#F97316"
          bgColor="#fff7ed"
        />
      </div>

      {/* Quick Overview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Technicians */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiTool /> Recent Technicians
          </h3>
          <div className="space-y-5">
            {loadingTechs ? (
              <Spinner
                fullScreen={false}
                text="Loading recent technicians..."
              />
            ) : technicians.length > 0 ? (
              technicians.slice(0, 4).map((tech) => (
                <div key={tech.id} className="flex items-center gap-3">
                  <img
                    src={
                      tech.image ||
                      "https://randomuser.me/api/portraits/lego/1.jpg"
                    }
                    alt={tech.name}
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {tech.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {tech.skill} · {tech.location}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tech.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {tech.status === "Active" ? (
                      <span className="flex items-center gap-2">
                        <FiCheckCircle /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FiClock /> Busy
                      </span>
                    )}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="px-6 py-12 text-center text-gray-400 text-sm">
                  No recent technicians found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiUsers /> Recent Users
          </h3>
          <div className="space-y-5">
            {loadingUsers ? (
              <Spinner fullScreen={false} text="Loading recent users..." />
            ) : users.length > 0 ? (
              users.slice(0, 4).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: "#1E3A8A" }}
                  >
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      Joined{" "}
                      {new Date(user.dateJoined).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <span className="flex items-center gap-2">
                        <FiCheckCircle /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FiMinusCircle /> Inactive
                      </span>
                    )}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="px-6 py-12 text-center text-gray-400 text-sm">
                  No recent users found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SETTINGS SECTION =====
function SettingsSection() {
  const { user, role } = useAuth();

  //  Change Email
  const handleChangeEmail = async () => {
    const newEmail = prompt("Enter new email");

    if (!newEmail) return;

    try {
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      alert("Verification email sent. please verify before change");

      await reload(auth.currentUser);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert("Please log out and log in again before changing email.");
      } else {
        alert(error.message);
      }
    }
  };
  // Change Password
  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert(`Password reset email sent to ${user.email}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your admin account and preferences
        </p>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <FiUser /> Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Admin Email
              </label>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <FiMail />
                <span className="text-sm font-medium text-gray-700">
                  {user?.email}
                </span>
                <span className="ml-auto px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  Verified
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Role
              </label>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <FiShield />
                <span className="text-sm font-medium text-gray-700">
                  {role === "admin" ? "Super Administrator" : "User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
            <FiAlertTriangle /> Account Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={handleChangeEmail}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              <span>Change Email</span>
              <span className="text-gray-400">→</span>
            </button>
            <button
              onClick={handleChangePassword}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              <span>Change Password</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN ADMIN DASHBOARD =====
export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [loadingTechs, setLoadingTechs] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Get Technicians
  const fetchTechs = async () => {
    try {
      setLoadingTechs(true);
      const data = await getTechnicians();
      setTechnicians(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTechs(false);
    }
  };

  // Get Users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await getUsers();
      const normalUsers = data.filter((u) => u.role === "user");
      setUsers(normalUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchTechs();
    fetchUsers();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardOverview
            technicians={technicians}
            users={users}
            loadingTechs={loadingTechs}
            loadingUsers={loadingUsers}
          />
        );
      case "technicians":
        return (
          <TechnicianTable
            technicians={technicians}
            setTechnicians={setTechnicians}
            refreshTechnicians={fetchTechs}
            loading={loadingTechs}
          />
        );
      case "users":
        return (
          <UserTable
            users={users}
            setUsers={setUsers}
            loading={loadingUsers}
            refreshUsers={fetchUsers}
          />
        );
      case "settings":
        return <SettingsSection />;
      default:
        return (
          <DashboardOverview
            technicians={technicians}
            users={users}
            loadingTechs={loadingTechs}
            loadingUsers={loadingUsers}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">{renderSection()}</main>
      </div>
    </div>
  );
}
