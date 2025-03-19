import React from "react";
import MissionSection from "./_components/_components/Mission";
import LearnMore from "./_components/_components/LearnMore";
import VisionSection from "./vision";
import TestimonialSection from "./_components/_components/TestimonialSection";
import CarouselPages from "./_components/_components/CarouselPages";

const Page = () => {
  // Capitalize the component name to follow the convention
  return (
    <div>
      <div>
        <LearnMore />
      </div>
      <div>
        <MissionSection />
      </div>

      <div>
        <VisionSection />
      </div>
      <div>
        <CarouselPages />
      </div>
      <div>
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Page;
