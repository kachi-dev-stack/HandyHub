// import { FaSearch, FaShieldAlt, FaImage, FaStar } from "react-icons/fa";
import { FiSearch, FiShield, FiImage, FiStar } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    {
      icon: FiSearch,
      title: "Quick Search",
      description:
        "Find the right technician in seconds with our powerful search filters by skill, location, and availability.",
    },
    {
      icon: FiShield,
      title: "Verified Professionals",
      description:
        "All technicians are verified and background-checked to ensure you get reliable and trustworthy service.",
    },
    {
      icon: FiImage,
      title: "Portfolio Preview",
      description:
        "Browse past work and completed projects to make informed decisions before hiring.",
    },
    {
      icon: FiStar,
      title: "Ratings & Availability",
      description:
        "See real-time ratings, reviews, and availability to connect with the best technicians instantly.",
    },
  ];

  return (
    <section id="features" className="bg-[#F3F4F6] py-20 sm:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Why Choose HandyHub?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make connecting with skilled professionals simple, fast, and
            reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
