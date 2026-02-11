import HeroSection from "./sections/HeroSection";
import Services from "./sections/Services";

const Homepage = async () => {
  return (
    <div className="min-h-[10000px]">
      <HeroSection />

      <Services />
    </div>
  );
};

export default Homepage;
