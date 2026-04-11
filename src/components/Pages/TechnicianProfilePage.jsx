import {
  FiMail,
  FiPhone,
  FiArrowLeft,
  FiMapPin,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTechnicianById } from "../../firebase/services/technicianService";
import Spinner from "../UIS/Spinner";

function TechnicianProfilePage() {
  const { id } = useParams();

  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  // Get Technician
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTechnicianById(id);
        setTechnician(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load technician");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const portfolio = technician?.portfolio || [];

  return loading ? (
    <Spinner text="Loading technician..." />
  ) : (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Btn */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-orange-500 mb-8 transition"
          >
            <FiArrowLeft className="mr-2" size={20} />
            <span>Back</span>
          </button>

          {/* Head */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={technician?.image}
                alt={technician?.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-orange-500 shadow-lg flex-shrink-0"
              />

              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {technician?.name}
                  </h1>
                  <p className="text-xl text-blue-900 font-semibold mb-3">
                    {technician?.skill}
                  </p>
                  <div className="flex items-center justify-center md:justify-start text-gray-600 mb-4">
                    <FiMapPin className="mr-2" size={18} />
                    <span>{technician?.location}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      technician?.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {technician?.status === "Active" ? (
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

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div className="flex items-center justify-center md:justify-start gap-3 text-gray-700">
                    <FiMail size={20} className="text-orange-500" />
                    <span>{technician?.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 text-gray-700">
                    <FiPhone size={20} className="text-orange-500" />
                    <span>{technician?.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {technician?.bio}
                </p>
              </section>

              {/* Portfolio */}
              <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Portfolio
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolio?.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedImage(project)}
                      className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <div className="w-full aspect-video">
                        <img
                          src={project.url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <p className="text-white text-sm font-semibold text-center px-3">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  ))}

                  {selectedImage && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                      {/* CLOSE BUTTON */}

                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white text-2xl font-bold hover:bg-orange-500/70 transition"
                      >
                        ×
                      </button>
                      {/* IMAGE */}
                      <div className="max-w-4xl w-full">
                        <img
                          src={selectedImage.url}
                          alt={selectedImage.title}
                          className="w-full max-h-[80vh] object-contain rounded-xl"
                        />
                        {/* TITLE */}
                        <div className="mt-4 px-4 py-2 bg-orange-500 rounded-lg backdrop-blur-sm mx-auto w-fit">
                          <p className="text-white text-sm font-bold text-center">
                            {selectedImage.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Contact Info */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Info
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-orange-500" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-gray-900 font-medium text-sm break-all">
                        {technician?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-orange-500" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-gray-900 font-medium text-sm">
                        {technician?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TechnicianProfilePage;
