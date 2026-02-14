import ContactFormSection from "./sections/ContactForm/ContactFormSection";
import DoctorsSection from "./sections/Doctors/DoctorsSection";
import HeroSection from "./sections/HeroSection";
import ReviewSection from "./sections/Reviews/ReviewSection";
import ServicesSection from "./sections/Services/ServicesSection";
import StorySection from "./sections/StorySection";

const Homepage = async () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ServicesSection />
      <DoctorsSection />
      <StorySection />
      <ReviewSection />
      <ContactFormSection />
    </div>
  );
};

export default Homepage;
