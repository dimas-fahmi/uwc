import ContactFormSection from "./sections/ContactForm/ContactFormSection";
import DoctorsSection from "./sections/Doctors/DoctorsSection";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/Services/ServicesSection";
import StorySection from "./sections/StorySection";

const Homepage = async () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ServicesSection />
      <DoctorsSection />
      <StorySection />
      <ContactFormSection />
    </div>
  );
};

export default Homepage;
