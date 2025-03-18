import React from "react";
import Hero from "./_components/hero";
import { ServicesGrid } from "./service/_components/services-grid";
import BlogsSection from "./_components/blogs-section";
import ContactSection from "./_components/contact-section";

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
