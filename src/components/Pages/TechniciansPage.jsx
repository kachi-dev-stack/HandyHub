import { useState, useEffect } from "react";
import { getTechnicians } from "../../technicianService";
import { FiSearch } from "react-icons/fi";
import TechnicianCard from "../UIS/TechnicianCard";
import Spinner from "../UIS/Spinner";

const TechniciansPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get Technicians
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTechnicians();
        setTechnicians(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load technicians");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Welcome to HandyHub
            </h1>
            <p className="text-lg text-gray-600">
              Find and connect with skilled technicians near you
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by skill or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {loading ? (
            <Spinner fullScreen={false} text="Loading technicians..." />
          ) : filteredTechnicians.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTechnicians.map((technician) => (
                <TechnicianCard key={technician.id} technician={technician} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No technicians found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TechniciansPage;
