import ScrollContainer from "react-indiana-drag-scroll";
import serviceData from "@/src/lib/app/data/services.json";
import PointerFollower from "@/src/ui/components/ui/PointerFollower";
import { ServiceCard } from "@/src/ui/components/ui/ServiceCard";

const DesktopContainer = () => {
  return (
    <PointerFollower className="hidden md:block">
      <ScrollContainer className="flex items-center gap-4 overflow-x-scroll scrollbar-none px-4 md:px-12">
        {/* Card */}
        {serviceData.services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </ScrollContainer>
    </PointerFollower>
  );
};

export default DesktopContainer;
