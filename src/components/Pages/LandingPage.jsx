import Hero from "../UIS/Hero";
import Features from "../UIS/Features";
import HowItWorks from "../UIS/HowItWorks";

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}

export default LandingPage;
