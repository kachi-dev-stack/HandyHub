import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { USER_EMAIL } from "../../config";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../auth";
const UserNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-[#1E3A8A] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
              >
                HandyHub
              </Link>
            </div>

            {/* Desktop view */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#1E3A8A" }}
                >
                  {USER_EMAIL[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-600">{USER_EMAIL}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl text-md font-medium text-white transition-colors"
                style={{ backgroundColor: "#F97316" }}
              >
                <FiLogOut />
              </button>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#F97316" }}
              >
                {USER_EMAIL[0].toUpperCase()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700 break-words">
                      {USER_EMAIL}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700 font-medium"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional: fade-in animation */}
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </nav>
    </>
  );
};

export default UserNavBar;
