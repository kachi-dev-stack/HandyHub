import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link, useLocation } from "react-router-dom";
import { seedUsers } from "../../seed/seedUsers";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname == "/") {
      const section = document.getElementById("home");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-[#1E3A8A] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
            >
              HandyHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="hover:text-[#F97316] transition-colors"
              onClick={handleClick}
            >
              Home
            </NavLink>
            {location.pathname === "/" && (
              <a href="#features" className="text-white hover:text-orange-400">
                Features
              </a>
            )}
            {location.pathname === "/" && (
              <a
                href="#howitworks"
                className="text-white hover:text-orange-400"
              >
                How It Works
              </a>
            )}

            <NavLink
              to="/login"
              className="hover:text-[#F97316] transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Get Started
            </NavLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#F97316] transition-colors"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1E3A8A] border-t border-blue-700">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <NavLink
              to="/"
              className="block py-2 hover:text-[#F97316] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            {location.pathname === "/" && (
              <a
                href="#features"
                className="block text-white hover:text-orange-400"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
            )}
            {location.pathname === "/" && (
              <a
                href="#howitworks"
                className="block text-white hover:text-orange-400"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
            )}
            <NavLink
              to="/login"
              className="block py-2 hover:text-[#F97316] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="block bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-lg font-medium text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
