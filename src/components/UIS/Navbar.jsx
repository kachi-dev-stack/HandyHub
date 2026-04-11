import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navClass = (extraClass = "") => {
    return ({ isActive }) =>
      isActive
        ? `text-orange-500 font-semibold relative cursor-pointer ${extraClass}`
        : `hover:text-orange-500 transition-colors duration-200 font-medium cursor-pointer ${extraClass}`;
  };
  const getStartedClass = ({ isActive }) =>
    isActive
      ? "bg-[#EA580C] text-white px-6 py-2 rounded-lg font-medium shadow-lg scale-[0.98] transition-all"
      : "bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg";

  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    closeMenu();
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

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navClass()}>
              Home
            </NavLink>

            {isHome && (
              <button
                className="block py-2 hover:text-[#F97316] transition-colors "
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
            )}
            {isHome && (
              <button
                className="block py-2 hover:text-[#F97316] transition-colors"
                onClick={() => scrollToSection("howitworks")}
              >
                How it Works
              </button>
            )}
            <NavLink to="/login" className={navClass()}>
              Login
            </NavLink>
            <NavLink to="/signup" className={getStartedClass}>
              Get Started
            </NavLink>
          </div>
          {/* MOBILE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-white hover:text-[#F97316] transition-colors"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#1E3A8A] border-t border-blue-700">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <NavLink
              to="/"
              className={navClass("block py-2")}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            {isHome && (
              <button
                className="block py-2 hover:text-[#F97316] transition-colors"
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
            )}
            {isHome && (
              <button
                className="block py-2 hover:text-[#F97316] transition-colors"
                onClick={() => scrollToSection("howitworks")}
              >
                How it Works
              </button>
            )}
            <NavLink
              to="/login"
              className={navClass("block py-2")}
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${getStartedClass({ isActive })} block text-center`
              }
              onClick={closeMenu}
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
