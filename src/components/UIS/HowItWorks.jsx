import { FiUserPlus, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FiUserPlus,
      title: "Create an Account",
      description:
        "Sign up in seconds with your email or social account. No credit card required.",
    },
    {
      number: "2",
      icon: FiMapPin,
      title: "Search by Skill & Location",
      description:
        "Use our smart filters to find technicians by service type, location, and availability.",
    },
    {
      number: "3",
      icon: FiPhone,
      title: "View Profile & Contact",
      description:
        "Browse portfolios, read reviews, and connect directly with your chosen professional.",
    },
  ];

  return (
    <section id="howitworks" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps and find the perfect technician
            for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute -top-2 -right-2 bg-[#F97316] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {step.number}
                </div>

                <div className=" bg-gray-200 bg-opacity-10 w-24 h-24 rounded-2xl flex items-center justify-center">
                  <step.icon className="text-blue-900" size={48} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111827] mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#F97316] to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/signup"
            className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
