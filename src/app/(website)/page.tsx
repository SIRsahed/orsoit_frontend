import React from "react";
import { ServicesGrid } from "./_components/services-grid";
import BlogsSection from "./_components/blogs-section";
import ContactSection from "./_components/contact-section";
import Hero from "./_components/hero";

const page = () => {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <BlogsSection />
      <ContactSection />
    </>
  );
};

export default page;
