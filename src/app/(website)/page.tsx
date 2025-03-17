import React from "react";
import { ServicesGrid } from "./_components/services-grid";
import BlogsSection from "./_components/blogs-section";
import ContactSection from "./_components/contact-section";

const page = () => {
  return (
    <>
      <ServicesGrid />
      <BlogsSection />
      <ContactSection />
    </>
  );
};

export default page;
