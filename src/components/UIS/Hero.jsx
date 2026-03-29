import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#2563EB] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Connect with Skilled Technicians
            <br />
            <span className="text-[#F97316]">Near You</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            HandyHub makes it easy to find verified local electricians,
            plumbers, and more — fast and reliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="group bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Get Started
              <FaArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/login"
              className="border-2 border-white hover:bg-white hover:text-[#1E3A8A] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
