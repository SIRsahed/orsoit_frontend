import React from "react";
import Hero from "./_components/hero";
import { ServicesGrid } from "./_components/services-grid";
import ContactSection from "./_components/contact-section";
import AboutUsSection from "./_components/aboutUs-section";

const page = () => {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <AboutUsSection />
      {/* <BlogsSection /> */}
      <ContactSection />
    </>
  );
};

export default page;
