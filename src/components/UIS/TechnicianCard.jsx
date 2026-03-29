import { Link } from "react-router-dom";
import { FiMapPin, FiCheckCircle, FiClock } from "react-icons/fi";

const TechnicianCard = ({ technician }) => {
  const { id, name, skill, location, status, image } = technician;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-100"
          />

          <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-orange-500 font-medium mb-2">{skill}</p>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <FiMapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="mb-4">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {/* {status} */}
              {status === "Active" ? (
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

          <Link
            to={`/technicians/technician/${id}`}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;
